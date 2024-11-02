import Image from "next/image";
import Link from 'next/link';
import { motion } from "framer-motion";
import { useState } from 'react';

const HeroHeader = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const fadeInVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  const linkVariants = {
    initial: { color: "#000000" },
    hover: { color: "#4B5563" }
  };

  const buttonVariants = {
    initial: { backgroundColor: "#000000" },
    hover: { 
      backgroundColor: "#1F2937",
      transition: { duration: 0.2 }
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.02,
      transition: { type: "tween", duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="flex justify-between"
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="no-underline">
        <motion.div 
          className="bg-white p-1.5 rounded-full px-2.5 pr-4 hover:shadow-sm"
          whileHover="hover"
          variants={logoVariants}
        >
          <div className="flex items-center gap-4">
            <div className="bg-black w-9 h-9 rounded-full grid place-items-center p-1.5">
              <Image src="/logo1.svg" width={32} height={32} alt="Hero Image" />
            </div>
            <p className="text-black font-medium">Payroll Protocol</p>
          </div>
        </motion.div>
      </Link>

      <div className="bg-white p-1.5 rounded-full pl-4 text-sm">
        <div className="flex items-center gap-4">
          <Link href="/distribute" className="no-underline">
            <motion.p
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setHoveredLink('distribute')}
              onHoverEnd={() => setHoveredLink(null)}
              className="font-medium"
            >
              Distribute
            </motion.p>
          </Link>
          
          <Link href="/withdraw" className="no-underline">
            <motion.p
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setHoveredLink('withdraw')}
              onHoverEnd={() => setHoveredLink(null)}
              className="font-medium"
            >
              Withdraw
            </motion.p>
          </Link>
          
          <Link href="/deposit" className="no-underline">
            <motion.div
              className="bg-black h-9 rounded-full grid place-items-center p-1.5 text-white px-2.5"
              variants={buttonVariants}
              whileHover="hover"
              initial="initial"
            >
              <span className="font-medium">Deposit</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroHeader;