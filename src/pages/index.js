import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Feed from "@/components/Feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={
        "relative min-h-screen bg-gradient-to-tr from-red-200 to-yellow-100 vsc-initialized"
      }
    >
      <Header />
      <Feed />
    </main>
  );
}
