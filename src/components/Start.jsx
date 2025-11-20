import { Link } from 'react-router-dom'

export default function Start() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">Computer Networks Basics</h1>
        <p className="text-blue-200/90 leading-relaxed mb-6">
          Computer networks connect devices to share data and resources. Key building blocks include hosts (computers, phones), networking devices (switches, routers, access points), transmission media (copper, fiber, wireless), and protocols (rules) like TCP/IP.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-blue-100/90 mb-8">
          <li>Network Types: LAN, MAN, WAN, PAN, WLAN</li>
          <li>Devices: NIC, Switch, Router, Hub, Access Point, Modem</li>
          <li>Media: UTP/STP, Coaxial, Fiber Optic, Radio (Wi‑Fi, Bluetooth)</li>
          <li>Topologies: Bus, Star, Ring, Mesh, Tree, Hybrid</li>
          <li>OSI vs TCP/IP Models, IP addressing, Subnetting, Routing</li>
          <li>Security: Firewalls, VPN, Encryption, Authentication</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link to="/topology" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl">Go to Selected Material</Link>
          <Link to="/lkpd" className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl">Start LKPD</Link>
        </div>
      </div>
    </div>
  )
}
