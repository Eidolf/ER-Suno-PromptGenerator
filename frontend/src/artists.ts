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
        artistName: 'Drake',
        primaryGenres: ['Hip-Hop', 'Trap'],
        styleTags: ['laid-back', 'ambient beats', 'modern', 'introspective'],
        vocalType: 'Male',
        moodEnergy: 'Chill, nocturnal'
    },
    {
        artistName: 'Bruno Mars',
        primaryGenres: ['Funk-Pop'],
        styleTags: ['groovy rhythms', 'danceable', 'retro-modern'],
        vocalType: 'Male',
        moodEnergy: 'Upbeat, energetic'
    },
    {
        artistName: 'Fleetwood Mac',
        primaryGenres: ['Classic Rock'],
        styleTags: ['mellow harmonies', 'emotional', '70s vibe'],
        vocalType: 'Mixed',
        moodEnergy: 'Warm, reflective',
        eraFlavor: '70s'
    },
    {
        artistName: 'Billie Eilish',
        primaryGenres: ['Pop'],
        styleTags: ['dark', 'minimal', 'intimate', 'modern'],
        vocalType: 'Female',
        moodEnergy: 'Moody, restrained'
    },
    {
        artistName: 'Metallica',
        primaryGenres: ['Thrash Metal'],
        styleTags: ['aggressive riffs', 'pounding drums', 'heavy'],
        vocalType: 'Male',
        moodEnergy: 'Intense, powerful'
    },
    {
        artistName: 'Radiohead',
        primaryGenres: ['Alternative Rock'],
        styleTags: ['experimental', 'atmospheric', 'emotional'],
        vocalType: 'Male',
        moodEnergy: 'Melancholic, cerebral'
    }
];
