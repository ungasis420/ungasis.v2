"use client";
import { useState } from "react";
import Link from "next/link";
export default function ReviewPage() {
  const [ch,setCh]=useState(""); const [role,setRole]=useState("Mid"); const [res,setRes]=useState("defeat");
  const [rank,setRank]=useState("Diamond"); const [kda,setKda]=useState(""); const [cs,setCs]=useState("");
  const [vs,setVs]=useState(""); const [dmg,setDmg]=useState(""); const [notes,setNotes]=useState("");
  const [analysis,setAnalysis]=useState(""); const [loading,setLoading]=useState(false);

  const submit=async()=>{
    if(!ch||!kda)return; setLoading(true); setAnalysis("");
    try{
      const s=localStorage.getItem("riftcoach-settings"); const keys=s?JSON.parse(s).state?.keys||[]:[];
      const k=keys.find((k:string)=>k.trim()); if(!k){setAnalysis("No API key. Go to Settings.");setLoading(false);return;}
      const r=await fetch("/api/review",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({stats:{champion:ch,role,result:res,rank,kda,csPerMin:parseFloat(cs)||0,visionScore:parseInt(vs)||0,damageDealt:parseInt(dmg)||0,notes},apiKey:k,model:"openrouter/free"})});
      if(!r.ok){setAnalysis("Failed.");setLoading(false);return;}
      const rd=r.body?.getReader(); const d=new TextDecoder(); let c="";
      while(rd){const{done,value}=await rd.read();if(done)break;const ch2=d.decode(value,{stream:true});for(const l of ch2.split("\n")){if(l.startsWith("data: ")&&!l.includes("[DONE]")){try{const dt=JSON.parse(l.slice(6));const dl=dt.choices?.[0]?.delta?.content;if(dl){c+=dl;setAnalysis(c);}}catch{}}}}
    }catch{setAnalysis("Error.");}setLoading(false);
  };
  const roles=["Baron","Jungle","Mid","Dragon","Support"];
  const ranks=["Iron","Bronze","Silver","Gold","Platinum","Emerald","Diamond","Master","Grandmaster","Sovereign"];
  const inp="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500";
  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-indigo-400 hover:underline mb-4 inline-block">&larr; Dashboard</Link>
      <h1 className="text-2xl font-bold text-white mb-6">📊 Match Review</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl border border-slate-700/50 p-5">
          <h3 className="text-white font-bold mb-4">Match Stats</h3>
          <div className="space-y-3">
            <div><label className="text-xs text-slate-400 mb-1 block">Champion</label><input value={ch} onChange={e=>setCh(e.target.value)} placeholder="e.g. Kai'Sa" className={inp}/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-400 mb-1 block">Role</label><select value={role} onChange={e=>setRole(e.target.value)} className={inp}>{roles.map(r=><option key={r}>{r}</option>)}</select></div>
              <div><label className="text-xs text-slate-400 mb-1 block">Result</label><select value={res} onChange={e=>setRes(e.target.value)} className={inp}><option value="victory">Victory</option><option value="defeat">Defeat</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-400 mb-1 block">KDA</label><input value={kda} onChange={e=>setKda(e.target.value)} placeholder="8/3/12" className={inp}/></div>
              <div><label className="text-xs text-slate-400 mb-1 block">Rank</label><select value={rank} onChange={e=>setRank(e.target.value)} className={inp}>{ranks.map(r=><option key={r}>{r}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="text-xs text-slate-400 mb-1 block">CS/min</label><input value={cs} onChange={e=>setCs(e.target.value)} placeholder="6.5" type="number" step="0.1" className={inp}/></div>
              <div><label className="text-xs text-slate-400 mb-1 block">Vision</label><input value={vs} onChange={e=>setVs(e.target.value)} placeholder="18" type="number" className={inp}/></div>
              <div><label className="text-xs text-slate-400 mb-1 block">Damage</label><input value={dmg} onChange={e=>setDmg(e.target.value)} placeholder="28000" type="number" className={inp}/></div>
            </div>
            <div><label className="text-xs text-slate-400 mb-1 block">Notes</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="What happened?" className={inp+" h-20 resize-none"}/></div>
            <button onClick={submit} disabled={loading||!ch||!kda} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition">{loading?"Analyzing...":"🤖 Analyze Match"}</button>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl border border-slate-700/50 p-5">
          <h3 className="text-white font-bold mb-4">AI Analysis</h3>
          {!analysis&&!loading&&<div className="text-center py-16 text-slate-500"><div className="text-3xl mb-3">📊</div><p className="text-sm">Enter stats and click Analyze</p></div>}
          {(analysis||loading)&&<div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{analysis||"Analyzing..."}</div>}
        </div>
      </div>
    </div>
  );
}
