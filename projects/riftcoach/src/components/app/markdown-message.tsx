// src/components/app/markdown-message.tsx
// QF-1: Markdown renderer for AI chat messages
// Renders AI responses as formatted HTML instead of raw text

'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownMessageProps {
  content: string
  className?: string
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <div className={cn('markdown-message', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings — styled to match cinematic UI
          h1: ({ children }) => (
            <h1 className="mb-3 mt-4 text-xl font-bold text-foreground first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 mt-3 text-lg font-semibold text-foreground first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-3 text-base font-semibold text-foreground first:mt-0">
              {children}
            </h3>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-2 leading-relaxed last:mb-0">{children}</p>
          ),

          // Bold and italic
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-muted-foreground">{children}</em>
          ),

          // Lists — bullet and numbered
          ul: ({ children }) => (
            <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),

          // Code — inline and block
          code: ({ className: codeClassName, children, ...props }) => {
            // Check if this is a code block (has language class) or inline code
            const isBlock = codeClassName?.startsWith('language-')
            if (isBlock) {
              return (
                <code
                  className={cn(
                    'block overflow-x-auto rounded-lg bg-black/30 p-3 text-sm',
                    'border border-white/10 font-mono',
                    codeClassName
                  )}
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code
                className="rounded bg-white/10 px-1.5 py-0.5 text-sm font-mono text-indigo-300"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-2 overflow-x-auto">{children}</pre>
          ),

          // Tables — GFM tables styled for glassmorphism
          table: ({ children }) => (
            <div className="mb-2 overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-white/10 bg-white/5">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-white/5 last:border-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-muted-foreground">{children}</td>
          ),

          // Blockquotes — coach tips
          blockquote: ({ children }) => (
            <blockquote className="mb-2 border-l-2 border-indigo-500/50 pl-3 italic text-muted-foreground">
              {children}
            </blockquote>
          ),

          // Horizontal rule
          hr: () => <hr className="my-3 border-white/10" />,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}