import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import CreateEventForm from "./components/CreateEventForm";
import { listEvents } from "./api";

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      setEvents(await listEvents());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Event Finder</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/create">Create Event</Link>
      </nav>
      <Routes>
        <Route path="/" element={<EventList events={events} loading={loading} />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/create" element={<CreateEventForm onCreated={fetchEvents} />} />
      </Routes>
    </div>
  );
}
