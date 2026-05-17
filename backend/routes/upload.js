import { Router } from "express";
import { verifyAuth } from "../middleware/auth.js";
import fs from "fs";
import path from "path";

const router = Router();

router.post("/", verifyAuth, (req, res) => {
  if (req.body.image) {
    try {
      const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
      const ext = req.body.image.match(/^data:image\/(\w+);base64,/)?.[1] || "png";
      const buffer = Buffer.from(base64Data, "base64");

      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `avatar_${req.user.id}_${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Generate the URL based on host
      const apiHost = req.get("host");
      const protocol = req.protocol;
      
      // Handle potential network hosts or ports in dev
      const imageUrl = `${protocol}://${apiHost}/uploads/${fileName}`;

      return res.status(201).json({
        url: imageUrl,
        message: "Upload completed successfully.",
      });
    } catch (error) {
      console.error("Local upload error:", error);
      return res.status(500).json({ error: "Lỗi lưu file ảnh" });
    }
  }

  res.status(201).json({
    url: req.body.url || "https://placehold.co/800x600?text=Uploaded+Image",
    message: "Mock upload completed. Replace with Cloudinary/S3 in production.",
  });
});

export default router;
