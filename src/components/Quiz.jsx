import { useEffect, useState } from 'react'

export default function Quiz() {
  const backend = import.meta.env.VITE_BACKEND_URL || ''
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [name, setName] = useState('')
  const [result, setResult] = useState(null)

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`${backend}/api/quiz`)
      const data = await res.json()
      setQuestions(data.questions)
      setAnswers(Array.from({ length: data.questions.length }, ()=>''))
    }
    load()
  }, [backend])

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${backend}/api/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, answers })
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Quiz: Network Topologies</h1>
        {result ? (
          <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl">
            <p className="text-xl">Your Score: <span className="font-bold text-emerald-400">{result.score}</span> / {result.total}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 bg-slate-900/60 border border-white/10 p-6 rounded-2xl">
            <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name" className="w-full bg-slate-800/70 rounded-xl px-4 py-3 outline-none border border-white/10" />
            {questions.map((q, idx)=> (
              <div key={idx} className="bg-slate-800/40 rounded-xl p-4">
                <p className="mb-2">{idx+1}. {q.q}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map(opt => (
                    <label key={opt} className={`px-3 py-2 rounded-lg border cursor-pointer ${answers[idx]===opt? 'bg-blue-600 border-blue-500' : 'bg-slate-900/60 border-white/10'}`}>
                      <input type="radio" name={`q-${idx}`} value={opt} className="hidden" onChange={()=>setAnswers(a=>{const n=[...a]; n[idx]=opt; return n})} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl">Submit Quiz</button>
          </form>
        )}
      </div>
    </div>
  )
}
