import React from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <Hero />

      {/* Subtle divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <Projects />
      <Skills />
      <Contact />

      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-8 text-xs text-zinc-500">
        © {new Date().getFullYear()} Backend Developer Portfolio. Built with React and Tailwind.
      </footer>
    </div>
  );
}

export default App;
