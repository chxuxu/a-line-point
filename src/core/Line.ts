import { IActor,IPoint,ILine,IScene } from "./data";
import Point from "./Point";
import Actor from "./Actor";
export default class Line implements ILine{
  scene=null;//时间线坐在场景
  points:Array<IPoint>=[];//时间线里包含的关键帧数组
  actors:Array<IActor>=[];
  //时间线播放完毕的回调函数
  onEnd(point:IPoint){
    console.log(point);
  }
  //添加关键帧
  addPoint(newPoint:IPoint|number){
    let newP=null;
    if(typeof newPoint=="number"){
      newP=new Point(newPoint);
    }else{
      if(newPoint instanceof Point){
        newP=newPoint;
      }else{
        newP=new Point(newPoint.time);
      }
    }
    if(newP){
      newP.line=this;
      if(this.points.length){
        this.points[this.points.length-1].next=newP;
      }
      this.points.push(newP);
    }
  }
  //添加演员
  addActor(newActor:IActor){
      if(newActor instanceof Actor){
        newActor.line=this;
        this.actors.push(newActor)
      }else{
        let _P=new Actor(newActor.target,newActor.styles);
        _P.line=this;
        this.actors.push(_P)
      }
  }
  //从第一个关键帧开始播放时间线
  play(){
    this.points[0]?.play();
  }
}