///<reference path="../../typings/tsd.d.ts"/>

import {Video} from "../../src/tmdb/video";
import {readFile} from "fs";
import {ObjectMapper} from "../../src/service/movie.objectmapper";
import * as chai from "chai";
import {BremKeyword} from "../../src/brem/keyword.brem";
import * as _ from "lodash";
import {BremVideo} from "../../src/brem/video.brem";
import {BremCast} from "../../src/brem/cast.brem";
import {BremCrew} from "../../src/brem/crew.brem";
import {BremPerson} from "../../src/brem/person.brem";

const expect = chai.expect;

describe("test data transformations", () => {
    let video = new Video();
    let bremVideo = new BremVideo();
    before((done) => {
        readFile('./testdata/550.movie.json', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            expect(data).to.not.be.null;
            video = <Video> JSON.parse(data);
            bremVideo = ObjectMapper.map(video);
            done();
        });
    });

    it("test basic fields are set", (done) => {
        expect(video.title).to.be.eq("Fight Club");
        expect(video.revenue).to.be.greaterThan(0);
        done();
    });

    it("verify that the basic transformation works", (done) => {

        expect(bremVideo).to.not.be.undefined;
        expect(bremVideo).to.not.be.null;
        expect(bremVideo.title).to.not.be.null;
        expect(bremVideo.title).to.not.be.undefined;
        expect(bremVideo.title.title).to.be.eq(video.title);
        expect(bremVideo.titles.length).to.be.greaterThan(1);
        expect(bremVideo.revenue).to.be.eq(video.revenue);
        done();
    });

    it("verify that the video transformation also transforms the genres", (done) => {
        let bremGenres = bremVideo.genres;

        //ensure that the mapped objects correctly
        expect(bremGenres.length).to.eq(video.genres.length);
        expect(bremGenres[0].name).to.eq(video.genres[0].name);
        expect(bremGenres[0].tmdbId).to.eq(video.genres[0].id);

        done();
    });

    it("verify that the video transformation also transforms the languages", (done) => {
        let bremLanguages = bremVideo.languages;

        //ensure that the mapped objects correctly
        expect(bremLanguages.length).to.eq(video.spoken_languages.length);
        expect(bremLanguages[0].name).to.eq(video.spoken_languages[0].name);
        expect(bremLanguages[0].languageCode).to.eq(video.spoken_languages[0].iso_639_1);

        done();
    });

    it("verify that the video transformation also transforms the countries", (done) => {
        let bremCountries = bremVideo.productionCountries;

        //ensure that the mapped objects correctly
        expect(bremCountries.length).to.eq(video.production_countries.length);
        expect(bremCountries[0].name).to.eq(video.production_countries[0].name);
        expect(bremCountries[0].countryCode).to.eq(video.production_countries[0].iso_3166_1);

        done();
    });

    it("verify that the video transformation also transforms the production companies", (done) => {
        let bremCompanies = bremVideo.productionCompanies;

        //ensure that the mapped objects correctly
        expect(bremCompanies.length).to.eq(video.production_companies.length);
        expect(bremCompanies[0].name).to.eq(video.production_companies[0].name);
        expect(bremCompanies[0].tmdbId).to.eq(video.production_companies[0].id);

        done();
    });


    it("verify that the video transformation also transforms the releases", (done) => {
        let bremReleases = bremVideo.releases;

        //ensure that the mapped objects correctly
        expect(bremReleases.length).to.eq(video.releases.countries.length);

        done();
    });


    it("verify that the video transformation also transforms the images", (done) => {
        let bremImages = bremVideo.images;

        //ensure that the mapped objects correctly
        expect(bremImages.length).to.eq(video.images.posters.length + video.images.backdrops.length);

        done();
    });

    it("verify that the video transformation also transforms the keywords", (done) => {

        let bremKeywords = bremVideo.keywords;

        //ensure that the mapped objects correctly
        expect(bremKeywords.length).to.eq(video.keywords.keywords.length);

        let oneBremKeyword = _.find(bremKeywords, (bremKeyword: BremKeyword) => bremKeyword.tmdbId == 825);
        expect(oneBremKeyword).to.not.be.null;
        expect(oneBremKeyword.name).to.be.eq("support group");
        done();
    });

    it("verify that the video transformation also transforms the cast", (done) => {

        let bremCast : Array<BremCast<BremPerson>> = bremVideo.credits.cast;

        //ensure that the mapped objects correctly
        expect(bremCast.length).to.eq(video.credits.cast.length);

        let oneBremCast = _.find(bremCast, (bremCastItem: BremCast<BremPerson>) => bremCastItem.item.tmdbId == 59285);
        expect(oneBremCast).to.not.be.null;
        expect(oneBremCast.item.name).to.be.eq("Ezra Buzzington");
        expect(oneBremCast.tmdbCreditId).to.be.eq("52fe4250c3a36847f8014a71");
        expect(oneBremCast.order).to.be.eq(12);
        expect(oneBremCast.character).to.be.eq("Inspector Dent");
        done();
    });

    it("verify that the video transformation also transforms the crew", (done) => {

        let bremCrew : Array<BremCrew<BremPerson>> = bremVideo.credits.crew;

        //ensure that the mapped objects correctly
        expect(bremCrew.length).to.eq(video.credits.crew.length);

        let oneBremCrew = _.find(bremCrew, (bremCrewItem: BremCrew<BremPerson>) => bremCrewItem.item.tmdbId == 7764);
        expect(oneBremCrew).to.not.be.null;
        expect(oneBremCrew.item.name).to.be.eq("Richard Hymns");
        expect(oneBremCrew.tmdbCreditId).to.be.eq("52fe4250c3a36847f8014a41");
        expect(oneBremCrew.job).to.be.eq("Sound Editor");
        expect(oneBremCrew.department).to.be.eq("Sound");

        console.log(JSON.stringify(bremVideo));
        done();
    });
});

describe("validate individual object mapping fields", () => {
    let video = new Video();
    before((done) => {
        readFile('./testdata/550.movie.json', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            expect(data).to.not.be.null;
            video = <Video> JSON.parse(data);

            done();
        });
    });

    it("test genre transformations", (done)=> {
        let bremGenres = ObjectMapper.mapGenres(video.genres);

        //ensure that the mapped objects correctly
        expect(bremGenres.length).to.eq(video.genres.length);
        expect(bremGenres[0].name).to.eq(video.genres[0].name);
        expect(bremGenres[0].tmdbId).to.eq(video.genres[0].id);
        done();
    });

    it("test language transformations", (done)=> {
        let bremLanguages = ObjectMapper.mapLanguages(video.spoken_languages);

        //ensure that the mapped objects correctly
        expect(bremLanguages.length).to.eq(video.spoken_languages.length);
        expect(bremLanguages[0].name).to.eq(video.spoken_languages[0].name);
        expect(bremLanguages[0].languageCode).to.eq(video.spoken_languages[0].iso_639_1);
        done();
    });

    it("test country transformations", (done)=> {
        let bremCountries = ObjectMapper.mapCountries(video.production_countries);

        //ensure that the mapped objects correctly
        expect(bremCountries.length).to.eq(video.production_countries.length);
        expect(bremCountries[0].name).to.eq(video.production_countries[0].name);
        expect(bremCountries[0].countryCode).to.eq(video.production_countries[0].iso_3166_1);
        done();
    })
});