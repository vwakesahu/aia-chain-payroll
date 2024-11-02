import React from "react";
import { Calendar, Plus, Trash2 } from "lucide-react";
import HeroHeader from "../hero/hero-header";

const DistributeUI = () => {
  return (
    <div>
      <div className="col-span-6 bg-[#F3F3F3] rounded-full">
        <HeroHeader />
      </div>
      <div className="mx-auto mt-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Distribution Form */}
          <div className="col-span-7 bg-white rounded-[35px] p-8 flex flex-col">
            {/* Title & Toggle */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium">Distribute</h2>
              <div className="bg-[#F3F3F3] rounded-full inline-flex">
                <button className="px-6 py-3 text-gray-400 text-sm">
                  Single
                </button>
                <button className="px-6 py-3 rounded-full bg-black text-white text-sm">
                  Multiple
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex flex-col">
              <div className="space-y-6">
                {/* Distribution Row 1 */}
                <div className="flex gap-4 items-start group">
                  <div className="flex-1">
                    <div className="flex gap-4">
                      <div className="flex-[2]">
                        <label className="block text-sm text-gray-500 mb-2">
                          Recipient Address
                        </label>
                        <div className="bg-white rounded-2xl p-4 border">
                          <input
                            type="text"
                            placeholder="0x0C2E8090a89A0af9"
                            className="w-full text-base bg-transparent outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-500 mb-2">
                          Amount
                        </label>
                        <div className="bg-white rounded-2xl p-4 border">
                          <div className="flex items-center gap-2">
                            <span className="text-base text-gray-400">$</span>
                            <input
                              type="text"
                              placeholder="300"
                              className="w-full text-base bg-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-8 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Distribution Row 2 */}
                <div className="flex gap-4 items-start group">
                  <div className="flex-1">
                    <div className="flex gap-4">
                      <div className="flex-[2]">
                        <div className="bg-white rounded-2xl p-4 border">
                          <input
                            type="text"
                            placeholder="0x75d86ABf381f10276d"
                            className="w-full text-base bg-transparent outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-2xl p-4 border">
                          <div className="flex items-center gap-2">
                            <span className="text-base text-gray-400">$</span>
                            <input
                              type="text"
                              placeholder="300"
                              className="w-full text-base bg-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Add More Button */}
                <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>Add Recipient</span>
                </button>
              </div>

              {/* Time Settings */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Lock Time
                  </label>
                  <div className="bg-white rounded-2xl p-4 border">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="dd/mm/yyyy"
                        className="w-full text-base bg-transparent outline-none"
                      />
                      <Calendar className="text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Dilute
                  </label>
                  <div className="bg-white rounded-2xl p-4 border">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="dd/mm/yyyy"
                        className="w-full text-base bg-transparent outline-none"
                      />
                      <Calendar className="text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-medium">900 USDC</span>
                </div>
                <button className="w-full bg-black text-white font-medium py-4 rounded-2xl hover:bg-black/90 transition-colors">
                  Submit Distribution
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Information */}
          <div className="col-span-5 grid grid-rows-2 gap-8">
            {/* Top Info Card */}
            <div className="bg-white rounded-[35px] p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Total Distributed</p>
                  <p className="text-3xl font-medium">$5.2M</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-lg">↑</span>
                </div>
              </div>
            </div>

            {/* Bottom Info Card */}
            <div className="bg-[#00C670]/70 rounded-[35px] p-8">
              <div className="flex flex-col justify-between h-full">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-12">
                  <span className="text-white text-lg">$</span>
                </div>
                <div>
                  <p className="mb-3">Average Distribution</p>
                  <div className="text-5xl font-medium">$847</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributeUI;