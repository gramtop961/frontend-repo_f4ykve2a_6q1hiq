import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="w-full sticky top-0 z-20 bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          CN Learn
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/start" className="text-blue-200 hover:text-white transition">Start</Link>
          <Link to="/topology" className="text-blue-200 hover:text-white transition">Network Topology</Link>
          <Link to="/topology/explore" className="text-blue-200 hover:text-white transition">Explore</Link>
          <Link to="/lkpd" className="text-blue-200 hover:text-white transition">LKPD</Link>
          <Link to="/quiz" className="text-blue-200 hover:text-white transition">Quiz</Link>
        </div>
      </div>
    </nav>
  )
}
