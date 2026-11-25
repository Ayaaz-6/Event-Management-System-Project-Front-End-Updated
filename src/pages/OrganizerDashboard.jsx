import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventForm from '../components/EventForm'
import {
  formatDate,
  getEvents,
  getRegistrations,
  saveEvents,
  saveRegistrations,
  getOrganizerEvents
} from '../utils/storage'
import { useAuth } from '../context/AuthContext'

export default function OrganizerDashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState(() => getOrganizerEvents(user.id))
  const [registrations, setRegistrations] = useState(() => getRegistrations())
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [showParticipants, setShowParticipants] = useState(false)

  const eventIds = useMemo(() => new Set(events.map(event => event.id)), [events])
  const myRegistrations = registrations.filter(registration => eventIds.has(registration.eventId))
  const upcomingCount = events.filter(event => event.date >= new Date().toISOString().slice(0, 10)).length

  function refresh() {
    setEvents(getOrganizerEvents(user.id))
    setRegistrations(getRegistrations())
  }

  function save(data) {
    const allEvents = getEvents()
    let updated

    if (editing) {
      // Only update an event that belongs to this organizer.
      updated = allEvents.map(event =>
        event.id === editing.id && event.createdBy === user.id
          ? { ...data, id: editing.id, createdBy: user.id }
          : event
      )
    } else {
      updated = [
        { ...data, id: `ev-${Date.now()}`, createdBy: user.id },
        ...allEvents
      ]
    }

    saveEvents(updated)
    refresh()
    setShowForm(false)
    setEditing(null)
  }

  function remove(id) {
    const ownedEvent = getEvents().find(event => event.id === id && event.createdBy === user.id)
    if (!ownedEvent) return
    if (!window.confirm('Delete this event? Its registrations will also be removed.')) return

    saveEvents(getEvents().filter(event => !(event.id === id && event.createdBy === user.id)))
    saveRegistrations(getRegistrations().filter(registration => registration.eventId !== id))
    refresh()
  }

  const filteredEvents = events.filter(event =>
    `${event.title} ${event.venue} ${event.category}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <main className="container page-shell">
        <div className="dashboard-welcome">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> ORGANIZER / DASHBOARD</div>
            <h1>Welcome, <span>{user.name}.</span></h1>
            <p>Create events, manage your listings, and keep track of participants.</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true) }}>
            <i className="bi bi-plus-lg" /> Add new event
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><span className="stat-icon"><i className="bi bi-calendar-event" /></span><div><small>MY EVENTS</small><strong>{events.length}</strong><span>Events you created</span></div></div>
          <div className="stat-card"><span className="stat-icon green"><i className="bi bi-people" /></span><div><small>PARTICIPANTS</small><strong>{myRegistrations.length}</strong><span>Registrations on your events</span></div></div>
          <div className="stat-card"><span className="stat-icon orange"><i className="bi bi-calendar-check" /></span><div><small>UPCOMING EVENTS</small><strong>{upcomingCount}</strong><span>Scheduled from today</span></div></div>
        </div>

        {showForm && (
          <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) { setShowForm(false); setEditing(null) } }}>
            <div className="modal-card">
              <div className="modal-heading"><div><div className="eyebrow">EVENT DETAILS</div><h2>{editing ? 'Edit event' : 'Create an event'}</h2></div><button type="button" className="icon-button" aria-label="Close" onClick={() => { setShowForm(false); setEditing(null) }}><i className="bi bi-x-lg" /></button></div>
              <EventForm initial={editing} onSave={save} onCancel={() => { setShowForm(false); setEditing(null) }} />
            </div>
          </div>
        )}

        <div className="management-toolbar">
          <div className="search-box"><i className="bi bi-search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your events..." /></div>
          <span>{events.length} total events</span>
          <button className="btn btn-ghost btn-small" onClick={() => setShowParticipants(value => !value)}>{showParticipants ? 'Hide participants' : 'View participants'} <i className="bi bi-people" /></button>
        </div>

        <div className="manage-event-list">
          {filteredEvents.map(event => {
            const count = registrations.filter(registration => registration.eventId === event.id).length
            return <div className="manage-event-row" key={event.id}>
              <img src={event.image} alt={event.title} />
              <div className="manage-event-info"><span className="category-text">{event.category}</span><strong>{event.title}</strong><small><i className="bi bi-calendar3" /> {formatDate(event.date)} · <i className="bi bi-geo-alt" /> {event.venue}</small></div>
              <div className="manage-count"><strong>{count}/{event.capacity}</strong><small>registered</small></div>
              <div className="row-actions"><button className="icon-button" title="Edit event" aria-label={`Edit ${event.title}`} onClick={() => { setEditing(event); setShowForm(true) }}><i className="bi bi-pencil" /></button><button className="icon-button delete-button" title="Delete event" aria-label={`Delete ${event.title}`} onClick={() => remove(event.id)}><i className="bi bi-trash3" /></button></div>
            </div>
          })}
        </div>

        {filteredEvents.length === 0 && <div className="empty-state">{events.length ? 'No events match your search.' : "You haven't created any events yet. Create your first event!"}</div>}

        {showParticipants && <section className="section compact-section participants-card">
          <div className="section-heading"><div><div className="eyebrow">YOUR EVENTS</div><h2>Registered <span>participants.</span></h2></div><span className="table-count">{myRegistrations.length} total</span></div>
          {myRegistrations.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>PARTICIPANT</th><th>EVENT</th><th>REGISTERED ON</th><th>CONTACT</th></tr></thead><tbody>
            {myRegistrations.slice().sort((a, b) => (b.registeredAt || '').localeCompare(a.registeredAt || '')).map(registration => {
              const event = events.find(item => item.id === registration.eventId)
              return <tr key={registration.id}><td><strong>{registration.userName || 'Participant'}</strong></td><td>{event?.title || 'Event'}</td><td>{registration.registeredAt ? new Date(registration.registeredAt).toLocaleDateString('en-IN') : '—'}</td><td>{registration.userEmail || '—'}</td></tr>
            })}
          </tbody></table></div> : <div className="table-empty">No one has registered for your events yet.</div>}
        </section>}

        <p className="tiny-legal">You can manage only events created by your organizer account. <Link to="/events">View public event listings</Link>.</p>
      </main>
      <Footer />
    </>
  )
}
