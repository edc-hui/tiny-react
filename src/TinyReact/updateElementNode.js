/**
 * 将virtualDOM身上的props添加至生成的真实DOM身上
 * @param virtualDOM 节点的虚拟DOM对象
 * @param realDOMElement virtualDOM对应的真实DOM
 * @param oldVirtualDOM 节点的旧虚拟DOM对象
 */
export default function updateElementNode(virtualDOM, realDOMElement, oldVirtualDOM = {}) {
    const newVirtualDOMProps = virtualDOM.props || {};
    const oldVirtualDOMProps = oldVirtualDOM.props || {};
    // 循环遍历虚拟DOM的props, 处理新增属性以及修改属性的情况
    Object.keys(newVirtualDOMProps).forEach(propName => {
        const newVirtualDOMPropValue = newVirtualDOMProps[propName];
        const oldVirtualDOMPropValue = oldVirtualDOMProps[propName];
        if (propName.slice(0, 2) === 'on') { // 处理标签上绑定事件的情况
            const eventName = propName.toLowerCase().slice(2);
            realDOMElement.addEventListener(eventName, newVirtualDOMPropValue)
            if (oldVirtualDOMPropValue) {
                realDOMElement.removeEventListener(eventName, oldVirtualDOMPropValue)
            }
        } else if (propName === 'value' || propName === 'checked') { // 处理input标签的情况，input的两个值是直接挂载到真实DOM对象身上的
            realDOMElement[propName] = newVirtualDOMPropValue;
        } else if (propName !== 'children') { // 属性名为children的属性不做处理，只是帮使用者用来获取当前节点下面的子节点的
            if (propName === 'className') {
                realDOMElement.setAttribute('class', newVirtualDOMPropValue)
            } else {
                realDOMElement.setAttribute(propName, newVirtualDOMPropValue)
            }
        }
    });

    // 处理属性被删除的情况
    Object.keys(newVirtualDOMProps).forEach(propName => {
        const newVirtualDOMPropValue = newVirtualDOMProps[propName];
        const oldVirtualDOMPropValue = oldVirtualDOMProps[propName];
        if (!newVirtualDOMPropValue) { // 新的虚拟DOM中没有当前属性，说明被删除了，要移除旧的属性
            if (propName.slice(0, 2) === 'on') { // 移除标签上绑定的事件
                const eventName = propName.toLowerCase().slice(2);
                realDOMElement.removeEventListener(eventName, oldVirtualDOMPropValue)
            } else if (propName !== "children") {
                realDOMElement.removeAttribute(propName)
            }
        }
    })

}