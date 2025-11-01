import React from "react";
import { Link } from "react-router-dom";

export default function EventList({ events, loading }) {
  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>No events yet.</p>;

  return (
    <ul>
      {events.map(e => (
        <li key={e.id}>
          <Link to={`/events/${e.id}`}>{e.title}</Link> — {e.location} ({new Date(e.date).toLocaleString()})
        </li>
      ))}
    </ul>
  );
}
