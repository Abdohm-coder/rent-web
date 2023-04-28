import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();
      let request;

      if (hasFavourited)
        request = () => axios.delete(`/api/favorites/${listingId}`);
      else request = () => axios.post(`/api/favorites/${listingId}`);

      await request();

      router.refresh();
      toast.success("Success");
      try {
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, listingId, hasFavourited, loginModal, router]
  );

  return { hasFavourited, toggleFavorite };
};

export default useFavorite;
