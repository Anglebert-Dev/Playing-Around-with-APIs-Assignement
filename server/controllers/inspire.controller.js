import {
  fetchInspiration,
  fetchAdviceSearch,
} from "../services/inspire.service.js";
import Joi from "joi";

// GET /api/inspire
export async function getInspiration(req, res) {
  // Validate query params for Bored API
  const schema = Joi.object({
    type: Joi.string().valid(
      "education",
      "recreational",
      "social",
      "diy",
      "charity",
      "cooking",
      "relaxation",
      "music",
      "busywork"
    ),
    participants: Joi.number().integer().min(1).max(8),
    price: Joi.number().min(0).max(1),
    accessibility: Joi.number().min(0).max(1),
    key: Joi.string(),
  });
  const { error, value } = schema.validate(req.query);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const result = await fetchInspiration(value);
    res.json(result);
  } catch (err) {
    console.error("Inspiration error:", err);
    res.status(500).json({ error: "Failed to fetch inspiration." });
  }
}

// GET /api/inspire/advice/search?q=keyword
export async function searchAdvice(req, res) {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Missing search query (q)." });
  try {
    const result = await fetchAdviceSearch(q);
    res.json(result);
  } catch (err) {
    console.error("Advice search error:", err);
    res.status(500).json({ error: "Failed to search advice." });
  }
}
