import { Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { Play } from 'lucide-react'

function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-20 bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          CN Learn
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/start" className="text-blue-200 hover:text-white transition">Start</Link>
          <Link to="/topology" className="text-blue-200 hover:text-white transition">Network Topology</Link>
          <Link to="/lkpd" className="text-blue-200 hover:text-white transition">LKPD</Link>
          <Link to="/quiz" className="text-blue-200 hover:text-white transition">Quiz</Link>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <header className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Learn Computer Networks
          </h1>
          <p className="text-blue-200 max-w-2xl mb-8">
            Interactive materials, visual topology demos, fillable worksheets (LKPD), reflections, and an auto-graded quiz — all in one place.
          </p>
          <Link to="/start" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30">
            <Play size={18} /> Start Learning
          </Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-6">
        <Card title="Basics" desc="Understand fundamentals: types of networks, devices, media, and protocols." to="/start" />
        <Card title="Topologies" desc="Explore bus, star, ring, mesh, tree, and hybrid with animated flows." to="/topology/explore" />
        <Card title="Practice" desc="Complete LKPD, reflect on your learning, and take a quiz with instant scoring." to="/lkpd" />
      </section>
    </div>
  )
}

function Card({ title, desc, to }) {
  return (
    <Link to={to} className="group bg-slate-900/70 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,.15)] transition block">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-500 rounded" /> {title}
      </h3>
      <p className="text-blue-200/80 text-sm">{desc}</p>
    </Link>
  )
}
