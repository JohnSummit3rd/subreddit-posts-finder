const srInput = document.getElementById("subreddit-input");
const button = document.getElementById("search-btn");
const landingPage = document.querySelector(".landing-page");
const subredditName = document.querySelector(".subreddit-name");
const postsPage = document.querySelector(".posts-page");
const errorPopup = document.getElementById("error-popup");

function showError() {
  errorPopup.classList.remove("hidden");
  setTimeout(() => {
    errorPopup.classList.add("hidden");
  }, 3000);
}

async function fetchSubreddit(subreddit) {
  try {
    const res = await fetch(
      `/api/reddit/${subreddit}`
    );

    if (!res.ok) {
      throw new Error("Subreddit not found");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

function renderPosts(posts) {
  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = "";

  posts.forEach(post => {
    const postData = post.data

    const div = document.createElement("div");
    div.className = "flex gap-4 items-start p-4 rounded-xl bg-white shadow mb-3 border border-slate-200 hover:shadow-md transition";

    div.innerHTML = `
      <div class="flex flex-col items-center text-orange-500 font-semibold">
        <h1>▲</h1>
        <h1>${postData.ups}</h1>
      </div>
      <div>
        <h1 class="text-slate-800 font-semibold leading-snug lg:text-2xl">${postData.title}</h1>
        <h1 class="text-sm text-slate-500 lg:text-lg">by ${postData.author}</h1>
      </div>
    `;

    div.addEventListener("click", () => {
      window.open(postData.url);
    })

    postsContainer.appendChild(div);
  });
}

async function handleSubredditFetch(subredditInput = null, pushState = true) {
  const subreddit = subredditInput || srInput.value.replaceAll(' ', '');
  const data = await fetchSubreddit(subreddit);

  if (!data || !data.data || !Array.isArray(data.data.children)) {
    showError();
    return;
  }

  const posts = data.data.children;

  if (posts.length === 0) {
    showError();
    return;
  }
  const firstPost = posts[0].data;

  subredditName.textContent = `/r/${firstPost.subreddit} Posts`;
  renderPosts(posts);

  landingPage.classList.add("hidden");
  postsPage.classList.remove("hidden");

  if (pushState) {
    history.pushState({ page: "posts", subreddit }, "", `#${subreddit}`)
  }
}

function showLandingPage(pushState = true) {
  landingPage.classList.remove("hidden");
  postsPage.classList.add("hidden");

  if (pushState) {
    history.pushState({ page: "landing" }, "", "#home");
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubredditFetch();
});

srInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSubredditFetch()
  }
});

window.addEventListener("popstate", (e) => {
  const state = e.state;

  if (!state || state.page === "landing") {
    showLandingPage(false);
  } else if (state.page === "posts") {
    handleSubredditFetch(state.subreddit, false);
  }
});

if (!location.hash) {
  showLandingPage(false);
} else if (location.hash.startsWith("#")) {
  const subreddit = location.hash.slice(1);
  handleSubredditFetch(subreddit, false);
}
