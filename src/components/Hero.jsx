import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-[90vh] w-full overflow-hidden rounded-b-3xl">
      {/* Spline Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Soft gradient to improve text contrast; doesn't block interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6">
        {/* Minimal top bar */}
        <div className="flex items-center justify-between py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-semibold tracking-tight text-zinc-800"
          >
            dev.portfolio
          </motion.div>
          <nav className="hidden gap-6 text-sm text-zinc-700 md:flex">
            <a href="#projects" className="hover:text-zinc-900 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-zinc-900 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
          </nav>
        </div>

        <div className="flex flex-1 items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl md:text-6xl"
            >
              Backend Developer focused on reliability, performance, and craft.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base leading-relaxed text-zinc-700 sm:text-lg"
            >
              I design and build APIs, services, and data pipelines with clean architectures,
              observability first, and a user-centered mindset.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-white shadow-sm transition-colors hover:bg-zinc-800"
              >
                View Projects <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-zinc-800 transition-colors hover:bg-zinc-50"
              >
                Resume <Download size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
