import { useRouter } from "next/router";

// Icons
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton = ({ movieId }: PlayButtonProps) => {
  const router = useRouter();

  console.log(movieId);

  return (
    <div
      onClick={() => router.push(`/watch/${movieId}`)}
      className="cursor-pointer bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill className="mr-1" size={25} />
      Play
    </div>
  );
};

export { PlayButton };
