/**
 * 将virtualDOM身上的props添加至生成的真实DOM身上
 * @param virtualDOM 节点的虚拟DOM对象
 * @param realDOMElement virtualDOM对应的真实DOM
 */
export default function updateElementNode(virtualDOM, realDOMElement) {
    const newVirtualDOMProps = virtualDOM.props || {};
    // 循环遍历虚拟DOM的props
    Object.keys(newVirtualDOMProps).forEach(propName => {
        const newVirtualDOMPropValue = newVirtualDOMProps[propName];
        if (propName.slice(0, 2) === 'on') { // 处理标签上绑定事件的情况
            const eventName = propName.toLowerCase().slice(2);
            realDOMElement.addEventListener(eventName, newVirtualDOMPropValue)
        } else if (propName === 'value' || propName === 'checked') { // 处理input标签的情况，input的两个值是直接挂载到真实DOM对象身上的
            realDOMElement[propName] = newVirtualDOMPropValue;
        } else if (propName !== 'children') { // 属性名为children的属性不做处理，只是帮使用者用来获取当前节点下面的子节点的
            if (propName === 'className') {
                realDOMElement.setAttribute('class', newVirtualDOMPropValue)
            } else {
                realDOMElement.setAttribute(propName, newVirtualDOMPropValue)
            }
        }
    })
}