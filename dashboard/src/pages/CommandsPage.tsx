import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { COMMAND_SECTIONS, CommandItem } from './commands-data';

function CommandRow({ item, sectionColor, index }: { item: CommandItem; sectionColor: string; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.3) }}
      onClick={handleCopy}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '8px',
        padding: '10px 14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      className="hover:bg-white/[0.04] hover:border-white/[0.08] group"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#f8fafc',
            }}
          >
            {item.name}
          </span>
          <code
            style={{
              fontSize: '11px',
              color: sectionColor,
              background: `${sectionColor}15`,
              border: `1px solid ${sectionColor}30`,
              padding: '1px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {item.command}
          </code>
        </div>
        <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>{item.description}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {copied ? (
          <span style={{ fontSize: '11.5px', color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            ✓ Copied
          </span>
        ) : (
          <span className="opacity-0 group-hover:opacity-60 transition-opacity" style={{ fontSize: '11px', color: '#94a3b8' }}>
            Copy
          </span>
        )}
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.03)',
            border: copied ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(255,255,255,0.08)',
            color: copied ? '#22c55e' : '#cbd5e1',
            borderRadius: '6px',
            padding: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '26px',
            height: '26px',
            transition: 'all 0.2s',
          }}
          className="hover:scale-105"
          title="Copy command"
        >
          {copied ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function CommandsPage() {
  const [q, setQ] = useState('');

  const filteredSections = COMMAND_SECTIONS.map((section) => {
    const isTitleMatch = section.title.toLowerCase().includes(q.toLowerCase());
    const filteredCommands = section.commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(q.toLowerCase()) ||
        cmd.description.toLowerCase().includes(q.toLowerCase()) ||
        cmd.command.toLowerCase().includes(q.toLowerCase())
    );

    return {
      ...section,
      commands: isTitleMatch ? section.commands : filteredCommands,
    };
  }).filter((section) => section.commands.length > 0);

  const totalCommandsCount = filteredSections.reduce((acc, s) => acc + s.commands.length, 0);

  return (
    <div style={{ padding: '8px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '22px',
            fontWeight: 700,
            background: 'linear-gradient(to right, #00d4ff, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        >
          ⌘ Commands
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontSize: '11px',
            color: '#94a3b8',
            background: 'rgba(255,255,255,0.03)',
            padding: '4px 10px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          Showing <strong style={{ color: '#e2e8f0' }}>{totalCommandsCount}</strong> of 49 commands
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{ marginBottom: '20px' }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search commands, descriptions, or syntax across all 10 sections..."
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#e2e8f0',
            fontSize: '14px',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s',
          }}
        />
      </motion.div>

      {filteredSections.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: '14px' }}>
          No commands found matching "{q}"
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {filteredSections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: sIdx * 0.03 }}
            >
              <GlassCard
                className="p-5 flex flex-col h-full gap-4 transition-all duration-300 hover:border-white/20"
                style={{ borderLeft: `4px solid ${section.color}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{section.icon}</span>
                    <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                      {section.title}
                    </h2>
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      color: section.color,
                      background: `${section.color}15`,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {section.commands.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {section.commands.map((cmd, cIdx) => (
                    <CommandRow
                      key={cmd.name}
                      item={cmd}
                      sectionColor={section.color}
                      index={cIdx}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
