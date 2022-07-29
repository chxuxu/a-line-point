import {IStyles,EasyType} from "./data";

let stringUnit = /^\d+[a-z]+$/;
const updateTime = 1000 / 60
const rAF = window.requestAnimationFrame || function (cb) {
  setTimeout(cb, updateTime)
}

export const tweenFuns = {
  easeInSine: function (x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
  },
  easeOutSine: function (x: number): number {
    return Math.sin((x * Math.PI) / 2);
  },
  easeInOutSine: function (x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  },
  easeInQuad: function (x: number): number {
    return x * x;
  },
  easeOutQuad: function (x: number): number {
    return 1 - (1 - x) * (1 - x);
  },
  easeInOutQuad: function (x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  },
  ///////////////////////
  easeInCirc: function (x: number): number {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  },
  easeOutCirc: function (x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  easeInOutCirc: function (x: number): number {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  },
  easeInBack: function (x: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: function (x: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },
  easeInOutBack: function (x: number): number {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  ////////////////////////////////
  easeInElastic: function (x: number): number {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
      ? 0
      : x === 1
        ? 1
        : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: function (x: number): number {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
      ? 0
      : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: function (x: number): number {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
      ? 0
      : x === 1
        ? 1
        : x < 0.5
          ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
          : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  },
  easeInBounce: function (x: number): number {
    return 1 - this.easeOutBounce(1 - x);
  },
  easeOutBounce: function (x: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  },
  easeInOutBounce: function (x: number): number {
    return x < 0.5
      ? (1 - this.easeOutBounce(1 - 2 * x)) / 2
      : (1 + this.easeOutBounce(2 * x - 1)) / 2;
  }
};

//16进制颜色转化为rgb格式的颜色，便于计算动画变化值
export function colorRgb(color, asArray = false) {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    if (asArray) {
      return colorChange;
    } else {
      return "RGB(" + colorChange.join(",") + ")";
    }

  } else {
    return color;
  }
}
//设置样式信息到指定的DOM元素，每一个动画瞬间都会重新赋值，渲染动画效果。
export function setStyleToElement(el, styleObj: IStyles) {
  if (!el) {
    return;
  }
  for (let key in styleObj) {
    let val = styleObj[key];
    if (key == "color" || key == "backgroundColor") {
      if (typeof val == "string") {
        el.style[key] = val;
      } else {
        el.style[key] = "rgba(" + val.join(",") + ")";
      }
    } else if (key.indexOf("scale") == 0
      || key.indexOf("translate") == 0
      || key.indexOf("skew") == 0) {
      if (typeof val == "number") {
        el.style.transform = key + "(" + val + ")";
      } else {
        el.style.transform = key + "(" + val.join(",") + ")";
      }
    } else if (key.indexOf("rotate") == 0) {
      if (typeof val == "number") {
        el.style.transform = key + "(" + val + "deg)";
      } else {
        val = val.map(item => item + "deg");
        el.style.transform = key + "(" + val.join(",") + ")";
      }
    } else if (["top", "left", "bottom", "right", "height", "width"].indexOf(key) >= 0) {
      if (stringUnit.test(val + "")) {
        el.style[key] = val;
      } else {
        el.style[key] = val + "px";
      }
    } else {
      el.style[key] = val + "px";
    }
  }
}
//设置样式信息到指定的threejs 3d引擎的相机对象，通过每个动画瞬间相机位置不同，表现电影镜头动画。
export function setStyleToThreeJSObj(camera, valsObj) {
  for (let key in valsObj) {
    if (key == "position") {
      let pos = valsObj[key];
      if (Array.isArray(pos)) {
        for (let i = 0; i < pos.length; i++) {
          camera.position.x = pos[0] || 0;
          camera.position.y = pos[1] || 0;
          camera.position.z = pos[2] || 0;
        }
      } else {
        for (let k in pos) {
          camera.position[k] = pos[k];
        }
      }

    }
    if (key == "lookAt") {
      let val = valsObj[key];
      if (Array.isArray(val)) {
        camera.lookAt(val[0] || 0, val[1] || 0, val[2] || 0);
      } else {
        camera.lookAt(val.x || 0, val.y || 0, val.z || 0);
      }
    }
  }
}
//设置样式到目标对象
export function setStylesToTarget(target, valsObj) {
  try {
    let clsName = target?.constructor?.name;
    //是 threejs 3d引擎的 相机和灯光对象
    if (clsName.indexOf("Camera") > 0 || clsName.indexOf("Light") > 0) {
      setStyleToThreeJSObj(target, valsObj);
    } else {
      if (target.nodeType == 1) {
        setStyleToElement(target, valsObj);
      }
    }
  } catch (err) {
    console.warn("更新样式失败", target, valsObj);
  }

}

export function getCurrentStyles(startStyles, endStyles, during, position = 0, fnName?) {
  const currentStyles: any = {};
  for (let key in startStyles) {
    
    const updateCount = during / updateTime
    const perUpdateDistance = 1 / updateCount
    let fn = tweenFuns[fnName] || tweenFuns.easeInSine;
    
    if(Array.isArray(startStyles[key])){
      let arr1=startStyles[key];
      let arr2=endStyles[key];
      if(arr1&&arr2){
        let arr=new Array(4);
        if(arr1.length>0&&arr2.length>0){
          arr[0]=arr1[0] + (arr2[0] - arr1[0]) * fn(position);
        }
        if(arr1.length>1&&arr2.length>1){
          arr[1]=arr1[1] + (arr2[1] - arr1[1]) * fn(position);
        }
        if(arr1.length>2&&arr2.length>2){
          arr[2]=arr1[2] + (arr2[2] - arr1[2]) * fn(position);
        }
        if(arr1.length>3&&arr2.length>4){
          arr[3]=arr1[3] + (arr2[3] - arr1[3]) * fn(position);
        }else{
          arr[3]=1;
        }
        currentStyles[key]=arr;
      }      
    }else{
      const changeValue = endStyles[key] - startStyles[key];
      currentStyles[key] = startStyles[key] + changeValue * fn(position);
    }
    
    position += perUpdateDistance;
  }
  return { currentStyles, position }
}
export function tween(startValue, endValue, during, fnName, stepCb) {
  const changeValue = endValue - startValue
  const updateCount = during / updateTime
  const perUpdateDistance = 1 / updateCount
  let position = 0
  let fn = tweenFuns[fnName] || tweenFuns.easeInSine;
  return new Promise(resolve => {
    function step() {
      const state = startValue + changeValue * fn(position)
      stepCb(state)
      position += perUpdateDistance;

      if (position < 1) {
        rAF(step);
      } else {
        resolve({
          startValue, endValue
        });
      }
    }
    step();
  })
}
