import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const price = product.price ?? product.basePrice ?? 0;
    const image =
      product.image ||
      (Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "");

    const normalizedProduct = {
      ...product,
      price,
      image,
      selectedSize: product.selectedSize || "M",
      selectedColor: product.selectedColor || "",
    };

    setCartItems((prevItems) => {
      // Check if exact product AND variant (size/color) already exists in cart
      const existItemIndex = prevItems.findIndex(
        (item) =>
          item._id === normalizedProduct._id &&
          item.selectedSize === normalizedProduct.selectedSize &&
          item.selectedColor === normalizedProduct.selectedColor,
      );

      if (existItemIndex > -1) {
        // If it exists, update the quantity of that specific variant
        const updatedItems = [...prevItems];
        updatedItems[existItemIndex].quantity += quantity;
        return updatedItems;
      }

      // Otherwise, add as a new item entry
      return [...prevItems, { ...normalizedProduct, quantity }];
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item._id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          ),
      ),
    );
  };

  const updateQuantity = (id, selectedSize, selectedColor, quantity) => {
    const numQty = Math.max(1, parseInt(quantity) || 1);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: numQty }
          : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = item.price ?? item.basePrice ?? 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
