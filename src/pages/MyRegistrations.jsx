import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { formatDate, getEvents, getRegistrations, saveRegistrations } from '../utils/storage'
import { Link, useLocation } from 'react-router-dom'

export default function MyRegistrations(){
  const {user}=useAuth()
  const location=useLocation()
  const [items,setItems]=useState(getRegistrations().filter(r=>r.userId===user.id))
  const [notice,setNotice]=useState(location.state?.success||'')
  const events=getEvents()
  function cancel(id){if(!window.confirm('Cancel this registration?'))return;const all=getRegistrations().filter(r=>r.id!==id);saveRegistrations(all);setItems(all.filter(r=>r.userId===user.id));setNotice('Registration cancelled.')}
  return <><Navbar/><main className="container page-shell"><div className="page-intro"><div className="eyebrow"><span className="eyebrow-line"/> YOUR PLANS</div><h1>My <span>registrations.</span></h1><p>All the experiences you've signed up for, in one place.</p></div>{notice&&<div className="success-banner"><i className="bi bi-check-circle-fill"/>{notice}</div>}{items.length?<div className="registration-list large-list">{items.map(r=>{const e=events.find(x=>x.id===r.eventId);if(!e)return null;return <div className="registration-row" key={r.id}><img src={e.image} alt=""/><div className="registration-info"><strong>{e.title}</strong><span><i className="bi bi-calendar3"/> {formatDate(e.date)} · {e.time}</span><span><i className="bi bi-geo-alt"/> {e.venue}</span></div><span className="status-badge"><i className="bi bi-check-circle-fill"/> Registered</span><Link to={`/events/${e.id}`} className="circle-link"><i className="bi bi-arrow-up-right"/></Link><button className="btn btn-ghost btn-small danger-text" onClick={()=>cancel(r.id)}>Cancel</button></div>})}</div>:<div className="empty-state"><i className="bi bi-ticket-perforated"/><h3>No registrations yet</h3><p>When you register for an event, it will appear here.</p><Link to="/events" className="btn btn-primary">Explore events</Link></div>}</main><Footer/></>
}