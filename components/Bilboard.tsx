// Custom hooks
import { useFetchData } from "@/hooks/useFetchData";

interface movie {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

// Icons
import { AiOutlineInfoCircle } from "react-icons/ai";

const Bilboard = () => {
  const randomMovie: movie = useFetchData("api/random", {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }).data;

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%] "
        autoPlay
        muted
        loop
        src={randomMovie?.videoUrl}
        poster={randomMovie?.thumbnailUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {randomMovie?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {randomMovie?.description}
        </p>
        <div className="flex items-center mt-3 md:mt-4 gap-3">
          <button className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-1 md:mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bilboard;
