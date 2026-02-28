import React, { useState } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error generating prompt:", error);
        }
    };

    return (
        <div className="app-container dark-mode">
            <header>
                <h1>Suno Prompt Generator</h1>
            </header>
            <main>
                <textarea
                    placeholder="Enter lyrics here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={10}
                    cols={50}
                />
                <br />
                <button onClick={handleGenerate}>Generate Prompt</button>
                {result && (
                    <div className="result-container">
                        <h3>Genres/Styles:</h3>
                        <p>{result.genres} - {result.styles}</p>
                        <h3>Formatted Lyrics:</h3>
                        <pre>{result.lyrics_formatted}</pre>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
