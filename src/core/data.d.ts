
//演员
export interface IActor{
  line:ILine|null;
  styles:{[propsName:string]:IStyles};//配置演员在不同时间点的样式，key就是时间点的唯一键
  target:HTMLElement|null
}
//关键点，站位
export interface IPoint{
  line:ILine|null;
  play:()=>void;
  next:IPoint|null;
  time:number;//毫秒
}
//动画线，表演轨迹
export interface ILine{
  points:Array<IPoint>;
  actors:Array<IActor>;
  scene:IScene|null;
  play:()=>void;
  onEnd?:(point:IPoint)=>void;
}
//场景
export interface IScene{
  lines:Array<ILine>;
  play:()=>void;
}
//舞台
export interface IStage{
  scene:Array<IScene>;
  start:()=>void;
  onEnd:()=>void;
}
//构造一条时间线的配置对象
export interface ILineConfig{
  points:Array<IPoint>;
  actors:Array<IActor>
}

//原始样式
export interface IStyles{
  width?:number|string;
  height?:number|string;
  top?:number|string;
  left?:number|string;
  right?:number|string;
  bottom?:number|string;
  color?:string|Array<number>;
  backgroundColor?:string|Array<number>;
  scale?:Array<number>;
  scaleX?:number;
  scaleY?:number;
  scaleZ?:number;
  translate?:Array<number>;
  translateX?:number;
  translateY?:number;
  translateZ?:number;
  skew?:Array<number>;
  skewX?:number;
  skewY?:number;
  skewZ?:number;
  rotate?:Array<number>;
  rotateX?:number;
  rotateY?:number;
  rotateZ?:number;
  //[propName:string]:any;
}

export enum EasyType {
  easeInSine = "easeInSine",
  easeOutSine = "easeOutSine",
  easeInOutSine = "easeInOutSine",
  easeInQuad = "easeInQuad",
  easeOutQuad = "easeOutQuad",
  easeInOutQuad = "easeInOutQuad",
  easeInCirc = "easeInCirc",
  easeOutCirc = "easeOutCirc",
  easeInBack = "easeInBack",
  easeInOutCirc = "easeInOutCirc",
  easeOutBack = "easeOutBack",
  easeInOutBack = "easeInOutBack",
  easeInElastic = "easeInElastic",
  easeOutElastic = "easeOutElastic",
  easeInOutElastic = "easeInOutElastic",
  easeInBounce = "easeInBounce",
  easeOutBounce = "easeOutBounce",
  easeInOutBounce = "easeInOutBounce",
}