import Image from "next/image";
import { signOut } from "next-auth/react";

// Custom hooks
import { useFetchData } from "@/hooks/useFetchData";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
  const { data: userInfo } = useFetchData("api/current");

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute border-gray-800 right-0 top-14 py-5 flex-col border-2 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <div className="w-8 h-8">
            <Image
              src={"/images/default-blue.png"}
              alt="Profile"
              width={100}
              height={100}
              className="w-full h-full rounded-md"
            />
          </div>
          <p className="text-white text-sm group-hover/item:underline:">
            {userInfo?.name}
          </p>
        </div>
        <hr className="border-gray-600 h-1px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
