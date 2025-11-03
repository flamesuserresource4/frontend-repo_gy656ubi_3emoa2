import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Server, Database } from 'lucide-react';

const projects = [
  {
    title: 'Event-driven Order Processing',
    desc: 'A resilient microservice architecture with idempotent consumers, saga orchestration, and end-to-end observability.',
    tags: ['Kafka', 'PostgreSQL', 'FastAPI', 'OpenTelemetry'],
    links: { github: '#', live: '#' },
    icon: Server,
  },
  {
    title: 'Time-series Analytics Platform',
    desc: 'Ingests millions of datapoints per minute with downsampling, dynamic retention, and query caching.',
    tags: ['ClickHouse', 'Redis', 'gRPC', 'Kubernetes'],
    links: { github: '#', live: '#' },
    icon: Database,
  },
  {
    title: 'Auth & Access Gateway',
    desc: 'A centralized auth service with JWT, role-based access, rate limiting, and audit trails.',
    tags: ['OAuth2', 'JWT', 'Nginx', 'Terraform'],
    links: { github: '#', live: '#' },
    icon: Server,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Selected Projects</h2>
        <p className="text-sm text-zinc-600">Built with performance, resilience, and clarity</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-800">
                <p.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">{p.title}</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-zinc-700">{p.desc}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-3">
              <a
                href={p.links.github}
                className="inline-flex items-center gap-1 text-sm text-zinc-700 hover:text-zinc-900"
                aria-label={`GitHub repository for ${p.title}`}
              >
                <Github size={18} /> Code
              </a>
              <a
                href={p.links.live}
                className="inline-flex items-center gap-1 text-sm text-zinc-700 hover:text-zinc-900"
                aria-label={`Live demo for ${p.title}`}
              >
                <ExternalLink size={18} /> Live
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
