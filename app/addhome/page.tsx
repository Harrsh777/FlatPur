import AddHomeForm from "@/components/AddHomeForm";

import Counter from "@/components/common/Counter";
import FloatingContactButton from "@/components/FloatingBookAVisit";
import { generateRandomNumber } from "@/lib/utils";

import Image from "next/image";
import React from "react";

export default function AddHome() {
  return (
    <div>
      <div className="bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container px-4 sm:px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-6 gap-8">
            <div className="w-full">
              <h1 className="text-brand font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">FlatPur,</h1>
              <h2 className="text-black font-semibold text-2xl sm:text-3xl mt-2">
                You could earn
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <Counter num={generateRandomNumber()} />
                <strong className="text-2xl sm:text-3xl">per night</strong>
              </div>

              <div className="hidden md:grid grid-cols-2 gap-3 mt-6">
                <Image
                  src="/images/home_img.jpeg"
                  width={240}
                  height={240}
                  alt="home"
                  className="rounded-2xl object-cover shadow-sm"
                />
                <Image
                  src="/images/home_img1.jpeg"
                  width={240}
                  height={240}
                  alt="home"
                  className="rounded-2xl object-cover shadow-sm"
                />
              </div>
            </div>
            <div className="w-full">
              <AddHomeForm />
              <div className="mt-4">
                <FloatingContactButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}