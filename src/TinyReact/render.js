import diff from "./diff";

/**
 * 将虚拟DOM渲染成真实的DOM
 * @param virtualDOM 要渲染成真实DOM的虚拟DOM
 * @param container 渲染的真实DOM最终要插入在container下面，container就是父节点
 * @param oldDOM 虚拟DOM变为真实DOM之前的旧DOM节点
 */
export default function render(virtualDOM, container, oldDOM = container.firstChild) {
// 在将虚拟DOM变成真实DOM之前会先将新旧虚拟DOM进行比对更新差异，比对更新差异操作单独封装一个diff来进行处理
    diff(virtualDOM, container, oldDOM)
}