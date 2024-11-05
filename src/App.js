import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/; // Regex to check valid URL format
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!validateUrl(longUrl)) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      const response = await axios.post('/shorten', { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error creating short URL:', error);
      setError('Error creating short URL. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>LinkHive</h1> {/* Added main title above the card */}
      <div style={styles.card}>
        <h2 style={styles.title}>URL Shortener</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Shorten</button>
        </form>
        {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
        {shortUrl && (
          <p style={styles.result}>
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>{shortUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', // Changed to column for vertical stacking
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffec80', // Soft pastel yellow background
    margin: 0,
  },
  mainTitle: {
    fontSize: '36px', // Larger font size for the main title
    marginBottom: '20px',
    color: '#b58e00', // Deep yellow
  },
  card: {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff', // White card for contrast
    width: '20vw',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#b58e00', // Deep yellow
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #d5c02c', // Light yellow-gray border
    outline: 'none',
    backgroundColor: '#fff8d4', // Soft light yellow
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#b58e00', // Darker yellow for the button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#b58e00', // Deep yellow to match title
  },
  link: {
    color: '#b58e00', // Deep yellow
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default App;
