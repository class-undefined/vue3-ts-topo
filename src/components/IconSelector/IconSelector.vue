<template>
  <el-menu default-active="1"
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
        <draggable @change="handleChange" tag="el-collapse" :list="item.SvgIcons"
                   :component-data="getComponentData()"
                   :sort="false"
                   :clone="handleClone"
                   :group="groupOption"
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
import { SvgIconProps, svgPosition } from '@/types/custom'
import { deepCopyElement } from '@/components/IconSelector/utils/utils'

export default {
  name: 'IconSelector',
  components: {
    SvgIcon,
    draggable
  },
  props: {
    SvgIconArray: {
      type: Array,
      required: true
    }
  },
  setup (prop) {
    /*
    * draggable help doc: : https://github.com/SortableJS/Sortable#event-object-demo */
    const activeNames = ref('')
    /* computed */
    const svgIconArray = computed(() => {
      return prop.SvgIconArray
    })
    /*  group option
    * name: String — group name ー组名
    * pull: true|false|["foo", "bar"]|'clone'|function — 从列表中移动的能力ー复制物品，而不是移动。或者可以放入元素的组名数组。默认为true.
    * put: true|false|["baz", "qux"]|function — 是否可以从其他列表中添加元素，还是可以从中添加元素的组名数组
    * revertClone: boolean — 在移动到另一个列表后，将克隆的元素恢复到初始位置
    * */
    const groupOption = ref({
      name: 'icon-selector',
      pull: 'clone', // 拖拽自身元素给其他容器
      put: false // 是否允许其他元素拖拽给自身
    })
    /** 发现一个问题：handleDrop即使在自身容器内的拖拽中设置了sort: false ，也会被调用。
     * 这应该是正常的，但是在这个项目中不希望发生。 所以需要解决这个问题，
     * TODO 即：只有在元素被拖拽至SvgContainer中才会执行某个特定的函数，并且还能通过该回调函数的参数获取到鼠标的坐标，用来定义元素的位置
     * 或者说只需要找到符合这样的事件函数即可  */
    /* 事件回调函数系列 */
    const handleDrop = val => {
      console.log('drop', val)
    } // 拖动事件
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleChange = () => {
      console.log('changed')
    }
    const handleClone = (e) => {
      return deepCopyElement(e)
    }
    const inputChanged = value => {
      activeNames.value = value
      console.log(value)
    }
    const getComponentData = () => {
      return {
        onChange: handleChange, // 视图改变事件
        onInput: inputChanged, // 输入事件
        onDrop: handleDrop, // 拖拽事件
        wrap: false,
        value: activeNames.value
      }
    }
    return {
      prop,
      svgIconArray,
      activeNames,
      groupOption,
      handleDrop,
      handleOpen,
      handleClose,
      handleChange,
      handleClone,
      inputChanged,
      getComponentData
    }
  }
}
</script>

<style scoped>

</style>
