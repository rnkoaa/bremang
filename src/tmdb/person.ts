import {CombinedCredits} from "./person.credits";
export class Person{
    id: number;
    also_known_as: Array<string>;
    adult: boolean;
    biography: string;
    birthday: string;
    deathday: string;
    homepage: string;
    imdb_id: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    media_type: string;
    profile_path: string;
    combined_credits: CombinedCredits;
}