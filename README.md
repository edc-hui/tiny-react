## 从组件的虚拟DOM身上获取组件返回的JSX对应的虚拟DOM

### 函数式组件

- 调用组件虚拟DOM对象的type函数，并传入组件虚拟DOM的props，以此来获取函数式组件return的jsx对应的虚拟DOM

```javascript
virtualDOM.type(virtualDOM.props || {})
```

### class 组件

- 组件虚拟DOM对象的type函数返回的其实就是组件 class 本身，通过new 实例化组件并传入组件虚拟DOM的props会得到组件的实例，再调用实例身上的render方法 即可得到render函数return的jsx对应的虚拟DOM

```javascript
new virtualDOM.type(virtualDOM.props || {}).render()
```

## 为什么在写react的时候，每个组件开头要导入React

导入React的目的就是，页面中遇到JSX的时候，babel都会将JSX转换成React.createElement的形式