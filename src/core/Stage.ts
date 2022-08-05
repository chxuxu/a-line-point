import Actor from "./Actor";
import { IActor,IPoint,ILine,IScene,ILineConfig,IStage,ISceneOptions } from "./data";
import Line from "./Line";
import Point from "./Point";
import Scene from "./Scene";
import {addClassName,addStyle}from "./dom";
import {ClassNamePre} from "./constant";
export default class Stage implements IStage{
  isAuto:boolean=false;
  sceneIndex:number=-1;
  target:HTMLElement|null=null;
  scenes:Array<IScene>=[];
  constructor(target,options?:{auto?:boolean,sceneIndex?:number}){
    this.isAuto=options.auto||false;
    this.sceneIndex=options.sceneIndex==undefined?-1:options.sceneIndex;
    this.target=target;
    if(target){
      addClassName(target,ClassNamePre+"stage");
    }
    addStyle(`
    .${ClassNamePre}stage{position: relative;display: block;overflow:hidden;z-index:10000;}
    .${ClassNamePre}scene{position: absolute;overflow:hidden;z-index:1000;}
    .${ClassNamePre}actor{position: absolute;z-index:1000;}
    .${ClassNamePre}scene.z-hide{display:none;}
    `);
  }
  createScene(target:HTMLElement|null,options?:ISceneOptions){
    let newScene=new Scene(target,options);
    this.addScene(newScene);
    return newScene;
  }
  //添加时间线
  addScene(newScene:IScene){
    newScene.stage=this;
    newScene.index=this.scenes.length;
    this.scenes.push(newScene);
    let _prev:IScene=this.scenes[this.scenes.length-2];
    if(_prev){
      _prev.next=newScene;
      newScene.prev=_prev;
    }
    console.log(newScene.index);
    if(this.sceneIndex==newScene.index){
      newScene._onInit({show:true});
    }
    
  }
  //播放时间线
  start(){
    if(this.sceneIndex<0){
      this.scenes[0]?.show();
    }else{
      this.scenes[this.sceneIndex+1]?.show();
    }
    
  }
}