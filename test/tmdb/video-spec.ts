///<reference path="../../typings/tsd.d.ts"/>

import {Video} from "../../src/tmdb/video";
import {readFile} from "fs";
import {Observable, TestScheduler} from "@reactivex/rxjs";
import * as chai from "chai";

const expect = chai.expect;

const scheduler = new TestScheduler(null);
describe('video', () => {
    let fileObservable: Observable<string>;

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

    it("validate the base fields", (done) => {

        expect(video).to.not.be.undefined;
        expect(video.id).to.be.eq(550);
        expect(video.release_date).to.be.eq("1999-10-14");
        expect(video.title).to.be.eq("Fight Club");
        expect(video.status).to.be.eq("Released");
        expect(video.runtime).to.be.eq(139);
        expect(video.revenue).to.be.eq(100853753);
        expect(video.imdb_id).to.be.eq('tt0137523');
        expect(video.original_language).to.be.eq('en');
        expect(video.original_title).to.be.eq("Fight Club");
        done();
    });

    it("validate the genres", (done) => {


        expect(video.genres.length).to.be.gt(0);
        expect(video.genres.length).to.be.eq(1);
        expect(video.genres[0].id).to.be.eq(18);
        expect(video.genres[0].name).to.be.eq("Drama");

        done();
    });

    it("validate the languages spoken in the movie", (done) => {

        expect(video.spoken_languages.length).to.be.gt(0);
        expect(video.spoken_languages.length).to.be.eq(1);
        expect(video.spoken_languages[0].iso_639_1).to.be.eq("en");
        expect(video.spoken_languages[0].name).to.be.eq("English");

        done();
    });

    it("validate the countries where the movies were produced", (done) => {
        expect(video.production_companies.length).to.be.gt(0);
        expect(video.production_companies.length).to.be.eq(6);

        done();
    });

    it("validate the countries where the movies were released", (done) => {

        expect(video.releases).to.not.be.null;
        expect(video.releases.countries.length).to.be.gt(0);
        expect(video.releases.countries.length).to.be.eq(12);

        done();
    });

    it("validate the companies that produced the movies", (done) => {
        expect(video.production_countries.length).to.be.gt(0);
        expect(video.production_countries.length).to.be.eq(2);

        done();
    });


    it("validate the movie credits are properly populated", (done) => {

        expect(video.credits).to.not.be.null;
        expect(video.credits.cast.length).to.be.gt(0);
        expect(video.credits.cast.length).to.be.eq(28);

        expect(video.credits.crew.length).to.be.gt(0);
        expect(video.credits.crew.length).to.be.eq(17);

        done();
    });

    it("validate the movie a single crew has been populated", (done) => {
        let crew = video.credits.crew.find(crew => crew.id == 7469);

        expect(crew).to.not.be.null;
        expect(crew.credit_id).to.be.eq('56380f0cc3a3681b5c0200be');
        expect(crew.department).to.be.eq('Writing');
        expect(crew.job).to.be.eq('Screenplay');
        expect(crew.name).to.be.eq("Jim Uhls");

        done();
    });

    it("validate the movie a single cast has been populated", (done) => {

        let cast = video.credits.cast.find(cast => cast.id == 819);

        expect(cast).to.not.be.null;
        expect(cast.credit_id).to.be.eq('52fe4250c3a36847f80149f3');
        expect(cast.cast_id).to.be.eq(4);
        expect(cast.character).to.be.eq("The Narrator");
        expect(cast.order).to.be.eq(0);
        expect(cast.name).to.be.eq("Edward Norton");

        done();
    });

    it('Alternative titles of the movie', (done)=> {
        expect(video.alternative_titles).to.not.be.null;
        expect(video.alternative_titles.titles.length).to.be.gt(0);
        expect(video.alternative_titles.titles.length).to.be.eq(12);

        let altTitle = video.alternative_titles.titles.find(title => title.iso_3166_1 == "PT");
        expect(altTitle).to.not.be.null
        expect(altTitle.title).to.equal("Clube de Combate");
        done();
    });


    it('The images of the video are properly populated', (done)=> {

        expect(video.images).to.not.be.null;
        expect(video.images.backdrops.length).to.be.gt(0);
        expect(video.images.backdrops.length).to.be.eq(25);

        expect(video.images.posters.length).to.be.gt(0);
        expect(video.images.posters.length).to.be.eq(18);

        done();
    });

    it('The keywords of the video are properly populated', (done)=> {

        expect(video.keywords).to.not.be.null;
        expect(video.keywords.keywords.length).to.be.gt(0);
        expect(video.keywords.keywords.length).to.be.eq(5);

        let keyword = video.keywords.keywords.find(mKeyword => mKeyword.id == 825);

        expect(keyword).to.not.be.null;
        expect(keyword.name).to.equal("support group");
        done();
    });

});