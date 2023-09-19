import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

// Components
import Navbar from "@/components/Navbar";
import Bilboard from "@/components/Bilboard";
import MovieList from "@/components/MovieList";
import { InfoModal } from "@/components/InfoModal";

// Custom hooks
import { useFetchData } from "@/hooks/useFetchData";
import { useInfoModal } from "@/hooks/useInfoModal";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Protecting the route (Context is only available on the server and called on every request by default)
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useFetchData("api/movies", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: favoritesUser = [] } = useFetchData("api/favorites", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Get openModal and closeModal from useInfoModal hook (zustand)
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      {/* <p className="text-white">Logged in as: {userInfo?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button> */}
      <Bilboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favoritesUser} />
      </div>
    </>
  );
}
