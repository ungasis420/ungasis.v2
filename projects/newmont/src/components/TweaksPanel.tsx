'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(12, 14, 30, 0.85);color:#eaeef7;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:1px solid rgba(255,255,255,0.09);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 12px 40px rgba(0,0,0,.6);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(234,238,247,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(255,255,255,.06);color:#fff}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(234,238,247,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(234,238,247,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(234,238,247,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:1px solid rgba(255,255,255,.1);border-radius:7px;
    background:rgba(255,255,255,.05);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.1)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(255,255,255,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(255,255,255,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:1px solid rgba(255,255,255,.12);box-shadow:0 1px 3px rgba(0,0,0,.4);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:1px solid rgba(255,255,255,.12);box-shadow:0 1px 3px rgba(0,0,0,.4);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(255,255,255,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.15);box-shadow:0 1px 2px rgba(0,0,0,.3);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(255,255,255,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#22c55e}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.4);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px;width:100%}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:32px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(255,255,255,.12),0 1px 2px rgba(0,0,0,.2);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(255,255,255,.18),0 4px 10px rgba(0,0,0,.4)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 2px var(--accent, #00d4ff),
    0 2px 6px rgba(0,0,0,.3)}
  .twk-chip svg{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:16px;height:16px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.5))}
`;

export interface TweakState {
  accent: string;
  glass: number;
  glow: boolean;
  anim: boolean;
  density: string;
}

export function useTweaks(defaults: TweakState) {
  const [values, setValues] = useState<TweakState>(() => {
    try {
      const saved = localStorage.getItem('cc_tweaks_state');
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch {}
    return defaults;
  });

  const setTweak = useCallback((keyOrEdits: string | Partial<TweakState>, val?: any) => {
    setValues((prev) => {
      const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
        ? keyOrEdits
        : { [keyOrEdits as string]: val };
      const next = { ...prev, ...edits };
      try {
        localStorage.setItem('cc_tweaks_state', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return [values, setTweak] as const;
}

interface TweaksPanelProps {
  title?: string;
  children: React.ReactNode;
}

export function TweaksPanel({ title = 'Tweaks', children }: TweaksPanelProps) {
  const [open, setOpen] = useState(true); // By default show in Next app, can close
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  const onDragStart = (e: React.MouseEvent) => {
    // Only drag on header
    if ((e.target as HTMLElement).closest('.twk-x')) return;
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;

    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };

    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-[2147483645] bg-[#0c0c20]/90 text-white border border-white/10 rounded-full px-4 py-2 text-xs font-semibold cursor-pointer shadow-lg hover:bg-white/10 transition-all"
        style={{
          borderLeft: '4px solid var(--accent, #00d4ff)',
        }}
      >
        ⚙️ Customize Theme
      </button>
    );
  }

  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div
        ref={dragRef}
        className="twk-panel"
        style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
      >
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x animate-none cursor-pointer" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className="twk-body">{children}</div>
      </div>
    </>
  );
}

export function TweakSection({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

export function TweakRow({ label, value, children, inline = false }: { label: string; value?: string | number; children: React.ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

interface TweakSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

export function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }: TweakSliderProps) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input
        type="range"
        className="twk-slider cursor-pointer"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </TweakRow>
  );
}

interface TweakToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export function TweakToggle({ label, value, onChange }: TweakToggleProps) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      <button
        type="button"
        className="twk-toggle cursor-pointer"
        data-on={value ? '1' : '0'}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  );
}

interface TweakRadioProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

export function TweakRadio({ label, value, options, onChange }: TweakRadioProps) {
  return (
    <TweakRow label={label}>
      <div className="twk-seg" role="radiogroup">
        {options.map((opt) => {
          const isActive = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(opt)}
              className="text-xs py-1 px-3 cursor-pointer rounded-md transition-all font-semibold"
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(234, 238, 247, 0.6)',
              }}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

interface TweakColorProps {
  label: string;
  value: string;
  options?: string[];
  onChange: (v: string) => void;
}

function __twkIsLight(hex: string) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

export function TweakColor({ label, value, options, onChange }: TweakColorProps) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl">
          <span>{label}</span>
        </div>
        <input
          type="color"
          className="twk-swatch cursor-pointer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup" style={{ '--accent': value } as React.CSSProperties}>
        {options.map((o) => {
          const on = o.toLowerCase() === value.toLowerCase();
          const light = __twkIsLight(o);
          return (
            <button
              key={o}
              type="button"
              className="twk-chip cursor-pointer"
              role="radio"
              aria-checked={on}
              data-on={on ? '1' : '0'}
              style={{ backgroundColor: o }}
              onClick={() => onChange(o)}
            >
              {on && (
                <svg
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                  className="w-4 h-4 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <path
                    d="M3 7.2 L5.8 10 L11 4.2"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke={light ? 'rgba(0,0,0,.78)' : '#fff'}
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}
