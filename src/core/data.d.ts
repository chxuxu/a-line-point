
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
  index:number;
  target:HTMLElement|null;
  stage:IStage;
  lines:Array<ILine>;
  next:IScene;
  prev:IScene;
  play:()=>void;
  show:(shpos?:string,toBegin?:boolean)=>void;
  hide:(shpos?:string)=>void;
  options?:ISceneOptions;
  _onInit?:(options?:any)=>void;
}
//舞台
export interface IStage{
  isAuto?:boolean;//是否自动播放场景
  target?:HTMLElement|null;//舞台背景元素
  scenes:Array<IScene>;
  sceneIndex:number;//当前显示的场景索引
  start:()=>void;
  addScene?:(scene:IScene)=>void;
  createScene?:(target:HTMLElement|null,options?:ISceneOptions)=>IScene;
  //onEnd:()=>void;
}
//构造一条时间线的配置对象
export interface ILineConfig{
  points:Array<IPoint>;
  actors:Array<IActor>
}

export interface ISceneOptions{
  showFn?:ATF;
  hideFn?:ATF;
  shpos?:"tb"|"bt"|"lr"|"rl"|"center"|"cover";//center表示从中心点扩散显示，cover从外围缩小显示
  onShow?:(e:IScene)=>void;
  onHide?:(e:IScene)=>void;
  delay?:number;//延迟多少毫秒，自动显示下一个场景
  duration?:number;//显示花了多少时间
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

/* - 指定从慢速开始，然后加快，然后缓慢结束的动画（默认）
linear - 规定从开始到结束的速度相同的动画
ease-in - 规定慢速开始的动画
ease-out - 规定慢速结束的动画
ease-in-out - 指定开始和结束较慢的动画
cubic-bezier(n,n,n,n)*/
export type ATF="ease"|"linear"|"ease-in"|"ease-out"|"ease-in-out"|"cubic-bezier";