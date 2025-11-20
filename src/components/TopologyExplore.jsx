import { useState } from 'react'

const TOPOLOGIES = [
  {
    key: 'bus',
    name: 'Bus',
    description: 'All devices share a single backbone cable. Data is broadcast and terminators prevent signal bounce.',
  },
  {
    key: 'star',
    name: 'Star',
    description: 'All devices connect to a central switch/hub. Traffic is switched to the destination port.',
  },
  {
    key: 'ring',
    name: 'Ring',
    description: 'Each device connects to two others, forming a loop. Frames travel in one direction.',
  },
  {
    key: 'mesh',
    name: 'Mesh',
    description: 'Devices interconnect with multiple redundant paths, improving resilience.',
  },
  {
    key: 'tree',
    name: 'Tree',
    description: 'Hierarchical combination (like multiple stars connected).',
  },
  {
    key: 'hybrid',
    name: 'Hybrid',
    description: 'Mix of two or more topologies to meet specific needs.',
  },
]

function Node({ active }) {
  return <div className={`w-4 h-4 rounded-full ${active ? 'bg-emerald-400' : 'bg-blue-400'}`} />
}

function AnimatedCanvas({ type }) {
  // Simple CSS-based animation to visualize flow per topology
  switch (type) {
    case 'bus':
      return (
        <div className="relative h-40 bg-slate-900/60 border border-white/10 rounded-xl overflow-hidden">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-blue-500/60" />
          {[0,1,2,3,4].map((i) => (
            <div key={i} className="absolute -translate-y-1/2" style={{ left: `${10 + i*18}%`, top: '50%' }}>
              <Node />
            </div>
          ))}
          <div className="absolute top-[calc(50%-2px)] left-4 right-4 h-1 overflow-visible">
            <div className="absolute -left-6 w-4 h-4 bg-emerald-400 rounded-full animate-[flow_2.8s_linear_infinite]" />
          </div>
          <style>{`@keyframes flow{0%{left:-1rem}100%{left:calc(100% - .5rem)}}`}</style>
        </div>
      )
    case 'star':
      return (
        <div className="relative h-40 bg-slate-900/60 border border-white/10 rounded-xl">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Node active /></div>
          {['-32%','0%','32%','-16%','16%','48%'].map((y,i)=>(
            <div key={i} className="absolute left-6 right-6" style={{ top: `calc(50% + ${y})` }}>
              <div className="absolute" style={{ left: `${10 + i*12}%`, top: 0 }}><Node /></div>
              <div className="h-[1px] bg-blue-500/60 w-full" />
            </div>
          ))}
          <div className="absolute left-0 right-0 top-1/2 h-0.5">
            <div className="absolute left-0 w-2 h-2 bg-emerald-400 rounded-full animate-[pulseStar_2s_ease_infinite]" />
          </div>
          <style>{`@keyframes pulseStar{0%,100%{transform:translateX(10%)}50%{transform:translateX(90%)}}`}</style>
        </div>
      )
    case 'ring':
      return (
        <div className="relative h-40 bg-slate-900/60 border border-white/10 rounded-xl flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border border-blue-500/60 relative">
            {[0,60,120,180,240,300].map((deg,i)=> (
              <div key={i} className="absolute" style={{ left: '50%', top: '50%', transform: `translate(-50%,-50%) rotate(${deg}deg) translate(80px)` }}>
                <Node />
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-[ring_3s_linear_infinite]" style={{ transformOrigin: '0 0' }} />
            <style>{`@keyframes ring{0%{transform:translate(-50%,-50%) rotate(0deg) translate(80px)}100%{transform:translate(-50%,-50%) rotate(360deg) translate(80px)}}`}</style>
          </div>
        </div>
      )
    case 'mesh':
      return (
        <div className="relative h-40 bg-slate-900/60 border border-white/10 rounded-xl">
          {[0,1,2].map(r=>[0,1,2,3].map(c=> (
            <div key={`${r}-${c}`} className="absolute" style={{ left: `${15 + c*20}%`, top: `${20 + r*25}%` }}><Node /></div>
          )))}
          {Array.from({length:4}).map((_,c)=> (
            <div key={c} className="absolute left-0 right-0" style={{ top: `${20 + c*15}%` }}>
              <div className="h-[1px] bg-blue-500/40" />
            </div>
          ))}
          {Array.from({length:5}).map((_,r)=> (
            <div key={r} className="absolute top-0 bottom-0" style={{ left: `${15 + r*17}%` }}>
              <div className="w-[1px] h-full bg-blue-500/40" />
            </div>
          ))}
          <div className="absolute inset-0">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[mesh_4s_linear_infinite]" />
          </div>
          <style>{`@keyframes mesh{0%{transform:translate(10%,15%)}50%{transform:translate(85%,70%)}100%{transform:translate(10%,15%)}}`}</style>
        </div>
      )
    case 'tree':
      return (
        <div className="relative h-40 bg-slate-900/60 border border-white/10 rounded-xl">
          <div className="absolute left-1/2 -translate-x-1/2 top-4"><Node active /></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-blue-500/50" />
          {[0,1].map((lvl)=> (
            <div key={lvl} className="absolute left-6 right-6" style={{ top: `${30 + lvl*30}%` }}>
              <div className="h-[1px] bg-blue-500/50" />
              {[0,1,2,3].map(i=> (
                <div key={i} className="absolute -translate-y-1/2" style={{ left: `${10 + i*20}%`, top: '0' }}><Node /></div>
              ))}
            </div>
          ))}
          <div className="absolute left-1/2 top-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[tree_3s_ease_infinite]" />
          </div>
          <style>{`@keyframes tree{0%{transform:translate(-50%,0)}50%{transform:translate(100%,110px)}100%{transform:translate(-50%,0)}}`}</style>
        </div>
      )
    case 'hybrid':
      return (
        <div className="relative h-40 bg-slate-900/60 border border-white/10 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="relative border border-blue-500/40 rounded-lg"><AnimatedCanvas type="bus" /></div>
            <div className="relative border border-blue-500/40 rounded-lg"><AnimatedCanvas type="star" /></div>
            <div className="relative border border-blue-500/40 rounded-lg"><AnimatedCanvas type="ring" /></div>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default function TopologyExplore() {
  const [active, setActive] = useState('bus')
  const item = TOPOLOGIES.find(t=>t.key===active)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Explore Network Topologies</h1>
        <p className="text-blue-200/90 mb-10">Select a topology to see a brief explanation and a simple animated visualization of data flow.</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {TOPOLOGIES.map(t=> (
            <button key={t.key} onClick={()=>setActive(t.key)} className={`px-4 py-2 rounded-xl border ${active===t.key? 'bg-blue-600 border-blue-500' : 'bg-slate-900/60 border-white/10 hover:border-blue-500/50'}`}>{t.name}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{item.name} Topology</h2>
            <p className="text-blue-200/90 leading-relaxed mb-4">{item.description}</p>
            <ul className="list-disc pl-6 space-y-2 text-blue-100/90">
              <li>Advantages and disadvantages vary by layout and use-case.</li>
              <li>Consider scalability, fault tolerance, and cost.</li>
              <li>Real-world networks often combine multiple topologies.</li>
            </ul>
          </div>
          <div>
            <AnimatedCanvas type={active} />
          </div>
        </div>
      </div>
    </div>
  )
}
