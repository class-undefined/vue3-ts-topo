<template>
  <el-menu default-active="2"
           class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose">
    <el-submenu v-for="(item,index) in svgIconArray" :index="(index + 1).toString()" :key="item.title">
      <template #title>
        <i class="el-icon-location"></i>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item-group>
        <!--        <template #title>{{item.title}}</template>-->
        <draggable @change="handleChange" tag="el-collapse" :list="item.SvgIcons" :component-data="getComponentData()"
                   item-key="name">
          <template #item="{element}">
            <el-menu-item>
              <svg-icon :name="element.name"/>
            </el-menu-item>
          </template>
        </draggable>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'IconSelector',
  components: { SvgIcon, draggable },
  props: {
    SvgIconArray: {
      type: Array,
      required: true
    }
  },
  setup (prop) {
    const activeNames = ref('')
    const svgIconArray = computed(() => {
      return prop.SvgIconArray
    })
    const handleOpen = function (key, keyPath) {
      console.log(key, keyPath)
    }
    const handleClose = function (key, keyPath) {
      console.log(key, keyPath)
    }
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
      prop,
      svgIconArray,
      activeNames,
      handleOpen,
      handleClose,
      handleChange,
      inputChanged,
      getComponentData
    }
  }
}
</script>

<style scoped>

</style>
