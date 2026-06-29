const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const searchForm = document.querySelector(".topic-search");
const topicSearch = document.querySelector("#topicSearch");
const topicCards = Array.from(document.querySelectorAll(".topic-card"));
const emptyState = document.querySelector("#emptyState");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const exampleCode = document.querySelector("#exampleCode");
const quizForm = document.querySelector("#quizForm");
const quizResult = document.querySelector("#quizResult");

const examples = {
    page: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My First Page</title>
</head>
<body>
  <header>Website Header</header>
  <main>
    <h1>Welcome</h1>
    <p>This is my first HTML page.</p>
  </main>
</body>
</html>`,
    form: `<form action="/contact" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <button type="submit">Send Message</button>
</form>`,
    seo: `<head>
  <title>Learn HTML - Beginner Tutorial</title>
  <meta name="description" content="Learn HTML with simple examples.">
  <link rel="canonical" href="https://example.com/learn-html">
</head>`
};

function filterTopics() {
    const query = topicSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    topicCards.forEach((card) => {
        const text = `${card.textContent} ${card.dataset.topic}`.toLowerCase();
        const isVisible = !query || text.includes(query);
        card.hidden = !isVisible;
        if (isVisible) {
            visibleCount += 1;
        }
    });

    emptyState.hidden = visibleCount > 0;
}

menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterTopics();
    document.querySelector("#tutorials").scrollIntoView({ behavior: "smooth" });
});

topicSearch.addEventListener("input", filterTopics);

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        tabButtons.forEach((tab) => {
            tab.classList.remove("active");
            tab.setAttribute("aria-selected", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
        exampleCode.textContent = examples[button.dataset.example];
    });
});

quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = new FormData(quizForm).get("heading");

    if (answer === "h1") {
        quizResult.textContent = "Correct. <h1> page ka primary heading hota hai.";
        quizResult.style.color = "#2f9e73";
        return;
    }

    quizResult.textContent = "Try again. Hint: primary heading hamesha highest heading level hota hai.";
    quizResult.style.color = "#e4572e";
});
