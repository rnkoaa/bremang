import {BremTitle} from "./title.brem";
import {BremGenre} from "./genre.brem";
import {BremLanguage} from "./language.brem";
import {BremCountry} from "./country.brem";
import {BremCompany} from "./company.brem";
import {BremRelease} from "./release.brem";
import {BremImage} from "./image.brem";
import {BremKeyword} from "./keyword.brem";
import {BremCast} from "./cast.brem";
import {BremCrew} from "./crew.brem";

export class BremVideo {
    id: string;
    tmdbId: number;
    adult: boolean;
    imdbId: string;
    title: BremTitle;
    titles: Array<BremTitle>;
    budget: number;
    homepage: string;
    backdropPath: string;
    overview: string;
    popularity: number;
    posterPath: string;
    genres: Array<BremGenre>;
    languages: Array<BremLanguage>;
    productionCompanies: Array<BremCompany>;
    productionCountries: Array<BremCountry>;
    releaseDate: Date;
    revenue: number;
    runtime: number;
    status: string;
    video: boolean;
    tagLine: string;
    averageVote: number;
    voteCount: number;
    releases: Array<BremRelease>;
    images: Array<BremImage>;
    keywords: Array<BremKeyword>;
    cast: Array<BremCast>;
    crew: Array<BremCrew>;

    constructor(){
        this.releases = [];
        this.images = [];
        this.keywords = [];
        this.cast = [];
        this.crew = [];
        this.productionCompanies = [];
        this.productionCountries = [];
        this.genres = [];
        this.languages = [];
        this.titles = [];
    }
}