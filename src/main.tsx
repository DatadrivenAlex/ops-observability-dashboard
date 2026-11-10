import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { demoServices, filterServices, summarize, type Status } from './model';
import './style.css';
function App() {
  const [query,setQuery] = useState('');
  const [status,setStatus] = useState<Status|'all'>('all');
  const [selected,setSelected] = useState<string>('search');
  const filtered = useMemo(()=>filterServices(demoServices,query,status),[query,status]);
  const totals = summarize(demoServices);
  const selectedService = demoServices.find(s=>s.id===selected);
  return <main><header><div><div className="eyebrow">SERVICE PULSE <span>· PORTFOLIO DEMO</span></div><h1>Systems at a glance<span>.</span></h1><p>A calm view of a busy stack. All metrics below are synthetic.</p></div><div className="badge">● &nbsp; DEMO DATA</div></header>
    <section className="metrics" aria-label="Service summary"><article><span>Monitored services</span><strong>{totals.total.toString().padStart(2,'0')}</strong><small>Across 3 demo teams</small></article><article><span>Healthy</span><strong>{totals.healthy.toString().padStart(2,'0')}</strong><small>Operating normally</small></article><article><span>Need attention</span><strong>{totals.incidents.toString().padStart(2,'0')}</strong><small>Degraded or down</small></article></section>
    <section className="layout"><div className="panel"><div className="panel-head"><div><span className="eyebrow">YOUR SERVICES</span><h2>Service health</h2></div><span className="count">{filtered.length} shown</span></div><div className="filters"><label>Search <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name or team" /></label><label>Status <select value={status} onChange={e=>setStatus(e.target.value as Status|'all')}><option value="all">All statuses</option><option value="healthy">Healthy</option><option value="degraded">Degraded</option><option value="down">Down</option></select></label></div><div className="service-list">{filtered.map(s=><button className={'service '+(selected===s.id?'active':'')} key={s.id} onClick={()=>setSelected(s.id)} aria-pressed={selected===s.id}><span className={'dot '+s.status}></span><span className="service-name"><strong>{s.name}</strong><small>{s.team}</small></span><span className={'tag '+s.status}>{s.status}</span><span className="latency">{s.status==='down'?'—':`${s.latencyMs} ms`}</span></button>)}{filtered.length===0 && <p className="empty">No services match these filters.</p>}</div></div>
    <aside className="panel detail"><span className="eyebrow">SELECTED SERVICE</span>{selectedService && <><h2>{selectedService.name}</h2><div className={'detail-status '+selectedService.status}>{selectedService.status}</div><p>{selectedService.note}</p><div className="divider"></div><div className="row"><span>Team</span><strong>{selectedService.team}</strong></div><div className="row"><span>Demo uptime</span><strong>{selectedService.uptime.toFixed(2)}%</strong></div><div className="row"><span>Demo latency</span><strong>{selectedService.status==='down'?'—':`${selectedService.latencyMs} ms`}</strong></div><div className="notice">This view is a static, fictional example. It is not connected to monitoring systems.</div></>}</aside></section>
    <footer>Portfolio demonstration · No live data</footer></main>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
