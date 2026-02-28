import { useState, useRef } from 'react';
import './App.css';

interface PromptResponse {
    genres: string;
    styles: string;
    lyrics_formatted: string;
}

interface HelpTopic {
    title: string;
    description: string;
    url: string;
    communityUrl?: string;
    tutorialUrl?: string;
}

const GENRES = ['Pop', 'Electronic', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'R&B', 'Country', 'Lo-Fi', 'EDM', 'Acoustic'];
const METAL_SUBGENRES = ['Heavy Metal', 'Thrash Metal', 'Death Metal', 'Black Metal', 'Power Metal', 'Doom Metal', 'Symphonic Metal', 'Progressive Metal', 'Nu Metal', 'Folk Metal', 'Metalcore', 'Deathcore', 'Industrial Metal', 'Groove Metal', 'Metal'];
const TAGS = ['[Intro]', '[Verse]', '[Pre-Chorus]', '[Chorus]', '[Bridge]', '[Guitar Solo]', '[Drop]', '[Build-up]', '[Breakdown]', '[Outro]', '[Tempo: Fast]', '[Tempo: Slow]', '[Tempo: Upbeat]', '[Style: Acoustic]', '[Style: Epic]', '[Style: Intimate]', '[Female Vocals]', '[Male Vocals]', '[Instrumental]'];

const HELP_DATA: Record<string, HelpTopic> = {
    genres: {
        title: "Genres",
        description: "Genres define the foundational sound and instrumental arrangement of your track. Suno understands a wide variety of global genres. Combining them can lead to unique fusion styles.",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-03-list-of-music-genres-and-styles/"
    },
    metal: {
        title: "Metal Subgenres",
        description: "Highly specific subgenres in Metal dictate the vocal style (e.g. growls vs clean singing), guitar tuning, and drumming patterns. For example, 'Deathcore' yields a much heavier, breakdown-oriented track than standard 'Heavy Metal'.",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-03-list-of-music-genres-and-styles/"
    },
    tags: {
        title: "Structure Tags",
        description: "Metatags like [Verse], [Chorus], or [Drop] tell Suno's AI how to structure the song flow. Place them on their own line directly above the lyrics they should influence. Use descriptors like [Tempo: Fast] for momentary changes.",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-13-list-of-metatags/",
        tutorialUrl: "https://sunometatagcreator.com/metatags-guide"
    }
};

function App() {
    const [text, setText] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [result, setResult] = useState<PromptResponse | null>(null);
    const [activeHelp, setActiveHelp] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev: string[]) =>
            prev.includes(genre) ? prev.filter((g: string) => g !== genre) : [...prev, genre]
        );
    };

    const insertTag = (tag: string) => {
        if (!textareaRef.current) return;

        let tagToInsert = tag;
        if (tag === '[Verse]') {
            const verseMatches = text.match(/\[Verse \d+\]/gi) || [];
            const nextVerseNum = verseMatches.length + 1;
            tagToInsert = `[Verse ${nextVerseNum}]`;
        }

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const newText = text.substring(0, start) + tagToInsert + text.substring(end);
        setText(newText);

        // Reset cursor position after React state update
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tagToInsert.length;
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
                <div className="filter-container">
                    <input
                        type="text"
                        placeholder="Search genres..."
                        className="genre-filter"
                        value={genreFilter}
                        onChange={(e) => setGenreFilter(e.target.value)}
                    />
                </div>

                <div className="selection-section">
                    <div className="section-header">
                        <h3>Select Genres</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('genres')} title="What are Genres?">?</button>
                    </div>
                    <div className="chip-container">
                        {GENRES.filter(g => g.toLowerCase().includes(genreFilter.toLowerCase())).map(genre => (
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
                    <div className="section-header">
                        <h3>Metal Subgenres (Primary)</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('metal')} title="What are Metal Subgenres?">?</button>
                    </div>
                    <div className="chip-container">
                        {METAL_SUBGENRES.filter(g => g.toLowerCase().includes(genreFilter.toLowerCase())).map(genre => (
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
                    <div className="section-header">
                        <h3>Insert Tags</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('tags')} title="How do Tags work?">?</button>
                    </div>
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

                {activeHelp && HELP_DATA[activeHelp] && (
                    <div className="modal-overlay" onClick={() => setActiveHelp(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setActiveHelp(null)}>×</button>
                            <h2>{HELP_DATA[activeHelp].title}</h2>
                            <p>{HELP_DATA[activeHelp].description}</p>
                            <div className="modal-links">
                                <a href={HELP_DATA[activeHelp].url} target="_blank" rel="noopener noreferrer" className="modal-link">
                                    [ Official Suno Help ]
                                </a>
                                {HELP_DATA[activeHelp].communityUrl && (
                                    <a href={HELP_DATA[activeHelp].communityUrl} target="_blank" rel="noopener noreferrer" className="modal-link community-link">
                                        [ Community Suno Wiki ]
                                    </a>
                                )}
                                {HELP_DATA[activeHelp].tutorialUrl && (
                                    <a href={HELP_DATA[activeHelp].tutorialUrl} target="_blank" rel="noopener noreferrer" className="modal-link tutorial-link">
                                        [ Meta Tag Creator Guide ]
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
