"use client";
import Link from "next/link";
const g=[
  {r:"Iron to Gold",i:"🥉",f:"Fundamentals",t:["Farm 7+ CS/min — this alone wins games","Play simple: Garen, Malphite, Amumu, MF, Lux","Die less than 5 times per game","Take towers after eliminations","Buy anti-heal vs Aatrox, Fiora, Soraka"]},
  {r:"Platinum to Emerald",i:"💎",f:"Macro Awareness",t:["Track enemy jungler — contest dragon when they show top","Ward objectives 30s before spawn","Roam mid after pushing cannon wave","Freeze when ahead, push when roaming","Contest every Dragon — first 2 buffs are game-changing"]},
  {r:"Diamond to Master",i:"👑",f:"Decision Making",t:["Counter-pick in draft — learn 3+ matchups","Read team comps in loading screen","Split push when enemy groups for objectives","Invade jungle with lane priority","Track Flash cooldowns (150s)"]},
  {r:"Grandmaster to Sovereign",i:"🏆",f:"Mastery & Consistency",t:["Perfect 3-champion pool — mastery beats meta","Slow push 3 waves before diving with jungler","Track every enemy ultimate timer","Stop after 2 losses, review replays","7.5+ CS/min, under 4 deaths, 60%+ KP"]},
];
export default function ClimbPage() {
  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-indigo-400 hover:underline mb-4 inline-block">&larr; Dashboard</Link>
      <h1 className="text-2xl font-bold text-white mb-6">🧗 Climb Guide</h1>
      {g.map(b=>(<div key={b.r} className="bg-slate-900 rounded-xl border border-slate-700/50 p-5 mb-4 card-hover">
        <div className="flex items-center gap-3 mb-3"><span className="text-3xl">{b.i}</span><div><h3 className="text-white font-bold text-lg">{b.r}</h3><span className="text-xs text-slate-400">{b.f}</span></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{b.t.map((t,i)=>(<div key={i} className="flex items-start gap-2 text-sm"><span className="text-indigo-400 mt-0.5 shrink-0">▸</span><span className="text-slate-300">{t}</span></div>))}</div>
      </div>))}
    </div>
  );
}
