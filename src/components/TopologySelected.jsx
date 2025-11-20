import { Link } from 'react-router-dom'

export default function TopologySelected() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Network Topology</h1>
        <p className="text-blue-200/90 mb-8">Understand how devices are arranged and how data flows in different layouts.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/topology/explore" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl">Explore Material</Link>
          <Link to="/lkpd" className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl">Start LKPD</Link>
        </div>
      </div>
    </div>
  )
}
