import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOutIcon } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

const HeroHeader = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeRoute, setActiveRoute] = useState("/");
  const pathname = usePathname();
  const { logout } = usePrivy();

  useEffect(() => {
    if (pathname) {
      setActiveRoute(pathname);
    }
    if (pathname === "/") {
      setActiveRoute("/withdraw");
    }
  }, [pathname]);

  // Navigation items configuration
  const navItems = [
    { path: "/deposit", label: "Deposit" },
    { path: "/distribute", label: "Distribute" },
    { path: "/withdraw", label: "Withdraw" },
  ];

  const renderNavItem = (item) => {
    const isActive = activeRoute === item.path;

    return (
      <Link key={item.path} href={item.path} className="no-underline">
        <motion.div
          className={`
            h-9 rounded-full grid place-items-center px-4
            transition-colors duration-200
            ${
              isActive
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white hover:bg-gray-50 text-black"
            }
          `}
        >
          <span
            className={`
            ${isActive ? "text-white" : "text-black"}
          `}
          >
            {item.label}
          </span>
        </motion.div>
      </Link>
    );
  };

  return (
    <motion.div className="flex justify-between">
      <Link href="/" className="no-underline">
        <motion.div
          className={`bg-white p-1.5 rounded-full px-2.5 pr-4 hover:shadow-sm ${
            activeRoute === "/" ? "ring-2 ring-blue-600" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-black w-9 h-9 rounded-full grid place-items-center p-1.5">
              <Image src="/logo1.svg" width={32} height={32} alt="Hero Image" />
            </div>
            <p className="text-black font-medium">Payroll Protocol</p>
          </div>
        </motion.div>
      </Link>

      <div className="flex items-center gap-2">
        <div className="bg-white p-1.5 rounded-full text-sm">
          <div className="flex items-center gap-2">
            {navItems.map(renderNavItem)}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="bg-black w-9 h-9 rounded-full grid place-items-center p-1.5 cursor-pointer hover:bg-black/80"
            onClick={logout}
          >
            <LogOutIcon size={16} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroHeader;
