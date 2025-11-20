import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Reflection() {
  const [search] = useSearchParams()
  const sid = search.get('sid') || ''
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(()=>{
    if (!sid) navigate('/lkpd')
  }, [sid, navigate])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${backend}/api/reflection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission_id: sid, reflection_text: text, rating })
      })
      navigate('/quiz')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Reflection</h1>
        <form onSubmit={submit} className="space-y-4 bg-slate-900/60 border border-white/10 p-6 rounded-2xl">
          <p className="text-blue-200/90">After submitting LKPD, reflect on what you learned.</p>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} required className="w-full bg-slate-800/70 rounded-xl px-4 py-3 outline-none border border-white/10" placeholder="Write your reflection here..." />
          <div>
            <label className="block mb-2 text-blue-200">Rate your understanding: {rating}/5</label>
            <input type="range" min="1" max="5" value={rating} onChange={e=>setRating(parseInt(e.target.value))} />
          </div>
          <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl disabled:opacity-60">{loading? 'Submitting...' : 'Submit Reflection'}</button>
        </form>
      </div>
    </div>
  )
}
