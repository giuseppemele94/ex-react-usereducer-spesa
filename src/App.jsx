import { useState } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function App() {

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    // Cerco il prodotto nel carrello
    const prodottoGiaInserito = addedProducts.find((item) => item.name === product.name);

    // Se esiste già, non faccio nulla
    if (prodottoGiaInserito) return;

    // Se non esiste, lo aggiungo con quantità 1
    setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
  };

  return (
    <>
      <h1>Lista della spesa</h1>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>{product.name} - € {product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {addedProducts.length > 0 && (
        <>
          <h2>Carrello</h2>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>{product.name} - € {product.price.toFixed(2)} - Quantità: {product.quantity}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default App;