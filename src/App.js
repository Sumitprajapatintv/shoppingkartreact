import { useState } from 'react';
import './App.css';

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
    <h1>Shopping Kart</h1>
  </div>
}

function Main() {
  const [cart, setCart] = useState([]);

  function handleAddItem(value) {
    const itemInCart = cart.find(item => item.id === value.id);
    if (!itemInCart) {
      setCart([...cart, { ...value, count: 1 }]);
    } else {
      alert("Item already added");
    }
  }

  console.log(cart);
  return <div className='main'>
    <Kart cart={cart} onHandleCart={setCart} />
    <ProductList onAddItem={handleAddItem} />
  </div>
}

function ProductList({ onAddItem }) {
  return <div className='productList'>
    {data.map(item => (
      <ProductItem key={item.id} item={item} onAddItem={onAddItem} />
    ))}
  </div>
}

function Kart({ cart, onHandleCart }) {
  function incrementCount(itemId) {
    onHandleCart(cart.map(item =>
      item.id === itemId ? { ...item, count: item.count + 1 } : item
    ));
  }

  function decrementCount(itemId) {
    onHandleCart(cart.map(item =>
      item.id === itemId && item.count > 0 ? { ...item, count: item.count - 1 } : item
    ));
  }

  function handleRemove(itemId) {
    onHandleCart(cart.filter(item => item.id !== itemId));
  }
  const totalAmount = cart.reduce(function (acc, obj) { return acc + obj.price * obj.count; }, 0);

  return <div className='kart'>
    <h1>My Cart</h1>
    {cart.map(item => (
      <CartItem
        key={item.id}
        item={item}
        onHandleRemove={() => handleRemove(item.id)}
        onIncrementCount={() => incrementCount(item.id)}
        onDecrementCount={() => decrementCount(item.id)}
      />
    ))}

    <h1>Total Amount : {totalAmount}</h1>
  </div>
}

function CartItem({ item, onHandleRemove, onIncrementCount, onDecrementCount }) {
  return <div className='cartItem'>
    <img src={item.image} alt={item.name} />
    <p>{item.name}</p>
    <p>{item.price}</p>
    <div className='productbtn'>
      <button onClick={onHandleRemove}>Remove Item</button>
      <button onClick={onIncrementCount}>+</button>
      <span>{item.count}</span>
      <button onClick={onDecrementCount}>-</button>
    </div>
  </div>
}

function ProductItem({ item, onAddItem }) {
  return <div className='productItem'>
    <img src={item.image} alt={item.name} />
    <span>{item.name}</span>
    <span>{item.price}</span>
    <button onClick={() => onAddItem(item)}>Add To Cart</button>
  </div>
}

export default App;
