import React, { useState } from "react";
import { createEvent } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateEventForm({ onCreated }) {
  const [form, setForm] = useState({ title: "", description: "", location: "", date: "", maxParticipants: 10 });
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      onCreated && onCreated();
      nav("/");
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 400 }}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
  <input name="maxParticipants" type="number" value={form.maxParticipants} onChange={handleChange} />
      <button type="submit">Create Event</button>
    </form>
  );
}
