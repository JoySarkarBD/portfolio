"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Figtree, Unbounded } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { assets, serviceData } from "../../../public/assets/assets";
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

export default function Services() {
  const reduceMotion = useReducedMotion();

  // Parent container for stagger
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Animation for each card
  const card = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easeIn: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      id="services"
      className="w-full dark:bg-gradient-to-b from-gray-900 to-black/80 px-[12%] py-10 scroll-mt-20"
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
        <SectionTitle title="My Services" subtitle="What I Offer" />
      </motion.div>

      <motion.p
        className={`text-center max-w-2xl mx-auto mt-5 mb-12 ${figtree.className}`}
        variants={card}
      >
        I offer a range of services to help you achieve your goals. Whether
        you&apos;re looking for web development, design, or consulting, I have
        the expertise to assist you.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10"
        variants={container}
      >
        {serviceData.map(({ title, icon, link, description }, index) => (
          <motion.div
            key={index}
            variants={card}
            whileHover={{ y: -6, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="border border-gray-400 rounded-lg px-8 py-12 cursor-pointer bg-white/70 dark:bg-white/5 backdrop-blur-sm duration-500"
          >
            <Image src={icon} alt={title} className="w-10" />
            <h3
              className={`text-lg my-4 text-gray-700 dark:text-gray-200 ${unbounded.className}`}
            >
              {title}
            </h3>
            <p
              className={`text-sm text-gray-600 dark:text-gray-400 leading-5 ${figtree.className}`}
            >
              {description}
            </p>

            <Link
              href={link}
              className="flex items-center gap-2 text-sm mt-5 text-blue-600 hover:underline"
            >
              Read More{" "}
              <Image src={assets.right_arrow} alt="" className="w-4" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
