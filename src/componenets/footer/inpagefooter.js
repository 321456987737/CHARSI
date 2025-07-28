"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Github, Rss } from "lucide-react";

const BlogFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border-t mt-12 border-gray-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">MindfulBytes</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Curated thoughts on technology, design, and the creative process.
          </p>
          <div className="flex flex-wrap gap-4">
            <SocialIcon 
              href="https://twitter.com" 
              icon={<Twitter className="w-5 h-5" />}
              color="hover:text-blue-400"
            />
            <SocialIcon 
              href="https://github.com" 
              icon={<Github className="w-5 h-5" />}
              color="hover:text-gray-700"
            />
            <SocialIcon 
              href="https://linkedin.com" 
              icon={<Linkedin className="w-5 h-5" />}
              color="hover:text-blue-600"
            />
            <SocialIcon 
              href="/rss" 
              icon={<Rss className="w-5 h-5" />}
              color="hover:text-orange-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Explore
          </h4>
          <ul className="space-y-3">
            <FooterLink href="/" text="Home" />
            <FooterLink href="/articles" text="All Articles" />
            <FooterLink href="/categories" text="Categories" />
            <FooterLink href="/popular" text="Popular Reads" />
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Resources
          </h4>
          <ul className="space-y-3">
            <FooterLink href="/style-guide" text="Style Guide" />
            <FooterLink href="/code-snippets" text="Code Snippets" />
            <FooterLink href="/newsletter" text="Newsletter" />
            <FooterLink href="/contact" text="Contact" />
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Stay Updated
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe to receive the latest posts and updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 text-sm rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-gray-700 transition w-full sm:w-auto flex items-center justify-center"
            >
              <Mail className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} MindfulBytes. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-6">
          <FooterLink href="/privacy" text="Privacy Policy" small />
          <FooterLink href="/terms" text="Terms of Service" small />
          <FooterLink href="/cookies" text="Cookies" small />
        </div>
      </div>
    </motion.footer>
  );
};

// Reusable components
const FooterLink = ({ href, text, small = false }) => (
  <li>
    <Link
      href={href}
      className={`${small ? 'text-xs' : 'text-sm'} text-gray-600 hover:text-gray-900 transition`}
    >
      {text}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-gray-500 ${color} transition`}
  >
    {icon}
  </a>
);

export default BlogFooter;
