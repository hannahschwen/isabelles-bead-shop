import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_All_PRODUCTS } from "./queries";

const ProductsContext = createContext();
const ShoppingCartContext = createContext();

const ProductsProvider = ({ children }) => {
  // Products state
  const { data, loading, error } = useQuery(GET_All_PRODUCTS);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setAllProducts(data.products);
    }
  }, [data]);

  // Shopping cart state
  const [cartItems, setCartItems] = useState([]);

  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.stock, 0);
    setCartCounter(totalItems);
  }, [cartItems]);

  // Add to cart function
  const addToCart = (addItem, stockToAdd) => {
    const itemExists = cartItems.some((item) => item._id === addItem._id);
    const updatedCartItems = itemExists
      ? // If the item is already in the cart, increment the stock
        cartItems.map((item) =>
          addItem._id === item._id
            ? { ...item, stock: item.stock + stockToAdd }
            : item
        )
      : // Otherwise, add the item to the cart
        [...cartItems, { ...addItem, stock: stockToAdd }];
    setCartItems(updatedCartItems);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      <ShoppingCartContext.Provider
        value={{
          cartItems,
          setCartItems,
          addToCart,
          cartCounter,
          setCartCounter,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ShoppingCartContext, ProductsProvider };
