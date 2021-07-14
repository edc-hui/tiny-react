import updateElementNode from "./updateElementNode";
import mountElement from "./mountElement";

/**
 * 根据虚拟DOM来创建真实DOM的函数
 * @param virtualDOM 虚拟DOM
 */
export default function createDOMElement(virtualDOM) {
    let realDOMElement = null;
    if (virtualDOM.type === 'text') { //处理纯文本的情况
        realDOMElement = document.createTextNode(virtualDOM.props.textContent);
    } else { // 处理是标签节点的情况
        realDOMElement = document.createElement(virtualDOM.type); // 创建DOM节点
        // 此处再次封装updateElementNode函数，将当前虚拟DOM身上的props循环添加到对应的真实DOM身上
        updateElementNode(virtualDOM, realDOMElement)
    }
    // 上述操作只是将当前虚拟DOM生成了真实的DOM，当前虚拟DOM的所有子节点好需要循环生成真实的DOM节点
    virtualDOM.children.forEach(childNodeVirtualDOM => {
        mountElement(childNodeVirtualDOM, realDOMElement) // 子节点要挂载到父节点身上，所以父节点就是当前的realDOMElement
    })
    return realDOMElement
}