import Image from "next/image";
import { Inter } from "next/font/google";
import LIT from "@/components/LIT/LIT";
import { useState } from "react";
import { ens } from "@/components/ENS/index.js";
const inter = Inter({ subsets: ["latin"] });
import { sendNotification } from "@/components/Push/index.js";
export default function Home() {
  const [pkpWallet, setPkpWallet] = useState(null);
  console.log(pkpWallet);
  ens("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
  return (
    <div>
      <LIT setPkpWallet={setPkpWallet} />
      <button
        onClick={() =>
          sendNotification(
            "0xE643CF465eDE9ad11E152BAb8d3cdC6CBC3712E1",
            "hi",
            "bye"
          )
        }
      >
        Send Notification
      </button>
    </div>
  );
}
