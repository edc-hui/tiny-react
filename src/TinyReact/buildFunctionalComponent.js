/**
 * 根据函数式组件的虚拟DOM，来返回组件内部的JSX对应的虚拟DOM对象
 * @param virtualDOM 函数式组件的虚拟DOM
 * @returns {*}
 */
export default function buildFunctionalComponent(virtualDOM) {
    // 函数式组件的虚拟DOM的type是一个函数，调用该函数返回的就是函数式组件中return出来的JSX对应的虚拟DOM
    return virtualDOM && virtualDOM.type && virtualDOM.type(virtualDOM.props || {})
}