import TinyReact from "./TinyReact"

const root = document.getElementById("root");

const Heart = () => <span>&hearts;</span>;

class Abc extends TinyReact.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.message}
            </div>
        )
    }
}

class Alert extends TinyReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "default title"
        }
        // 更改 handleChange 方法中的 this 指向 让 this 指向类实例对象
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        // 调用父类中的 setState 方法更改状态
        this.setState({
            title: "changed title"
        })
    }
    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.props.message}</p>
                <button onClick={this.handleChange}>change title</button>
                <Abc message={this.state.title} />
            </div>
        )
    }
}

class DemoRef extends TinyReact.Component {
    handle() {
        let value = this.input.value
        console.log(value)
    }
    render() {
        return (
            <div>
                <input type="text" ref={input => (this.input = input)} />
                <button onClick={this.handle.bind(this)}>按钮</button>
            </div>
        )
    }
}


// 遇到JSX代码,babel会先将JSX转换成虚拟DOM对象
const virtualDOM = (
    <div className="container">
        <h1>你好 Tiny React</h1>
        <h2 data-test="test">(编码必杀技)</h2>
        <div>
            嵌套1 <div>嵌套 1.1</div>
        </div>
        <h3>(观察: 这个将会被改变)</h3>
        {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
        {2 == 2 && <div>2</div>}
        <span>这是一段内容</span>
        <button onClick={() => alert("你好")}>点击我</button>
        <h3>这个将会被删除</h3>
        2, 3
        <input type="text" value="13"/>
        <Heart/>
        <br/>

        <Alert message="惠思雨"/>
    </div>
)

// console.log(virtualDOM, '虚拟DOM啊啊啊啊')

const modifyDOM = (
    <div className="container">
        <h1>你好 Tiny React</h1>
        <h2 data-test="test123">(编码必杀技)</h2>
        <div>
            嵌套1 <div>嵌套 1.1</div>
        </div>
        <h3>(观察: 这个将会被改变)</h3>
        {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
        {2 == 2 && <div>2</div>}
        <button onClick={() => alert("你好!!!!!")}>点击我</button>
        <input type="text" value="13" />
    </div>
)


TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000)
