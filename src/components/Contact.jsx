import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Get in touch</h2>
        <p className="text-sm text-zinc-600">Open to interesting backend roles and collaborations</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <a
            href="mailto:developer@example.com"
            className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            <Mail size={20} />
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-xs text-zinc-600">developer@example.com</div>
            </div>
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            <Github size={20} />
            <div>
              <div className="text-sm font-medium">GitHub</div>
              <div className="text-xs text-zinc-600">github.com/your-github</div>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            <Linkedin size={20} />
            <div>
              <div className="text-sm font-medium">LinkedIn</div>
              <div className="text-xs text-zinc-600">in/your-linkedin</div>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
