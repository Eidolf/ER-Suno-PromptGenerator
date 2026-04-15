import { useState, useRef } from 'react';
import './App.css';
import { ARTIST_LIBRARY } from './artists';

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

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', marginBottom: '2px' }}>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
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
const VOCAL_STYLES = [
    'False Cord Growls', 'Diaphragmatic Gutturals', 'Oesophageal Grunts', 'Tunnel Throat', 
    'Inhaled Pig Squeals', 'Monotone', 'Atonal', 'Harsh Rasp', 'Low Formant', 'Guttural Growl',
    'Guttural Punch', '(blegh!)'
];
const BPMS = ['80 BPM', '100 BPM', '120 BPM', '140 BPM', '160 BPM', '180 BPM', '200 BPM'];
const TAGS = [
    '[Intro]', '[Verse]', '[Pre-Chorus]', '[Chorus]', '[Bridge]', '[Main Theme]', '[Guitar Solo]', '[Drop]', '[Build-up]',
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
        description: "Styles act as adjectives to shape the mood, feeling, and energy of the chosen genres. You can use chips or write full sentences to guide Suno.",
        url: "https://help.suno.com/",
        examples: [
            { title: "Sentence-based Style Example (Nu-disco)", template: "Nu-disco and synth-pop track at 120 BPM in the key of G minor. A syncopated, plucked synth bassline drives the rhythm alongside a standard electronic drum kit featuring a crisp snare and consistent hi-hat eighth notes. A bright, rhythmic electric guitar performs muted 16th-note scratches and staccato chords. Polished synth pads provide harmonic backing with occasional filter sweeps. A recurring lead synth melody uses a square wave tone with a short decay. The arrangement features distinct sections marked by the entry and exit of a high-frequency shaker and cowbell accents. The mix is clean with moderate compression on the master bus and subtle stereo widening on the synth layers." }
        ]
    },
    gutturals: {
        title: "Guttural & Harsh Vocals Guide",
        description: "To achieve realistic Death Metal or Deathcore growls without them sounding like a cartoon character, describe the physics of the sound. Use tags like 'Monotone' or 'Atonal' in your style to stop the AI from trying to hit melodic notes. For Suno V5, crank the 'Weirdness' slider to 60-75% so inhuman vocal textures aren't filtered out as noise. Use explicitly bracketed instructions per section.",
        url: "https://help.suno.com/",
        communityUrl: "https://www.cometapi.com/de/how-to-use-suno-to-generate-guttural-vocals/",
        examples: [
            { title: "Style Prompt Base", template: "Brutal Death Metal, False Cord Growls, Monotone, aggressive articulation, wet close mic, saturated preamp" },
            { title: "Lyrics Blueprint", template: "[Verse - guttural growl, low formant, aggressive rasp]\nBeneath the ash we crawl, the silence claws my name.\n\n[Chorus - shout + backing growl]\nWe feed the dark, we break the bone.\n(lead: guttural growl; backing: low harmonic drone)" }
        ]
    },
    metal_epos: {
        title: "Building a 10-Minute Metal Epic",
        description: "For long epics, don't rely on a single prompt. Use the Suno Studio Multitrack Editor to build the song in 2-minute segments via Re-Triggering. Start with a mid-tempo groove, extend the track using a new slower style prompt for the breakdown, and layer symphonic elements using the 'Add Instrumentals' feature. For rhythmic vocal precision, use ALL CAPS and punctuation (periods) to force the AI to 'punch' each syllable.",
        url: "https://help.suno.com/",
        communityUrl: "https://www.cometapi.com/de/how-to-use-suno-to-generate-guttural-vocals/",
        examples: [
            { title: "Rhythmic Precision Format", template: "[Guttural Punch]\nDE-VOURED. BY. THE. VOID.\n(blegh!)" }
        ]
    },
    bpm: {
        title: "BPM (Beats Per Minute)",
        description: "Setting a specific BPM helps guide Suno's internal tempo generator. Select a classic speed like 140 BPM for energetic tracks, or 100 BPM for mid-tempo grooves.",
        url: "https://help.suno.com/"
    },
    tags: {
        title: "Structure Tags",
        description: "Metatags like [Verse], [Chorus], or [Drop] tell Suno's AI how to structure the song flow. Place them on their own line directly above the lyrics they should influence. For advanced vocal control, you can use the syntax [Section - Tone (Voice) | Style, Style] (e.g. [Verse 1 - Aggressive (Male) | harsh, rhythmic]).",
        url: "https://help.suno.com/",
        communityUrl: "https://sunoaiwiki.com/resources/2024-05-13-list-of-metatags/",
        tutorialUrl: "https://sunometatagcreator.com/metatags-guide",
        examples: [
            { title: "Standard Pop Structure", template: "[Intro]\n(Instrumental build up)\n\n[Verse 1]\nWalking down the neon street...\n\n[Pre-Chorus]\nAnd I feel it coming...\n\n[Chorus]\nElectric love in the night!\n\n[Outro]\n(Fading synths)" },
            { title: "EDM Drop Structure", template: "[Intro]\nAtmospheric pads\n\n[Build-up]\nFaster drums, rising tension\n\n[Drop]\nHeavy bassline, energetic\n[Fast Tempo]" },
            { title: "Instrumental Detailed Setup", template: "[Instrumental]\n\n[Intro]\n[electronic drums enter]\n\n[Main Theme]\n[synth melody, cowbells]\n\n[Breakdown]\n[drums continue, filter sweep]\n\n[Outro]\n[synth melody fades out]" },
            { title: "Advanced Dynamic Vocals (Metal/Electro)", template: "[Verse 1 - Aggressive (Male) | harsh, rhythmic]\n(First verse lyrics here...)\n\n[Pre-Chorus - Ethereal (Female) | atmospheric, building]\n(Building up...)\n\n[Chorus - Both | explosive, heavy, anthemic]\n(Huge chorus...)\n\n[Outro - soft, atmospheric fade]" }
        ]
    },
    artists: {
        title: "Artist-Inspired Style Library (Non-Imitative Use)",
        description: "Artists are used only as style references. The generated prompts avoid using the artist's name and synthesize their known genres, tools, eras, and moods into generic descriptive language. This results in original, non-derivative output that complies with AI music platform guidelines.",
        url: "https://help.suno.com/",
        tutorialUrl: "https://travisnicholson.medium.com/complete-list-of-prompts-styles-for-suno-ai-music-2024-33ecee85f180",
        examples: [
            { title: "Drake", template: "hip-hop and trap with laid-back, ambient beats, modern, introspective, male delivery, and chill and nocturnal mood" }
        ]
    }
};

