"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "../../../public/assets/assets";

export default function Footer() {
  return (
    <footer className='pt-20 px-5 dark:bg-gradient-to-t from-gray-900 to-black/80'>
      {/* Logo */}
      <div className='text-center'>
        <Image
          src={assets.logo}
          alt='Logo'
          className='w-36 mx-auto mb-4'
          priority
        />
      </div>

      {/* Email */}
      <div className='w-full flex items-center justify-center gap-2 flex-wrap pb-6'>
        <Image src={assets.mail_icon} alt='Mail Icon' className='w-6' />
        <span className='text-gray-600 text-sm sm:text-base break-all'>
          developer.joysarkar@gmail.com
        </span>
      </div>

      {/* Bottom section */}
      <div className='py-12 border-t border-gray-400 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mx-[5%]'>
        <p className='text-sm sm:text-base'>
          © {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </p>

        {/* Social Links */}
        <ul className='flex flex-wrap justify-center sm:justify-end gap-4 text-sm sm:text-base'>
          <li>
            <Link
              href='https://github.com/yourusername'
              target='_blank'
              className='hover:text-primary transition'>
              Github
            </Link>
          </li>
          <li>
            <Link
              href='https://www.linkedin.com/in/yourusername'
              target='_blank'
              className='hover:text-primary transition'>
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              href='https://twitter.com/yourusername'
              target='_blank'
              className='hover:text-primary transition'>
              Twitter
            </Link>
          </li>
          <li>
            <Link
              href='https://www.instagram.com/yourusername'
              target='_blank'
              className='hover:text-primary transition'>
              Instagram
            </Link>
          </li>
          <li>
            <Link
              href='https://www.facebook.com/yourusername'
              target='_blank'
              className='hover:text-primary transition'>
              Facebook
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
