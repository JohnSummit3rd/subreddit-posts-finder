import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/reddit/:subreddit", async (req, res) => {
  const subreddit = req.params.subreddit;

  try {
    const redditRes = await fetch(
      `https://www.reddit.com/r/${subreddit}.json`,
      {
        headers: {
          "User-Agent": "reddit-lane-client/1.0"
        }
      }
    );

    if (!redditRes) {
      return res.status(404).json({ error: "Subreddit not found" });
    }

    const data = await redditRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Reddit" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});