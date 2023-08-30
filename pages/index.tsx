import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl text-green-500">Netflix Clone</h1>
    </main>
  );
}
