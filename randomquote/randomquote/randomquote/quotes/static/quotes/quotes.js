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

    const quotesJsonUrl = document.currentScript.getAttribute('data-quotes-url');

    function fetchQuotes() {
        fetch(quotesJsonUrl)
            .then(response => response.json())
            .then(data => {
                quotes = data.quotes;
                filteredQuotes = [...quotes];
                generateRandomQuote();
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }

    function generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteElement.textContent = `"${randomQuote.quote}"`;
        authorElement.textContent = randomQuote.author;
    }

    function speakQuote(text) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    newQuoteButton.addEventListener('click', generateRandomQuote);

    volumeUpButton.addEventListener('click', function() {
        const quoteText = `${quoteElement.textContent.trim()} by - ${authorElement.textContent}`;
        speakQuote(quoteText);
    });

    copyButton.addEventListener('click', function() {
        const quoteText = `${quoteElement.textContent.trim()} - ${authorElement.textContent}`;
        copyToClipboard(quoteText);
    });

    twitterButton.addEventListener('click', function() {
        const quoteText = encodeURIComponent(`${quoteElement.textContent.trim()} - ${authorElement.textContent}`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText}`;
        window.open(twitterUrl, '_blank');
    });

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            filteredQuotes = [...quotes];
        } else {
            filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(query));
        }

        if (filteredQuotes.length > 0) {
            generateRandomQuote();
        } else {
            quoteElement.textContent = 'No quotes found.';
            authorElement.textContent = '';
        }
    });

    $('#registerBtn').click(function() {
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var password = $('#regPassword').val();
        var reenterPassword = $('#reenterPassword').val();

        if (firstName === '' || lastName === '' || password === '' || reenterPassword === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== reenterPassword) {
            alert('Passwords do not match.');
            return;
        }

        alert('Registration successful!');
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    });

    $('#loginBtn').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();

        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }

        alert('Login successful!');
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

    fetchQuotes();
});
