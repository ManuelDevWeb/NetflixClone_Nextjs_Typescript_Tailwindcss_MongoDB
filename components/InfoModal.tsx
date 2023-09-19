import { useCallback, useEffect, useState } from "react";

// Custom hooks
import { useInfoModal } from "@/hooks/useInfoModal";
import { useMovie } from "@/hooks/useMovie";

// Components
import { PlayButton } from "./PlayButton";
import { FavoriteButton } from "./FavoriteButton";

// Icons
import { AiOutlineClose } from "react-icons/ai";

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
  // The use of !! guarantees that the value is a boolean
  const [isVisible, setIsVisible] = useState(!!visible);

  // Get movidId from store zustand
  const { movieId } = useInfoModal();

  // Get data from useMovie hook
  const { data: movie } = useMovie(movieId as string);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              poster={movie?.thumbnailUrl}
              src={movie?.videoUrl}
            ></video>
            <div
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-80">
                {movie?.title}
              </p>
              <div className="flex gap-4 items-center">
                <PlayButton movieId={movie?.id} />
                <FavoriteButton movieId={movie?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{movie?.duration}</p>
            <p className="text-white text-lg">{movie?.genre}</p>
            <p className="text-white text-lg">{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InfoModal };
