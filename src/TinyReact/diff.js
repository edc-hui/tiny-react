import mountElement from "./mountElement";

/**
 * 比对更新新旧虚拟DOM差异函数
 * @param virtualDOM 要渲染成真实DOM的虚拟DOM
 * @param container 渲染的真实DOM最终要插入在container下面，container就是父节点
 * @param oldDOM 虚拟DOM变为真实DOM之前的旧DOM节点
 */
export default function diff(virtualDOM, container, oldDOM) {
    if (!oldDOM) { // 说明virtualDOM要生成的真实DOM节点是一个全新的节点，直接去挂载到真实DOM节点上即可
        mountElement(virtualDOM, container)
    }
}