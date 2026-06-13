import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/projects/ProjectCard';
import { useProjectStore } from '../stores/useProjectStore';

export function ProjectsPage() {
  const projects = useProjectStore((state) => state.projects);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6" style={{ backgroundColor: 'transparent', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header className="mb-8">
        <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>Projects</h1>
        <p style={{ color: '#ffffff80', fontSize: '16px', marginTop: '8px' }}>Track all active projects</p>
      </header>

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, i) => (
          <motion.div key={i} variants={item}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProjectsPage;
