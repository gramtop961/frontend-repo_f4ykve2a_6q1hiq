import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialAnswers = {
  q1: '', q2: '', q3: '', q4: ''
}

export default function LKPD() {
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [answers, setAnswers] = useState(initialAnswers)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/worksheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, class_name: className, answers })
      })
      const data = await res.json()
      if (data.submission_id) {
        navigate(`/reflection?sid=${data.submission_id}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">LKPD: Network Topologies</h1>
        <form onSubmit={submit} className="space-y-4 bg-slate-900/60 border border-white/10 p-6 rounded-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name" className="bg-slate-800/70 rounded-xl px-4 py-3 outline-none border border-white/10" />
            <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="Class / Group" className="bg-slate-800/70 rounded-xl px-4 py-3 outline-none border border-white/10" />
          </div>
          <Q id="q1" label="Explain differences between bus and star topologies." value={answers.q1} onChange={v=>setAnswers(a=>({...a,q1:v}))} />
          <Q id="q2" label="When would you choose a ring topology?" value={answers.q2} onChange={v=>setAnswers(a=>({...a,q2:v}))} />
          <Q id="q3" label="Give an example of a hybrid topology." value={answers.q3} onChange={v=>setAnswers(a=>({...a,q3:v}))} />
          <Q id="q4" label="List two advantages of mesh topology." value={answers.q4} onChange={v=>setAnswers(a=>({...a,q4:v}))} />

          <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl disabled:opacity-60">{loading? 'Submitting...' : 'Submit LKPD'}</button>
        </form>
      </div>
    </div>
  )
}

function Q({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-blue-200">{label}</label>
      <textarea id={id} value={value} onChange={e=>onChange(e.target.value)} rows={4} className="w-full bg-slate-800/70 rounded-xl px-4 py-3 outline-none border border-white/10" />
    </div>
  )
}
