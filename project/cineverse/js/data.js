const moviesData = {
    trending: [
        { id: 1, title: "Stranger Things", img: "https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", match: "99%", duration: "4 Seasons", age: "16+", genre: "Sci-Fi, Horror" },
        { id: 2, title: "Squid Game", img: "https://image.tmdb.org/t/p/w1280/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg", match: "97%", duration: "1 Season", age: "18+", genre: "Thriller, Drama" },
        { id: 3, title: "The Witcher", img: "https://image.tmdb.org/t/p/w1280/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg", match: "95%", duration: "3 Seasons", age: "18+", genre: "Fantasy, Action" },
        { id: 4, title: "Money Heist", img: "https://image.tmdb.org/t/p/w1280/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg", match: "98%", duration: "5 Parts", age: "18+", genre: "Crime, Drama" },
        { id: 5, title: "Dark", img: "https://image.tmdb.org/t/p/w1280/8tBcqkZ9L4P2B8nLtawZ5A60y2Q.jpg", match: "94%", duration: "3 Seasons", age: "16+", genre: "Sci-Fi, Thriller" }
    ],
    continue: [
        { id: 6, title: "Extraction 2", img: "https://image.tmdb.org/t/p/w1280/rshlQ6LfPRWXAKHQ4IGhvdJKZWj.jpg", match: "96%", duration: "2h 2m", age: "18+", genre: "Action, Thriller" },
        { id: 7, title: "Glass Onion", img: "https://image.tmdb.org/t/p/w1280/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg", match: "93%", duration: "2h 19m", age: "13+", genre: "Mystery, Comedy" },
        { id: 8, title: "Red Notice", img: "https://image.tmdb.org/t/p/w1280/1g0dhYtq4irTY1AKXv0yv82X4wB.jpg", match: "90%", duration: "1h 58m", age: "13+", genre: "Action, Comedy" },
        { id: 9, title: "The Irishman", img: "https://image.tmdb.org/t/p/w1280/1K1J1TfG3pB6K5yN1fBExx4B6bL.jpg", match: "89%", duration: "3h 29m", age: "18+", genre: "Crime, Drama" }
    ],
    awards: [
        { id: 10, title: "Narcos", img: "https://image.tmdb.org/t/p/w1280/nQckN10P82zE3xZq9E5A4W6P2r9.jpg", match: "98%", duration: "3 Seasons", age: "18+", genre: "Crime, Drama" },
        { id: 11, title: "Peaky Blinders", img: "https://image.tmdb.org/t/p/w1280/7T1o465K5z2iK2zJ7y0Y7iFwP1u.jpg", match: "99%", duration: "6 Seasons", age: "18+", genre: "Crime, Drama" },
        { id: 12, title: "Breaking Bad", img: "https://image.tmdb.org/t/p/w1280/rQGBjWNveVeF8f2PGRtS85w9o9r.jpg", match: "95%", duration: "5 Seasons", age: "18+", genre: "Crime, Drama" },
        { id: 13, title: "Better Call Saul", img: "https://image.tmdb.org/t/p/w1280/fC2HDm5t0kHlAMOINAYvV83NNJa.jpg", match: "92%", duration: "6 Seasons", age: "18+", genre: "Crime, Drama" }
    ]
};

// Expose data to window
window.moviesData = moviesData;
