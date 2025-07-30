import express from "express";
import {
  getInspiration,
  searchAdvice,
} from "../controllers/inspire.controller.js";

const router = express.Router();

// GET /api/inspire - random activity + advice, with optional filters for activity
router.get("/", getInspiration);

// GET /api/inspire/advice/search?q=keyword - search advice by keyword
router.get("/advice/search", searchAdvice);

export default router;
