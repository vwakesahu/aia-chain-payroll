import React, { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import HeroHeader from "../hero/hero-header";
import { useWalletContext } from "@/privy/walletContext";
import { changeWallet } from "@/utils/changeWallet";
import { chainsId } from "@/privy/chains";

const WithdrawUI = () => {
  // State management
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { w0 } = useWalletContext();

  console.log(w0?.chainId);

  // Constants
  const AVAILABLE_BALANCE = 1000; // USDC
  const TOTAL_WITHDRAWALS = 8.2; // Million
  const AVERAGE_WITHDRAWAL = 652;

  // Handle amount input
  const handleAmountChange = (value) => {
    // Remove non-numeric characters except decimal point
    const cleanedValue = value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    if ((cleanedValue.match(/\./g) || []).length > 1) return;

    // Limit decimal places to 2
    if (cleanedValue.includes(".")) {
      const [whole, decimal] = cleanedValue.split(".");
      if (decimal?.length > 2) return;
    }

    setAmount(cleanedValue);
    setError("");
  };

  // Handle address input
  const handleAddressChange = (value) => {
    setAddress(value);
    setError("");
  };

  // Handle max button click
  const handleMaxClick = () => {
    setAmount(AVAILABLE_BALANCE.toString());
    setError("");
  };

  // Validate Ethereum address
  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Handle withdrawal preview
  const handlePreviewWithdrawal = () => {
    const numAmount = parseFloat(amount);

    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (numAmount > AVAILABLE_BALANCE) {
      setError("Amount exceeds available balance");
      return;
    }

    if (!address) {
      setError("Please enter a recipient address");
      return;
    }

    if (!isValidAddress(address)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    // Handle withdrawal preview logic here
    console.log("Preview withdrawal:", {
      amount: numAmount,
      address,
    });
  };

  return (
    <div>
      <div className="col-span-6 bg-[#F3F3F3] rounded-full">
        <HeroHeader />
      </div>
      <div className="mx-auto mt-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Withdraw Form */}
          <div className="col-span-6 bg-white rounded-[35px] p-8 flex flex-col">
            {/* Title*/}
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-medium">Withdraw</h2>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Amount
                  </label>
                  <div
                    className={cn(
                      "bg-white rounded-2xl p-4 border",
                      error && error.includes("amount") && "border-red-500"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-gray-400">$</span>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        placeholder="Enter amount to withdraw"
                        className="w-full text-xl bg-transparent outline-none"
                      />
                      <button
                        onClick={handleMaxClick}
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Recipient Address
                  </label>
                  <div
                    className={cn(
                      "bg-white rounded-2xl p-4 border",
                      error && error.includes("address") && "border-red-500"
                    )}
                  >
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      placeholder="0x75d86ABf381f10276d..."
                      className="w-full text-base bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Available Balance</span>
                  <span className="font-medium">
                    {AVAILABLE_BALANCE.toLocaleString()} USDC
                  </span>
                </div>
              </div>

              <button
                onClick={handlePreviewWithdrawal}
                className="w-full bg-black text-white font-medium py-4 rounded-2xl hover:bg-black/90 transition-colors mt-8"
              >
                Preview Withdrawal
              </button>
            </div>
          </div>

          {/* Right Panel - Information */}
          <div className="col-span-6 grid grid-rows-2 gap-8">
            {/* Top Info Card */}
            <div className="bg-white rounded-[35px] p-8 relative overflow-hidden">
              {/* Bento-style background elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Main grid pattern */}
                <div className="absolute bottom-0 right-0 w-52 h-32 grid grid-cols-4 gap-2 p-4">
                  <div className="w-full h-full rounded-lg bg-gray-50/80"></div>
                  <div className="w-full h-full rounded-lg border-2 border-gray-100"></div>
                  <div className="w-full h-full rounded-lg bg-gray-50/50"></div>
                  <div className="w-full h-full rounded-lg border-2 border-gray-100 -rotate-3"></div>
                  <div className="w-full h-full rounded-lg border-2 border-gray-100"></div>
                  <div className="w-full h-full rounded-lg bg-gray-50/60"></div>
                  <div className="w-full h-full rounded-lg border-2 border-gray-100 rotate-3"></div>
                  <div className="w-full h-full rounded-lg bg-gray-50/70"></div>
                </div>
                {/* Floating elements */}
                <div className="absolute bottom-6 right-48 w-8 h-8 rounded-full bg-gray-50/40"></div>
                <div className="absolute bottom-20 right-36 w-6 h-6 rounded-full border-2 border-gray-100"></div>
                <div className="absolute bottom-8 right-28 w-4 h-4 rounded-lg bg-gray-50/60 rotate-45"></div>
              </div>

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Total Withdrawals
                  </p>
                  <p className="text-3xl font-medium">${TOTAL_WITHDRAWALS}M</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-lg">↓</span>
                </div>
              </div>
            </div>

            {/* Bottom Info Card */}
            <div className="bg-[#00C670]/80 rounded-[35px] p-8 relative overflow-hidden">
              {/* Bento-style background elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Main grid pattern */}
                <div className="absolute top-4 right-4 w-52 h-full grid grid-cols-3 gap-3 p-4">
                  <div className="w-full h-16 rounded-lg bg-white/10"></div>
                  <div className="w-full h-16 rounded-lg border-2 border-white/20 rotate-2"></div>
                  <div className="w-full h-16 rounded-lg bg-white/5"></div>
                  <div className="w-full h-16 rounded-lg border-2 border-white/20"></div>
                  <div className="w-full h-16 rounded-lg bg-white/10 -rotate-2"></div>
                  <div className="w-full h-16 rounded-lg border-2 border-white/20"></div>
                  <div className="w-full h-16 rounded-lg bg-white/5"></div>
                  <div className="w-full h-16 rounded-lg border-2 border-white/20 rotate-3"></div>
                  <div className="w-full h-16 rounded-lg bg-white/10"></div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-12 right-60 w-8 h-8 rounded-full border-2 border-white/20"></div>
                <div className="absolute bottom-16 right-56 w-6 h-6 rounded-lg bg-white/10 rotate-45"></div>
                <div className="absolute top-28 right-52 w-4 h-4 rounded-full bg-white/20"></div>
              </div>

              <div className="flex flex-col justify-between h-full relative z-10">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-12">
                  <span className="text-black text-lg">$</span>
                </div>
                <div>
                  <p className="mb-3 text-white">Average Withdrawal</p>
                  <div className="text-5xl font-medium text-white">
                    ${AVERAGE_WITHDRAWAL}
                  </div>
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
