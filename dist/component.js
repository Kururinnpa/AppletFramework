var worker;

if (typeof Worker !== "undefined") {
  if (typeof worker == "undefined") {
    worker = new Worker("logic.js");
  }

  worker.onmessage = e => {
    var edata = JSON.parse(e.data);

    if ("listdel" in edata) {
      ListDel.publish(edata);
    } else if ("listadd" in edata) {
      ListAdd.publish(edata);
    } else if ("sizeinc" in edata) {
      SizeInc.publish(edata);
    } else if ("sizedec" in edata) {
      SizeDec.publish(edata);
    }
  };
} else {
  alert("抱歉，你的浏览器不支持 Web Workers...");
}

const SizeInc = {
  list: [],

  //订阅
  subscribe(fun) {
    this.list.push(fun);
  },

  //发布
  publish(arg) {
    this.list.forEach(fun => {
      fun && fun(arg);
    });
  }

};
const SizeDec = {
  list: [],

  //订阅
  subscribe(fun) {
    this.list.push(fun);
  },

  //发布
  publish(arg) {
    this.list.forEach(fun => {
      fun && fun(arg);
    });
  }

};
const ListAdd = {
  list: [],

  //订阅
  subscribe(fun) {
    this.list.push(fun); // 函数存在则调用
  },

  //发布
  publish(arg) {
    this.list.forEach(fun => {
      fun && fun(arg);
    });
  }

};
const ListDel = {
  list: [],

  //订阅
  subscribe(fun) {
    this.list.push(fun);
  },

  //发布
  publish(arg) {
    this.list.forEach(fun => {
      fun && fun(arg);
    });
  }

};

function Item(props) {
  return createElement("li", {
    className: "item",
    style: props.style
  }, " ", props.children, " ", createElement("a", {
    href: "#",
    onClick: props.onRemoveItem
  }, " X "));
}

class Pic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 200,
      src: "pic.png"
    };

    if ("src" in this.props) {
      this.state.src = this.props.src;
    }

    if ("size" in this.props) {
      this.state.size = parseInt(this.props.size);
    }

    SizeInc.subscribe(this.sizeIncrease.bind(this));
    SizeDec.subscribe(this.sizeDecrease.bind(this));
  }
  /**
   * 放大图片
   * @param {*} edata 
   */


  sizeIncrease(edata) {
    console.log(this.state.size);

    if (typeof this.props.id == "undefined" || this.props.id == edata["sizeinc"]) {
      let tmpSize = this.state.size + 100;
      this.setState({
        size: tmpSize
      });
      console.log(tmpSize);
    }
  }
  /**
   * 缩小图片
   * @param {*} edata 
   */


  sizeDecrease(edata) {
    if (typeof this.props.id == "undefined" || this.props.id == edata["sizedec"]) {
      if (this.state.size > 100) {
        let tmpSize = this.state.size - 100;
        this.setState({
          size: tmpSize
        });
      }
    }
  }

  render() {
    return createElement("div", null, createElement("img", {
      style: "margin:20px",
      src: this.state.src,
      alt: "logo",
      width: this.state.size,
      height: this.state.size
    }), createElement("div", null, createElement("button", {
      onclick: () => {
        let tmp = {
          sizeinc: this.props.id
        };
        worker.postMessage(JSON.stringify(tmp));
      },
      style: "margin-left:20px"
    }, "Zoom in"), createElement("button", {
      onclick: () => {
        let tmp = {
          sizedec: this.props.id
        };
        worker.postMessage(JSON.stringify(tmp));
      },
      style: "margin-left:20px"
    }, "Zoom out")));
  }

}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        text: 'aaa',
        color: 'pink'
      }, {
        text: 'bbb',
        color: 'orange'
      }, {
        text: 'ccc',
        color: 'yellow'
      }]
    };
    ListAdd.subscribe(this.handleAdd.bind(this));
    ListDel.subscribe(this.handleItemRemove.bind(this));
  }
  /**
   * 删除元素
   * @param {*} edata 
   */


  handleItemRemove(edata) {
    if (typeof this.props.id == "undefined" || this.props.id == edata["listdel"]) {
      this.setState({
        list: this.state.list.filter((item, i) => i !== edata["index"])
      });
    }
  }
  /**
   * 增加元素
   * @param {*} edata 
   */


  handleAdd(edata) {
    if (typeof this.props.id == "undefined" || this.props.id == edata["listadd"]) {
      this.setState({
        list: [...this.state.list, {
          text: edata["value"]
        }]
      });
    }
  }

  render() {
    return createElement("div", null, createElement("ul", {
      className: "list"
    }, this.state.list.map((item, index) => {
      return createElement(Item, {
        style: {
          background: item.color,
          color: this.props.textColor
        },
        onRemoveItem: () => {
          let tmp = {
            listdel: this.props.id,
            index: index
          };
          worker.postMessage(JSON.stringify(tmp));
        }
      }, item.text);
    })), createElement("div", null, createElement("input", {
      ref: ele => {
        this.ref = ele;
      }
    }), createElement("button", {
      onclick: () => {
        let tmp = {
          listadd: this.props.id,
          value: this.ref.value
        };
        worker.postMessage(JSON.stringify(tmp));
      }
    }, "add")));
  }

}