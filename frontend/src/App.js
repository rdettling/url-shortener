import React, { useState } from 'react';
import './App.css';

function App() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [displayUrl, setDisplayUrl] = useState(''); // New state variable for the original URL
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsCopied(false); // Hide the copied message on new submission

        if (!url) {
            setError('Please enter a URL to shorten.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url }),
            });
            const data = await response.json();

            if (response.ok) {
                setShortUrl(data.short_url);
                setDisplayUrl(url); // Update the display URL here
            } else {
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('Network error');
            console.error('There was an error!', error);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(shortUrl)
            .then(() => {
                setIsCopied(true); // Show the copied message
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        setIsCopied(false); // Hide the copied message when changing the URL
                    }}
                    placeholder="Enter URL here"
                    className="url-input"
                />
                <button type="submit" className="shorten-button">
                    Shorten
                </button>
            </form>
            {shortUrl &&
                displayUrl && ( // Only display when both shortUrl and displayUrl are set
                    <div className="result">
                        <p>
                            <strong>Short URL:</strong>{' '}
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                                {shortUrl}
                            </a>{' '}
                            {'->'} {displayUrl}
                        </p>
                        <button onClick={copyToClipboard} className="copy-button">
                            Copy to Clipboard
                        </button>
                        {isCopied && <p className="copy-confirmation">URL copied!</p>}
                    </div>
                )}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default App;
