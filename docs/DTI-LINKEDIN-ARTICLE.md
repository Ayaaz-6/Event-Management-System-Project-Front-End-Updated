# LinkedIn Article: Applying Design Thinking to EVENTORA

## EVENTORA: Making Event Discovery and Management Simpler

Events bring people together, but finding the right event and coordinating registrations can become confusing. Organisers may manage event details in different places, while participants may struggle to discover relevant events, understand availability, and keep track of registrations.

For our Front-End Development project, we developed **EVENTORA**, an Event Management System that brings event discovery, registration, and administration into one responsive interface.

### 1. Empathise

We considered two key groups:

- **Participants:** want to discover events quickly, compare details, register easily, and review their registrations.
- **Organisers / administrators:** need a clear way to publish events, update information, monitor registrations, and understand event activity.

### 2. Define

We framed the problem as:

> How might we provide participants with a simple event discovery and registration experience while giving administrators an organised way to manage events?

### 3. Ideate

We explored features that directly address the problem:

- Search and category filters to make discovery faster.
- Event detail pages with date, venue, description, capacity, and availability.
- A simple registration flow and a personal registrations page.
- An Admin module for creating, editing, and deleting events.
- Dashboard summary cards for a quick overview.
- Responsive layouts so the system works on different screen sizes.

### 4. Prototype

We built the interface using React and Vite. CSS Grid and Flexbox are used to organise event cards, navigation, forms, and dashboards. The system separates responsibilities into Admin and User modules.

### 5. Test and Improve

The prototype can be tested through practical scenarios:

1. Create a user account and sign in.
2. Search for an event and filter by category.
3. Open an event and register.
4. Confirm the event appears under My Registrations.
5. Sign in as Admin and create, edit, and delete an event.
6. Check the layout on desktop and mobile widths.

Feedback from these tests can guide improvements to labels, navigation, form validation, and the registration flow.

### Innovation and Learning

The main value of EVENTORA is not a single advanced feature; it is the way the participant and administrator workflows are brought together in one interface. The project demonstrates component-based development, state handling, routing, role-based UI access, and browser storage.

### Conclusion

EVENTORA is a frontend prototype that demonstrates how Design Thinking can guide a practical software solution. By understanding the needs of both participants and organisers, defining the core problem, prototyping key workflows, and testing those workflows, we created a foundation that can be extended with a secure backend and database.

#ProjectBasedLearning #DesignThinking #FrontendDevelopment #ReactJS #Vite #EventManagement

---

## Short project review (for submission / presentation)

**Problem:** Event information and registration can be scattered and difficult to manage.

**Users:** Event participants and event administrators.

**Solution:** A responsive web application with event discovery, registration, and separate Admin/User modules.

**DTI concepts applied:** Empathise, Define, Ideate, Prototype, and Test.

**Technology:** React, Vite, JavaScript, CSS Grid, Flexbox, React Router, and LocalStorage.

**Current limitation:** LocalStorage is used for academic frontend demonstration. It does not provide secure authentication or cross-device shared data.

**Future scope:** Add a backend API, database, secure password hashing, email notifications, and real-time seat updates.
