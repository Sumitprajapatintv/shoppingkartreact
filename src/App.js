import { useState } from 'react';
import './App.css';
import { captureRejections } from 'stream';
const data = [{
  id: 1,
  name: 'GFG T-shirt',
  price: 499,
  image:
    'https://media.geeksforgeeks.org/wp-content/uploads/20230823165506/gfg1.png'
},
{
  id: 2,
  name: 'GFG Bag',
  price: 699,
  image:
    'https://media.geeksforgeeks.org/wp-content/uploads/20230823165553/gfg2.jpg'
},
{
  id: 3,
  name: 'GFG Hoodie',
  price: 799,
  image:
    'https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg'
}
]

function App() {
  return (
    <div className='app'>
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return <div className='header'>

  </div>
}
function Main() {
  const [cart, setCart] = useState([]);
  function handleAddItem(value) {
    setCart((cart) => [...cart, value]);
  }
  console.log(cart);
  return <div className='main'>
    <Kart cart={cart} />
    <ProductList onAddItem={handleAddItem} />
  </div >
}


function ProductList({ onAddItem }) {
  const [item, setItem] = useState(data);
  return <div className='productList'>
    {item.map((item) => <ProductItem item={item} onAddItem={onAddItem} />)}
  </div>
}

function Kart({ cart }) {
  const [count, setCount] = useState(0);
  function onHandleRemove(item) {
    console.log("item", item);
    cart = cart.filter((el) => el?.id !== item.id)
  }
  function onHandleCountInc() {
    setCount((c) => c = c + 1)
  }
  function onHandleCountDec() {
    if (count > 0) setCount((c) => c = c - 1)
  }
  return <div className='kart'>
    <h1>My Cart</h1>
    {cart.map((item) => <CartItem item={item} count={count} onHandleCountInc={onHandleCountInc} onHandleCountDec={onHandleCountDec} />)}
  </div>
}

function CartItem({ count, item, onHandleCountInc, onHandleCountDec, onHandleRemove }) {
  return <div className='cartItem'>
    <img src={item.image} />
    <p>{item.name}</p>
    <p>{item.price}</p>
    <div className='productbtn'>
      <button onClick={onHandleRemove}>Remove Item</button>
      <button onClick={onHandleCountInc}>+</button>
      <span>{count}</span>
      <button onClick={onHandleCountDec}>-</button>
    </div>
  </div>
}


function ProductItem({ item, onAddItem }) {
  function onHandleItem() {
    onAddItem(item);
  }
  return <div className='productItem'>
    <img src={item.image} alt="abc" />
    <span>{item.name}</span>
    <span>{item.price}</span>
    <button onClick={onHandleItem}>Add To Cart</button>
  </div>
}


export default App;
