import { IActor,IPoint,ILine,IScene,IStyles } from "./data"
import {colorRgb,setStyleToElement} from "./utils";
export default class Actor implements IActor{
  line=null;//所属关键帧
  target=null;//对应的DOM节点或其他动画对象
  styles={};//演员的样式属性
  //把某些样式值，修改为数字表示，可用于动画计算
  private toAStyle(styles){
    for(let key in styles){
      if(key=="color"||key=="backgroundColor"){
        styles[key]=colorRgb(styles[key],true);
      }
    }
    return styles;
  }
  constructor(target:HTMLElement,styles:IStyles){
    this.target=target;
    if(styles[0]){
      setStyleToElement(target,styles[0]);
    }
    
    this.styles=this.toAStyle(styles);
  }
}
