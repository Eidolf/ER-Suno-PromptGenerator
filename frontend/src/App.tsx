import { useState, useRef } from 'react';
import './App.css';

interface PromptResponse {
    genres: string;
    styles: string;
    lyrics_formatted: string;
}

const GENRES = ['Pop', 'Electronic', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'R&B', 'Country', 'Lo-Fi', 'EDM', 'Acoustic'];
const METAL_SUBGENRES = ['Heavy Metal', 'Thrash Metal', 'Death Metal', 'Black Metal', 'Power Metal', 'Doom Metal', 'Symphonic Metal', 'Progressive Metal', 'Nu Metal', 'Folk Metal', 'Metalcore', 'Deathcore', 'Industrial Metal', 'Groove Metal', 'Metal'];
const TAGS = ['[Tempo: Fast]', '[Tempo: Slow]', '[Tempo: Upbeat]', '[Style: Acoustic]', '[Style: Epic]', '[Style: Intimate]', '[Vocal: Female]', '[Vocal: Male]', '[Instrumental]', '[Drop]', '[Build-up]'];

function App() {
    const [text, setText] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [result, setResult] = useState<PromptResponse | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev: string[]) =>
            prev.includes(genre) ? prev.filter((g: string) => g !== genre) : [...prev, genre]
        );
    };

    const insertTag = (tag: string) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const newText = text.substring(0, start) + tag + text.substring(end);
        setText(newText);

        // Reset cursor position after React state update
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tag.length;
                textareaRef.current.focus();
            }
        }, 0);
    };

    const handleGenerate = async () => {
        try {
            const response = await fetch('http://localhost:13050/api/v1/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, genres: selectedGenres })
            });
            const data: PromptResponse = await response.json();
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
                <div className="selection-section">
                    <h3>Select Genres</h3>
                    <div className="chip-container">
                        {GENRES.map(genre => (
                            <button
                                key={genre}
                                className={`chip ${selectedGenres.includes(genre) ? 'active' : ''}`}
                                onClick={() => toggleGenre(genre)}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="selection-section">
                    <h3>Metal Subgenres (Primary)</h3>
                    <div className="chip-container">
                        {METAL_SUBGENRES.map(genre => (
                            <button
                                key={genre}
                                className={`chip ${selectedGenres.includes(genre) ? 'active' : ''}`}
                                onClick={() => toggleGenre(genre)}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="selection-section">
                    <h3>Insert Tags</h3>
                    <div className="chip-container">
                        {TAGS.map(tag => (
                            <button
                                key={tag}
                                className="chip tag-chip"
                                onClick={() => insertTag(tag)}
                                title="Click to insert at cursor position"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <textarea
                    ref={textareaRef}
                    placeholder="Enter lyrics here. Click tags above to insert them at the cursor..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={12}
                    cols={50}
                />
                <br />
                <div className="button-group">
                    <button className="generate-btn" onClick={handleGenerate}>Generate Prompt</button>
                    <button
                        className="generate-btn instrumental-btn"
                        onClick={() => {
                            setText('[Instrumental]');
                        }}
                    >
                        [Instrumental] Only
                    </button>
                </div>
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
