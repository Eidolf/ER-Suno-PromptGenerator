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
    examples?: { title: string; template: string }[];
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginLeft: '6px' }}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginLeft: '6px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const GENRES = [
    'Pop', 'Electronic', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'R&B', 'Country', 'Lo-Fi', 'EDM', 'Acoustic',
    'Indie', 'Alternative', 'Folk', 'Soul', 'Funk', 'Blues', 'Reggae', 'Punk', 'Disco', 'House', 'Techno',
    'Trance', 'Dubstep', 'Drum and Bass', 'Synthwave', 'Ambient', 'Trap', 'K-Pop', 'J-Pop'
];
const METAL_SUBGENRES = [
    'Heavy Metal', 'Thrash Metal', 'Death Metal', 'Black Metal', 'Power Metal', 'Doom Metal', 'Symphonic Metal',
    'Progressive Metal', 'Nu Metal', 'Folk Metal', 'Metalcore', 'Deathcore', 'Industrial Metal', 'Groove Metal',
    'Gothic Metal', 'Sludge Metal', 'Post-Metal', 'Metal', 'Djent'
];
const STYLES = [
    'Upbeat', 'Energetic', 'Slow', 'Emotional', 'Aggressive', 'Melancholic', 'Atmospheric', 'Epic', 'Dark',
    'Happy', 'Sad', 'Chill', 'Ambient', 'Fast', 'Heavy', 'Driving', 'Groovy', 'Soothing', 'Dreamy', 'Intense',
    'Romantic', 'Mysterious', 'Euphoric', 'Uplifting', 'Nostalgic', 'Funky', 'Raw', 'Polished'
];
const BPMS = ['80 BPM', '100 BPM', '120 BPM', '140 BPM', '160 BPM', '180 BPM', '200 BPM'];
const TAGS = [
    '[Intro]', '[Verse]', '[Pre-Chorus]', '[Chorus]', '[Bridge]', '[Guitar Solo]', '[Drop]', '[Build-up]',
    '[Breakdown]', '[Outro]', '[Fast Tempo]', '[Slow Tempo]', '[Upbeat]', '[Acoustic]', '[Epic]', '[Intimate]',
    '[Female Vocals]', '[Male Vocals]', '[Instrumental]', '[Bass Drop]', '[Beat Drop]', '[Vocalization]',
    '[Choir]', '[Orchestral]', '[Synth Solo]', '[Drum Fill]', '[Fade Out]', '[Acapella]', '[End]'
];

const HELP_DATA: Record<string, HelpTopic> = {
    genres: {
        title: "Genres",
        description: "Genres define the foundational sound and instrumental arrangement of your track. Suno understands a wide variety of global genres. Combining them can lead to unique fusion styles.",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-03-list-of-music-genres-and-styles/",
        examples: [
            { title: "Synthwave Banger", template: "Synthwave, 80s, Electronic, Retrowave, Driving" },
            { title: "Acoustic Ballad", template: "Acoustic, Indie Folk, Intimate, Emotional, Guitar" }
        ]
    },
    metal: {
        title: "Metal Subgenres",
        description: "Highly specific subgenres in Metal dictate the vocal style (e.g. growls vs clean singing), guitar tuning, and drumming patterns. For example, 'Deathcore' yields a much heavier, breakdown-oriented track than standard 'Heavy Metal'.",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-03-list-of-music-genres-and-styles/",
        examples: [
            { title: "Epic Symphonic Metal", template: "Symphonic Metal, Operatic Female Vocals, Orchestral, Epic" },
            { title: "Aggressive Deathcore", template: "Deathcore, Breakdowns, Deep Growls, Blast Beats, Heavy" }
        ]
    },
    styles: {
        title: "Styles (Tone & Vibe)",
        description: "Styles act as adjectives to shape the mood, feeling, and energy of the chosen genres. Select tones like 'Emotional', 'Aggressive', or 'Upbeat' to guide the vibe of your song without necessarily switching genres.",
        url: "https://help.suno.com/"
    },
    bpm: {
        title: "BPM (Beats Per Minute)",
        description: "Setting a specific BPM helps guide Suno's internal tempo generator. Select a classic speed like 140 BPM for energetic tracks, or 100 BPM for mid-tempo grooves.",
        url: "https://help.suno.com/"
    },
    tags: {
        title: "Structure Tags",
        description: "Metatags like [Verse], [Chorus], or [Drop] tell Suno's AI how to structure the song flow. Place them on their own line directly above the lyrics they should influence. Use descriptors like [Fast Tempo] for momentary changes.",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-13-list-of-metatags/",
        tutorialUrl: "https://sunometatagcreator.com/metatags-guide",
        examples: [
            { title: "Standard Pop Structure", template: "[Intro]\n(Instrumental build up)\n\n[Verse 1]\nWalking down the neon street...\n\n[Pre-Chorus]\nAnd I feel it coming...\n\n[Chorus]\nElectric love in the night!\n\n[Outro]\n(Fading synths)" },
            { title: "EDM Drop Structure", template: "[Intro]\nAtmospheric pads\n\n[Build-up]\nFaster drums, rising tension\n\n[Drop]\nHeavy bassline, energetic\n[Fast Tempo]" }
        ]
    }
};

