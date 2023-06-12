import Image from "next/image";
import { Inter } from "next/font/google";
import LIT from "@/components/LIT/LIT";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [pkpWallet, setPkpWallet] = useState(null);
  console.log(pkpWallet);
  return (
    <div>
      <LIT setPkpWallet={setPkpWallet} />
    </div>
  );
}
