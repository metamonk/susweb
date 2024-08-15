'use client'

import MemeGenerator from "@/components/generator"
import Image from "next/image"
import { toast } from "sonner"

export default function Home() {
  const handleCopy = () => {
    navigator.clipboard.writeText('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    toast.success("Address copied")
  };

  return (
    <main className="flex flex-col items-center justify-between p-6 sm:p-12 lg:p-24 bg-yellow-300 relative overflow-hidden">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-600 text-center mb-8">$SUS on Solana</h1>
      <Image src="/images/logo.png" alt="FatCat Coin logo" width={300} height={300} className="rounded-full border-8 border-purple-600 w-48 sm:w-64 lg:w-80 h-auto mb-8" />
      <Image
        src="/images/side-eye-1.png"
        alt="Side Eye 1"
        width={200}
        height={200}
        className="absolute top-[10%] left-[5%] w-[25vw] max-w-[150px] h-auto transform -rotate-12"
      />
      <Image
        src="/images/side-eye-2.png"
        alt="Side Eye 2"
        width={200}
        height={200}
        className="absolute bottom-[15%] right-[5%] w-[25vw] max-w-[150px] h-auto transform rotate-15"
      />
      <Image
        src="/images/side-eye-3.png"
        alt="Side Eye 3"
        width={200}
        height={200}
        className="absolute top-1/2 left-[2%] w-[25vw] max-w-[150px] h-auto transform rotate-6"
      />
      <Image
        src="/images/side-eye-4.png"
        alt="Side Eye 4"
        width={200}
        height={200}
        className="absolute top-[5%] right-[5%] w-[25vw] max-w-[150px] h-auto transform rotate-12"
      />
      <p className="text-lg sm:text-xl lg:text-2xl text-center max-w-md mb-8">Y'all really be capping.</p>
      <div
        className="
        justify-center
        bg-purple-600
        backdrop-blur-2xl
        cursor-pointer
        w-auto
        rounded-xl
        border-4
        border-primary-foreground
        p-4
        mb-8
        "
        onClick={handleCopy}
      >
        <code className="font-mono font-bold">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>
      </div>
      <div>
        <MemeGenerator />
      </div>
    </main>
  );
}