import { SvgIconProps } from '@/types/custom'

export function svgDrop (el: HTMLElement, svgItem: SvgIconProps) {
  const style: CSSStyleDeclaration = el.style
  style.cursor = 'pointer' // 设置鼠标指针为手型
  console.log(el, svgItem)
  el.onmousedown = function (event) {
    el.onmousemove = e => {
      console.log(e, event)
    }
    el.onmouseup = function (event) {
      el.onmousemove = null
      console.log(event)
    }
  }
}

export const directive: object = {
  mounted (el, svgItem) {
    svgDrop(el, svgItem)
  }
}
