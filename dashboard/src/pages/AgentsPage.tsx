import React from 'react';
import { motion } from 'framer-motion';
import { AgentCard } from '../components/agents/AgentCard';
import { useAgentStore } from '../stores/useAgentStore';

export function AgentsPage() {
  const agents = useAgentStore((state) => state.agents);
  const onlineCount = agents.filter(a => a.status === 'online').length;

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
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>Agents</h1>
          <p style={{ color: '#ffffff80', fontSize: '16px', marginTop: '8px' }}>Your AI crew status</p>
        </div>
        <div style={{ backgroundColor: '#ffffff10', padding: '8px 16px', borderRadius: '9999px', color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>
          <span style={{ color: '#22c55e' }}>{onlineCount}</span> online / {agents.length} total
        </div>
      </header>

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {agents.map((agent, i) => (
          <motion.div key={i} variants={item}>
            <AgentCard {...agent} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default AgentsPage;
