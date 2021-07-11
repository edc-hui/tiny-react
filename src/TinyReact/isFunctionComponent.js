import isFunction from "./isFunction";

/**
 * 判断组件虚拟DOM是类组件还是函数式组件，通过类组件有render方法，函数式组件没有这点区别来进行判断
 * @param virtualDOM 目标虚拟DOM
 * @returns {boolean}
 */
export default function isFunctionComponent(virtualDOM) {
    // 类组件对应虚拟DOM的type是函数，该函数就是组件的实例
    const type = virtualDOM.type;
    return virtualDOM && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
}