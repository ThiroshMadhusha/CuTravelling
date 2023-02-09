import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTours,
  getSingleTour,
  getTourBySearch,
  getTourCounts,
  updateTour,
} from "../controllers/tourController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new tour
router.post("/", verifyAdmin, createTour);

// update new tour
router.put("/:id", verifyAdmin, updateTour);

// delete new tour
router.delete("/:id", verifyAdmin, deleteTour);

// getSingle new tour
router.get("/:id", getSingleTour);

// all new tour
router.get("/", getAllTour);

// search tour data
router.get("/search/getTourBySearch", getTourBySearch);

// get featured tours
router.get("/search/getFeaturedTours", getFeaturedTours);

// get tours count
router.get("/search/getTourCount", getTourCounts);
export default router;
