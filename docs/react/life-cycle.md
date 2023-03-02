# react 生命周期

## 简述 React 的生命周期

### 挂载

1. constructor 可以进行 state 和 props 的初始化

2. render

3. componentDidMount 第一次渲染后调用，可以访问 DOM，进行异步请求和定时器、消息订阅

### 更新

1. shouldComponentUpdate 返回一个布尔值，默认返回 true (当组件的 props 或 state 变化会触发更新)

2. render

3. componentDidUpdate 在组件完成更新后调用

### 卸载

1. componentWillUnmount 组件从 DOM 中被移除的时候调用

### React16 废弃的生命周期有 3 个 will：

- componentWillMount

- componentWillReceiveProps

- componentWillUpdate

废弃的原因：是在 React16 的 Fiber 架构中，调和过程会多次执行 will 周期，不再是一次执行，失去了原有的意义。此外，多次执行，在周期中如果有 setState 或 dom 操作，会触发多次重绘，影响性能，也会导致数据错乱。

### React16 的 2 个新的生命周期：

- getDerivedStateFromProps

- getSnapshotBeforeUpdate

[参考](https://cloud.tencent.com/developer/article/1769282)

## 详解生命周期：7 种方法

### 创建阶段：只触发一次

- defaultProps
- constructor 中拿到 props

- this.state = {}

- componentWillMount

  - 组件将要被创建 等同于 vue 中的 create → UNSAFE_componentWillMount
  - 被 getDerivedStateFromProps(props, state)代替

- render 创建虚拟 DOM

- componentDidMount
  - 组件渲染到页面上了 等同于 vue 中的 mounted

### 运行阶段：根据 state 或者 props 的改变触发 0 次或多次

- componentWillReceiveProps

  - prop (更新后)时被调用 getDerivedStateFromProps → UNSAFE_componentWillReceiveProps

- shouldComponentUpdate

  - 接收到新的 state 时被调用 或者 componentWillReceiveProps 之后也会被调用
  - 在这里会被询问是否真的要更新组件，更新话走 componentWillUpdate，不更新的话，就不动。

- componentWillUpdate

  - 有了 getSnapshotBeforeUpdate 就没有了
  - shouldComponentUpdate 确认需要更新后被调用 → NSAFE_componentWillReceiveProps

- render

  - 重新渲染虚拟 DOM

- componentDidUpdate

  - 组件渲染到页面上了

### 销毁阶段：只触发一次

- componentWillUnmount
  - 在组件从 DOM 中移除之前立刻被调用。

```

 这里主要讲解生命周期    https://reactjs.org/docs/react-component.htm

 React 官方正式发布了 v16.3 版本。在这次的更新中，除了前段时间被热烈讨论的新 Context API 之外，
 新引入的两个生命周期函数 getDerivedStateFromProps，getSnapshotBeforeUpdate
 以及在未来 v17.0 版本中即将被移除的三个生命周期函数 componentWillMount，componentWillReceiveProps，componentWillUpdate


 UNSAFE_xxxx  遗留方法  应该尽力不要去用    React 16.9之后有UNSAFE_前缀的名字

```

```jsx
import React from "react";
import PropTypes from "prop-types";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initCount,
    };
  }

  /*
        react组件中使用defaultProps给组件设置默认值
        或者在组件外部写类的静态方法
        Counter.defaultProps = {}

        */
  static defaultProps = {
    initCount: 0,
  };

  /*
       react组件中使用propTypes给组件设置默认值的数据类型
       先安装prop-types  这个包是react15.x以后抽离出来的
       */
  static propTypes = {
    initCount: PropTypes.number,
  };

  UNSAFE_componentWillMount() {}

  render() {
    return (
      <div>
        <input
          type="button"
          value="我是counter子组件+1"
          id="btn"
          onClick={this.increment}
        />
        {/*
                        props是不能修改的，所以把props中的值给state，然后将state赋值到页面中
                        */}
        {/*<p>当前值：{this.props.initCount}</p>*/}
        <p ref="countDom">当前值：{this.state.count}</p>
      </div>
    );
  }

  componentDidMount() {
    let btn = document.getElementById("btn");
    // let btn1 = window.btn;
    // console.log(btn === btn1)//true

    //给元素绑定点击事件  方式一：
    /* let that = this;
                 btn.onclick = function () {
                         // that.props.initCount++   //initCount是只读的，不能这样修改
                         // ++that.state.count;   //这样是不会生效的需要使用that.setState
                         that.setState({
                                 count: ++that.state.count  //注意：这里使用that.state.count++   也是无效的哦
                         })
                 }*/
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("Props有改变");
    // console.log(this.props.initCount);//这个props还是之前的
    console.log(nextProps.initCount); //这个props才是最新的
    this.setState({
      count: nextProps.initCount,
      ...nextProps,
    });
  }

  /*
   * 判断是否需要跟新组件
   * 这里必须返回一个布尔值
   * 如果返回false，那么组件就不会继续更新，但是state中的值还是会改变的。
   * */
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate触发了");
    // console.log("shouldComponentUpdate" + this.state.count);
    /*
     * 这里是判断更新之前的值，为3、5为基数的时候%2为真，返回true，这样页面更新为4、6
     *
     * 这里的state是更新之前的初始值
     *
     * 也可以通过nextProps  nextState  拿到最新的值判断
     *
     * */
    /* if (this.state.count % 2) {
                         return true
                 } else {
                         return false
                 }*/
    // console.log(nextState);

    return true;

    if (nextState.count % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * 这里的state也是上一个值，不是最新值
   * dom也没有更新，你获取dom上的数据也都是旧的
   * 也是通过nextProps, nextState  获取最新值
   *
   * */
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // console.log(this.state.count);
    // console.log(nextState.count);
    // console.log(this.state.count);
    // console.log(this.refs.countDom);//和vue中一样，react也有ref属性。
  }

  /*
   * 组件完成渲染
   * 这里面的东西就全是最新的了，和页面保持一致
   * */
  componentDidUpdate() {}

  /*
   * 这里要使用箭头函数，用普通函数的话，里面的this不是实例对象,拿不到setState方法
   * */
  increment = () => {
    // console.log("increment" + this.state.count)
    this.setState({
      // count: ++this.state.count    //有效
      // count: this.state.count++    //无效
      count: this.state.count + 1, //有效
    });

    //调用父组件的求和方法
    this.props.sum(this.state.count + 1);

    // console.log("increment  setState" + this.state.count)
  };
}

/*
 * 也可以把默认值写在这里，这是类的静态方法：
 * */
// Counter.defaultProps = {}

export default Counter;
```
