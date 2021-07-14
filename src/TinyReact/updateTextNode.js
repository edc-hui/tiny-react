/**
 * 更新文本节点的函数
 * @param virtualDOM 新的虚拟DOM
 * @param oldVirtualDOM 旧的虚拟DOM
 * @param oldDOM 旧的DOM元素
 */
export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
    if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) { // 新旧DOM节点的文本内容不同
        oldDOM.textContent = virtualDOM.props.textContent;
    }
    oldDOM._virtualDOM = virtualDOM; // 更新真实DOM身上存储的虚拟DOM
}