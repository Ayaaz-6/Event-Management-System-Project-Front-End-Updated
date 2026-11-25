import { Link } from 'react-router-dom'
import { formatDate } from '../utils/storage'

export default function EventCard({ event }) {
  return <article className="event-card">
    <Link to={`/events/${event.id}`} className="event-image-wrap">
      <img src={event.image} alt={event.title} className="event-image" loading="lazy" />
      <span className="category-pill">{event.category}</span>
      {event.featured && <span className="featured-pill"><i className="bi bi-lightning-charge-fill" /> Featured</span>}
    </Link>
    <div className="event-card-body">
      <div className="event-date"><i className="bi bi-calendar3" /> {formatDate(event.date)} <span>·</span> {event.time}</div>
      <h3><Link to={`/events/${event.id}`}>{event.title}</Link></h3>
      <p className="event-venue"><i className="bi bi-geo-alt" /> {event.venue}</p>
      <div className="event-card-bottom"><span className="event-price">{event.price === 0 ? 'Free' : `₹${event.price}`} <small>/ person</small></span><Link to={`/events/${event.id}`} className="circle-link" aria-label={`View ${event.title}`}><i className="bi bi-arrow-up-right" /></Link></div>
    </div>
  </article>
}