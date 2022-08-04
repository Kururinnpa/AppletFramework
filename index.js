const data = {
    items: ['aaa', 'bbb', 'ccc']
}

let jsx =
    <div id="main">
        <ul className="list">
            {data.items.map((item, id) =>
                <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(id)}>{item}</li>)
            }
        </ul >
        <Pic id="pic" src="pic.png" size="300"></Pic>
        <List id="list" textColor={'#fff'} />
    </div>;

render(jsx, document.getElementById('root'));
