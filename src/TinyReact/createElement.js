/**
 * 创建虚拟DOM的函数
 * @param type 节点类型div/p/h1等，如果是文本的话那么是text
 * @param props 是一个对象用于存储节点的属性
 * @param children 是一个数组用于存储当前节点下面所有的子节点
 * @returns {{children: *[], type, props}} 返回的是一个虚拟DOM对象，三个属性  type、props、children
 */
export default function createElement(type, props, ...children) {
    const childElements = [...children].reduce((result, child) => {
        if (child !== false && child !== true && child !== null) { // 过滤出JSX中的Boolean与null
            if (child instanceof Object) {
                result.push(child)
            } else { // 处理纯文本的情况，纯文本也是节点，对于文本节点其虚拟DOM的格式固定位type=text props是一个包含textContent属性（其属性值就是当前文本）的对象
                result.push(createElement('text', {textContent: child}))
            }
        }
        return result;
    }, []);
    return {
        type,
        props: {...props, children: childElements},// 由于react中可以通过props.children取到当前节点下面的所有的子节点，故需要添加children属性
        children: childElements
    }
}