import { useRouter } from "next/router";

// Custom hooks
import { useMovie } from "@/hooks/useMovie";

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();

  // Get movieId from url
  const { movieId } = router.query;

  // Get data from useMovie hook
  const { data: movie } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="w-full h-screen object-cover"
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
