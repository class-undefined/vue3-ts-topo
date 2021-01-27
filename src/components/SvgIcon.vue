<template>
  <svg
    :class="'svg-icon-[' + props.nick + ']'"
    :height=props.size.height
    :width="props.size.width"
    :style="{
      color: props.color
    }"
  >
    <use :xlink:href="`#icon-${props.name}`" :fill="props.color"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: 'vue'
    },
    nick: {
      type: String,
      required: false,
      default: 'undefined'
    },
    size: {
      type: Object,
      default () {
        return {
          width: 32,
          height: 32
        }
      }
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup (props) {
    return {
      props
    }
  }
})
</script>
