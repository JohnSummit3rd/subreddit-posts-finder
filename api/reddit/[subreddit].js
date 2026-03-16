export default async function handler(req, res) {
  const { subreddit } = req.query;

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?raw_json=1`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        }
      }
    );

    console.log("Reddit status:", response.status, "for subreddit:", subreddit);

    if (!response.ok) {
      return res.status(404).json({ error: 'Subreddit not found' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ error: 'Server error' });
  }
}