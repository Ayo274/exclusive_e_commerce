import { createContext, useState, useEffect, useContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlistItems");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existItem = prevItems.find((item) => item._id === product._id);
      if (existItem) {
        return prevItems.filter((item) => item._id !== product._id); 
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== id),
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