const TOOLTIPS: Record<string, string> = {
    // Styles
    'Upbeat': 'Positive, cheerful, and fast-paced.',
    'Energetic': 'High-intensity, lively, and driving.',
    'Slow': 'Unrushed, relaxed, and deliberate pace.',
    'Emotional': 'Expressive, deeply feeling, and moving.',
    'Aggressive': 'Fierce, intense, and forceful.',
    'Melancholic': 'Sorrowful, pensive, and sad.',
    'Atmospheric': 'Focuses on mood, texture, and spatial audio.',
    'Epic': 'Grand, monumental, and cinematic.',
    'Dark': 'Ominous, gloomy, or brooding tone.',
    'Happy': 'Joyful, bright, and positive.',
    'Sad': 'Sorrowful, downbeat, and expressing grief.',
    'Chill': 'Relaxing, laid-back, and easygoing.',
    'Ambient': 'Background-focused, texture-heavy, no strict beat.',
    'Fast': 'Quick tempo, rapid delivery.',
    'Heavy': 'Thick texture, often loud, distorted, or bass-heavy.',
    'Driving': 'Relentless forward momentum in rhythm.',
    'Groovy': 'Rhythmic feel that strongly invites dancing or movement.',
    'Soothing': 'Calming, gentle, and peaceful.',
    'Dreamy': 'Ethereal, surreal, and smooth.',
    'Intense': 'Extreme emotion or volume; highly focused.',
    'Romantic': 'Expressing love or deep affection.',
    'Mysterious': 'Enigmatic, suspenseful, and secretive.',
    'Euphoric': 'Intensely happy, soaring, and ecstatic.',
    'Uplifting': 'Inspiring hope, elevation, and optimism.',
    'Nostalgic': 'Evocative of the past, sentimental.',
    'Funky': 'Syncopated, bass-forward, and bouncy.',
    'Raw': 'Unpolished, authentic, and gritty.',
    'Polished': 'Clean, highly produced, and perfect.',

    // Vocal Techniques
    'False Cord Growls': 'Produces a deep, cavernous resonance common in Death Metal.',
    'Diaphragmatic Gutturals': 'Powerful, sustained low frequencies and breath support.',
    'Oesophageal Grunts': 'Animalistic, wet, and raw vocal textures.',
    'Tunnel Throat': 'Specific hollow sound popularized in modern Deathcore.',
    'Inhaled Pig Squeals': 'High-frequency, intense "bree" sounds.',
    'Monotone': 'Crucial for gutturals. Prevents the AI from applying melodic pitches to growls.',
    'Atonal': 'Removes pitch mapping, prioritizing harmonic noise/percussive vocals.',
    'Guttural Punch': 'Instruction for sudden, heavy percussive vocal delivery.',
    '(blegh!)': 'Classic metalcore vocalization / expression of disgust.',

    // Tags
    '[Intro]': 'The opening section of the song before the main vocals.',
    '[Verse]': 'The main storytelling section; melody is often consistent while lyrics change.',
    '[Pre-Chorus]': 'Builds tension and transitions from the verse to the chorus.',
    '[Chorus]': 'The memorable, repeating core message and melody of the song.',
    '[Bridge]': 'A contrasting section to introduce new musical ideas, often near the end.',
    '[Main Theme]': 'The primary, recurring instrumental melody or groove of the track.',
    '[Guitar Solo]': 'An instrumental section featuring a lead guitar.',
    '[Drop]': 'The climax of an electronic track, featuring heavy bass and beats.',
    '[Build-up]': 'A section of rising tension and increasing speed, usually before a drop.',
    '[Breakdown]': 'A stripped-back section where most instruments drop out to rebuild energy.',
    '[Outro]': 'The closing, fading section of the song.',
    '[Fast Tempo]': 'Instruction to suddenly increase the speed of the song.',
    '[Slow Tempo]': 'Instruction to suddenly decrease the speed or stretch out the timing.',
    '[Upbeat]': 'Instruction to shift to a happier, bouncy rhythm.',
    '[Acoustic]': 'Instruction to switch to non-electronic, organic instruments.',
    '[Epic]': 'Instruction to shift to a massive, cinematic arrangement.',
    '[Intimate]': 'Instruction to bring the vocals closer and quiet the instruments.',
    '[Female Vocals]': 'Request female singer.',
    '[Male Vocals]': 'Request male singer.',
    '[Instrumental]': 'Request a section (or whole song) without any vocals.',
    '[Bass Drop]': 'A sudden, heavy impact of sub-bass frequencies.',
    '[Beat Drop]': 'The moment the full rhythm section kicks in.',
    '[Vocalization]': 'Non-lyrical singing (e.g., "oohs", "aahs").',
    '[Choir]': 'A group of voices singing in harmony.',
    '[Orchestral]': 'Instruction to bring in classical string and brass sections.',
    '[Synth Solo]': 'An instrumental section featuring an electronic synthesizer.',
    '[Drum Fill]': 'A short flourish played on the drums to fill a gap.',
    '[Fade Out]': 'Instruction to gradually lower the volume to end the song.',
    '[Acapella]': 'Vocals only, completely without instrumental backing.',
    '[End]': 'Hard stop to officially terminate the song generation.'
};

