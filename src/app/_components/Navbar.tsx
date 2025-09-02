"use client";

import { Figtree } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assets } from "../../../public/assets/assets";
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { LOGO } from "./Logo";

const figtree = Figtree({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  subsets: ["latin"],
});
export default function Navbar() {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const sideMenuRef = useRef<HTMLUListElement>(null);

  const openMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(-16rem)";
    }
  };

  const closeMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(0)";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      <div className='fixed top-0 right-0 w-full -z-19 '>
        <Image
          src={assets.header_bg_color}
          alt='BG'
          className='w-full hidden sm:block'
        />
      </div>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll
            ? "bg-white/70 backdrop-blur-md shadow-sm dark:bg-gradient-to-b from-gray-900 to-black/90"
            : ""
        }`}>
        {/* Logo */}
        <Link href='#top'>
          <LOGO />
        </Link>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll
              ? ""
              : "bg-white shadow-sm dark:bg-gradient-to-b from-gray-900 to-black"
          }`}>
          <li>
            <Link
              className={`${figtree.className} text-base font-medium hover:font-semibold transition-all`}
              href='#top'>
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${figtree.className} text-base font-medium hover:font-semibold transition-all`}
              href='#about'>
              About Me
            </Link>
          </li>
          <li>
            <Link
              className={`${figtree.className} text-base font-medium hover:font-semibold transition-all`}
              href='#services'>
              Services
            </Link>
          </li>
          <li>
            <Link
              className={`${figtree.className} text-base font-medium hover:font-semibold transition-all`}
              href='#works'>
              My Works
            </Link>
          </li>
          <li>
            <Link
              className={`${figtree.className} text-base font-medium hover:font-semibold transition-all`}
              href='#contact'>
              Contact Me
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className='flex items-center justify-center'>
          <div>
            <DarkModeSwitcher />
          </div>
          <Link
            href='#contact'
            className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-ovo'>
            {" "}
            Contact{" "}
            <Image src={assets.arrow_icon} alt='Contact' className='w-3' />{" "}
          </Link>
          {/* Mobile Menu Button */}
          <button className='block md:hidden ml-3' onClick={openMenu}>
            <Image
              src={assets.menu_black}
              alt='Menu'
              className='w-6 dark:hidden'
            />
            <Image
              src={assets.menu_white}
              alt='Menu'
              className='w-6 hidden dark:block'
            />
          </button>
        </div>

        {/* Overlay + Mobile Menu */}
        <ul
          ref={sideMenuRef}
          className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-gradient-to-b from-gray-900 to-black/80'>
          {/* Close Button */}
          <div
            className='absolute right-6 top-6 cursor-pointer'
            onClick={closeMenu}>
            <Image
              src={assets.close_black}
              alt='Close Menu'
              className='w-5 dark:hidden'
            />
            <Image
              src={assets.close_white}
              alt='Close Menu'
              className='w-5 hidden dark:block'
            />
          </div>

          <li>
            <Link href='#top' className='font-ovo' onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href='#about' className='font-ovo' onClick={closeMenu}>
              About Me
            </Link>
          </li>
          <li>
            <Link href='#services' className='font-ovo' onClick={closeMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link href='#works' className='font-ovo' onClick={closeMenu}>
              My Works
            </Link>
          </li>
          <li>
            <Link
              href='#contact'
              className={`${figtree.className}`}
              onClick={closeMenu}>
              Contact Me
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
