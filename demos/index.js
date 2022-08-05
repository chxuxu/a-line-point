import {Scene,Line,Point,Actor,Stage} from "../src/core";
import "./index.less";
let stage=new Stage(
  document.getElementById("demo"),{
  auto:true,sceneIndex:0
});
const sceneDivs=document.getElementsByClassName("m-scene");
for(let i=0;i<sceneDivs.length;i++){
  stage.createScene(sceneDivs[i],{});
}

stage.start();

