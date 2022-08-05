
/**
 * 取待验证的样式列表
 * @param  {String} 样式，多个以空格分隔
 * @return {Array}  样式列表
 */
const getClassList = (function () {
  var _reg = /\s+/;
  return function (_class) {
    _class = (_class || '').trim();
    return !!_class ? _class.split(_reg) : null;
  };
})();

const processClassName = function (element: HTMLElement, type: string, className: string, deled?: string) {
  if (type == 'replace') {
    processClassName(
      element, 'remove', className
    );
    processClassName(
      element, 'add', deled
    );
    return;
  }
  let clsList = getClassList(className);
  for (let i = 0; i < clsList.length; i++) {
    let _clazz = clsList[i];
    element.classList[type](_clazz);
  }
}

/**
* 格式化样式属性名称
* border-width -> borderWidth
* @param  {String} 样式样式名
* @return {String} 格式化后样式名
*/
const formatStyleName = (function(){
  var _reg = /-([a-z])/g;
  return function(_name){
      _name = _name||'';
      return _name.replace(_reg,function($1,$2){
          return $2.toUpperCase();
      });
  };
})();

/**
 * 注入样式
 * @param  {Node}   样式节点
 * @param  {String} 样式内容
 * @return {Void}
 */
 const injectCSSText = function (styleNode, css) {
  styleNode.textContent = css;
};


export const addClassName = function (element, className) {
  if (!className || !element) {
    return;
  }
  if (!!element) {
    processClassName(
      element, 'add', className
    );
  }
}

export const delClassName = function (element, className) {
  if (!!element) {
    processClassName(
      element, 'remove', className
    );
  }
}

export const replaceClassName = function (element, del, add) {
  if (!!element) {
    processClassName(
      element, 'replace',
      del, add
    );
  }
}

/* 
* @param  {String} arg0 - 样式内容
* @return {Node}          样式节点
*/
export const addStyle = (function () {
  var _reg = /[\s\r\n]+/gi;
  return function (_css) {
    _css = (_css || '').replace(_reg, ' ').trim();
    var _node = null;
    if (!!_css) {
      _node = document.createElement('style');
      document.head.appendChild(_node);
      injectCSSText(
        _node, _css
      );
    }
    return _node;
  };
})();

/**
 * 设置样式值
 */
export const setStyleValue = function(element,name,value){
  element.style[formatStyleName(name)] = value;
}