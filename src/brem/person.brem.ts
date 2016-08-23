import {BremCredit} from "./credit.brem";
import {BremVideo} from "./video.brem";
export class BremPerson{
    id: string;
    credits: BremCredit<BremVideo>;
    birthday: string;
    imdbId: string;
    placeOfBirth: string;
    popularity: number;
    profilePath: string;
    adult: boolean;
    homepage: string;
    tmdbId: number;
    name: string;
    biography: string;
    deathday: string;
    alsoKnownAs: Array<string>;
}