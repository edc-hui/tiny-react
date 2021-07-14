/**
 * 根据class类型组件的虚拟DOM 返回该组件内部render函数中return出来的JSX对应的虚拟DOM
 * @param virtualDOM  class类型组件的虚拟DOM
 */
export default function buildClassComponent(virtualDOM) {
    // 实例化类组件虚拟DOM的type函数可以得到class组件的实例
    const component = new virtualDOM.type(virtualDOM.props || {});
    const newVirtualDOM = component.render()
    newVirtualDOM.component = component; // 类组件生成的DOM身上要挂载类组件自身
    return newVirtualDOM
}