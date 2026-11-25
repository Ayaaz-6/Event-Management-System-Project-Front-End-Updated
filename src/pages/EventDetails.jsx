import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { formatDate, getEvents, getRegistrations, saveRegistrations } from '../utils/storage'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [events] = useState(getEvents())
  const [notice, setNotice] = useState('')
  const event = events.find(e=>e.id===id)
  const regs = getRegistrations()
  const count = regs.filter(r=>r.eventId===id).length
  const registered = user && regs.some(r=>r.eventId===id && r.userId===user.id)
  useEffect(()=>{window.scrollTo(0,0)},[])
  if (!event) return <><Navbar/><main className="container page-shell"><div className="empty-state"><h2>Event not found</h2><Link to="/events" className="btn btn-primary">Back to events</Link></div></main><Footer/></>
  function register() {
    if (!user) { navigate('/login', { state: { from: `/events/${id}` } }); return }
    if (user.role === 'admin') { setNotice('Admin accounts cannot register for events. Sign in with a user account.'); return }
    const current = getRegistrations()
    if (current.some(r=>r.eventId===id && r.userId===user.id)) return
    if (current.filter(r=>r.eventId===id).length >= event.capacity) { setNotice('Sorry, this event is full.'); return }
    saveRegistrations([...current, { id:`reg-${Date.now()}`, eventId:id, userId:user.id, userName:user.name, userEmail:user.email, registeredAt:new Date().toISOString() }])
    setNotice('You are registered! Find this event in My registrations.')
    navigate('/my-registrations', { state: { success: 'You are registered for this event!' } })
  }
  return <><Navbar/><main className="container page-shell detail-page"><Link to="/events" className="back-link"><i className="bi bi-arrow-left"/> Back to events</Link><div className="detail-layout"><div className="detail-main"><div className="detail-image"><img src={event.image} alt={event.title}/><span className="category-pill">{event.category}</span></div><div className="detail-content"><div className="eyebrow"><span className="eyebrow-line"/> THE EXPERIENCE</div><h1>{event.title}</h1><p className="detail-description">{event.description}</p><div className="detail-info-grid"><div><i className="bi bi-calendar3"/><span><small>DATE</small><strong>{formatDate(event.date)}</strong></span></div><div><i className="bi bi-clock"/><span><small>TIME</small><strong>{event.time}</strong></span></div><div><i className="bi bi-geo-alt"/><span><small>LOCATION</small><strong>{event.venue}</strong></span></div><div><i className="bi bi-people"/><span><small>AVAILABILITY</small><strong>{Math.max(0,event.capacity-count)} spots left</strong></span></div></div></div></div><aside className="booking-card"><span className="booking-label">YOUR SPOT AWAITS</span><div className="booking-price">{event.price===0?'Free':`₹${event.price}`}<small> / person</small></div><p>Secure your place and get ready for a memorable experience.</p>{registered ? <div className="success-note"><i className="bi bi-check-circle-fill"/> You're registered for this event.</div> : <button className="btn btn-primary btn-full" onClick={register} disabled={count>=event.capacity}> {count>=event.capacity?'Event full':'Register for event'} <i className="bi bi-arrow-right"/></button>}{notice && <p className="form-notice">{notice}</p>}<div className="booking-foot"><i className="bi bi-shield-check"/> No payment is collected in this demo.</div></aside></div></main><Footer/></>
}