document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quote-text');
    const authorElement = document.getElementById('author');
    const newQuoteButton = document.getElementById('newQuoteButton');
    const volumeUpButton = document.getElementById('volume-up');
    const copyButton = document.getElementById('copy');
    const twitterButton = document.getElementById('twitter-share');
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('input[type="search"]');
    const loginButtonContainer = document.getElementById('loginButtonContainer');
    const imageAndUsername = document.getElementById('imageAndUsername');
    const loggedInUsername = document.getElementById('loggedInUsername');
    const logoutButton = document.getElementById('logoutButton');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userIcon = document.getElementById('userIcon');

    let quotes = []; // Array to hold quotes
    let filteredQuotes = []; // Array to hold filtered quotes
    let registeredUser = null; // Variable to hold user information

    // Function to fetch quotes from JSON file
    function fetchQuotes() {
        fetch('/static/quotes/quotes.json')
            .then(response => response.json())
            .then(data => {
                quotes = data.quotes;
                generateRandomQuote(); // Display initial quote
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }

    // Function to generate a random quote
    function generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        // Update the quote and author elements
        quoteElement.textContent = `"${randomQuote.quote}"`;
        authorElement.textContent = randomQuote.author;
    }

    // Initial fetch of quotes on page load
    fetchQuotes();

    // Event listener for New Quote button
    newQuoteButton.addEventListener('click', generateRandomQuote);

    // Event listener for Volume Up button
    volumeUpButton.addEventListener('click', function() {
        const quoteText = `${quoteElement.textContent.trim()} by - ${authorElement.textContent}`;
        speakQuote(quoteText);
    });

    // Event listener for Copy button
    copyButton.addEventListener('click', function() {
        const quoteText = `${quoteElement.textContent.trim()} - ${authorElement.textContent}`;
        copyToClipboard(quoteText);
    });

    // Event listener for Twitter button
    twitterButton.addEventListener('click', function() {
        const quoteText = encodeURIComponent(`${quoteElement.textContent.trim()} - ${authorElement.textContent}`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText}`;
        window.open(twitterUrl, '_blank');
    });

    // Event listener for Search form submission
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            filteredQuotes = [...quotes]; // Reset filteredQuotes to all quotes if query is empty
        } else {
            filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(query));
        }

        if (filteredQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            const randomQuote = filteredQuotes[randomIndex];
            quoteElement.textContent = `"${randomQuote.quote}"`;
            authorElement.textContent = randomQuote.author;
        } else {
            quoteElement.textContent = 'No quotes found.';
            authorElement.textContent = '';
        }
    });

    // Function to speak the quote
    function speakQuote(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    // Event listener for Register form submission
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const regPassword = document.getElementById('regPassword').value;
        const reenterPassword = document.getElementById('reenterPassword').value;

        // Basic validation
        if (firstName === '' || lastName === '' || regPassword === '' || reenterPassword === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (regPassword !== reenterPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Save registered user information (for demonstration purposes)
        registeredUser = {
            username: `${firstName} ${lastName}`,
            password: regPassword
        };

        // Assuming registration is successful, close modal
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    });

    // Event listener for Login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Check if the registered user exists and the credentials match
        if (registeredUser === null) {
            alert('No registered user found. Please register first.');
        } else if (username !== registeredUser.username || password !== registeredUser.password) {
            alert('Incorrect username or password!');
        } else {
            alert('Login successful!');
            $('#loginModal').modal('hide');
            loginButtonContainer.style.display = 'none';
            imageAndUsername.style.display = 'block';
            loggedInUsername.textContent = username;
            userIcon.style.display = 'block'; // Assuming you have an element with id 'userIcon' for the user icon
        }
    });

    // Event listener for Logout button
    logoutButton.addEventListener('click', function() {
        imageAndUsername.style.display = 'none';
        loginButtonContainer.style.display = 'block';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        userIcon.style.display = 'none'; // Assuming you have an element with id 'userIcon' for the user icon
    });
});
