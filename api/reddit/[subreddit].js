export default async function handler(req, res) {
  const { subreddit } = req.query;

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json`,
      { headers: { 'User-Agent': 'SubredditFinder/1.0' } }
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