export function svgDrop (el: HTMLElement): any {
  const style: CSSStyleDeclaration = el.style
  style.cursor = 'pointer' // 设置鼠标指针为手型
  el.onmousedown = function (e) {
    el.onmousemove = e => {
      console.log(e)
    }
    el.onmouseup = function (e) {
      el.onmousemove = null
    }
  }
  console.log(el)
}

export const directive: object = {
  mounted (el) {
    svgDrop(el)
  }
}
