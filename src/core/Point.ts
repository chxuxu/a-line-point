import { IActor, IPoint, ILine, IScene, IStyles } from "./data";
import { getCurrentStyles,setStylesToTarget } from "./utils";
const updateTime = 1000 / 60
const rAF = window.requestAnimationFrame || function (cb) {
  setTimeout(cb, updateTime)
}
export default class Point implements IPoint {
  time:number = 0;
  line:ILine= null;
  actors:Array<IActor> = [];
  next:IPoint = null;

  constructor(time: number) {
    this.time = time;
  }
  // addActor(newActor: IActor) {
  //   newActor.point = this;
  //   this.actors.push(newActor);
  // }
  private run(chgActors: Array<IActor>,beginTime,endTime ) {
    const during=endTime-beginTime;
    let _positon = 0;//动画位置标记，最大为1，表示动画结束
    let _this:IPoint = this;
    let _run = function () {
      if (_positon < 1) {
        //利用缓动函数，获取关键帧上的所有演员的实时样式属性，根据此属性重新赋值样式，实现动画效果
        chgActors.map((actor:IActor, index) => {
          //演员的实时样式属性集合
          let { currentStyles, position } = getCurrentStyles(actor.styles[beginTime], actor.styles[endTime], during, _positon);
          if (index == chgActors.length - 1) {
            _positon = position;//所有的角色都更新一次后才修改position
          }
          //赋值实时样式属性
          setStylesToTarget(actor.target, currentStyles);
        });
        rAF(_run);
      } else {
        //两个关键帧之间的动画结束，由于JS语言数字误差，结束的样式值不是最初设置的值，这里用最初设置的值重新赋值，避免动画抖动。
        chgActors.map((actor:IActor) => {
          setStylesToTarget(actor.target, actor.styles[endTime]);
        });
        _this.next?.play();//播放下两个关键帧之间的动画（_this.next一定存在）
      }
    }
    _run();
  }
  //播放关键帧，至少有两个关键帧才有效果
  play() {
    if (this.next) {
      let chgActors: Array<IActor> =this.line.actors;//两个关键帧上的相同演员，样式属性不同
      let nextPoint = this.next;//下个关键帧
      // //循环获取两个关键帧上的相同演员
      // this.actors.map((actor: IActor) => {
      //   nextPoint.actors.map((nextActor: IActor) => {
      //     if (actor.target == nextActor.target) {
      //       chgActors.push([actor, nextActor]);
      //     }
      //   });
      // });
      //let during = nextPoint.time - this.time;//两帧质检时间间隔，毫秒
      this.run(chgActors, this.time,nextPoint.time);//对两帧之间的相同演员运行动画。
    }else {
      this.line.onEnd(this);//当前时间线执行完成
    }

  }
}

