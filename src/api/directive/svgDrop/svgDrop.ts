import { SvgIconProps, svgPosition } from '@/types/custom'

/** 发现一个问题：
 * 当svg-container中没有组件时，拖拽任意组件都可以成功添加至容器当中
 * 一旦添加了至少一个元素之后，则每一次添加元素，都需要先将拖拽ghost移动至已添加的元素上（鼠标经过即可）
 * 才可添加成功，否则添加无效。
 * 猜测：可能与group有关，原因：鼠标必须经过list-items才能够有效添加。TODO */
export function svgDrop (el: HTMLElement, binding: any) {
  console.log(el, binding)
  const svgItem: SvgIconProps = binding.value // svg数据
  const position: svgPosition = binding.arg // 获取拖拽位置
  const style: CSSStyleDeclaration = el.style // style属性
  /* 给svg的g标签定位位置 */
  el.setAttribute('transform', 'translate(' + position.x + ',' + position.y + ')')
  if (svgItem.setting !== undefined) {
    const isMove = svgItem.setting.move // 是否可以被拖拽
    /* 如果不能被拖拽，则不定义拖动事件 */
    if (!isMove) {
      return
    }
  }
  style.cursor = 'pointer' // 设置鼠标指针为手型
  console.log(el, svgItem, position)
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
  mounted (el, binding) {
    svgDrop(el, binding)
  }
}
