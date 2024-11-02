import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpNarrowWide, ChevronRight, ChevronRightIcon, Github } from "lucide-react";
import { Button } from "../ui/button";

const HeroFooter = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const fadeInVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  const linkVariants = {
    initial: { color: "#000000" },
    hover: { color: "#4B5563" },
  };

  return (
    <div>
     <div className="relative bg-[#F3F3F3] rounded-[35px] overflow-hidden p-8 py-6 mb-8 h-[85vh] grid place-items-center">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, black 2%, transparent 2%),
            radial-gradient(circle at 75px 75px, black 2%, transparent 2%)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]/80" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full grid place-items-center p-1.5">
            <Image src="/logob.svg" width={50} height={50} alt="Hero Image" />
          </div>
          <div>
            <h1 className="text-5xl font-medium text-center">
              <span className="text-black">Automated </span>
              <span className="text-gray-400">Payroll</span>
              <br />
              <span className="text-gray-400">Distribution </span>
              <span className="text-black">System</span>
            </h1>
          </div>
        </div>

        <div className="grid place-items-center mt-6">
          <button className="group rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 bg-black text-white shadow hover:opacity-90 pl-4">
            <p className="py-2">View Demo</p>
            <div className="h-10 w-10 rounded-full bg-white overflow-hidden grid place-items-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ChevronRight className="text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
      <motion.div
        className="flex justify-between items-center pb-6"
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        transition={{ duration: 0.3 }}
      >
        {/* Left - Logo */}
        <Link href="/" className="no-underline">
          <motion.div className="bg-white p-1.5 rounded-full px-2.5 pr-4">
            <div className="flex items-center gap-4">
              <div className="bg-black w-9 h-9 rounded-full grid place-items-center p-1.5">
                <Image
                  src="/logo1.svg"
                  width={32}
                  height={32}
                  alt="Hero Image"
                />
              </div>
              <p className="text-black font-medium">Payroll Protocol</p>
            </div>
          </motion.div>
        </Link>

        {/* Center - Credits */}
        <motion.div
          className="text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>Presenting you with ❤️ from Abhishek, Swayam & Vivek.</p>
        </motion.div>

        {/* Right - GitHub Link */}
        <motion.div
          className="bg-white p-1.5 rounded-full px-4 text-sm"
          whileHover={{ scale: 1.02 }}
        >
          <Link
            href="https://github.com/vwakesahu/aia-chain-payroll"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-black hover:text-gray-600 transition-colors"
          >
            <motion.div
              className="flex items-center gap-2"
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setHoveredLink("github")}
              onHoverEnd={() => setHoveredLink(null)}
            >
              <Github size={20} />
              <span className="font-medium">GitHub</span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroFooter;
