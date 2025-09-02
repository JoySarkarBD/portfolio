"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Figtree, Unbounded } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { assets, workData } from "../../../public/assets/assets";
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

export default function Works() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const fadeCard = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      id="works"
      className="w-full dark:bg-gradient-to-t from-gray-900 to-black/80 px-[12%] py-10 scroll-mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle title="My Works" subtitle="Showcase of Projects" />
      </motion.div>

      <motion.p
        className={`text-center max-w-2xl mx-auto mt-5 mb-12 ${figtree.className}`}
        variants={fadeUp}
      >
        Welcome to my web development portfolio! Explore a collection of
        projects showcasing my skills and expertise.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10"
        variants={container}
      >
        {workData.map(({ title, bgImage, description }, index) => (
          <motion.div
            key={index}
            variants={fadeCard}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
            style={{ backgroundImage: `url(assets/public${bgImage})` }}
          >
            {/* Slide-up info panel */}
            <motion.div
              initial={{ y: reduceMotion ? 0 : 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="bg-white/95 dark:bg-white/60 backdrop-blur w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7"
            >
              <div>
                <h2 className={`font-semibold ${unbounded.className} dark:text-gray-800`}>{title}</h2>
                <p className={`text-sm text-gray-700 dark:text-gray-600 ${figtree.className}`}>
                  {description}
                </p>
              </div>

              <motion.div
                whileHover={{ rotate: 12 }}
                className="border rounded-full border-black dark:border-white w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_rgba(255,255,255,0.3)] group-hover:bg-lime-300 transition"
              >
                <Image src={assets.send_icon} alt="Send Icon" className="w-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex items-center justify-center my-20"
      >
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link
            href=""
            className="w-max flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 border-[0.5px] px-10 py-3 rounded-full border-gray-700 dark:border-gray-300"
          >
            Show More{" "}
            <Image src={assets.right_arrow_bold} alt="Right Arrow" className="w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
