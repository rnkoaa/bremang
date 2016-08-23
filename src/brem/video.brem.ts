import {BremTitle} from "./title.brem";
import {BremGenre} from "./genre.brem";
import {BremLanguage} from "./language.brem";
import {BremCountry} from "./country.brem";
import {BremCompany} from "./company.brem";
import {BremRelease} from "./release.brem";
import {BremImage} from "./image.brem";
import {BremKeyword} from "./keyword.brem";
import {BremPerson} from "./person.brem";
import {BremCredit} from "./credit.brem";

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
    credits: BremCredit<BremPerson>;

    constructor(){
        this.releases = [];
        this.images = [];
        this.keywords = [];
        this.productionCompanies = [];
        this.productionCountries = [];
        this.genres = [];
        this.languages = [];
        this.titles = [];
    }
}