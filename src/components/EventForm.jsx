import { useEffect, useState } from 'react'

const blank = { title: '', category: 'Technology', date: '', time: '10:00 AM', venue: '', price: 0, capacity: 100, description: '', image: '', featured: false }
export default function EventForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || blank)
  useEffect(() => setForm(initial || blank), [initial])
  const update = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'number' ? Number(e.target.value) : e.target.value })
  const submit = e => { e.preventDefault(); onSave({ ...form, image: form.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85' }) }
  return <form className="event-form" onSubmit={submit}>
    <div className="form-grid">
      <label className="field full">Event name<input required name="title" value={form.title} onChange={update} placeholder="e.g. Future Forward Summit" /></label>
      <label className="field">Category<select name="category" value={form.category} onChange={update}>{['Technology','Arts','Business','Music','Sports','Food','Education','Community'].map(x => <option key={x}>{x}</option>)}</select></label>
      <label className="field">Date<input required type="date" min={new Date().toISOString().slice(0,10)} name="date" value={form.date} onChange={update} /></label>
      <label className="field">Time<input required name="time" value={form.time} onChange={update} placeholder="10:00 AM" /></label>
      <label className="field">Venue<input required name="venue" value={form.venue} onChange={update} placeholder="Venue and city" /></label>
      <label className="field">Ticket price (₹)<input required type="number" min="0" name="price" value={form.price} onChange={update} /></label>
      <label className="field">Seat capacity<input required type="number" min="1" name="capacity" value={form.capacity} onChange={update} /></label>
      <label className="field full">Image URL<input name="image" value={form.image} onChange={update} placeholder="https://..." /></label>
      <label className="field full">Description<textarea required rows="4" name="description" value={form.description} onChange={update} placeholder="Tell people what makes this event special..." /></label>
      <label className="check-field full"><input type="checkbox" name="featured" checked={form.featured} onChange={update} /> Feature this event on the homepage</label>
    </div>
    <div className="form-actions"><button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button><button className="btn btn-primary">{initial ? 'Save changes' : 'Create event'} <i className="bi bi-arrow-right" /></button></div>
  </form>
}