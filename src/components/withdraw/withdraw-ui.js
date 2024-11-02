import React from "react";
import HeroHeader from "../hero/hero-header";

const WithdrawUI = () => {
  return (
    <div>
      <div className="col-span-6 bg-[#F3F3F3] rounded-full">
        <HeroHeader />
      </div>
      <div className="mx-auto mt-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Withdraw Form */}
          <div className="col-span-6 bg-white rounded-[35px] p-8 flex flex-col">
            {/* Title & Toggle */}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-medium">Withdraw</h2>
              <div className="bg-[#F3F3F3] rounded-full p-1 inline-flex">
                <button className="px-5 py-2 text-gray-400 text-sm">
                  Single
                </button>
                <button className="px-5 py-2 rounded-full bg-black text-white text-sm">
                  Multiple
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Amount
                  </label>
                  <div className="bg-white rounded-2xl p-4 border">
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-gray-400">$</span>
                      <input
                        type="text"
                        placeholder="Enter amount to withdraw"
                        className="w-full text-xl bg-transparent outline-none"
                      />
                      <button className="text-sm text-gray-400">MAX</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Recipient Address
                  </label>
                  <div className="bg-white rounded-2xl p-4 border">
                    <input
                      type="text"
                      placeholder="0x75d86ABf381f10276d..."
                      className="w-full text-base bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Available Balance</span>
                  <span className="font-medium">1,000 USDC</span>
                </div>
              </div>

              <button className="w-full bg-black text-white font-medium py-4 rounded-2xl hover:bg-black/90 transition-colors mt-8">
                Preview Withdrawal
              </button>
            </div>
          </div>

          {/* Right Panel - Information */}
          <div className="col-span-6 grid grid-rows-2 gap-8">
            {/* Top Info Card */}
            <div className="bg-white rounded-[35px] p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Total Withdrawals</p>
                  <p className="text-3xl font-medium">$8.2M</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-lg">↓</span>
                </div>
              </div>
            </div>

            {/* Bottom Info Card */}
            <div className="bg-[#00C670]/80 rounded-[35px] p-8">
              <div className="flex flex-col justify-between h-full">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-12">
                  <span className="text-white text-lg">$</span>
                </div>
                <div>
                  <p className="mb-3">Average Withdrawal</p>
                  <div className="text-5xl font-medium">$652</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawUI;