import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { FavoriteItem } from "@/types/potter-api";

const FAVORITES_KEY = "@favorites";

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((stored) => {
        if (stored) setFavorites(JSON.parse(stored));
      })
      .catch(() => {});
  }, []);

  const persist = useCallback((items: FavoriteItem[]) => {
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items)).catch(() => {});
  }, []);

  const addFavorite = useCallback(
    (item: FavoriteItem) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.id === item.id)) return prev;
        const next = [...prev, item];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.filter((f) => f.id !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
