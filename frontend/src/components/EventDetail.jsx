import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) return;
    getEvent(id).then(setEvent).catch(console.error);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>📍 {event.location}</p>
      <p>📅 {new Date(event.date).toLocaleString()}</p>
      <p>👥 {event.currentParticipants}/{event.maxParticipants}</p>
      <Link to="/">Back</Link>
    </div>
  );
}
