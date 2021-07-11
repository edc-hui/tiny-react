/**
 * 判断虚拟DOM的type是否为函数类型
 * @param virtualDOM  目标虚拟DOM
 * @returns {boolean}
 */
export default function isFunction(virtualDOM) {
    return virtualDOM && typeof virtualDOM.type === 'function'
}