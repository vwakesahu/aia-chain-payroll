import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOutIcon } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { ChevronRight, Github, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";


const HeroHeader = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeRoute, setActiveRoute] = useState("/");
  const [showVideo, setShowVideo] = useState(false);
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
      <div className="grid place-items-center">
            <button
              className="group rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 hover:opacity-90 px-4 hover:underline"
              onClick={() => setShowVideo(true)}
            >
              <p className="py-2">View Demo</p>
              {/* <div className="h-10 w-10 rounded-full bg-white overflow-hidden grid place-items-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ChevronRight className="text-black" />
              </div> */}
            </button>
          </div>
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

      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Protocol Demo</DialogTitle>
            <DialogDescription>
              Watch how our <span className="text-black">Payroll Protocol</span> works.
            </DialogDescription>
          </DialogHeader>
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/JWXaH_IXKAc?si=mjVfDJdzQIGSHo57" // Replace YOUR_VIDEO_ID with actual YouTube video ID
              title="Protocol Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default HeroHeader;
