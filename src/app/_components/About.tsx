"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Figtree, Unbounded } from "next/font/google";
import Image from "next/image";
import { assets, infoList, toolsData } from "../../../public/assets/assets";
import SectionTitle from "./section-title";

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

export default function About() {
  const reduceMotion = useReducedMotion();

  // Variants
  const section = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.92, y: reduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  const groupStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      id="about"
      className="w-full dark:bg-gradient-to-t dark:border-t from-gray-900 to-black/80 px-[12%] py-10 scroll-mt-20"
      variants={section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle title="About Me" subtitle="Introduction" />
      </motion.div>

      <motion.div
        className="flex w-full flex-col lg:flex-row items-center gap-20 my-20"
        variants={groupStagger}
      >
        {/* Portrait */}
        <motion.div
          className="w-64 sm:w-80 rounded-3xl max-w-none"
          variants={scaleIn}
        >
          <Image
            src={assets.user_image}
            alt="Profile"
            className="rounded-3xl w-full shadow-lg"
            priority
          />
        </motion.div>

        {/* Text + Cards + Tools */}
        <motion.div className="flex-1 space-y-6" variants={groupStagger}>
          <motion.p
            className={`mb-4 max-w-2xl ${figtree.className}`}
            variants={fadeUp}
          >
            I am a passionate web developer with expertise in building dynamic
            and responsive web applications. With 5 years of experience in the
            industry, I have honed my skills in various technologies and
            frameworks. I am constantly seeking to learn and grow as a
            developer, and I am excited to take on new challenges in the
            ever-evolving field of web development.
          </motion.p>

          {/* Info cards */}
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl"
            variants={groupStagger}
          >
            {infoList.map(({ icon, title, description }, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white/70 backdrop-blur-sm dark:bg-gradient-to-b dark:border-gray-600 from-gray-900 to-black/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Image src={icon} alt={title} className="w-6 h-6" />
                  <h3
                    className={`font-semibold text-lg ${unbounded.className}`}
                  >
                    {title}
                  </h3>
                </div>
                <p
                  className={`text-gray-600 dark:text-slate-300 leading-relaxed max-h-48 overflow-y-auto ${figtree.className}`}
                >
                  {description}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tools */}
          <motion.h4
            className={`my-2 text-gray-700 dark:text-slate-300 ${figtree.className}`}
            variants={fadeUp}
          >
            Tools I Use
          </motion.h4>

          <motion.ul
            className="flex items-center gap-3 sm:gap-5"
            variants={groupStagger}
          >
            {toolsData.map(({ height, src, width }, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer bg-white/70 dark:bg-white/5"
                variants={fadeUp}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src={src}
                  width={width}
                  height={height}
                  alt="tool"
                  className="w-5 sm:w-7"
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
