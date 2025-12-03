"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Desktop & Tablet (بدون dropdown)
  const linksDesktop = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "OUR WORK", path: "/ourwork" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];

  // Mobile — SERVICES فوقتها dropdown وترتيبها بعد HOME
  const linksMobile = [
    { name: "HOME", path: "/" },
    {
      name: "SERVICES",
      path: "/services", // تروح للصفحة عادي
      dropdown: [
        { name: "Website Development", path: "/services?filter=website" },
        { name: "Mobile Application", path: "/services?filter=mobile" },
        { name: "UI/UX Design", path: "/services?filter=uiux" },
        { name: "Maintenance & Support", path: "/services?filter=maintenance" },
      ],
    },
    { name: "OUR WORK", path: "/ourwork" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];

  const tabletLinks = linksDesktop.filter((link) => link.name !== "HOME");

  return (
    <nav className="w-full flex flex-col items-center mt-10 relative z-[100]">

      {/* ===== Desktop Navbar (≥881px) ===== */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-[965px] px-4 py-2 rounded-full shadow-4xl bg-black/40 backdrop-blur-md border border-white/30">
        <div className="flex-shrink-0">
          <Link href="/" onClick={() => setActive(null)}>
            <img src="/logo/aurora.svg" alt="Aurora Logo" className="w-[130px] h-auto" />
          </Link>
        </div>

        <ul className="flex items-center gap-4 text-[14px] font-medium tracking-wider">
          {linksDesktop.map((link, i) => (
            <li key={i} className="relative">
              <Link
                href={link.path}
                onClick={() => setActive(i)}
                className={`flex items-center justify-center gap-[8px] w-[140px] h-[44px] rounded-full transition-all duration-300 ${
                  active === i ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Tablet Navbar (880px - 768px) ===== */}
      <div className="hidden md:flex lg:hidden flex-col items-center w-full px-6 py-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/">
            <img src="/logo/aurora.svg" alt="Aurora Logo" className="w-[150px] mb-8" />
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-center flex-wrap gap-8 text-white/80 text-[14px] font-medium"
        >
          {tabletLinks.map((link, i) => (
            <li key={i}>
              <Link
                href={link.path}
                onClick={() => setActive(i)}
                className={`hover:text-white transition-colors duration-300 ${
                  active === i ? "text-white" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ===== Mobile Navbar (≤767px) ===== */}
      <div className="flex md:hidden items-center justify-between w-full px-6 py-3">
        <Link href="/">
          <img src="/logo/aurora.svg" alt="Aurora Logo" className="w-[110px]" />
        </Link>

        <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white">
          {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* ===== Mobile Slide Menu ===== */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-black/60 backdrop-blur-md z-30 p-6 flex flex-col gap-3"
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setMobileMenu(false)} className="text-white text-2xl">
                <FaTimes />
              </button>
            </div>

            {linksMobile.map((link, i) => (
              <div key={i} className="w-full flex flex-col gap-2">

                {/* لو فيه dropdown (SERVICES) */}
                {link.dropdown ? (
                  <>
                    <div className="flex items-center w-full justify-between">
                      {/* اللينك الأساسي قابل للنقر */}
                      <Link
                        href={link.path}
                        onClick={() => setMobileMenu(false)}
                        className="text-white font-medium py-2 px-3 rounded-full hover:bg-white/10 transition-colors w-full"
                      >
                        {link.name}
                      </Link>

                      {/* السهم لفتح الدروب داون */}
                      <button
                        onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                        className="ml-2 text-white"
                      >
                        <FaChevronDown
                          className={`${openDropdown === i ? "rotate-180" : ""} transition-transform duration-300`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {openDropdown === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col gap-2 mt-1 pl-6"
                        >
                          {link.dropdown.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.path}
                              onClick={() => setMobileMenu(false)}
                              className="block text-white/80 hover:text-white transition-colors py-1"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenu(false)}
                    className="block w-full text-white py-2 px-3 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
