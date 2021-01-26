import { SvgIconProps, svgPosition } from '@/types/custom'
import { ref } from 'vue'

/* 返回一个深拷贝
 * 方法：利用json转换，将数据转换为原始对象，然后使用ref将原始对象转换为一个proxy对象。 */
export function deepCopyElement (e: object): object {
  const elementCopy: SvgIconProps = JSON.parse(JSON.stringify(e))
  /* 加入位置属性 */
  const position: svgPosition = {
    x: 0,
    y: 0
  }
  elementCopy.position = position
  /* 转换为proxy对象 */
  const element = ref(elementCopy)
  /* 将proxy对象返回 */
  return element.value
}
