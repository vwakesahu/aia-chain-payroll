import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="grid grid-cols-12 gap-8 p-8 max-w-[1400px] mx-auto px-24">
      {/* Image Section */}
      <div className="col-span-5 bg-black/80 rounded-[35px] relative overflow-hidden">
        <div className="relative">
          <Image
            src="/hero2.svg"
            alt="Dashboard Preview"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-8 left-8 flex items-center justify-between gap-3 w-full pr-16">
          <button className="bg-white text-black px-6 py-3 rounded-full text-base font-medium hover:bg-gray-50 transition-colors">
            Demo our dashboard
          </button>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="text-xl">→</span>
          </div>
        </div>
      </div>

      {/* Features List Section */}
      <div className="col-span-7 flex flex-col h-full">
        <div className="flex-1">
          {/* Feature 1 */}
          <div className="grid grid-cols-12 gap-16 py-4 border-b border-gray-200 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-lg font-medium">
              01
            </div>
            <h3 className="text-lg mb-0 col-span-5">Confidential Payments</h3>
            <div className="col-span-6">
              <p className="text-gray-600 leading-relaxed m-0">
                Distribute funds on-chain with encrypted ammounts
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-12 gap-16 py-4 border-b border-gray-200 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-lg font-medium">
              02
            </div>
            <h3 className="text-lg mb-0 col-span-5">Stealth USDC Holding</h3>
            <div className="col-span-6">
              <p className="text-gray-600 leading-relaxed m-0">
                Store stablecoins, hiding amounts from public visibility.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-12 gap-16 py-4 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-lg font-medium">
              03
            </div>
            <h3 className="text-lg mb-0 col-span-5">Effortless Payroll</h3>
            <div className="col-span-6">
              <p className="text-gray-600 leading-relaxed m-0">
                Easily manage payroll with encrypted addresses.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 place-items-end gap-16">
          <div>
            <p className="leading-tight font-light">
              Explore features designed to secure and streamline confidential
              payroll management.
            </p>
          </div>
          <div className="bg-[#00C670] rounded-[35px] p-8 flex flex-col relative">
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex-1" />
              <div>
                <div className="text-[45px] font-medium leading-none text-white mb-4 pb-8">
                  100%
                </div>
                <p className="font-light text-white leading-snug">
                  Confidentiality in every transaction.
                </p>
              </div>
            </div>

            {/* Decorative Background Shapes */}
            <div className="absolute inset-0 z-0">
              {/* Large Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/10" />

              {/* Small Circles */}
              <div className="absolute top-12 right-12 w-16 h-16 rounded-full bg-white/5" />
              <div className="absolute top-24 left-12 w-20 h-20 rounded-full bg-white/5" />

              {/* Abstract Shapes */}
              <div className="absolute bottom-16 right-16 w-32 h-32 rounded-[20px] rotate-45 bg-white/5" />
              <div className="absolute top-20 left-1/2 w-24 h-24 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
