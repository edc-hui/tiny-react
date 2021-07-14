/**
 * 更新组件之间差异的函数
 * @param virtualDOM 最新的虚拟DOM
 * @param oldComponent 旧的组件
 * @param oldDOM 旧的DOM
 * @param container 挂载的父容器
 */
import diff from "./diff";

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
    oldComponent.componentWillReceiveProps(virtualDOM.props); // 执行componentWillReceiveProps钩子函数
    const prevProps = oldComponent.props; // 旧组件身上的props
    oldComponent.componentWillUpdate(virtualDOM.props)

    // 更新组件的props
    oldComponent.updateProps(virtualDOM.props);

    const newVirtualDOM = oldComponent.render(); // 获取组件更新props之后的最新的虚拟DOM

    newVirtualDOM.component = oldComponent; // 生成新的虚拟DOM之后，再次将组件的实例挂载到新生成的虚拟DOM对象上面

    diff(newVirtualDOM, container, oldDOM)

    oldComponent.componentDidUpdate(prevProps)

}