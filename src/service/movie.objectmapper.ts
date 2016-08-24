import {Video} from "../tmdb/video";
import {Genre} from "../tmdb/genre";
import {BremVideo} from "../brem/video.brem";
import {BremTitle} from "../brem/title.brem";
import {BremGenre} from "../brem/genre.brem";
import * as _ from "lodash";
import {Language} from "../tmdb/language";
import {BremLanguage} from "../brem/language.brem";
import {Country} from "../tmdb/country";
import {BremCountry} from "../brem/country.brem";
import {Company} from "../tmdb/company";
import {BremCompany} from "../brem/company.brem";
import {Releases, Release} from "../tmdb/release";
import {BremRelease} from "../brem/release.brem";
import {BremImage} from "../brem/image.brem";
import {Image} from "../tmdb/image";
import {BremKeyword} from "../brem/keyword.brem";
import {Keyword, keywords} from "../tmdb/keyword";
import {BremCast} from "../brem/cast.brem";
import {Cast} from "../tmdb/movie.cast";
import {Crew} from "../tmdb/movie.crew";
import {BremCrew} from "../brem/crew.brem";
import {Credit} from "../tmdb/movie.credit";
import {BremCredit} from "../brem/credit.brem";
import {BremPerson} from "../brem/person.brem";

const transform = _.transform;

export class ObjectMapper {
    /**
     *
     * @param video
     * @returns {BremVideo}
     */
    static map(video: Video): BremVideo {
        let mappedVideo: BremVideo = new BremVideo();
        mappedVideo.title = new BremTitle(video.title, null, null, false);
        mappedVideo.title.isMain = true;
        mappedVideo.titles.push(mappedVideo.title);

        let originalTitle = new BremTitle(video.original_title, video.original_language, null, true);
        mappedVideo.titles.push(originalTitle);

        mappedVideo.averageVote = video.vote_average;
        mappedVideo.voteCount = video.vote_count;
        mappedVideo.backdropPath = video.backdrop_path;
        mappedVideo.budget = video.budget;
        mappedVideo.tmdbId = video.id;
        mappedVideo.imdbId = video.imdb_id;
        mappedVideo.overview = video.overview;
        mappedVideo.popularity = video.popularity;
        mappedVideo.posterPath = video.poster_path;
        mappedVideo.homepage = video.homepage;
        mappedVideo.runtime = video.runtime;
        mappedVideo.revenue = video.revenue;
        if (video.release_date) {
            mappedVideo.releaseDate = new Date(video.release_date);
        }
        mappedVideo.status = video.status;
        mappedVideo.tagLine = video.tagline;
        mappedVideo.video = video.video;

        mappedVideo.genres = this.mapGenres(video.genres);
        mappedVideo.languages = this.mapLanguages(video.spoken_languages);
        mappedVideo.productionCountries = this.mapCountries(video.production_countries);
        mappedVideo.productionCompanies = this.mapCompanies(video.production_companies);
        mappedVideo.releases = this.mapReleases(video.releases);
        mappedVideo.keywords = this.mapKeywords(video.keywords);

        mappedVideo.credits = this.mapCredits(video.credits);

        //map all the images into a single array
        let images: Array<BremImage> = this.mapImages(video.images.backdrops, 'isBackDrop');
        mappedVideo.images = images.concat(this.mapImages(video.images.posters, 'isPoster'));

        return mappedVideo;
    }


    static mapCredits(credits: Credit): BremCredit<BremPerson> {
        let bremCredit = new BremCredit<BremPerson>();
        bremCredit.cast = this.mapCast(credits.cast);
        bremCredit.crew = this.mapCrew(credits.crew);
        return bremCredit;
    }

