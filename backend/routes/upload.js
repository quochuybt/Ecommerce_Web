import { Router } from "express";
import { verifyAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", verifyAuth, (req, res) => {
  res.status(201).json({
    url: req.body.url || "https://placehold.co/800x600?text=Uploaded+Image",
    message: "Mock upload completed. Replace with Cloudinary/S3 in production.",
  });
});

export default router;
