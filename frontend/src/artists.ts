export interface ArtistStyle {
    artistName: string;
    primaryGenres: string[];
    styleTags: string[];
    vocalType: string;
    moodEnergy: string;
    eraFlavor?: string;
}

export const ARTIST_LIBRARY: ArtistStyle[] = [
    {
        artistName: "Drake",
        primaryGenres: ["Hip-Hop", "Trap"],
        styleTags: ["laid-back", "ambient beats", "modern", "introspective"],
        vocalType: "Male",
        moodEnergy: "Chill, nocturnal"
    },
    {
        artistName: "Bruno Mars",
        primaryGenres: ["Funk-Pop"],
        styleTags: ["groovy rhythms", "danceable", "retro-modern"],
        vocalType: "Male",
        moodEnergy: "Upbeat, energetic"
    },
    {
        artistName: "Fleetwood Mac",
        primaryGenres: ["Classic Rock"],
        styleTags: ["mellow harmonies", "emotional", "70s vibe"],
        vocalType: "Mixed",
        moodEnergy: "Warm, reflective",
        eraFlavor: "70s"
    },
    {
        artistName: "Billie Eilish",
        primaryGenres: ["Pop"],
        styleTags: ["dark", "minimal", "intimate", "modern"],
        vocalType: "Female",
        moodEnergy: "Moody, restrained"
    },
    {
        artistName: "Metallica",
        primaryGenres: ["Thrash Metal"],
        styleTags: ["aggressive riffs", "pounding drums", "heavy"],
        vocalType: "Male",
        moodEnergy: "Intense, powerful"
    },
    {
        artistName: "Radiohead",
        primaryGenres: ["Alternative Rock"],
        styleTags: ["experimental", "atmospheric", "emotional"],
        vocalType: "Male",
        moodEnergy: "Melancholic, cerebral"
    },
    {
        artistName: "Ed Sheeran",
        primaryGenres: ["Folk-pop"],
        styleTags: ["acoustic guitar loops"],
        vocalType: "Male",
        moodEnergy: "mellow tone"
    },
    {
        artistName: "Tim McGraw",
        primaryGenres: ["Country Americana"],
        styleTags: ["steady rhythm"],
        vocalType: "Male",
        moodEnergy: "heartfelt"
    },
    {
        artistName: "Elton John",
        primaryGenres: ["Piano-driven glam rock"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Neutral",
        eraFlavor: "vibrant 70s flair"
    },
    {
        artistName: "Dolly Parton",
        primaryGenres: ["Country storytelling"],
        styleTags: ["twangy melodies"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Red Hot Chili Peppers",
        primaryGenres: ["Funk rock"],
        styleTags: ["slap bass"],
        vocalType: "Male",
        moodEnergy: "energetic"
    },
    {
        artistName: "Coldplay",
        primaryGenres: ["Atmospheric alt-rock"],
        styleTags: ["emotional piano"],
        vocalType: "Male",
        moodEnergy: "ambient"
    },
    {
        artistName: "Taylor Swift",
        primaryGenres: ["Pop"],
        styleTags: ["Alternative Folk"],
        vocalType: "Female",
        moodEnergy: "Emotional"
    },
    {
        artistName: "Elvis Presley",
        primaryGenres: ["50s Rock"],
        styleTags: ["Hero Theme"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Adele",
        primaryGenres: ["Soul"],
        styleTags: ["Torch-Lounge"],
        vocalType: "Female",
        moodEnergy: "Emotional"
    },
    {
        artistName: "Ariana Grande",
        primaryGenres: ["Pop"],
        styleTags: ["Dance Pop", "Ethereal"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Phoebe Bridgers",
        primaryGenres: ["Bedroom"],
        styleTags: ["grungegaze", "catchy", "psychedelic", "acoustic tape recording"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "The Weeknd",
        primaryGenres: ["RnB"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Dark, Cinematic"
    },
    {
        artistName: "Beyonc\u00e9",
        primaryGenres: ["RnB"],
        styleTags: [],
        vocalType: "Female",
        moodEnergy: "Anthemic, Danceable"
    },
    {
        artistName: "Kendrick Lamar",
        primaryGenres: ["HipHop"],
        styleTags: ["Lyrical", "Storytelling", "Conscious"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Lady Gaga",
        primaryGenres: ["Pop"],
        styleTags: ["Theatrical", "Dance"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Jay-Z",
        primaryGenres: ["HipHop"],
        styleTags: ["Aggressive", "Storytelling"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Rihanna",
        primaryGenres: ["RnB"],
        styleTags: ["Dance Pop"],
        vocalType: "Female",
        moodEnergy: "Festive"
    },
    {
        artistName: "Kanye West",
        primaryGenres: ["HipHop"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Progressive, Eclectic"
    },
    {
        artistName: "Justin Bieber",
        primaryGenres: ["Pop"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Danceable, Chillwave"
    },
    {
        artistName: "Katy Perry",
        primaryGenres: ["Pop"],
        styleTags: ["Glitter"],
        vocalType: "Female",
        moodEnergy: "Festive"
    },
    {
        artistName: "AC/DC",
        primaryGenres: ["Hard rock"],
        styleTags: ["crunchy guitar riffs", "driving rhythm"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Madonna",
        primaryGenres: ["Dance Pop"],
        styleTags: [],
        vocalType: "Female",
        moodEnergy: "High-NRG"
    },
    {
        artistName: "David Bowie",
        primaryGenres: ["70s British Rock"],
        styleTags: ["Art"],
        vocalType: "Male",
        moodEnergy: "Eclectic"
    },
    {
        artistName: "Bob Dylan",
        primaryGenres: ["Folk"],
        styleTags: ["Storytelling", "Acoustic Guitar"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Post Malone",
        primaryGenres: ["Rap"],
        styleTags: ["Ethereal"],
        vocalType: "Male",
        moodEnergy: "Ambient"
    },
    {
        artistName: "Maroon 5",
        primaryGenres: ["Pop Rock"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Danceable"
    },
    {
        artistName: "Shakira",
        primaryGenres: ["Latin"],
        styleTags: ["Dance Pop"],
        vocalType: "Female",
        moodEnergy: "Festive"
    },
    {
        artistName: "Dua Lipa",
        primaryGenres: ["Disco"],
        styleTags: ["Dance Pop"],
        vocalType: "Female",
        moodEnergy: "Groovy"
    },
    {
        artistName: "Michael Jackson",
        primaryGenres: ["80s Pop"],
        styleTags: ["Dance", "Iconic"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Prince",
        primaryGenres: ["Funk"],
        styleTags: ["Glam"],
        vocalType: "Male",
        moodEnergy: "Eclectic"
    },
    {
        artistName: "Miley Cyrus",
        primaryGenres: ["Pop"],
        styleTags: ["Rock"],
        vocalType: "Female",
        moodEnergy: "Party"
    },
    {
        artistName: "Imagine Dragons",
        primaryGenres: ["2010s Rock"],
        styleTags: ["Emotion"],
        vocalType: "Mixed",
        moodEnergy: "Anthemic"
    },
    {
        artistName: "Camila Cabello",
        primaryGenres: ["Pop"],
        styleTags: ["Latin Jazz"],
        vocalType: "Female",
        moodEnergy: "Festive"
    },
    {
        artistName: "Harry Styles",
        primaryGenres: ["Pop"],
        styleTags: ["Rock"],
        vocalType: "Male",
        moodEnergy: "Groovy"
    },
    {
        artistName: "Sam Smith",
        primaryGenres: ["Soul"],
        styleTags: ["Lounge"],
        vocalType: "Male",
        moodEnergy: "Emotional"
    },
    {
        artistName: "Lizzo",
        primaryGenres: ["Pop"],
        styleTags: ["Funk", "Empowering"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Gorillaz",
        primaryGenres: ["Alternative Rock"],
        styleTags: ["Electronic"],
        vocalType: "Mixed",
        moodEnergy: "Unusual"
    },
    {
        artistName: "The Beatles",
        primaryGenres: ["60s British Pop"],
        styleTags: ["Classic", "Rock"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Queen",
        primaryGenres: ["Rock"],
        styleTags: ["Operatic", "Theatrical"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Led Zeppelin",
        primaryGenres: ["Hard Rock"],
        styleTags: ["Blues Rock"],
        vocalType: "Mixed",
        moodEnergy: "Epic"
    },
    {
        artistName: "Pink Floyd",
        primaryGenres: ["80s Rock"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Progressive, Atmospheric"
    },
    {
        artistName: "The Rolling Stones",
        primaryGenres: ["Rock"],
        styleTags: ["Blues Rock", "Classic"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Bob Marley",
        primaryGenres: ["Reggae"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Peaceful, Soulful"
    },
    {
        artistName: "Frank Sinatra",
        primaryGenres: ["1940s big band"],
        styleTags: ["Lounge Singer"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Aretha Franklin",
        primaryGenres: ["Soul"],
        styleTags: ["Gospel"],
        vocalType: "Female",
        moodEnergy: "Powerful"
    },
    {
        artistName: "Whitney Houston",
        primaryGenres: ["Pop"],
        styleTags: ["RnB"],
        vocalType: "Female",
        moodEnergy: "Emotional"
    },
    {
        artistName: "Stevie Wonder",
        primaryGenres: ["Soul"],
        styleTags: ["Funk"],
        vocalType: "Male",
        moodEnergy: "Joyful"
    },
    {
        artistName: "The Chainsmokers",
        primaryGenres: ["EDM-pop"],
        styleTags: ["bright synths", "pulsing beats"],
        vocalType: "Mixed",
        moodEnergy: "party energy"
    },
    {
        artistName: "Nicki Minaj",
        primaryGenres: ["Rap-pop"],
        styleTags: ["playful attitude", "rhythmic flow"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Green Day",
        primaryGenres: ["Punk rock"],
        styleTags: ["fast guitars", "youthful rebellion", "Aggressive", "Youthful"],
        vocalType: "Mixed",
        moodEnergy: "raw energy"
    },
    {
        artistName: "Nirvana",
        primaryGenres: ["90s grunge"],
        styleTags: ["distorted guitars", "raw angst"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Amy Winehouse",
        primaryGenres: ["Soul-jazz"],
        styleTags: ["retro horns"],
        vocalType: "Female",
        moodEnergy: "intimate"
    },
    {
        artistName: "Linkin Park",
        primaryGenres: ["Nu-metal"],
        styleTags: ["rap-rock fusion", "heavy riffs"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Aerosmith",
        primaryGenres: ["Classic hard rock"],
        styleTags: ["bluesy guitars"],
        vocalType: "Male",
        moodEnergy: "swagger"
    },
    {
        artistName: "Bon Jovi",
        primaryGenres: ["Arena rock"],
        styleTags: ["big choruses", "anthemic guitars"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Billy Joel",
        primaryGenres: ["Piano rock"],
        styleTags: ["pop sensibility", "melodic hooks"],
        vocalType: "Male",
        moodEnergy: "heartfelt"
    },
    {
        artistName: "Phil Collins",
        primaryGenres: ["80s pop-rock"],
        styleTags: ["emotional male", "cinematic drums", "soft synths"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Genesis",
        primaryGenres: ["Progressive rock"],
        styleTags: ["layered textures", "synth-driven"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "The Eagles",
        primaryGenres: ["Country rock"],
        styleTags: ["harmony vocals", "smooth guitars", "laid-back"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Janis Joplin",
        primaryGenres: ["Blues-rock"],
        styleTags: [],
        vocalType: "Female",
        moodEnergy: "raw emotion, soulful",
        eraFlavor: "classic 60s"
    },
    {
        artistName: "Jimi Hendrix",
        primaryGenres: ["Psychedelic rock"],
        styleTags: ["guitar virtuoso", "wild solos"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "The Who",
        primaryGenres: ["Hard rock"],
        styleTags: ["explosive guitars"],
        vocalType: "Male",
        moodEnergy: "dramatic"
    },
    {
        artistName: "Iron Maiden",
        primaryGenres: ["Heavy metal"],
        styleTags: ["epic storytelling", "galloping riffs", "theatrical"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Judas Priest",
        primaryGenres: ["Heavy metal"],
        styleTags: ["fast riffs", "powerful sound"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Slayer",
        primaryGenres: ["Thrash metal"],
        styleTags: ["dark aggression", "rapid-fire guitars"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Ozzy Osbourne",
        primaryGenres: ["Heavy metal"],
        styleTags: ["dark theatrics", "dramatic riffs"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Skrillex",
        primaryGenres: ["Dubstep"],
        styleTags: ["Electronic"],
        vocalType: "Male",
        moodEnergy: "Intense"
    },
    {
        artistName: "Calvin Harris",
        primaryGenres: ["EDM"],
        styleTags: ["Dance"],
        vocalType: "Male",
        moodEnergy: "Festive"
    },
    {
        artistName: "Arctic Monkeys",
        primaryGenres: ["Indie Rock"],
        styleTags: ["Garage"],
        vocalType: "Mixed",
        moodEnergy: "Cool"
    },
    {
        artistName: "Tame Impala",
        primaryGenres: ["Psychedelic Rock"],
        styleTags: ["Mellifluous"],
        vocalType: "Mixed",
        moodEnergy: "Dreamy"
    },
    {
        artistName: "The Strokes",
        primaryGenres: ["Indie Rock"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Cool, Raw"
    },
    {
        artistName: "Vampire Weekend",
        primaryGenres: ["Indie Rock"],
        styleTags: ["Upbeat"],
        vocalType: "Mixed",
        moodEnergy: "Eclectic"
    },
    {
        artistName: "Kings of Leon",
        primaryGenres: ["2000s Rock"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Emotional, Raw"
    },
    {
        artistName: "The Killers",
        primaryGenres: ["Rock"],
        styleTags: ["Synthpop"],
        vocalType: "Male",
        moodEnergy: "Anthemic"
    },
    {
        artistName: "System of a Down",
        primaryGenres: ["Metal"],
        styleTags: ["Political"],
        vocalType: "Mixed",
        moodEnergy: "Eccentric"
    },
    {
        artistName: "Foo Fighters",
        primaryGenres: ["Rock"],
        styleTags: ["Alternative"],
        vocalType: "Mixed",
        moodEnergy: "Energetic"
    },
    {
        artistName: "Muse",
        primaryGenres: ["Rock"],
        styleTags: ["Theatrical"],
        vocalType: "Mixed",
        moodEnergy: "Progressive"
    },
    {
        artistName: "Rage Against the Machine",
        primaryGenres: ["Rap Metal"],
        styleTags: ["Political", "Aggressive"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Pearl Jam",
        primaryGenres: ["90s Grunge"],
        styleTags: ["Rock"],
        vocalType: "Mixed",
        moodEnergy: "Emotional"
    },
    {
        artistName: "Soundgarden",
        primaryGenres: ["90s Grunge"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Heavy, Dark"
    },
    {
        artistName: "Alice in Chains",
        primaryGenres: ["Grunge"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Dark, Melodic"
    },
    {
        artistName: "Sigur R\u00f3s",
        primaryGenres: ["Post-Rock"],
        styleTags: ["Ethereal", "Icelandic"],
        vocalType: "Mixed",
        moodEnergy: "Atmospheric"
    },
    {
        artistName: "Bj\u00f6rk",
        primaryGenres: ["Alternative"],
        styleTags: ["Experimental"],
        vocalType: "Female",
        moodEnergy: "Unusual"
    },
    {
        artistName: "Marshmello",
        primaryGenres: ["EDM"],
        styleTags: ["Dance"],
        vocalType: "Mixed",
        moodEnergy: "Happy"
    },
    {
        artistName: "Lana Del Rey",
        primaryGenres: ["Pop"],
        styleTags: [],
        vocalType: "Female",
        moodEnergy: "Sadcore, Cinematic"
    },
    {
        artistName: "Kacey Musgraves",
        primaryGenres: ["Country"],
        styleTags: ["Pop", "Mellifluous"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "St. Vincent",
        primaryGenres: ["Art Rock"],
        styleTags: [],
        vocalType: "Female",
        moodEnergy: "Eclectic, Unusual"
    },
    {
        artistName: "Childish Gambino",
        primaryGenres: ["HipHop"],
        styleTags: ["Funk"],
        vocalType: "Male",
        moodEnergy: "Thoughtful"
    },
    {
        artistName: "SZA",
        primaryGenres: ["RnB"],
        styleTags: ["Neo Soul"],
        vocalType: "Female",
        moodEnergy: "Emotional"
    },
    {
        artistName: "Frank Ocean",
        primaryGenres: ["RnB"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Soulful, Introspective"
    },
    {
        artistName: "Tyler, The Creator",
        primaryGenres: ["HipHop"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Eclectic, Unusual"
    },
    {
        artistName: "Solange",
        primaryGenres: ["RnB"],
        styleTags: ["Soul"],
        vocalType: "Female",
        moodEnergy: "Artistic"
    },
    {
        artistName: "Brockhampton",
        primaryGenres: ["HipHop"],
        styleTags: ["Alternative", "Collective"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Mac DeMarco",
        primaryGenres: ["Indie Pop"],
        styleTags: ["Slacker Rock"],
        vocalType: "Male",
        moodEnergy: "Chill"
    },
    {
        artistName: "Rufus Du Sol",
        primaryGenres: ["Electronic"],
        styleTags: ["Dance"],
        vocalType: "Mixed",
        moodEnergy: "Atmospheric"
    },
    {
        artistName: "Bon Iver",
        primaryGenres: ["Indie Folk"],
        styleTags: ["Ethereal"],
        vocalType: "Male",
        moodEnergy: "Intimate"
    },
    {
        artistName: "Florence + The Machine",
        primaryGenres: ["Indie Rock"],
        styleTags: ["Ethereal"],
        vocalType: "Mixed",
        moodEnergy: "Dramatic"
    },
    {
        artistName: "Jack White",
        primaryGenres: ["Rock"],
        styleTags: ["Blues"],
        vocalType: "Male",
        moodEnergy: "Raw"
    },
    {
        artistName: "Gary Clark Jr.",
        primaryGenres: ["Blues Rock"],
        styleTags: [],
        vocalType: "Male",
        moodEnergy: "Soulful, Gritty"
    },
    {
        artistName: "Leon Bridges",
        primaryGenres: ["Soul"],
        styleTags: ["RnB", "Retro"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Brittany Howard",
        primaryGenres: ["Rock"],
        styleTags: ["Soul"],
        vocalType: "Female",
        moodEnergy: "Powerful"
    },
    {
        artistName: "Alabama Shakes",
        primaryGenres: ["Rock"],
        styleTags: ["Blues Rock"],
        vocalType: "Mixed",
        moodEnergy: "Soulful"
    },
    {
        artistName: "Glass Animals",
        primaryGenres: ["Psychedelic Pop"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Groovy, Eclectic"
    },
    {
        artistName: "Portugal, The Man",
        primaryGenres: ["Alternative Rock"],
        styleTags: ["Psychedelic", "Catchy"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "FKA Twigs",
        primaryGenres: ["RnB"],
        styleTags: ["Electronic", "Avant-Garde"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "The National",
        primaryGenres: ["Indie Rock"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Melancholy, Introspective"
    },
    {
        artistName: "MGMT",
        primaryGenres: ["Psychedelic Pop"],
        styleTags: ["Electronic"],
        vocalType: "Mixed",
        moodEnergy: "Playful"
    },
    {
        artistName: "Empire of the Sun",
        primaryGenres: ["Electronic"],
        styleTags: ["Pop", "Theatrical"],
        vocalType: "Mixed",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Grimes",
        primaryGenres: ["Art Pop"],
        styleTags: ["Electronic", "Experimental"],
        vocalType: "Female",
        moodEnergy: "Neutral"
    },
    {
        artistName: "James Blake",
        primaryGenres: ["Electronic"],
        styleTags: ["Soul", "Minimalist"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "The War on Drugs",
        primaryGenres: ["Indie Rock"],
        styleTags: ["Heartland Rock"],
        vocalType: "Mixed",
        moodEnergy: "Melodic"
    },
    {
        artistName: "Sufjan Stevens",
        primaryGenres: ["Indie Folk"],
        styleTags: ["Baroque Pop"],
        vocalType: "Male",
        moodEnergy: "Intimate"
    },
    {
        artistName: "Nicolas Jaar",
        primaryGenres: ["Electronic"],
        styleTags: ["Experimental"],
        vocalType: "Male",
        moodEnergy: "Atmospheric"
    },
    {
        artistName: "Flying Lotus",
        primaryGenres: ["Electronic"],
        styleTags: ["Experimental HipHop", "Fusion"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Thundercat",
        primaryGenres: ["Funk"],
        styleTags: ["Jazz", "Experimental"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Kamasi Washington",
        primaryGenres: ["Jazz"],
        styleTags: ["Fusion"],
        vocalType: "Male",
        moodEnergy: "Epic"
    },
    {
        artistName: "Massive Attack",
        primaryGenres: ["Trip Hop"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Dark, Atmospheric"
    },
    {
        artistName: "Portishead",
        primaryGenres: ["Trip Hop"],
        styleTags: [],
        vocalType: "Mixed",
        moodEnergy: "Dark, Cinematic"
    },
    {
        artistName: "Aphex Twin",
        primaryGenres: ["IDM"],
        styleTags: ["Electronic", "Experimental"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Boards of Canada",
        primaryGenres: ["IDM"],
        styleTags: ["Downtempo"],
        vocalType: "Mixed",
        moodEnergy: "Nostalgic"
    },
    {
        artistName: "J Dilla",
        primaryGenres: ["HipHop"],
        styleTags: ["Experimental"],
        vocalType: "Male",
        moodEnergy: "Soulful"
    },
    {
        artistName: "MF DOOM",
        primaryGenres: ["HipHop"],
        styleTags: ["Abstract", "Lyrical"],
        vocalType: "Male",
        moodEnergy: "Neutral"
    },
    {
        artistName: "Blink-182",
        primaryGenres: ["emo pop rock"],
        styleTags: ["fast-paced"],
        vocalType: "Male",
        moodEnergy: "exciting"
    }
];
