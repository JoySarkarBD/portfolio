"use client";
import { motion } from 'framer-motion';
import { Figtree, Unbounded } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { assets } from "../../../public/assets/assets";
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
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/contact-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg("✅ Your message has been sent successfully!");
        form.reset();
      } else {
        setResponseMsg(
          typeof data.message === "string"
            ? `❌ ${data.message}`
            : "❌ Please fill out all required fields correctly."
        );
      }
    } catch {
      setResponseMsg("❌ Failed to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='contact' className='w-full dark:bg-gradient-to-b from-gray-900 to-black/80 px-[12%] py-10'>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-12"
      >
        <SectionTitle title="Contact Me" subtitle="Get In Touch" />
        <p className={`text-center max-w-2xl mx-auto mt-5 mb-12 ${figtree.className}`}>
          I&apos;m here to help and answer any questions you might have. I look
          forward to hearing from you!
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <form
          onSubmit={handleSubmit}
          className='max-w-2xl mx-auto bg-white dark:bg-gradient-to-b from-gray-900 to-black/90 rounded-2xl shadow-lg p-8 space-y-6'>
          {/* Name */}
          <div>
            <label
              htmlFor='name'
              className={`block text-sm font-normal mb-2 ${unbounded.className}`}>
              Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Enter your name'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-primary focus:outline-none font-outfit'
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor='email'
              className={`block text-sm font-normal mb-2 ${unbounded.className}`}>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none font-outfit'
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor='message'
              className={`block text-sm font-normal mb-2 ${unbounded.className}`}>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows={5}
              placeholder='Write your message...'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none font-outfit resize-none'
              required></textarea>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full text-base mx-auto hover:bg-black duration-500 disabled:opacity-60 ${unbounded.className}`}>
            {loading ? "Sending..." : "Send Message"}
            {!loading && (
              <Image src={assets.right_arrow_white} className='w-4' alt='' />
            )}
          </button>

          {/* Response message */}
          {responseMsg && (
            <p className='text-center mt-4 font-ovo text-sm'>{responseMsg}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
