import Actor from "./Actor";
import { IActor, IPoint, ILine, IScene, ILineConfig, IStage, ATF, ISceneOptions } from "./data";
import Line from "./Line";
import Point from "./Point";
import Stage from "./Stage";
import { getCurrentStyles, setStylesToTarget, rAF } from "./utils";
import { ClassNamePre } from "./constant";
import { addClassName, setStyleValue,delClassName } from "./dom";
export default class Scene implements IScene {
  index: number = 0;
  stage: IStage = null;
  lines: Array<ILine> = [];
  next: IScene = null;
  prev: IScene = null;
  target: HTMLElement | null = null;
  options: ISceneOptions = {
    showFn: "ease-in",
    hideFn: "ease-out",
    duration: 500,
    delay: 1000,
    shpos: "lr"
  };
  constructor(target,options?: ISceneOptions) {
    if (options) {
      this.target =target;
      Object.assign(this.options, options);
    }
    addClassName(this.target, ClassNamePre + "scene");
    addClassName(this.target, "z-hide");
  }
  _onInit(options?:any) {
    if(options.show){
      delClassName(this.target, "z-hide");
    }
  }
  private getShowStyles(shpos) {
    const target = this.target,
      stageWidth = this.stage.target.clientWidth,
      stageHeight = this.stage.target.clientHeight;
    const beginStyles: any = {};
    const endStyles: any = {};
    switch (shpos) {
      case "lr":
        beginStyles.right = stageWidth + 5;
        endStyles.right = 0;
        break;
      case "bt":
        beginStyles.top = stageHeight + 5;
        endStyles.top = 0;
        break;
      case "tb":
        beginStyles.bottom = stageHeight + 5;
        endStyles.bottom = 0;
        break;
      case "rl":
        beginStyles.left = stageWidth + 5;
        endStyles.left = 0;
        break;
      case "center":
        beginStyles.width = 10;
        beginStyles.height = 10;
        beginStyles.top = stageHeight / 2 - 5;
        beginStyles.left = stageWidth / 2 - 5;
        endStyles.width = target.clientWidth;
        endStyles.height = target.clientHeight;
        endStyles.top = 0;
        endStyles.left = 0;
        break;
      case "cover":
        beginStyles.scale = 100;
        beginStyles.opacity = 0;
        endStyles.scale = 1;
        endStyles.opacity = 1;
        break;

    }

    return { beginStyles, endStyles };
  }

  private getHideStyles(shpos) {
    const target = this.target,
      stageWidth = this.stage.target.clientWidth,
      stageHeight = this.stage.target.clientHeight;
    const beginStyles: any = {};
    const endStyles: any = {};
    switch (shpos) {
      case "lr":
        beginStyles.left = 0;
        endStyles.left = stageWidth + 5;
        break;
      case "bt":
        beginStyles.bottom = 0;
        endStyles.bottom = stageHeight + 5;
        break;
      case "tb":
        beginStyles.top = 0
        endStyles.top = stageHeight + 5;
        break;
      case "rl":
        beginStyles.right = 0;
        endStyles.right = stageWidth + 5;
        break;
      case "center":
        endStyles.width = 10;
        endStyles.height = 10;
        endStyles.top = stageHeight / 2 - 5;
        endStyles.left = stageWidth / 2 - 5;
        endStyles.opacity = 0;
        beginStyles.width = target.clientWidth;
        beginStyles.height = target.clientHeight;
        beginStyles.top = 0;
        beginStyles.left = 0;
        beginStyles.opacity = 1;
        break;
      case "cover":
        beginStyles.scale = 1;
        beginStyles.opacity = 1;
        endStyles.scale = 100;
        endStyles.opacity = 0;
        break;

    }

    return { beginStyles, endStyles };
  }
  //添加时间线
  addLine(newLine: ILine) {
    newLine.scene = this;
    this.lines.push(newLine);
  }
  //根据配置或示例构建时间线
  newLine(config: ILineConfig) {
    let line = new Line();
    if (config.points) {
      config.points.map((point: IPoint) => {
        if (point instanceof Point) {
          line.addPoint(point);
        } else {
          let newP = new Point(point.time);
          line.addPoint(newP);
        }
      })
    }
    if (config.points) {
      config.actors.map((actor: IActor) => {
        if (actor instanceof Actor) {
          line.actors.push(actor)
        } else {
          line.actors.push(new Actor(actor.target, actor.styles))
        }
      });
    }
    this.addLine(line);
  }
  //播放时间线
  play() {
    this.lines.map(line => {
      line.play();
    });
  }

  //显示场景
  show(shpos?:string,toBegin?:boolean) {
    console.log("showshowshowshow");
    const during = this.options.duration;
    let _positon = 0;//动画位置标记，最大为1，表示动画结束
    let _this: IScene = this;
    const stylesMap = this.getShowStyles(shpos||this.options.shpos);
    setStyleValue(this.target, "z-index", 1001);
    delClassName(this.target, "z-hide");
    let _run = function () {
      if (_positon < 1) {
        //利用缓动函数，获取关键帧上的所有演员的实时样式属性，根据此属性重新赋值样式，实现动画效果
        let { currentStyles, position } = getCurrentStyles(stylesMap.beginStyles, stylesMap.endStyles, during, _positon);
        _positon = position;
        setStylesToTarget(_this.target, currentStyles);
        rAF(_run);
      } else {
        //显示完成后，由于JS语言数字误差，结束的样式值不是最初设置的值，这里用最初设置的值重新赋值，避免动画抖动。
        setStylesToTarget(_this.target, stylesMap.endStyles);
        _this.play();//播放场景里面的动画
        _this.options.onShow&&_this.options.onShow(_this);
        if(toBegin){
          if (_this.prev && _this.stage.isAuto) {
            window.setTimeout(() => {
              _this.prev.show();//自动显示下一个场景
              _this.hide(_this.prev.options.shpos);//隐藏方式由显示的场景决定
            }, _this.options.delay || 0);
          }
        }else{
          if (_this.next && _this.stage.isAuto) {
            window.setTimeout(() => {
              _this.next.show();//自动显示下一个场景
              _this.hide(_this.next.options.shpos);//隐藏方式由显示的场景决定
            }, _this.options.delay || 0);
          }
        }
      }
    }
    _run();
  }

  //显示场景
  hide(shpos) {
    const during = this.options.duration;
    let _positon = 0;//动画位置标记，最大为1，表示动画结束
    let _this: IScene = this;
    const stylesMap = this.getHideStyles(shpos||this.options.shpos);
    setStyleValue(this.target, "z-index", 1000);
    let _run = function () {
      if (_positon < 1) {
        //利用缓动函数，获取关键帧上的所有演员的实时样式属性，根据此属性重新赋值样式，实现动画效果
        let { currentStyles, position } = getCurrentStyles(stylesMap.beginStyles, stylesMap.endStyles, during, _positon);
        _positon = position;
        setStylesToTarget(_this.target, currentStyles);
        rAF(_run);
      } else {
        _this.options.onHide&&_this.options.onHide(_this);
        //显示完成后，由于JS语言数字误差，结束的样式值不是最初设置的值，这里用最初设置的值重新赋值，避免动画抖动。
        //setStylesToTarget(_this.target, stylesMap.endStyles);
      }
    }
    _run();
  }

}