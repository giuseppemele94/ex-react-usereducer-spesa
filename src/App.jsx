import { useState } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function App() {

  const [addedProducts, setAddedProducts] = useState([]);

  //funzione per aggiungere al carrello un prodotto
  const addToCart = (product) => {
    // Cerco il prodotto nel carrello
    const prodottoGiaInserito = addedProducts.find((item) => item.name === product.name);

    // Se esiste già aggiorno la quantità
    if (prodottoGiaInserito) {
      updateProductQuantity(product,prodottoGiaInserito.quantity + 1);
    }else {

    // Se non esiste, lo aggiungo con quantità 1
    setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  //funzione per rimuovere dal carrello un prodotto
  const removeFromCart = (product) => {
    setAddedProducts((curr) => 
    curr.filter((item)=> item.name !== product.name))
  }

//funzione per incrementare la quantità di un prodotto gia inserito nel carrello 
const updateProductQuantity = (product,value) => {

  //converto il valore in numero intero
  let newQuantity = parseInt(value);

  //se non è un numero valido oppure è minore di 1, imposto 1
  if(isNaN(newQuantity) || newQuantity < 1) {
    newQuantity = 1; 
  }

    setAddedProducts((curr) =>
      curr.map((item) => {
        if (item.name === product.name) {
          return { ...item, quantity: newQuantity};
        }
        return item;
      })
    );
  };

//funzione per calcolare il totale 
const total = addedProducts.reduce((sum, product) => {
return sum + (product.price * product.quantity); 
},0);

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

                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    updateProductQuantity(product, e.target.value)
                  }
                />
                
                <button onClick ={() => removeFromCart(product)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>

          <h3>Totale : € {total.toFixed(2)} </h3>
        </>
      )}
    </>
  );
}

export default App;