function App() {
    const [text, setText] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedBpms, setSelectedBpms] = useState<string[]>([]);
    const [genreFilter, setGenreFilter] = useState('');
    const [customStyle, setCustomStyle] = useState('');
    const [advancedStyleMode, setAdvancedStyleMode] = useState(false);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [disabledArtistTags, setDisabledArtistTags] = useState<string[]>([]);
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

    const toggleArtist = (artistName: string) => {
        setSelectedArtists((prev) =>
            prev.includes(artistName) ? prev.filter((a) => a !== artistName) : [...prev, artistName]
        );
    };

    type ArtistTagInfo = { id: string; type: 'era'|'genre'|'tag'|'vocal'|'mood'; value: string; };

    const getDerivedTags = (): ArtistTagInfo[] => {
        if (selectedArtists.length === 0) return [];
        const artists = ARTIST_LIBRARY.filter(a => selectedArtists.includes(a.artistName));
        const allTags: ArtistTagInfo[] = [];

        const addTag = (type: ArtistTagInfo['type'], value: string) => {
            const id = `${type}-${value}`;
            if (!allTags.find(t => t.id === id) && value) {
                allTags.push({ id, type, value });
            }
        };

        artists.forEach(a => {
            if (a.eraFlavor) addTag('era', a.eraFlavor);
            a.primaryGenres.forEach(g => addTag('genre', g));
            a.styleTags.forEach(t => addTag('tag', t));
            addTag('vocal', a.vocalType);
            a.moodEnergy.split(',').forEach(m => addTag('mood', m.trim()));
        });
        return allTags;
    };

    const computeArtistDescription = () => {
        const activeDerivedTags = getDerivedTags().filter(t => !disabledArtistTags.includes(t.id));
        const eras = activeDerivedTags.filter(t => t.type === 'era').map(t => t.value);
        const genres = activeDerivedTags.filter(t => t.type === 'genre').map(t => t.value.toLowerCase());
        const tags = activeDerivedTags.filter(t => t.type === 'tag').map(t => t.value);
        const vocals = activeDerivedTags.filter(t => t.type === 'vocal').map(t => t.value.toLowerCase());
        const moods = activeDerivedTags.filter(t => t.type === 'mood').map(t => t.value.toLowerCase());

        let desc = "";
        if (eras.length > 0) desc += eras.join(" and ") + " ";
        desc += genres.length > 0 ? genres.join(" and ") : "music";
        
        const withElements = [];
        if (tags.length > 0) withElements.push(tags.join(", "));
        if (vocals.length > 0) withElements.push(`${vocals.join('/')} delivery`);
        if (moods.length > 0) withElements.push(`${moods.join(' and ')} mood`);

        if (withElements.length > 0) {
            desc += " with " + withElements.join(", and ");
        }
        
        return desc;
    };

    const toggleArtistTag = (id: string) => {
        setDisabledArtistTags(prev => 
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    // Logic for contextual Tag Modifiers vs Global Styles
    const handleStyleClick = (style: string) => {
        if (!textareaRef.current) {
            toggleStyle(style);
            return;
        }

        const start = textareaRef.current.selectionStart;

        // Find if we are currently inside brackets [ ]
        const textBeforeCursor = text.substring(0, start);
        const textAfterCursor = text.substring(start);

        const lastOpenBracket = textBeforeCursor.lastIndexOf('[');
        const lastCloseBracketBefore = textBeforeCursor.lastIndexOf(']');

        const nextCloseBracket = textAfterCursor.indexOf(']');
        const nextOpenBracketAfter = textAfterCursor.indexOf('[');

        // We are inside a bracket if: last open bracket was not closed before cursor, and a close bracket exists after
        const isInsideBracket = lastOpenBracket !== -1 &&
            lastOpenBracket > lastCloseBracketBefore &&
            nextCloseBracket !== -1 &&
            (nextOpenBracketAfter === -1 || nextCloseBracket < nextOpenBracketAfter);

        if (isInsideBracket) {
            const tagStartIdx = lastOpenBracket;
            const tagEndIdx = start + nextCloseBracket;
            const tagContent = text.substring(tagStartIdx + 1, tagEndIdx);
            const cleanTag = tagContent.trim();
            const lowerStyle = style.toLowerCase();

            let newTagContent = "";
            if (cleanTag.includes(' | ')) {
                const parts = cleanTag.split(' | ');
                const beforePipe = parts[0].trim();
                const afterPipe = parts[1].trim();
                newTagContent = afterPipe.endsWith(',') ? `${beforePipe} | ${afterPipe} ${lowerStyle}` : `${beforePipe} | ${afterPipe}, ${lowerStyle}`;
            } else if (cleanTag.includes('(') && cleanTag.includes(')')) {
                // If it already has a vocal definition, start the pipe block
                newTagContent = `${cleanTag} | ${lowerStyle}`;
            } else if (cleanTag.includes(' - ')) {
                // Legacy modifier
                newTagContent = cleanTag.endsWith(',') ? `${cleanTag} ${lowerStyle}` : `${cleanTag}, ${lowerStyle}`;
            } else {
                // Add legacy modifier dash
                newTagContent = `${cleanTag} - ${lowerStyle}`;
            }

            const newText = text.substring(0, tagStartIdx + 1) + newTagContent + text.substring(tagEndIdx);
            setText(newText);

            setTimeout(() => {
                if (textareaRef.current) {
                    const newCursorPos = tagStartIdx + 1 + newTagContent.length;
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newCursorPos;
                    textareaRef.current.focus();
                }
            }, 0);
        } else {
            // Not inside a tag, toggle as global style
            toggleStyle(style);
        }
    };

    const handleGenerateStyleDescription = () => {
        const genreText = selectedGenres.length > 0 ? selectedGenres.join(' and ') : 'modern';
        const styleText = selectedStyles.length > 0 ? selectedStyles.join(', ') : 'dynamic';
        const bpmText = selectedBpms.length > 0 ? ` at ${selectedBpms[0]}` : '';

        const keys = ['C minor', 'G minor', 'D minor', 'A minor', 'E minor', 'F major', 'E major', 'D major'];
        const randomKey = keys[Math.floor(Math.random() * keys.length)];

        let instruments = "a standard rhythm section and melodic leads";
        const genreLower = genreText.toLowerCase();

        if (genreLower.includes('metal') || genreLower.includes('rock') || genreLower.includes('punk')) {
            instruments = "distorted electric guitars, driving basslines, and heavy drumming";
        } else if (genreLower.includes('electronic') || genreLower.includes('techno') || genreLower.includes('house') || genreLower.includes('edm') || genreLower.includes('trance')) {
            instruments = "pulsing synthesizers, deep bass frequencies, and electronic drum machines";
        } else if (genreLower.includes('acoustic') || genreLower.includes('folk') || genreLower.includes('country') || genreLower.includes('indie')) {
            instruments = "acoustic guitars, organic percussion, and warm bass tones";
        } else if (genreLower.includes('hip-hop') || genreLower.includes('trap') || genreLower.includes('r&b')) {
            instruments = "heavy 808 bass, crisp hi-hats, and rhythmic sampling";
        } else if (genreLower.includes('jazz') || genreLower.includes('blues') || genreLower.includes('soul') || genreLower.includes('funk')) {
            instruments = "syncopated drums, brass accents, and expressive basslines";
        } else if (genreLower.includes('classical') || genreLower.includes('orchestral') || genreLower.includes('symphonic')) {
            instruments = "lush string sections, dramatic brass, and soaring woodwinds";
        } else if (genreLower.includes('pop')) {
            instruments = "catchy synth hooks, driving drum beats, and polished bass";
        }

        const arrangements = [
            "The arrangement builds naturally, layering elements to create constant momentum.",
            "It features structured sections with clear dynamic shifts.",
            "The track focuses on a central groove, adding and removing layers over time.",
            "A steady rhythmic foundation supports evolving melodic themes."
        ];
        const randomArrangement = arrangements[Math.floor(Math.random() * arrangements.length)];

        const mixes = [
            "The mix is pristine, featuring tight low-end and wide stereo separation.",
            "It has a spacious production style with lush reverb and deliberate panning.",
            "The production emphasizes a punchy, aggressive tone with saturated master dynamics.",
            "A warm and organic mix that highlights the natural character of the instrumentation."
        ];
        const randomMix = mixes[Math.floor(Math.random() * mixes.length)];

        // Handle grammatical formatting if no selections made
        const prefix = selectedStyles.length > 0 ? `A ${styleText}` : `A`;
        const description = `${prefix} ${genreText} track${bpmText} in the key of ${randomKey}. The instrumentation is driven by ${instruments}. ${randomArrangement} ${randomMix}`;

        setCustomStyle(description);
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
            if (customStyle.trim()) {
                mergedStylesAndBpms.push(customStyle.trim());
            }

            const artistDesc = computeArtistDescription();
            if (artistDesc) {
                mergedStylesAndBpms.push(artistDesc);
            }

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
                            title={TOOLTIPS[item] || (isInsert ? "Click to insert at cursor position" : "Toggle selection")}
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
                        <h3>Select Artist Inspirations</h3>
                        <button className="help-icon" onClick={() => setActiveHelp('artists')} title="How do Artists work?">?</button>
                    </div>
                    {renderChips(ARTIST_LIBRARY.map(a => a.artistName), selectedArtists, toggleArtist, 'artists')}
                    {selectedArtists.length > 0 && (
                        <div className="artist-preview" style={{marginTop: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.03)'}}>
                            <h4 style={{marginBottom: '8px'}}>Extracted Descriptors (Click to toggle)</h4>
                            <div className="chip-container">
                                {getDerivedTags().map(tag => (
                                   <button 
                                       key={tag.id}
                                       className={`chip tag-chip ${!disabledArtistTags.includes(tag.id) ? 'active' : ''}`}
                                       onClick={() => toggleArtistTag(tag.id)}
                                   >
                                       {tag.value}
                                   </button>
                                ))}
                            </div>
                            <h4 style={{marginTop: '12px', marginBottom: '8px'}}>Final Prompt Text</h4>
                            <p className="artist-preview-text" style={{fontStyle: 'italic', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', margin: 0}}>{computeArtistDescription()}</p>
                        </div>
                    )}
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
                        <button className="toggle-advanced-btn" onClick={() => setAdvancedStyleMode(!advancedStyleMode)}>
                            {advancedStyleMode ? 'Hide Advanced Mode' : 'Advanced Sentence Mode'}
                        </button>
                    </div>
                    {advancedStyleMode && (
                        <div className="advanced-style-container">
                            <textarea
                                placeholder="Describe your style as a proper sentence... e.g. 'Nu-disco and synth-pop track at 120 BPM in the key of G minor.'"
                                value={customStyle}
                                onChange={(e) => setCustomStyle(e.target.value)}
                                rows={3}
                                className="advanced-style-textarea"
                            />
                            <div className="advanced-actions">
                                <button className="auto-generate-btn" onClick={handleGenerateStyleDescription}>
                                    <SparklesIcon /> Auto-Generate Description
                                </button>
                            </div>
                            <p className="advanced-hint">Write a complete descriptive text outlining instruments, melody, and overall arrangement. It will be combined with your chips above.</p>
                        </div>
                    )}
                    {renderChips(STYLES, selectedStyles, handleStyleClick, 'styles')}
                </div>

                <div className="selection-section">
                    <div className="section-header">
                        <h3>Vocal Techniques / Gutturals</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="help-icon" onClick={() => setActiveHelp('gutturals')} title="How to write harsh metal vocals?">?</button>
                            <button className="help-icon" style={{ borderColor: '#ff003c', color: '#ff003c' }} onClick={() => setActiveHelp('metal_epos')} title="Building a Metal Epic"><BookIcon /></button>
                        </div>
                    </div>
                    {renderChips(VOCAL_STYLES, selectedStyles, handleStyleClick, 'vocal_styles')}
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
                <div className="button-group">
                    <button className="generate-btn" onClick={handleGenerate}>Generate Prompt</button>
                    <button
                        className="generate-btn instrumental-btn"
                        onClick={() => {
                            setText('[Instrumental]\n\n[Intro]\n\n\n[Main Theme]\n\n\n[Breakdown]\n\n\n[Outro]\n');
                        }}
                    >
                        Instrumental Template
                    </button>
                    <button
                        className="generate-btn guttural-btn"
                        onClick={() => {
                            setText('[Verse - guttural growl, low formant, aggressive rasp]\nBeneath the ash we crawl...\n\n[Chorus - shout + backing growl]\nWe feed the dark...\n(lead: guttural growl; backing: low harmonic drone)');
                        }}
                    >
                        Guttural Template
                    </button>
                    <button
                        className="generate-btn"
                        style={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }}
                        onClick={() => {
                            setText('[Verse 1 - Aggressive (Male) | harsh, rhythmic, driving]\n(First verse lyrics here...)\n\n[Pre-Chorus - Ethereal (Female) | atmospheric, building]\n(Building up tension...)\n\n[Chorus - Both | explosive, heavy, anthemic]\n(Huge impactful chorus...)\n\n[Outro - soft, atmospheric fade]\n(Fading out...)');
                        }}
                    >
                        Dynamic Vocal / Duet Template
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
