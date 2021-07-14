import createDOMElement from "./createDOMElement";

/**
 * Native Element的虚拟DOM挂载container容器上的函数
 * @param virtualDOM 要渲染成真实DOM的虚拟DOM
 * @param container 渲染的真实DOM最终要插入在container下面，container就是父节点
 */
export default function mountNativeElement(virtualDOM, container) {
    // 此处封装createDOMElement函数，用于集中处理virtualDOM转化为真实DOM的过程
    const realDOMElement = createDOMElement(virtualDOM)
    realDOMElement._virtualDOM = virtualDOM; // 记录生成真实DOM元素的虚拟DOM
    container.appendChild(realDOMElement); //将生成的真实DOM挂载到container父节点身上
    const component = virtualDOM.component;
    if (component) {
        component.setDOM(realDOMElement)
    }
}