/**
 * 卸载节点的函数
 * @param node 目标节点DOM对象
 */
export default function unmountNode(node) {
    const nodeVirtualDOM = node._virtualDOM;
    if (nodeVirtualDOM.type === 'text') {
        node.remove(); // 文本节点直接删除
    } else {
        if (nodeVirtualDOM.component) { // 说明节点是由组件生成的
            nodeVirtualDOM.component.componentWillUnmount()
        }

        if (nodeVirtualDOM.props && nodeVirtualDOM.props.ref) {
            nodeVirtualDOM.props.ref(null);  // ref属性控制
        }

        Object.keys(nodeVirtualDOM.props).forEach(propsName => {
            if (propsName.slice(0, 2) === 'on') { // 说明有绑定事件，需要进行解绑
                const eventName = propsName.toLowerCase().slice(2);
                const eventCb = nodeVirtualDOM.props[propsName];
                node.removeEventListener(eventName, eventCb)
            }
        })

        // 递归删除当前节点下面的所有子节点
        if (node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
                unmountNode(node.childNodes[i])
                i--;
            }
        }
        node.remove(); // 删除节点
    }
}