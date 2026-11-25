import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { getEvents } from '../utils/storage'

export default function Home() {
  const [events, setEvents] = useState([])
  useEffect(() => setEvents(getEvents()), [])
  const featured = events.filter(e => e.featured).slice(0,3)
  return <><Navbar /><main>
    <section className="hero container">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT GREAT STORY STARTS HERE</div>
        <h1>Make room for<br /><span>unforgettable</span><br />experiences.</h1>
        <p className="hero-text">Find your people. Discover something new. Be part of the moments that stay with you long after they're over.</p>
        <div className="hero-actions"><Link to="/events" className="btn btn-primary btn-large">Explore events <i className="bi bi-arrow-up-right" /></Link><Link to="/signup" className="btn btn-ghost btn-large">Join EVENTORA</Link></div>
        <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>A</span><span>M</span><span>+</span></div><div><strong>Find your community</strong><small>Good things happen when we gather.</small></div></div>
      </div>
      <div className="hero-visual"><div className="hero-glow" /><div className="hero-photo"><img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=90" alt="Crowd enjoying a live event" /></div><div className="floating-note note-top"><span className="note-icon"><i className="bi bi-stars" /></span><div><strong>Experiences worth sharing</strong><small>Made for real connections</small></div></div><div className="floating-note note-bottom"><div className="pulse-dot" /><div><strong>Discover what's happening</strong><small>Events near and far</small></div></div><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /></div>
    </section>
    <section className="trust-strip"><div className="container trust-inner"><span>ONE PLACE FOR EVERY PLAN</span><b><i className="bi bi-music-note-beamed" /> Music</b><b><i className="bi bi-cpu" /> Technology</b><b><i className="bi bi-palette" /> Arts & culture</b><b><i className="bi bi-people" /> Community</b></div></section>
    <section className="section container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> HANDPICKED FOR YOU</div><h2>Events worth <span>showing up for.</span></h2><p>Explore experiences that spark curiosity and bring people together.</p></div><Link to="/events" className="text-link">View all events <i className="bi bi-arrow-up-right" /></Link></div>
      <div className="event-grid">{featured.length ? featured.map(e => <EventCard key={e.id} event={e} />) : <div className="empty-state">No featured events yet. Check back soon.</div>}</div>
    </section>
    <section className="manifesto"><div className="container manifesto-inner"><div className="manifesto-symbol"><i className="bi bi-stars" /></div><div><div className="eyebrow">NOT JUST ANOTHER CALENDAR</div><h2>Less scrolling.<br /><span>More living.</span></h2></div><p>From the first hello to the final encore, EVENTORA helps you spend less time planning and more time being there.</p><Link to="/events" className="btn btn-light">Find your next event <i className="bi bi-arrow-up-right" /></Link></div></section>
    <section className="section container how-section"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> SIMPLE BY DESIGN</div><h2>Your plans, <span>sorted.</span></h2></div></div><div className="steps-grid"><div className="step-card"><span>01</span><i className="bi bi-search" /><h3>Discover</h3><p>Explore events by interest, category, or what's coming up.</p></div><div className="step-card"><span>02</span><i className="bi bi-ticket-perforated" /><h3>Register</h3><p>Find the details you need and reserve your place in a few clicks.</p></div><div className="step-card"><span>03</span><i className="bi bi-heart" /><h3>Experience</h3><p>Show up, meet people, and make the moment yours.</p></div></div></section>
  </main><Footer /></>
}