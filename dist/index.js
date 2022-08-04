const data = {
  items: ['aaa', 'bbb', 'ccc']
};
let jsx = createElement("div", {
  id: "main"
}, createElement("ul", {
  className: "list"
}, data.items.map((item, id) => createElement("li", {
  className: "item",
  style: {
    background: 'blue',
    color: 'pink'
  },
  onClick: () => alert(id)
}, item))), createElement(Pic, {
  id: "pic",
  src: "pic.png",
  size: "300"
}), createElement(List, {
  id: "list",
  textColor: '#fff'
}));
render(jsx, document.getElementById('root'));