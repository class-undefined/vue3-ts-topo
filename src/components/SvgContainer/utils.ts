/* 得到initSvg在数组中的索引 */
export function getInitSvg (svgArray: Array<any>) {
  for (let i = 0; i < svgArray.length; i++) {
    if (svgArray[i].isInitSvg !== undefined) {
      return i
    }
  }
  return -1
}

/* 将initSvgToBegin置于数组最底层：index:0 */
export function initSvgToBegin (svgArray: Array<any>) {
  console.log(svgArray)
  const index: number = getInitSvg(svgArray) // 得到占位svg的索引位置
  if (index === -1) return false
  const beginItem = svgArray[0]
  svgArray[0] = svgArray[index]
  svgArray[index] = beginItem
  return true
}

/* 将initSvgToBegin置于数组最顶层：index:length - 1 */
export function initSvgToEnd (svgArray: Array<any>) {
  const index: number = getInitSvg(svgArray) // 得到占位svg的索引位置
  if (index === -1) return false
  const endItem = svgArray[svgArray.length - 1]
  svgArray[svgArray.length - 1] = svgArray[index]
  svgArray[index] = endItem
  return true
}
