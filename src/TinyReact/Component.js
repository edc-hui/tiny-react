import diff from "./diff";

export default class Component {
    constructor(props) {
        this.props = props;
    }

    setState(state) {
        // 先更新组件的state值
        this.state = {
            ...this.state,
            ...state
        }
        // 调用子类的render方法来获取状态更新后的虚拟DOM
        const newVirtualDOM = this.render();
        const oldDOM = this.getDOM();
        const container = oldDOM.parentNode;
        diff(newVirtualDOM, container, oldDOM) // 调用diff方法更新视图
    }

    setDOM(dom) {
        this._dom = dom
    }

    getDOM() {
        return this._dom
    }

    updateProps(props) {
        this.props = props
    }

    // 生命周期函数
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps != this.props || nextState != this.state
    }
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, preState) {}
    componentWillUnmount() {}

}