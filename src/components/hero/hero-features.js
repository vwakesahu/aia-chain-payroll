import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="grid grid-cols-12 gap-8 p-8 max-w-[1400px] mx-auto px-24">
      {/* Image Section */}
      <div className="col-span-5 bg-[#F3F3F3] rounded-[35px] p-8 relative overflow-hidden">
        <div className="relative">
          <Image
            src="/hero2.svg"
            alt="Dashboard Preview"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute bottom-8 left-8 flex items-center gap-3">
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
          <div className="grid grid-cols-12 gap-14 py-12 border-b border-gray-200 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-lg font-medium">
              01
            </div>
            <h3 className="text-xl mb-0 col-span-5">Confidential Payments</h3>
            <div className="col-span-6">
              <p className="text-gray-600 leading-relaxed m-0">
                Distribute funds securely on-chain with encrypted transactions,
                protecting recipient details.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-12 gap-14 py-12 border-b border-gray-200 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-lg font-medium">
              02
            </div>
            <h3 className="text-xl mb-0 col-span-5">Stealth USDC Holding</h3>
            <div className="col-span-6">
              <p className="text-gray-600 leading-relaxed m-0">
                Store stablecoins in encrypted accounts, hiding amounts from
                public visibility.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-12 gap-14 py-12 items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-lg font-medium">
              03
            </div>
            <h3 className="text-xl mb-0 col-span-5">Effortless Payroll</h3>
            <div className="col-span-6">
              <p className="text-gray-600 leading-relaxed m-0">
                Easily manage payroll with encrypted addresses, ensuring
                seamless and private transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className=" grid grid-cols-2 place-items-end gap-14">
          <div>
            <p className="leading-tight font-light">
              Explore features designed to secure and streamline confidential
              payroll management.
            </p>
          </div>
          <div className="bg-[#00C670] rounded-[35px] p-8 flex flex-col">
            <div className="flex flex-col h-full justify-between">
              <div className="flex-1" />
              <div>
                <div className="text-[65px] font-medium leading-none text-white mb-4 pb-16">
                  100%
                </div>
                <p className="font-light text-white leading-snug">
                  Confidentiality in every transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
