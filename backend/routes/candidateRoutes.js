const express = require("express");
const router = express.Router();
const {
  createCandidate,
  getCandidates,
  updateCandidateStatus,
  deleteCandidate,
} = require("../controllers/candidateController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.single("resume"), createCandidate);
router.get("/", protect, getCandidates);
router.put("/:id/status", protect, updateCandidateStatus);
router.delete("/:id", protect, deleteCandidate);

module.exports = router;
