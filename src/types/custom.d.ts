declare module '*.svg' {
  const content: any
  export default content
}

export type SvgIconConfig = {
  svg: {
    height: number;
    width: number;
  };
  nameConfig?: object;
}

/** svg坐标类 */
export type svgPosition = {
  x: number;
  y: number;
}

/** SvgIcon组件需要传递的数据类 */
export interface SvgIconProps {
  /* svg图标路径 */
  name: string;
  /** svg别名 可选 最终渲染结果为svg-icon-[nick] */
  nick: string;
  /* 图标大小 可选 长宽大小均为size px  */
  size?: { height: number; width: number };
  /* 填充颜色 默认#000 */
  color?: string;
  /** 描述文本 */
  desc?: string;
  /* svg坐标 */
  position: svgPosition;
  /* 配置项 */
  setting?: { move: boolean };
  /* 确定是否为用于占位的svg,不是则不设置 */
  isInitSvg?: true;
}

/* Svg选择类 */
export interface SvgIconItem {
  title: string;
  SvgIcons: Array<SvgIconProps>;
}

/* SvgContainer接收的svg图标 */
export type SvgIcons = Array<SvgIconProps>

/* IconSelector用于渲染svg拖拽选择器的svg数据 */
export type SvgIconArray = Array<SvgIconItem>
