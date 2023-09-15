import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

// Components
import Navbar from "@/components/Navbar";

// Custom hooks
import { useCurrentUser } from "@/hooks/useCurrentUser";

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
  const { data: userInfo } = useCurrentUser();

  return (
    <>
      <Navbar />
      {/* <p className="text-white">Logged in as: {userInfo?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button> */}
    </>
  );
}
