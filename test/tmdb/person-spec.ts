///<reference path="../../typings/tsd.d.ts"/>

import {Person} from "../../src/tmdb/person";
import {readFile} from "fs";
import * as chai from "chai";

const expect = chai.expect;

describe("reading and transforming a person from file", ()=> {
    let person = new Person();
    before("read the person object from file", (done)=> {
        readFile('./testdata/449.person.json', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            expect(data).to.not.be.null;
            person = <Person> JSON.parse(data);

            done();
        });
    });

    it("the person object will be populated", () => {
        expect(person).to.not.be.null;
        expect(person.id).to.be.eq(449);
        expect(person.name).to.be.eq("Jay Baruchel");
        expect(person.imdb_id).to.be.eq("nm0059431");
        expect(person.birthday).to.be.eq("1982-04-09");
        expect(person.also_known_as.length).to.be.eq(1);
        expect(person.place_of_birth).to.be.eq("Ottawa, Ontario, Canada");
        expect(person.profile_path).to.be.eq("/9SFoTtDoB0oozIWH7L8BtuWKR37.jpg");
        expect(person.popularity).to.be.eq(6.041311);
        expect(person.homepage).to.be.empty;
        expect(person.deathday).to.be.empty;
        expect(person.biography).to.not.be.undefined;
        expect(person.biography).to.not.be.null;
        expect(person.biography).to.not.be.empty;
    });

    it("validate the combined credits for cast and crew", () => {
        expect(person.combined_credits).to.not.be.undefined;
        expect(person.combined_credits).to.not.be.null;
        expect(person.combined_credits).to.not.be.empty;

        expect(person.combined_credits.cast.length).to.be.greaterThan(0);
        expect(person.combined_credits.cast.length).to.be.eq(45);

        let movieCast = person.combined_credits.cast
            .find(movieCastItem =>
            movieCastItem.credit_id == '52fe4213c3a36847f8002019');

        expect(movieCast).to.not.be.null
        expect(movieCast).to.not.be.undefined
        expect(movieCast.id).to.be.eq(70);
        expect(movieCast.character).to.be.eq("Danger Barch");
        expect(movieCast.original_title).to.be.eq("Million Dollar Baby");
        expect(movieCast.title).to.be.eq("Million Dollar Baby");
        expect(movieCast.release_date).to.be.eq("2004-12-14");
        expect(movieCast.media_type).to.be.eq("movie");
        expect(movieCast.adult).to.be.eq(false);
    });

    it("validate the combined credits for crew", () => {
        expect(person.combined_credits).to.not.be.undefined;
        expect(person.combined_credits).to.not.be.null;
        expect(person.combined_credits).to.not.be.empty;

        expect(person.combined_credits.crew.length).to.be.greaterThan(0);
        expect(person.combined_credits.crew.length).to.be.eq(5);

        let movieCrew = person.combined_credits.crew
            .find(movieCrewItem =>
            movieCrewItem.credit_id == '55c588e0c3a3682f1c000e0a');

        expect(movieCrew).to.not.be.null
        expect(movieCrew).to.not.be.undefined
        expect(movieCrew.id).to.be.eq(336890);
        expect(movieCrew.job).to.be.eq("Director");
        expect(movieCrew.department).to.be.eq("Directing");
        expect(movieCrew.original_title).to.be.eq("Goon: Last of the Enforcers");
        expect(movieCrew.title).to.be.eq("Goon: Last of the Enforcers");
        expect(movieCrew.release_date).to.be.eq("2016-12-31");
        expect(movieCrew.media_type).to.be.eq("movie");
        expect(movieCrew.adult).to.be.eq(false);
    });

    it("validate the combined credits for cast of a tv", () => {
        expect(person.combined_credits).to.not.be.undefined;
        expect(person.combined_credits).to.not.be.null;
        expect(person.combined_credits).to.not.be.empty;

        expect(person.combined_credits.cast.length).to.be.greaterThan(0);
        expect(person.combined_credits.cast.length).to.be.eq(45);

        let movieCast = person.combined_credits.cast
            .find(movieCastItem =>
            movieCastItem.credit_id == '54b5b7e1c3a36877900002ed');

        expect(movieCast).to.not.be.null
        expect(movieCast).to.not.be.undefined
        expect(movieCast.id).to.be.eq(61871);
        expect(movieCast.episode_count).to.be.eq(10);
        expect(movieCast.character).to.be.eq("Josh Greenberg");
        expect(movieCast.original_name).to.be.eq("Man Seeking Woman");
        expect(movieCast.name).to.be.eq("Man Seeking Woman");
        expect(movieCast.first_air_date).to.be.eq("2015-01-14");
        expect(movieCast.media_type).to.be.eq("tv");
    });
});