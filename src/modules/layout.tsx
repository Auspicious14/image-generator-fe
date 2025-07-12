"use client";

import Image from "next/image";
import Link from "next/link";

import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cta",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}
    >
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/inkly-logo-black.png"
              alt="Image Generator Logo"
              width={70}
              height={70}
            />
          </Link>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-orange-500">
              Home
            </Link>
            <Link href="/features" className="hover:text-orange-500">
              Features
            </Link>
            <Link href="/gallery" className="hover:text-orange-500">
              Gallery
            </Link>
            <Link href="/login" className="hover:text-orange-500">
              Login
            </Link>
          </nav>
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <Bars3Icon className="w-6 h-6" onClick={() => setIsOpen(!isOpen)} />
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              <motion.nav
                className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg px-6 py-8 space-y-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-blue-400">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-orange-500"
                  >
                    <XMarkIcon
                      className="w-6 h-6"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  </button>
                </div>

                <Link
                  href="/"
                  className="block text-gray-700 hover:text-orange-500"
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className="block text-gray-700 hover:text-orange-500"
                >
                  Features
                </Link>
                <Link
                  href="/gallery"
                  className="block text-gray-700 hover:text-orange-500"
                >
                  Gallery
                </Link>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-orange-500"
                >
                  Login
                </Link>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>
      {children}

      <footer className="bg-white py-10 border-t">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p>
              <Link href="/about" className="text-sm hover:text-orange-500">
                About
              </Link>
            </p>
            <p>
              <Link href="/contact" className="text-sm hover:text-orange-500">
                Contact
              </Link>
            </p>
            <p>
              <Link href="/privacy" className="text-sm hover:text-orange-500">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="md:col-span-1 text-center">
            <p className="font-semibold text-sm">Subscribe to our newsletter</p>
            <form className="flex mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md border text-sm"
              />
              <button className="bg-orange-500 text-white px-4 py-2 text-sm rounded-r-md">
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://twitter.com"
              className="text-orange-500 hover:text-orange-600"
              target="_blank"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-orange-500 hover:text-orange-600"
              target="_blank"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
