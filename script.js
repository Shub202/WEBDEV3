document.addEventListener('DOMContentLoaded', () => {

    // === GLOBAL ELEMENTS ===
    const yearSpan = document.getElementById('year');
    yearSpan.textContent = new Date().getFullYear();

    // Helper function for selecting elements
    const select = (selector, parent = document) => parent.querySelector(selector);
    const selectAll = (selector, parent = document) => parent.querySelectorAll(selector);

    // === QUIZ ===
    const quizData = [
        { question: "What does HTML stand for?", answers: [{ text: "HyperText Markup Language", correct: true }, { text: "Hot Mail", correct: false }, { text: "How to Make Lasagna", correct: false }, { text: "High Tech Modern Language", correct: false }] },
        { question: "Which tag is used to include JavaScript?", answers: [{ text: "<js>", correct: false }, { text: "<javascript>", correct: false }, { text: "<script>", correct: true }, { text: "<scode>", correct: false }] },
        { question: "Which CSS property controls the text size?", answers: [{ text: "font-style", correct: false }, { text: "text-size", correct: false }, { text: "font-size", correct: true }, { text: "text-style", correct: false }] },
        { question: "Which method adds an element to the end of an array in JavaScript?", answers: [{ text: "push()", correct: true }, { text: "pop()", correct: false }, { text: "append()", correct: false }, { text: "add()", correct: false }] },
        { question: "How do you add a comment in CSS?", answers: [{ text: "// This is a comment", correct: false }, { text: "/* This is a comment */", correct: true }, { text: "# This is a comment", correct: false }, { text: "", correct: false }] },
        { question: "JavaScript is primarily a ___-side programming language.", answers: [{ text: "Client", correct: false }, { text: "Server", correct: false }, { text: "Both Client and Server", correct: true }] },
        { question: "How do you write 'Hello World' in an alert box?", answers: [{ text: "msg('Hello World')", correct: false }, { text: "alert('Hello World')", correct: true }, { text: "prompt('Hello World')", correct: false }, { text: "alertBox('Hello World')", correct: false }] },
        { question: "Which HTML tag is used to make text bold without semantic importance?", answers: [{ text: "<strong>", correct: false }, { text: "<b>", correct: true }, { text: "<bold>", correct: false }, { text: "<emphasize>", correct: false }] },
        { question: "Which symbol is used for selecting an ID in CSS?", answers: [{ text: "#", correct: true }, { text: ".", correct: false }, { text: "@", correct: false }, { text: "<>", correct: false }] },
        { question: "Which of the following is a type of loop in JavaScript?", answers: [{ text: "for loop", correct: true }, { text: "loop through", correct: false }, { text: "each loop", correct: false }, { text: "cycle loop", correct: false }] },
        { question: "CSS stands for?", answers: [{ text: "Creative Style Sheets", correct: false }, { text: "Cascading Style Sheets", correct: true }, { text: "Colorful Style Sheets", correct: false }, { text: "Computer Style Sheets", correct: false }] },
        { question: "Which operator represents strict equality in JavaScript?", answers: [{ text: "===", correct: true }, { text: "==", correct: false }, { text: "=", correct: false }, { text: "!=", correct: false }] },
        { question: "Which HTML tag is used to define a line break?", answers: [{ text: "<br>", correct: true }, { text: "<lb>", correct: false }, { text: "<line>", correct: false }, { text: "<break>", correct: false }] },
        { question: "What does DOM stand for?", answers: [{ text: "Document Object Model", correct: true }, { text: "Data Object Model", correct: false }, { text: "Design Object Model", correct: false }, { text: "Digital Ordering Model", correct: false }] },
        { question: "What is the correct HTML element for linking an external CSS file?", answers: [{ text: "<link rel='stylesheet' href='style.css'>", correct: true }, { text: "<style src='style.css'>", correct: false }, { text: "<css href='style.css'>", correct: false }, { text: "<stylesheet>style.css</stylesheet>", correct: false }] },
        { question: "Which HTML tag is used to define a row in a table?", answers: [{ text: "<row>", correct: false }, { text: "<td>", correct: false }, { text: "<tr>", correct: true }, { text: "<table>-row", correct: false }] },
        { question: "Which JavaScript method is used to select an HTML element by its ID?", answers: [{ text: "getElementById()", correct: true }, { text: "selectElementById()", correct: false }, { text: "findElement()", correct: false }, { text: "queryId()", correct: false }] },
        { question: "In CSS, how do you center text horizontally within an element?", answers: [{ text: "align: center;", correct: false }, { text: "text-align: center;", correct: true }, { text: "center-text: true;", correct: false }, { text: "layout: center;", correct: false }] },
        { question: "Which JavaScript event occurs when a user clicks on an HTML element?", answers: [{ text: "onhover", correct: false }, { text: "onclick", correct: true }, { text: "onpress", correct: false }, { text: "onmouseclick", correct: false }] },
        { question: "Which HTML tag is used to embed a video?", answers: [{ text: "<media>", correct: false }, { text: "<vid>", correct: false }, { text: "<video>", correct: true }, { text: "<movie>", correct: false }] },
    ];

    let currentQuizQuestionIndex = 0;
    let userScore = 0;
    let quizActive = false; // State to prevent multiple clicks

    const quizElements = {
        questionCount: select('#question-number'),
        questionText: select('#question-text'),
        answerButtonsDiv: select('#answer-buttons'),
        feedbackMsg: select('#feedback'),
        quizNextBtn: select('#quiz-next-btn'),
        scoreSection: select('#score-section'),
        finalScoreSpan: select('#final-score'),
        totalQuestionsSpan: select('#total-questions'),
        restartQuizBtn: select('#restart-quiz-btn')
    };

    const startQuiz = () => {
        currentQuizQuestionIndex = 0;
        userScore = 0;
        quizActive = true;
        quizElements.scoreSection.classList.add('hidden');
        quizElements.totalQuestionsSpan.textContent = quizData.length;
        showQuizQuestion();
    };

    const showQuizQuestion = () => {
        resetQuizState();
        if (currentQuizQuestionIndex < quizData.length) {
            const q = quizData[currentQuizQuestionIndex];
            quizElements.questionCount.textContent = `Question ${currentQuizQuestionIndex + 1}/${quizData.length}`;
            quizElements.questionText.textContent = q.question;

            q.answers.forEach((answer) => {
                const button = document.createElement('button');
                button.textContent = answer.text;
                button.classList.add('btn', 'grid-item'); // Use general btn class and a grid item class
                if (answer.correct) {
                     button.dataset.correct = true; // Store correctness
                }

                button.addEventListener('click', handleAnswerSelection);
                quizElements.answerButtonsDiv.appendChild(button);
            });
        } else {
            endQuiz();
        }
    };

    const resetQuizState = () => {
        quizElements.answerButtonsDiv.innerHTML = '';
        quizElements.feedbackMsg.textContent = '';
        quizElements.feedbackMsg.className = 'feedback-msg'; // Reset classes
        quizElements.quizNextBtn.classList.add('hidden');
        quizElements.questionText.textContent = 'Loading...'; // Indicate loading state
         quizElements.questionCount.textContent = ''; // Clear question count
    };

    const handleAnswerSelection = (event) => {
        if (!quizActive) return; // Prevent clicks after an answer is selected

        quizActive = false; // Disable further clicks for this question
        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === 'true';

        // Disable all answer buttons
        selectAll('.btn-grid .btn', quizElements.answerButtonsDiv).forEach(button => {
            button.disabled = true;
        });

        // Provide feedback and styling
        if (isCorrect) {
            userScore++;
            quizElements.feedbackMsg.textContent = 'Correct!';
            quizElements.feedbackMsg.classList.add('correct');
            selectedButton.classList.add('correct');
        } else {
            quizElements.feedbackMsg.textContent = `Incorrect! The correct answer was: ${quizData[currentQuizQuestionIndex].answers.find(ans => ans.correct).text}`;
            quizElements.feedbackMsg.classList.add('incorrect');
            selectedButton.classList.add('incorrect'); // Style the incorrect choice

            // Highlight the correct answer
            const correctAnswerButton = select('.btn-grid .btn[data-correct="true"]', quizElements.answerButtonsDiv);
            if (correctAnswerButton) {
                 correctAnswerButton.classList.add('was-correct');
            }
        }

        quizElements.quizNextBtn.classList.remove('hidden'); // Show the next button
    };

    const endQuiz = () => {
        quizElements.questionCount.textContent = '';
        quizElements.questionText.textContent = 'Quiz Completed!';
        quizElements.answerButtonsDiv.innerHTML = '';
        quizElements.feedbackMsg.textContent = '';
        quizElements.quizNextBtn.classList.add('hidden');
        quizElements.scoreSection.classList.remove('hidden');
        quizElements.finalScoreSpan.textContent = userScore;
        quizActive = false; // Quiz is no longer active
    };

    // Event Listeners for Quiz Controls
    quizElements.quizNextBtn.addEventListener('click', () => {
        currentQuizQuestionIndex++;
        quizActive = true; // Re-enable clicks for the next question
        showQuizQuestion();
    });

    quizElements.restartQuizBtn.addEventListener('click', startQuiz); // Restart calls startQuiz

    // Initial quiz load
    startQuiz();


    // === IMAGE CAROUSEL ===
    const carouselImages = [
        { src: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg", alt: "Ocean view with rocks" },
        { src: "https://img.freepik.com/free-photo/silhouetted-couple-sit-bench-autumn-tree-generative-ai_188544-12574.jpg?semt=ais_hybrid&w=740", alt: "Mountain stream" },
        { src: "https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbmluZ3xlbnwwfHwwfHx8MA%3D%3D", alt: "Forest path" },
        { src: "https://picsum.photos/id/1041/900/400", alt: "Desert landscape" },
        { src: "https://picsum.photos/id/1051/900/400", alt: "City lights" }
    ];
    let currentCarouselIndex = 0;
    const carouselIntervalTime = 4000; // 4 seconds
    let carouselTimer;

    const carouselElements = {
        slidesDiv: select('.carousel-slides'),
        prevBtn: select('#carousel-prev-btn'),
        nextBtn: select('#carousel-next-btn'),
        indicatorsDiv: select('.carousel-indicators'),
        container: select('.carousel-wrapper') // Select the wrapper
    };

     // Dynamically add images and indicators
    const initializeCarousel = () => {
        carouselImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            // Images will be positioned or transformed by updateCarousel

            carouselElements.slidesDiv.appendChild(img);

            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => goToSlide(index)); // Use arrow function to preserve index
            carouselElements.indicatorsDiv.appendChild(indicator);
        });
        updateCarousel(); // Show the first slide initially
        startAutoPlay(); // Start the auto-play timer
    };

    const updateCarousel = () => {
        // Use transform for smoother sliding
        const slideWidth = carouselElements.slidesDiv.clientWidth;
        carouselElements.slidesDiv.style.transform = `translateX(${-slideWidth * currentCarouselIndex}px)`;

        // Update indicators
        selectAll('.indicator', carouselElements.indicatorsDiv).forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentCarouselIndex);
        });
    };

    const nextSlide = () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    };

    const goToSlide = (index) => {
        currentCarouselIndex = index;
        updateCarousel();
        resetAutoPlay(); // Reset timer on manual interaction
    };

    const startAutoPlay = () => {
        stopAutoPlay(); // Clear any existing timer
        carouselTimer = setInterval(nextSlide, carouselIntervalTime);
    };

    const stopAutoPlay = () => {
        clearInterval(carouselTimer);
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Event Listeners for Carousel Controls
    carouselElements.prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    carouselElements.nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Pause auto-play on hover
    carouselElements.container.addEventListener('mouseenter', stopAutoPlay);
    carouselElements.container.addEventListener('mouseleave', startAutoPlay);

    // Initialize the carousel
    initializeCarousel();


    // === MANUAL RANDOM QUOTES ===
    const quoteElements = {
        fetchBtn: select('#fetch-quote-btn'),
        quoteText: select('#quote-text'),
        quoteAuthor: select('#quote-author'),
        statusMsg: select('#quote-status')
    };

    // Manual array of quotes
    const quotes = [
        { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { content: "Everything you can imagine is real.", author: "Pablo Picasso" },
        { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
        { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
        { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
        { content: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
        { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
        { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" }
        // You can add more quotes easily
    ];

    // Function to fetch and display random quote from the manual array
    const fetchAndDisplayQuote = () => {
        quoteElements.statusMsg.textContent = "Loading new quote...";
        quoteElements.statusMsg.className = 'status-msg'; // Reset classes
        quoteElements.fetchBtn.disabled = true; // Disable button while loading
        quoteElements.quoteText.textContent = ""; // Clear previous quote
        quoteElements.quoteAuthor.textContent = ""; // Clear previous author

        // Simulate a small delay (optional, for better UX)
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];

            quoteElements.quoteText.textContent = `"${randomQuote.content}"`;
            quoteElements.quoteAuthor.textContent = `— ${randomQuote.author}`;
            quoteElements.statusMsg.textContent = ""; // Clear status on success
            quoteElements.fetchBtn.disabled = false; // Re-enable button
        }, 500); // 500ms delay
    };

    // Event listener for Quote Button
    quoteElements.fetchBtn.addEventListener('click', fetchAndDisplayQuote);

    // Fetch a quote on page load
    fetchAndDisplayQuote();


    // === SMOOTH SCROLLING FOR NAVIGATION ===
    selectAll('.site-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = select(targetId);

            if (targetElement) {
                // Calculate the position considering the fixed header
                const headerHeight = select('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); // End DOMContentLoaded