<template>
  <div class="svg-container" ref="svg-container-div">
    <draggable
      @change="handleChange"
      @added="handleChange"
      tag="svg"
      :list="svgArray"
      :group="groupOption"
      :component-data="getComponentData()"
      item-key="name">
      <template #item="{element}">
        <g v-svg-drop="element">
          <svg-icon style="height: 40px;width: 40px" :name="element.name" :nick="element.nick" :size="40"/>
        </g>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'
import { SvgIcons } from '@/types/custom'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  name: 'SvgContainer',
  components: {
    SvgIcon,
    draggable
  },
  setup () {
    const svgIcons: SvgIcons = [{
      name: '1',
      nick: 'up'
    }, {
      name: '2',
      nick: 'down'
    }]
    /* groupOption：组配置 */
    const groupOption = ref({
      name: 'svg-container',
      pull: ['svg-container'] || true, // 后续根据需要应该要修改成一个函数
      put: ['icon-selector'] || true
    })
    /* svg数据数组 */
    const svgArray = ref([])
    const activeNames = ref('')
    /* 事件回调函数系列 */
    const handleChange = (e) => {
      /* added: 元素拷贝成功后的handle event */
      /** BUG: done */
      // e.added.element.name = '5'
      console.log(e.added.element)
    }
    const handleItem = e => {
      console.log(e)
    }
    const inputChanged = value => {
      activeNames.value = value
    }
    /* tag标签的数据定义 */
    const getComponentData = () => {
      return {
        onChange: handleChange,
        onInput: inputChanged,
        wrap: false,
        value: activeNames.value,
        ref: 'svg-container'
      }
    }
    return {
      activeNames,
      groupOption,
      svgArray,
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
