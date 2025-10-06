"use client";

import { easeInOut, motion, useReducedMotion } from "framer-motion";
import { Figtree, Unbounded } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../../public/assets/assets";

const unbounded = Unbounded({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  subsets: ["latin"],
});

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15 * i,
      },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  const wave = {
    hidden: { rotate: 0, opacity: 0 },
    visible: {
      opacity: 1,
      rotate: [0, 18, -10, 12, -6, 0],
      transition: {
        duration: reduceMotion ? 0.4 : 1,
        ease: easeInOut,
        delay: 0.4,
      },
    },
  };

  return (
    <div className='dark:bg-gradient-to-b from-gray-900 to-black/80'>
      <motion.main
        className='w-11/12 max-w-3xl text-center mx-auto flex flex-col items-center justify-center gap-4 min-h-screen'
        variants={container}
        initial='hidden'
        animate='visible'>
        <motion.div variants={scaleIn}>
          <Image
            src={assets.profile_img}
            alt='Profile Image'
            className='rounded-full w-32 shadow-lg'
            priority
          />
        </motion.div>

        <motion.h3
          className={`flex items-center justify-center gap-2 text-2xl ${unbounded.className}`}
          variants={fadeUp}>
          Hi! I&apos;m Joy Sarkar{" "}
          <motion.span variants={wave} style={{ display: "inline-flex" }}>
            <Image src={assets.hand_icon} alt='Hand Icon' className='w-6' />
          </motion.span>
        </motion.h3>

        <motion.h1
          className={`text-3xl sm:text-6xl lg:text-[66px] font-bold leading-[38px] md:leading-[68px] ${figtree.className}`}
          variants={fadeUp}>
          Full Stack Web Developer Based in Bangladesh.
        </motion.h1>

        <motion.p
          className={`max-w-2xl mx-auto text-xl text-gray-700 dark:text-gray-300 ${figtree.className}`}
          variants={fadeUp}>
          I am a passionate web developer with expertise in building dynamic and
          responsive web applications. With 5 years of experience in the
          industry, I have honed my skills in various technologies and
          frameworks.
        </motion.p>

        <motion.div
          className='flex  items-center gap-2 md:gap-4 mt-4'
          variants={fadeUp}>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href='#contact'
              className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-black text-white shadow-sm'>
              Contact{" "}
              <Image
                src={assets.right_arrow_white}
                alt='Contact'
                className='w-3'
              />
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href='/assets/public/Resume-Of-Joy.pdf'
              className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur'
              download>
              My Resume{" "}
              {/* <Image src={assets.download_icon} alt="My Resume" className="w-3" /> */}
            </Link>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
}
