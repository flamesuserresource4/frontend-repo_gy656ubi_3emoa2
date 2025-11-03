import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Cloud, Lock, Cpu, Boxes } from 'lucide-react';

const skills = [
  { icon: Server, label: 'FastAPI / Node' },
  { icon: Database, label: 'Postgres / MongoDB' },
  { icon: Cloud, label: 'AWS / GCP' },
  { icon: Lock, label: 'Auth / Security' },
  { icon: Cpu, label: 'Distributed Systems' },
  { icon: Boxes, label: 'Containers / CI' },
];

const Skills = () => {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Core Skills</h2>
        <p className="text-sm text-zinc-600">Pragmatic, tested, and production-proven</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {skills.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.04 * i }}
            className="group rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm transition-colors hover:border-zinc-300"
          >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-50 text-zinc-800">
              <Icon size={22} />
            </div>
            <div className="text-sm font-medium text-zinc-800">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
