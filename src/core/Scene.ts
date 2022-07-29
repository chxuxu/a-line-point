import Actor from "./Actor";
import { IActor,IPoint,ILine,IScene,ILineConfig } from "./data";
import Line from "./Line";
import Point from "./Point";

export default class Scene implements IScene{
  lines=[];

  //添加时间线
  addLine(newLine:ILine){
    newLine.scene=this;
    this.lines.push(newLine);
  }
  //根据配置或示例构建时间线
  newLine(config:ILineConfig){
    let line=new Line();
    if(config.points){
      config.points.map((point:IPoint)=>{
        if(point instanceof Point){
          line.addPoint(point);
        }else{
          let newP=new Point(point.time);
          line.addPoint(newP);
        }
      })
    }
    if(config.points){
      config.actors.map((actor:IActor)=>{
        if(actor instanceof Actor){
          line.actors.push(actor)
        }else{
          line.actors.push(new Actor(actor.target,actor.styles))
        }
      });
    }
    this.addLine(line);
  }
  //播放时间线
  play(){
    this.lines.map(line=>{
      line.play();
    });
  }
}