import { Poppins } from "next/font/google";
import "./globals.css";
import PrivyWrapper from "@/privy/privyProvider";
import ConnectWallet from "@/components/wallet-checker";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Payroll Protocol",
  description: "AIA Hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PrivyWrapper>
          <ConnectWallet>{children}</ConnectWallet>
        </PrivyWrapper>
      </body>
    </html>
  );
}
