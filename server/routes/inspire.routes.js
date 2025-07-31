import express from "express";
import {
  getInspiration,
  searchAdvice,
} from "../controllers/inspire.controller.js";

const router = express.Router();

router.get("/", getInspiration);

router.get("/advice/search", searchAdvice);

export default router;
