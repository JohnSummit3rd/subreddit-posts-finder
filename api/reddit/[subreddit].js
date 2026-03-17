export default async function handler(req, res) {
  const { subreddit } = req.query;

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'sec-fetch-site': 'none',
          'sec-fetch-mode': 'navigate',
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