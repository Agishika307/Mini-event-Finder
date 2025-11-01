import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

// Create event
app.post("/api/events", (req, res) => {
  const { title, description, location, date, maxParticipants } = req.body;
  if (!title || !location || !date || !maxParticipants)
    return res.status(400).json({ error: "Missing required fields" });

  const event = {
    id: uuidv4(),
    title,
    description: description || "",
    location,
    date,
    maxParticipants: Number(maxParticipants),
    currentParticipants: 0
  };

  events.push(event);
  res.status(201).json(event);
});

// Get all events
app.get("/api/events", (req, res) => {
  const { location } = req.query;
  if (location) {
    const filtered = events.filter(e =>
      e.location.toLowerCase().includes(location.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(events);
});

// Get single event
app.get("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
