import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const queryClient = useQueryClient();

  // Read favorites list
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity, // We control updates locally
  });

  // Add new city to favorites
  const addFavorite = useMutation({
    mutationFn: async (city) => {
      const newFavorite = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      // Avoid duplicates
      const exists = favorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorites;

      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });

  // Remove from favorites
  const removeFavorite = useMutation({
    mutationFn: async (cityId) => {
      const newFavorites = favorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });

  return {
    favorites: favoritesQuery.data || [],
    addFavorite,
    removeFavorite,
    isFavorite: (lat, lon) =>
      favorites.some((city) => city.lat === lat && city.lon === lon),
  };
}
