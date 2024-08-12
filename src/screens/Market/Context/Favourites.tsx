import React, {createContext, useContext, useState} from 'react';

const FavoritesContext = createContext<{
  favorites: any;
  updateFavorite: (productId: any, variantId: any, isFav: any) => void;
}>({
  favorites: {},
  updateFavorite: () => {},
});

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({children}: any) => {
  const [favorites, setFavorites] = useState({});

  const updateFavorite = (productId: any, variantId: any, isFav: any) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [variantId]: isFav,
    }));
  };

  return (
    <FavoritesContext.Provider value={{favorites, updateFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};
