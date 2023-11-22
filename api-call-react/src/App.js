import "./App.css";
import Cart from "./components/Cart";
import Form from "./components/Form";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <header>
          <Cart />
        </header>
        <Form />
      </div>
    </CartProvider>
  );
}

export default App;