    static mapCast(cast: Array<Cast>): Array<BremCast<BremPerson>> {
        return transform(cast, (results: Array<BremCast<BremPerson>>, castItem: Cast) => {
            let bremCast = new BremCast<BremPerson>();
            bremCast.mediaType = "movie";
            bremCast.character = castItem.character;
            bremCast.order = castItem.order;
            bremCast.tmdbCreditId = castItem.credit_id;

            let bremPerson = new BremPerson();
            bremPerson.name = castItem.name;
            bremPerson.profilePath = castItem.profile_path;
            bremPerson.tmdbId = castItem.id;

            bremCast.item = bremPerson;
            results.push(bremCast);

            return bremCast;
        }, []);
    }

    static mapCrew(crew: Array<Crew>): Array<BremCrew<BremPerson>> {
        return transform(crew, (results: Array<BremCrew<BremPerson>>, crewItem: Crew) => {

            let bremCrew = new BremCrew<BremPerson>();
            bremCrew.mediaType = "movie";
            bremCrew.department = crewItem.department;
            bremCrew.job = crewItem.job;
            bremCrew.tmdbCreditId = crewItem.credit_id;

            let bremPerson = new BremPerson();
            bremPerson.name = crewItem.name;
            bremPerson.profilePath = crewItem.profile_path;
            bremPerson.tmdbId = crewItem.id;

            bremCrew.item = bremPerson;
            results.push(bremCrew);

            return bremCrew;

        }, []);
    }

    static mapKeywords(keywords: keywords): Array<BremKeyword> {
        let keywordsArr = keywords.keywords;

        return transform(keywordsArr, (result: Array<BremKeyword>, item: Keyword) => {
            let bremkeyword = new BremKeyword(item.name, item.id);
            result.push(bremkeyword);
            return bremkeyword;
        }, []);
    }

    static mapImages(images: Array<Image>, imageType: string): Array<BremImage> {
        return transform(images, (result: Array<BremImage>, item: Image) => {
            let bremImage = new BremImage();
            bremImage.languageCode = item.iso_639_1;
            bremImage.width = item.width;
            bremImage.height = item.height;
            bremImage.aspectRatio = item.aspect_ratio;
            bremImage.averageVote = item.vote_average;
            bremImage.voteCount = item.vote_count;
            bremImage.filePath = item.file_path;
            bremImage.backdrop = (imageType == 'isBackDrop');
            bremImage.poster = (imageType == 'isPoster');

            result.push(bremImage);
            return bremImage;
        }, []);
    }

    /**
     *
     * @param releases
     * @returns {any}
     */
    static mapReleases(releases: Releases): Array<BremRelease> {
        return transform(releases.countries, function (result: Array<BremRelease>, item: Release) {
            let bremRelease = new BremRelease(item.iso_3166_1,
                item.certification, new Date(item.release_date), item.primary);
            result.push(bremRelease);
            return bremRelease;
        }, []);
    }

    /**
     *
     * @param genres
     * @returns {any}
     */
    static mapGenres(genres: Array<Genre>): Array<BremGenre> {
        return transform(genres, function (result: Array<BremGenre>, item: Genre) {
            let bremGenre = new BremGenre(item.name, item.id);
            result.push(bremGenre);
            return bremGenre;
        }, []);
    }

    /**
     *
     * @param languages
     * @returns {any}
     */
    static mapLanguages(languages: Array<Language>): Array<BremLanguage> {
        return transform(languages, function (results: Array<BremLanguage>, item: Language) {
            let bremLanguage = new BremLanguage(item.name, item.iso_639_1, false);
            results.push(bremLanguage);
            return bremLanguage;
        }, []);
    }

    /**
     *
     * @param productionCountries
     * @returns {any}
     */
    static mapCountries(productionCountries: Array<Country>): Array<BremCountry> {
        return transform(productionCountries, function (results: Array<BremCountry>, item: Country) {
            let bremCountry = new BremCountry(item.name, item.iso_3166_1);
            results.push(bremCountry);
            return bremCountry;
        }, []);
    }

    /**
     *
     */
    static mapCompanies(productionCompanies: Array<Company>): Array<BremCompany> {
        return transform(productionCompanies, function (results: Array<BremCompany>, item: Company) {
            let bremCompany = new BremCompany(item.name, item.id);
            results.push(bremCompany);
            return bremCompany;
        }, []);
    }
}