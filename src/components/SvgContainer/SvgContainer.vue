<template>
  <div class="svg-container" ref="svg-container-div">
    <draggable
      @change="handleChange"
      tag="svg"
      :list="svgArray"
      :group="groupOption"
      :component-data="getComponentData()"
      item-key="name">
      <template #item="{element}">
        <g v-svg-drop:[position]="element">
          <svg-icon style="height: 40px;width: 40px" :name="element.name" :nick="element.nick" :size="40"/>
        </g>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'
import { SvgIcons, svgPosition } from '@/types/custom'
import SvgIcon from '@/components/SvgIcon.vue'

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
    const svgArray = ref([])
    const activeNames = ref('')
    /** 鼠标每次松开后，相对于svg-container组件的坐标信息，
     * 由handleDrop控制 */
    const position = ref({
      x: 0,
      y: 0
    })
    /* 事件回调函数系列 */
    const handleChange = (e) => {
      /* added: 元素拷贝成功后的handle event
      * 作用: 元素添加成功后即将其位置属性初始化，即初始位置定义成鼠标放开后相对于svg-container的坐标 */
      e.added.element.position.x = position.value.x
      e.added.element.position.y = position.value.y
      console.log(e.added.element.position.y)
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
    /* tag标签的数据定义 */
    const getComponentData = () => {
      return {
        onChange: handleChange,
        onInput: inputChanged,
        onDrop: handleDrop,
        wrap: false,
        value: activeNames.value,
        ref: 'svg-container'
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
.svg-container > svg {
  width: 100%;
  height: 100%;
}
</style>
