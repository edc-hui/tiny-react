import isSameComponent from "./isSameComponent";
import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

/**
 * 比对组件之间差异的函数
 * @param virtualDOM 最新的虚拟DOM
 * @param oldComponent 旧的组件
 * @param oldDOM 旧的DOM
 * @param container 挂载的父容器
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
    
    if (isSameComponent(virtualDOM, oldComponent)) { // 说明是同一个组件
        updateComponent(virtualDOM, oldComponent, oldDOM, container)
    } else { // 说明是不同的组件，直接将新组件挂载到页面上即可
        mountElement(virtualDOM, container, oldDOM)
    }

}