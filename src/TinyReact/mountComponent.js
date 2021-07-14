import mountNativeElement from "./mountNativeElement";
import isFunctionComponent from "./isFunctionComponent";
import buildFunctionalComponent from "./buildFunctionalComponent";
import isFunction from "./isFunction";
import buildClassComponent from "./buildClassComponent";

/**
 * 将组件的虚拟DOM挂载到container身上
 * @param virtualDOM 组件的虚拟DOM
 * @param container 目标容器
 */
export default function mountComponent(virtualDOM, container) {
    // 由于组件的虚拟DOM的type是函数，首先要获取组件最终返回的jsx，获取组件返回的jsx，那就需要调用组件
    let componentVirtualDOM = null;
    if (isFunctionComponent(virtualDOM)) { // 说明是函数式组件
        // 此处封装buildFunctionalComponent用于 获取函数式组件返回的JSX
        componentVirtualDOM = buildFunctionalComponent(virtualDOM);
    } else { // 说明是类组件
        componentVirtualDOM = buildClassComponent(virtualDOM)
        const component = componentVirtualDOM.component; // 获取到组件的实例
        component && component.componentDidMount(); // 执行组件的生命周期函数
        if (component && component.props && component.props.ref) {
            component.props.ref(component) // 将组件的实例传递给ref属性
        }

    }

    // 判断返回的虚拟DOM是组件还是Native Element
    if (isFunction(componentVirtualDOM)) { // 说明是组件内部调用了另外一个组件的情况
        mountComponent(componentVirtualDOM, container)
    } else {
        mountNativeElement(componentVirtualDOM, container)
    }
}