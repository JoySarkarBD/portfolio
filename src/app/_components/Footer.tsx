"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../../public/assets/assets";
import { LOGO } from "./Logo";

export default function Footer() {
  return (
    <footer className='pt-20 px-5 dark:bg-gradient-to-t from-gray-900 to-black/80'>
      {/* Logo */}
      <div className='text-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}>
          <LOGO />
        </motion.div>
      </div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}>
        <Link
          className='w-full flex items-center justify-center gap-2 flex-wrap pb-6'
          href='mailto:developer.joysarkar@gmail.com'>
          <Image src={assets.mail_icon} alt='Mail Icon' className='w-6' />
          <span className='text-gray-600 text-sm sm:text-base break-all'>
            developer.joysarkar@gmail.com
          </span>
        </Link>
      </motion.div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}>
        <div className='py-12 border-t border-gray-400 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mx-[5%]'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}>
            <p className='text-sm sm:text-base'>
              © {new Date().getFullYear()} Joy Sarkar. All rights reserved.
            </p>
          </motion.div>

          {/* Social Links */}
          <ul className='flex flex-wrap justify-center sm:justify-end gap-4 text-sm sm:text-base'>
            <li>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}>
                <Link
                  href='https://github.com/JoySarkarBD'
                  target='_blank'
                  className='hover:text-primary transition'>
                  Github
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}>
                <Link
                  href='https://www.linkedin.com/in/joysarkarbd/'
                  target='_blank'
                  className='hover:text-primary transition'>
                  LinkedIn
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}>
                <Link
                  href='https://x.com/Joy_Sarkar_BD'
                  target='_blank'
                  className='hover:text-primary transition'>
                  Twitter
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}>
                <Link
                  href='https://www.instagram.com/joy_sarkar_bd/'
                  target='_blank'
                  className='hover:text-primary transition'>
                  Instagram
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}>
                <Link
                  href='https://www.facebook.com/webdev.joysarkar/'
                  target='_blank'
                  className='hover:text-primary transition'>
                  Facebook
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>
      </motion.div>
    </footer>
  );
}
