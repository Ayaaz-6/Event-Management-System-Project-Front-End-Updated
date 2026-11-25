import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { getEvents } from '../utils/storage'

export default function Events() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('date')
  const events = getEvents()
  const categories = ['All', ...new Set(events.map(e => e.category))]
  const filtered = useMemo(() => events.filter(e => (category === 'All' || e.category === category) && `${e.title} ${e.venue} ${e.description}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === 'price' ? a.price-b.price : a.date.localeCompare(b.date)), [events, category, query, sort])
  return <><Navbar /><main className="page-shell container"><div className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> FIND YOUR NEXT EXPERIENCE</div><h1>Explore <span>events.</span></h1><p>Good plans are closer than you think. Find something that feels like you.</p></div>
    <div className="filter-bar"><div className="search-box"><i className="bi bi-search" /><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events, venues..." /></div><div className="filter-select"><i className="bi bi-sliders" /><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><div className="filter-select"><i className="bi bi-sort-down" /><select value={sort} onChange={e=>setSort(e.target.value)}><option value="date">Date: upcoming</option><option value="price">Price: low to high</option></select></div></div>
    <div className="results-line"><span>{filtered.length} {filtered.length === 1 ? 'experience' : 'experiences'} found</span><span>Curated for curious minds</span></div>
    {filtered.length ? <div className="event-grid">{filtered.map(e=><EventCard key={e.id} event={e} />)}</div> : <div className="empty-state"><i className="bi bi-calendar2-x" /><h3>No events found</h3><p>Try changing your search or category filter.</p><button className="btn btn-ghost" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</button></div>}
  </main><Footer /></>
}