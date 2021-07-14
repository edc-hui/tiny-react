/**
 * 判断是否是同一个组件
 * @param virtualDOM 最新的虚拟DOM对象
 * @param oldComponent 旧组件
 */
export default function isSameComponent(virtualDOM, oldComponent){
    // 类组件虚拟DOM对象type存储的是类组件的构造函数
    return virtualDOM && virtualDOM.type === oldComponent.constructor
}