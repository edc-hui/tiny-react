import mountNativeElement from "./mountNativeElement";

/**
 * 虚拟DOM挂载container容器上的函数
 * @param virtualDOM 要渲染成真实DOM的虚拟DOM
 * @param container 渲染的真实DOM最终要插入在container下面，container就是父节点
 */
export default function mountElement(virtualDOM, container) {
    // 由于虚拟DOM的类型有两种：一种是类 Component , 一种是原生标签类型 Native Element
    // Native Element 直接转换成真实DOM，并插入到container容器节点上面
    // 类 Component 要先转换为Native Element，然后再进行后续挂载Native Element操作
    // 封装 mountNativeElement 用于挂载Native Element的虚拟DOM
    if (typeof virtualDOM.type !== 'function') { // react中类组件和函数组件的虚拟DOM的type均为function
        mountNativeElement(virtualDOM, container)
    }
}