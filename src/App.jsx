import { useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const productFound = state.find(
        (item) => item.name === action.payload.name
      );

      // Se il prodotto è già nel carrello, aumento la quantità di 1
      if (productFound) {
        return state.map((item) => {
          if (item.name === action.payload.name) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      // Se il prodotto non è nel carrello, lo aggiungo con quantity = 1
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM": {
      return state.filter((item) => item.name !== action.payload.name);
    }

    case "UPDATE_QUANTITY": {
      let newQuantity = parseInt(action.payload.quantity);

      // Se il valore non è valido o è minore di 1, imposto 1
      if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
      }

      return state.map((item) => {
        if (item.name === action.payload.name) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    }

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <>
      <h1>Lista della spesa</h1>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> - € {product.price.toFixed(2)}
            <button
              onClick={() =>
                dispatch({ type: "ADD_ITEM", payload: product })
              }
            >
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <>
          <h2>Carrello</h2>

          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong> - € {product.price.toFixed(2)}

                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        name: product.name,
                        quantity: e.target.value,
                      },
                    })
                  }
                />

                <button
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM",
                      payload: product,
                    })
                  }
                >
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>

          <h3>Totale: € {total.toFixed(2)}</h3>
        </>
      )}
    </>
  );
}

export default App;