import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";
import updateElementNode from "./updateElementNode";
import createDOMElement from "./createDOMElement";
import diffComponent from "./diffComponent";
import unmountNode from "./unmountNode";

/**
 * 比对更新新旧虚拟DOM差异函数
 * @param virtualDOM 要渲染成真实DOM的虚拟DOM
 * @param container 渲染的真实DOM最终要插入在container下面，container就是父节点
 * @param oldDOM 虚拟DOM变为真实DOM之前的旧DOM节点
 */
export default function diff(virtualDOM, container, oldDOM) {
    if (!oldDOM) { // 说明virtualDOM要生成的真实DOM节点是一个全新的节点，直接去挂载到真实DOM节点上即可
        mountElement(virtualDOM, container)
    } else { // 存在旧DOM，需要进行新旧虚拟DOM的比对
        const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;


        if (oldVirtualDOM && oldVirtualDOM.type === virtualDOM.type) {// 新旧虚拟DOM类型相同的情况下，说明只是属性或者节点的文本内容更新了


            if (virtualDOM.type === 'text') { // 文本节点的比对
                updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
            } else { // 元素节点的比对
                updateElementNode(virtualDOM, oldDOM, oldVirtualDOM)
            }

            // 处理节点key属性
            let keyedElements = {}
            for (let i = 0; i < oldDOM.childNodes.length; i++) {
                let domElement = oldDOM.childNodes[i]
                if (domElement.nodeType === 1) { // 1 说明是html标签
                    let key = domElement.getAttribute("key")
                    if (key) {
                        keyedElements[key] = domElement
                    }
                }
            }

            const hasNoKey = Object.keys(keyedElements).length === 0

            if (hasNoKey) { // 说明没有带key的
                virtualDOM.children.forEach((childNodeVirtualDOM, index) => {
                    diff(childNodeVirtualDOM, oldDOM, oldDOM.childNodes[index])
                })
            } else { // 说明有带key的元素
                virtualDOM.children.forEach((childNodeVirtualDOM, index) => {
                    const key = childNodeVirtualDOM.props.key;
                    if (key) {
                        const dom = keyedElements[key];
                        if (dom) {
                            if (oldDOM.childNodes[index] && oldDOM.childNodes[index] !== dom) { // 元素的位置的发生了变化
                                oldDOM.insertBefore(dom, oldDOM.childNodes[index])
                            }
                        }
                    } else {
                        mountElement(childNodeVirtualDOM, oldDOM, oldDOM.childNodes[index])
                    }
                })

                // 节点会有删除的情况，发生节点删除的时候是在新旧virtualDOM都是相同类型并且新旧virtualDOM的子节点数量不同的时候，
                // 因为当类型不同的时候，旧节点会直接被新创建出来的节点替换掉，也就不存在新旧子节点数量不一致的问题了
                const oldDOMChildNodes = oldDOM.childNodes;
                if (oldDOMChildNodes.length > virtualDOM.children.length) { // 旧节点数量多于新节点数量
                    if (hasNoKey) { // 没有key属性的话就按照索引来进行删除
                        for (let i = oldDOMChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
                            unmountNode(oldDOMChildNodes[i])
                        }
                    } else {
                        for (let i = 0; i < oldDOMChildNodes.length; i++) {
                            const oldChildKey = oldDOMChildNodes[i]._virtualDOM.props.key;
                            let found = false; // 新DOM里面有没有发现和旧DOM一样的key
                            // 拿老节点的key去新虚拟DOM对象中匹配
                            for (let j = 0; j < virtualDOM.children.length; j++) {
                                if (oldChildKey === virtualDOM.children[j].props.key) {
                                    found = true;
                                    break
                                }
                            }
                            if (!found) { // 说明旧DOM中的key在新DOM中没有，故需要被删除
                                unmountNode(oldDOMChildNodes[i])
                            }
                        }
                    }
                }

            }

        } else if (oldVirtualDOM.type !== virtualDOM.type) { // 新旧虚拟DOM类型不一致，说明旧DOM要被新DOM替换

            if (typeof virtualDOM.type !== 'function') { // 说明虚拟DOM不是组件，直接创建一个全新的DOM来替换老的DOM
                const newRealDOM = createDOMElement(virtualDOM);
                oldDOM.parentNode.replaceChild(newRealDOM, oldDOM);
            } else {
                const oldComponent = oldVirtualDOM && oldVirtualDOM.component
                // 说明虚拟DOM是组件，需要去比对组件的差异
                diffComponent(virtualDOM, oldComponent, oldDOM, container)
            }

        }


    }

}