<template>
  <draggable @change="handleChange" tag="el-collapse" :list="svgArray" :component-data="getComponentData()" item-key="name">
    <template #item="{element}">
      <el-row :title="element.title" :name="element.name">
        <div>{{ element }}</div>
      </el-row>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'
import { SvgIconArray } from '@/types/custom'

export default defineComponent({
  name: 'SvgContainer',
  components: {
    draggable
  },
  setup () {
    const svgIconArray: SvgIconArray = [
      {
        title: '分类一',
        SvgIcons: [{
          name: '1',
          nick: 'up'
        }, {
          name: '2',
          nick: 'down'
        }]
      }
    ]
    const svgArray = ref(svgIconArray)
    const activeNames = ref('')
    const list = ref([1, 2, 3, 4, 5])
    const handleChange = () => {
      console.log('changed')
    }
    const inputChanged = value => {
      activeNames.value = value
    }
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
      list,
      svgArray,
      handleChange,
      inputChanged,
      getComponentData
    }
  }

})
</script>

<style scoped>

</style>