function App() {
    const [text, setText] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedBpms, setSelectedBpms] = useState<string[]>([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [result, setResult] = useState<PromptResponse | null>(null);
    const [activeHelp, setActiveHelp] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const toggleStyle = (style: string) => {
        setSelectedStyles((prev) =>
            prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
        );
    };

    const toggleBpm = (bpm: string) => {
        setSelectedBpms((prev) =>
            prev.includes(bpm) ? prev.filter((b) => b !== bpm) : [...prev, bpm]
        );
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tagToInsert.length;
                textareaRef.current.focus();
            }
        }, 0);
    };

    const handleGenerate = async () => {
        try {
            const apiUrl = import.meta.env.PROD
                ? '/api/v1/generate'
                : 'http://localhost:13050/api/v1/generate';

            // To achieve "Genre -> Styles -> Tempo" ordering, 
            // since backend does: combined_tags = genres + styles
            const mergedStylesAndBpms = [...selectedStyles, ...selectedBpms];

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, genres: selectedGenres, styles: mergedStylesAndBpms })
            });
            const data: PromptResponse = await response.json();
            setResult(data);
            setCopied(false);
        } catch (error) {
            console.error("Error generating prompt:", error);
        }
    };

    const handleCopy = () => {
        if (result?.lyrics_formatted) {
            navigator.clipboard.writeText(result.lyrics_formatted).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    // Helper component for rendering mapped chips with the "Show More" functionality
    const renderChips = (
        items: string[],
        selected: string[],
        toggleFn: (item: string) => void,
        sectionId: string,
        isInsert: boolean = false
    ) => {
        const isExpanded = expandedSections[sectionId];
        const filteredItems = items.filter(i => i.toLowerCase().includes(genreFilter.toLowerCase()));

        const displayCount = 10;

        // Always show selected items, then fill the rest up to displayCount with unselected
        // If expanded, just show all filtered
        let itemsToDisplay: string[] = [];

        if (isExpanded) {
            itemsToDisplay = filteredItems;
        } else {
            const selectedFiltered = filteredItems.filter(i => selected.includes(i));
            const unselectedFiltered = filteredItems.filter(i => !selected.includes(i));
            // Total to show is max(displayCount, selectedFiltered.length). 
            const remainingSlots = Math.max(0, displayCount - selectedFiltered.length);
            itemsToDisplay = [...selectedFiltered, ...unselectedFiltered.slice(0, remainingSlots)];
        }

        return (
            <>
                <div className="chip-container">
                    {itemsToDisplay.map(item => (
                        <button
                            key={item}
                            className={`chip ${isInsert ? 'tag-chip' : ''} ${selected.includes(item) ? 'active' : ''}`}
                            onClick={() => isInsert ? insertTag(item) : toggleFn(item)}
                            title={isInsert ? "Click to insert at cursor position" : "Toggle selection"}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                {filteredItems.length > displayCount && (
                    <button className="show-more-btn" onClick={() => toggleSection(sectionId)}>
                        {isExpanded ? 'Show Less ⬆' : `Show More (${filteredItems.length - itemsToDisplay.length}) ⬇`}
                    </button>
                )}
            </>
        );
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
                        placeholder="Search tags, genres, and styles..."
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
                    {renderChips(GENRES, selectedGenres, toggleGenre, 'genres')}
                </div>

                <div className="selection-section">
                    <div className="section-header">
                        <h3>Metal Subgenres (Primary)</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('metal')} title="What are Metal Subgenres?">?</button>
                    </div>
                    {renderChips(METAL_SUBGENRES, selectedGenres, toggleGenre, 'metal')}
                </div>

                <div className="selection-section">
                    <div className="section-header">
                        <h3>Select Styles (Tone/Vibe)</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('styles')} title="What are Styles?">?</button>
                    </div>
                    {renderChips(STYLES, selectedStyles, toggleStyle, 'styles')}
                </div>

                <div className="selection-section">
                    <div className="section-header">
                        <h3>Select BPM (Tempo)</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('bpm')} title="What is BPM?">?</button>
                    </div>
                    {renderChips(BPMS, selectedBpms, toggleBpm, 'bpm')}
                </div>

                <div className="selection-section">
                    <div className="section-header">
                        <h3>Insert Tags</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('tags')} title="How do Tags work?">?</button>
                    </div>
                    {renderChips(TAGS, [], insertTag, 'tags', true)}
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
                        <div className="result-header">
                            <h3>Formatted Lyrics:</h3>
                            <button className="copy-btn" onClick={handleCopy}>
                                {copied ? <>Copied! <CheckIcon /></> : <>Copy to Clipboard <CopyIcon /></>}
                            </button>
                        </div>
                        <pre>{result.lyrics_formatted}</pre>
                    </div>
                )}

                {activeHelp && HELP_DATA[activeHelp] && (
                    <div className="modal-overlay" onClick={() => setActiveHelp(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setActiveHelp(null)}>×</button>
                            <h2>{HELP_DATA[activeHelp].title}</h2>
                            <p>{HELP_DATA[activeHelp].description}</p>

                            {HELP_DATA[activeHelp].examples && (
                                <div className="modal-examples">
                                    <h3>Examples</h3>
                                    {HELP_DATA[activeHelp].examples.map((ex, i) => (
                                        <div key={i} className="example-item">
                                            <strong>{ex.title}:</strong>
                                            <pre className="example-template">{ex.template}</pre>
                                        </div>
                                    ))}
                                </div>
                            )}

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
