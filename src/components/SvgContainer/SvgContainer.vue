<template>
  <div class="svg-container">
    <draggable
      @change="handleChange"
      tag="svg"
      @item="handleItem"
      :list="svgArray"
      :group="groupOption"
      :component-data="getComponentData()"
      item-key="name">
      <template #item="{element}">
        <g>
          <svg-icon :name="element.name" :nick="element.nick" :size="40"/>
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
      pull: true, // 后续根据需要应该要修改成一个函数
      put: ['icon-selector']
    })
    /* svg数据数组 */
    const svgArray = ref([])
    const activeNames = ref('')
    /* 事件回调函数系列 */
    const handleChange = (e) => {
      console.log(e)
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
        value: activeNames.value
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
