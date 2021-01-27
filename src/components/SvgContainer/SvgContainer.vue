<template>
  <div class="svg-container" id="svg-container-div">
    <draggable
      @change="handleChange"
      tag="svg"
      :sort="false"
      :list="svgArray"
      :group="groupOption"
      :component-data="getComponentData()"
      item-key="name">
      <template #item="{element}">
        <g v-svg-drop:[position]="element">
          <svg-icon :name="element.name" :nick="element.nick" :size="element.size"/>
        </g>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import draggable from 'vuedraggable'
import SvgIcon from '@/components/SvgIcon.vue'
import { SvgIconProps } from '@/types/custom'
import { initSvgToBegin } from '@/components/SvgContainer/utils'

export default defineComponent({
  name: 'SvgContainer',
  components: {
    SvgIcon,
    draggable
  },
  setup () {
    /* groupOption：组配置 */
    const groupOption = ref({
      name: 'svg-container',
      pull: ['svg-container'] || true, // 后续根据需要应该要修改成一个函数
      put: ['icon-selector', 'svg-container'] || true
    })
    /* svg数据 */
    const initItem: SvgIconProps = {
      name: 'board',
      nick: 'init-svg',
      position: {
        x: 0,
        y: 0
      },
      size: {
        height: 100,
        width: 100
      },
      setting: {
        move: false
      },
      isInitSvg: true
    }
    const svgArray = ref([initItem])
    const activeNames = ref('')
    /** 鼠标每次松开后，相对于svg-container组件的坐标信息，
     * 由handleDrop控制 */
    const position = ref({
      x: 0,
      y: 0
    })
    /* svg-container - svg标签的大小 */
    const svgContainerSize = ref({
      width: 100,
      height: 100
    })
    /* 事件回调函数系列 */
    const handleChange = (e) => {
      /* added: 元素拷贝成功后的handle event，调试方式：e.added
      * 作用: 元素添加成功后即将其位置属性初始化，即初始位置定义成鼠标放开后相对于svg-container的坐标 */
      e.added.element.position.x = position.value.x
      e.added.element.position.y = position.value.y
      /** 拖拽的时候initSvg要在最上层，即索引为length-1，拖拽结束后initSvg应处于最底层，即索引为0
       * 试验后发现，只需要等拖拽结束后将initSvg置于最底层即可
       * 但经过这样的位置交换操作后，就产生了一个元素在Array中的索引位置问题
       * 即除去svgInitSvg在最底层外，之后的元素相对于正常添加的顺序来说，是逆序的 */
      initSvgToBegin(svgArray.value)
    }
    const handleItem = e => {
      console.log(e)
    }
    const handleDrop = e => {
      position.value.x = e.offsetX
      position.value.y = e.offsetY
    }
    const inputChanged = value => {
      activeNames.value = value
    }
    /* 生命周期事件 */
    /* 创建完成：设置svg宽高 */
    onMounted(() => {
      /* 添加元素成功后，获取画板svg-container容器的大小 */
      const svgContainerDiv: HTMLElement | null = document.getElementById('svg-container-div')
      if (svgContainerDiv !== null) {
        svgContainerSize.value.height = 478
        svgContainerSize.value.width = svgContainerDiv.offsetWidth
        if (svgArray.value[0].size !== undefined) {
          svgArray.value[0].size.width = svgContainerDiv.offsetWidth
          svgArray.value[0].size.height = 478
          console.log(svgArray.value[0].size)
        }
      }
    })
    /* tag标签的数据定义 */
    const getComponentData = () => {
      return {
        onChange: handleChange,
        onInput: inputChanged,
        onDrop: handleDrop,
        // wrap: false,
        value: activeNames.value,
        width: svgContainerSize.value.width,
        height: svgContainerSize.value.height,
        id: 'svg-container'
      }
    }
    return {
      activeNames,
      groupOption,
      svgArray,
      position,
      handleChange,
      handleItem,
      inputChanged,
      getComponentData
    }
  }

})
</script>

<style scoped>
.svg-container {
  width: 100%;
  height: 100%;
}
</style>
