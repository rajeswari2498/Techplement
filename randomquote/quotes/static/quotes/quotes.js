document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quote-text');
    const authorElement = document.getElementById('author');
    const newQuoteButton = document.getElementById('newQuoteButton');
    const volumeUpButton = document.getElementById('volume-up');
    const copyButton = document.getElementById('copy');
    const twitterButton = document.getElementById('twitter-share');
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('input[type="search"]');
    
    let quotes = []; // Array to hold all quotes
    let filteredQuotes = []; // Array to hold filtered quotes

    // Function to fetch quotes from JSON file
    function fetchQuotes() {
        const quotesJsonUrl = '/static/quotes/quotes.json'; // Adjust path as per your project setup
        fetch(quotesJsonUrl)
            .then(response => response.json())
            .then(data => {
                quotes = data.quotes;
                filteredQuotes = [...quotes]; // Initialize filteredQuotes with all quotes
                generateRandomQuote(); // Display initial random quote
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }

    // Function to generate a random quote
    function generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        
        // Update the quote and author elements
        quoteElement.textContent = `"${randomQuote.quote}"`;
        authorElement.textContent = randomQuote.author;
    }

    // Event listener for New Quote button
    newQuoteButton.addEventListener('click', function() {
        generateRandomQuote(); // Generate random quote when button is clicked
    });

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
            generateRandomQuote(); // Display a random quote from filteredQuotes
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

    // Initial fetch of quotes on page load
    fetchQuotes();

    // Registration and Login functionality using jQuery
    $('#registerBtn').click(function() {
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var password = $('#regPassword').val();
        var reenterPassword = $('#reenterPassword').val();

        // Basic validation
        if (firstName === '' || lastName === '' || password === '' || reenterPassword === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== reenterPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Assuming registration is successful, close modal
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    });

    $('#loginBtn').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();

        // Basic validation
        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Assuming login is successful, update UI
        $('#loginModal').modal('hide');
        $('#loginButtonContainer').hide();
        $('#imageAndUsername').show();
        $('#loggedInUsername').text(username);
    });

    $('#logoutButton').click(function() {
        $('#imageAndUsername').hide();
        $('#loginButtonContainer').show();
        $('#username').val('');
        $('#password').val('');
    });

    const registerForm = document.getElementById("registerForm");
    const regUsername = document.getElementById("regUsername");
    const regPassword = document.getElementById("regPassword");
    const reenterPassword = document.getElementById("reenterPassword");
    const registerBtn = document.getElementById("registerBtn");

    const loginForm = document.getElementById("loginForm");
    const loginUsername = document.getElementById("loginUsername");
    const loginPassword = document.getElementById("loginPassword");
    const loginBtn = document.getElementById("loginBtn");

    let registeredUser = null;

    registerBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (regPassword.value !== reenterPassword.value) {
            alert("Passwords do not match!");
        } else {
            registeredUser = {
                username: regUsername.value,
                password: regPassword.value
            };
            alert("Registration successful!");
            $('#registerModal').modal('hide');
            $('#loginmodal').modal('show');
        }
    });

    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (registeredUser === null) {
            alert("No registered user found. Please register first.");
        } else if (loginUsername.value !== registeredUser.username || loginPassword.value !== registeredUser.password) {
            alert("Incorrect username or password!");
        } else {
            alert("Login successful!");
            $('#loginModal').modal('hide');
            document.getElementById("loggedInUsername").textContent = registeredUser.username;
            document.getElementById("imageAndUsername").style.display = "block";
        }
    });
});
