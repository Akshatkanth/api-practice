const express = require("express");
const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test API
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Test endpoint working
 */
router.get("/", (req, res) => {
  res.json({ message: "Test working" });
});

/**
 * @swagger
 * /test/limited:
 *   get:
 *     summary: Rate limited endpoint
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Request allowed
 *       429:
 *         description: Too many requests
 */
router.get("/limited", rateLimiter, (req, res) => {
  res.json({ message: "Request allowed" });
});

module.exports = router;