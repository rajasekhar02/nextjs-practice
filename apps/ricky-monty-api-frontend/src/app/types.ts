export interface Character {
    gender: "Male" | "Female";
    id: number;
    image: string;
    name: string;
    species: string;
    status: "Alive" | "Dead" | "unknown";
}

export type Info = {
    count: number;
    pages: number;
    next: string;
    prev: string;
};
export interface ListCharacterResponse {
    info: Info;
    results: Character[];
}

export type RickMortyAPIListParams = {
    page: number
}

export type RickMortyAPISearchParams = {
    name?: string;
    status?: 'alive' | 'dead' | 'unknown';
    species?: string;
    type?: string;
    gender?: 'male' | 'female' | 'unknown' | 'genderless';
}

export type CharacterPageRouteParams = {
    page?: string;
    name?: string;
    status?: 'alive' | 'dead' | 'unknown';
    species?: string;
    type?: string;
    gender?: 'male' | 'female' | 'unknown' | 'genderless';
}