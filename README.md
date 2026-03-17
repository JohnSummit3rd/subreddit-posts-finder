# Subreddit Finder
Subreddit Finder is a simple and responsive web application that allows users to search for any subreddit and view its latest posts in real time.
Users can enter a subreddit name to fetch and display recent posts, including post titles, authors, and upvote counts through the use of the Reddit API. The app features smooth page transitions, browser navigation support via the History API, and error handling for invalid or non-existent subreddits.
Built with vanilla JavaScript and Tailwind CSS, the project focuses on clean UI, responsive layouts, and efficient client-side rendering while consuming a custom Reddit API endpoint.

## 🔧 Technologies
- HTML
- CSS
- Javascript
- NodeJS
- Asynchronous Programming
- Tailwind CSS
- Vite

## ✨ Features
- Search for any subreddit by name  
- View recent posts with upvotes and author info  
- Browser navigation support (back/forward buttons)  
- Error popup for invalid subreddits  
- Fully responsive design with Tailwind CSS  
- Fast client-side rendering

## 🚀 Running Locally

1. Clone the repository
```bash
   git clone https://github.com/JohnSummit3rd/subreddit-posts-finder.git
   cd subreddit-posts-finder
```

2. Install dependencies
```bash
   npm install
```

3. Start the Express server (in one terminal)
```bash
   node server/server.js
```

4. Start the Vite dev server (in a separate terminal)
```bash
   npm run dev
```

5. Open your browser and go to `http://localhost:5173`

## 🎈 The Process 
I've wanted to gain some practice with the use of APIs, particularly dealing with fetches, promises and asynchronous programming, which is why I decided to create something with the Reddit API. I created a basic search feature on the website that allowed you to search for subreddits. The input given in the search field is then passed to the Reddit API and this returned a bunch of data which I organised into a modern friendly UI design. I then made it mobile responsive allowing it to fit on mobile screens.
