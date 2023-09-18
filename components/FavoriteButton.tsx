import axios from "axios";
import { useCallback, useMemo } from "react";

// Custom hooks
import { useFetchData } from "@/hooks/useFetchData";

// Icons
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  // Mutate is when the data is updated or changed
  const { mutate: mutateFavorites } = useFetchData("api/favorites", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: currentUser, mutate } = useFetchData("api/current");

  // UseMemo almacena el resultado de la función en memoria, para que no se vuelva a crear cada vez que se renderiza el componente
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    // Return true if the movieId is in the list
    return list.includes(movieId);
  }, [currentUser, movieId]);

  // Add favorite
  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("api/favorite", {
        data: {
          movieId,
        },
      });
    } else {
      response = await axios.post("api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Mutate permit refresh and update the data (Favorites and currentUser)
    mutate({
      ...currentUser,
      favoritesIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export { FavoriteButton };
