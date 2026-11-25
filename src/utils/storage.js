const USERS_KEY = 'eventora_users'
const EVENTS_KEY = 'eventora_events'
const REG_KEY = 'eventora_registrations'
const SESSION_KEY = 'eventora_session'

const starterEvents = [
  { id: 'ev-1', title: 'Future Forward Tech Summit', category: 'Technology', date: '2026-12-12', time: '10:00 AM', venue: 'Convention Centre, Hyderabad', price: 499, capacity: 250, description: 'A full-day gathering for builders, founders, designers, and curious minds. Explore emerging technology, practical workshops, and conversations shaping what comes next.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85', featured: true },
  { id: 'ev-2', title: 'The Creative Canvas', category: 'Arts', date: '2026-12-18', time: '4:00 PM', venue: 'The Gallery House, Vijayawada', price: 199, capacity: 120, description: 'An immersive evening celebrating illustration, photography, design, and independent creative work. Meet local artists and take part in hands-on sessions.', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85', featured: true },
  { id: 'ev-3', title: 'Startup Stories Live', category: 'Business', date: '2027-01-09', time: '11:30 AM', venue: 'Innovation Hub, Bengaluru', price: 349, capacity: 180, description: 'Hear honest stories from founders about building teams, validating ideas, handling setbacks, and finding customers. Includes networking time.', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=85', featured: false },
  { id: 'ev-4', title: 'Soundwave Music Night', category: 'Music', date: '2027-01-16', time: '6:30 PM', venue: 'Riverside Arena, Vijayawada', price: 599, capacity: 300, description: 'A high-energy live music evening featuring independent performers, great sound, and a community atmosphere. Doors open one hour before the show.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85', featured: true },
  { id: 'ev-5', title: 'Mindful Miles 5K', category: 'Sports', date: '2027-01-24', time: '6:00 AM', venue: 'City Park, Vijayawada', price: 99, capacity: 400, description: 'Start your morning with a community 5K run and wellness activities. Open to beginners and experienced runners. Hydration points provided.', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85', featured: false },
  { id: 'ev-6', title: 'Flavours of India', category: 'Food', date: '2027-02-02', time: '12:00 PM', venue: 'Open Grounds, Hyderabad', price: 249, capacity: 220, description: 'Discover regional food, cooking demonstrations, and stories behind beloved dishes. A delicious afternoon for food lovers.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85', featured: false }
]

export function read(key, fallback = []) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function seedData() {
  if (!localStorage.getItem(EVENTS_KEY)) write(EVENTS_KEY, starterEvents)

  if (!localStorage.getItem(USERS_KEY)) {
    write(USERS_KEY, [{ id: 'admin-1', name: 'Eventora Admin', email: 'admin@eventora.com', password: 'Admin@123', role: 'admin' }])
  } else {
    const users = read(USERS_KEY, [])

    if (!users.some(u => u.email === 'admin@eventora.com')) {
      users.push({ id: 'admin-1', name: 'Eventora Admin', email: 'admin@eventora.com', password: 'Admin@123', role: 'admin' })
      write(USERS_KEY, users)
    }
  }

  if (!localStorage.getItem(REG_KEY)) write(REG_KEY, [])
}

export const getUsers = () => read(USERS_KEY, [])
export const saveUsers = value => write(USERS_KEY, value)

export const getEvents = () => read(EVENTS_KEY, starterEvents)
export const saveEvents = value => write(EVENTS_KEY, value)

// Returns only events created by a particular organizer
export const getOrganizerEvents = organizerId =>
  getEvents().filter(event => event.createdBy === organizerId)

export const getRegistrations = () => read(REG_KEY, [])
export const saveRegistrations = value => write(REG_KEY, value)

export const getSession = () => read(SESSION_KEY, null)
export const saveSession = value => write(SESSION_KEY, value)
export const clearSession = () => localStorage.removeItem(SESSION_KEY)

export const formatDate = date =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })