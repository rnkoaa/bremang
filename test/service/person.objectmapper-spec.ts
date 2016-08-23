///<reference path="../../typings/tsd.d.ts"/>

import {Observable} from "@reactivex/rxjs";
import * as chai from "chai";
import * as _ from "lodash";
import {readFile} from "fs";
import {Person} from "../../src/tmdb/person";
import {PersonCast} from "../../src/tmdb/person.cast";
import {PersonObjectMapper} from "../../src/service/person.objectmapper";
import {BremPerson} from "../../src/brem/person.brem";

const expect = chai.expect;
const readFileObservable = Observable.bindNodeCallback<string>(readFile);

function stringAsUtf8(input: any): string {
    return input.toString('utf8');
}

describe("Map of Person to Brem Person", () => {
    let person = new Person();

    let personObservable: Observable<Person> = null;
    before(() => {
        personObservable = readFileObservable('./testdata/449.person.json')
            .map(stringAsUtf8)
            .map((data: string) => {
                return <Person>JSON.parse(data);
            });
    });

    it("subscribe to person observable", (done) => {
        personObservable.subscribe((person) => {
                expect(person).to.not.be.undefined;
                expect(person).to.not.be.null;
                expect(person).to.not.be.empty;

                done();
            },
            (err) => {

            }, ()=> {
                // done();
            });
    });

    it("verify that the person has basic user fields", (done)=> {
        personObservable.subscribe((person) => {
                expect(person.id).to.equal(449);
                expect(person.adult).to.be.false;
                expect(person.birthday).to.be.equal("1982-04-09");
                expect(person.deathday).to.be.empty;
                expect(person.biography).to.not.be.empty;
                expect(person.biography).to.not.be.undefined;
                expect(person.homepage).to.be.empty;
                expect(person.imdb_id).to.be.equal("nm0059431");
                expect(person.name).to.be.equal("Jay Baruchel");
                expect(person.place_of_birth).to.be.equal("Ottawa, Ontario, Canada");
                expect(person.popularity).to.be.equal(6.041311);
                expect(person.profile_path).to.be.equal("/9SFoTtDoB0oozIWH7L8BtuWKR37.jpg");

                expect(person.also_known_as.length).to.be.greaterThan(0);
                expect(person.also_known_as.length).to.be.equal(1);

                expect(person.combined_credits).to.not.be.null;
                expect(person.combined_credits.cast.length).to.be.greaterThan(0);
                expect(person.combined_credits.cast.length).to.be.equal(45);
                expect(person.combined_credits.crew.length).to.be.greaterThan(0);
                expect(person.combined_credits.crew.length).to.be.equal(5);

                let personCast: PersonCast = _.find(person.combined_credits.cast, (castItem: PersonCast) => castItem.id == 70);
                expect(personCast).to.not.be.undefined;
                expect(personCast).to.not.be.null;
                expect(personCast.title).to.be.equal("Million Dollar Baby");
                expect(personCast.character).to.be.equal("Danger Barch");
                expect(personCast.media_type).to.be.equal("movie");
                expect(personCast.release_date).to.be.equal("2004-12-14");
                done();
            },
            (err) => {

            }, ()=> {

            });
    });

    it("map the person to a bremPerson and verify that the mapping completed successfully", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {

                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;


                expect(bremPerson.deathday).to.not.be.undefined;
                expect(bremPerson.deathday).to.not.be.null;
                expect(bremPerson.deathday).to.be.empty;

                expect(bremPerson.homepage).to.not.be.undefined;
                expect(bremPerson.homepage).to.not.be.null;
                expect(bremPerson.homepage).to.be.empty;

                expect(bremPerson.adult).to.not.be.undefined;
                expect(bremPerson.adult).to.not.be.null;
                expect(bremPerson.adult).to.be.false;


                expect(bremPerson.alsoKnownAs).to.not.be.undefined;
                expect(bremPerson.alsoKnownAs).to.not.be.null;
                expect(bremPerson.alsoKnownAs.length).to.be.greaterThan(0);
                expect(bremPerson.alsoKnownAs.length).to.be.eq(1);



                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for TMDBID", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {

                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;

                expect(bremPerson.tmdbId).to.not.be.undefined;
                expect(bremPerson.tmdbId).to.not.be.null;
                expect(bremPerson.tmdbId).to.be.equal(449);

                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for NAME OF PERSON", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;

                expect(bremPerson.name).to.not.be.undefined;
                expect(bremPerson.name).to.not.be.null;
                expect(bremPerson.name).to.be.equal("Jay Baruchel");

                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for PLACE_OF_BIRTH", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;

                expect(bremPerson.placeOfBirth).to.not.be.undefined;
                expect(bremPerson.placeOfBirth).to.not.be.null;
                expect(bremPerson.placeOfBirth).to.be.equal("Ottawa, Ontario, Canada");

                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for IMDB_ID", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;

                expect(bremPerson.imdbId).to.not.be.undefined;
                expect(bremPerson.imdbId).to.not.be.null;
                expect(bremPerson.imdbId).to.be.equal("nm0059431");

                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });


    it("map the person to a bremPerson field for BIRTH_DAY", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;
                expect(bremPerson.birthday).to.not.be.undefined;
                expect(bremPerson.birthday).to.not.be.null;
                expect(bremPerson.birthday).to.be.equal("1982-04-09");
                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for PROFILE_PATH", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;
                expect(bremPerson.profilePath).to.not.be.undefined;
                expect(bremPerson.profilePath).to.not.be.null;
                expect(bremPerson.profilePath).to.be.equal("/9SFoTtDoB0oozIWH7L8BtuWKR37.jpg");
                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for POPULARITY", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;
                expect(bremPerson.popularity).to.not.be.undefined;
                expect(bremPerson.popularity).to.not.be.null;
                expect(bremPerson.popularity).to.be.equal(6.041311);
                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });

    it("map the person to a bremPerson field for BIOGRAPHY", (done)=> {
        personObservable
            .map((person: Person) => {
                return PersonObjectMapper.map(person);
            })
            .subscribe((bremPerson: BremPerson) => {
                expect(bremPerson).to.not.be.undefined;
                expect(bremPerson).to.not.be.null;
                expect(bremPerson.biography).to.not.be.undefined;
                expect(bremPerson.biography).to.not.be.null;
                expect(bremPerson.biography).to.be.contains("Jonathan Adam Saunders \"Jay\" Baruchel");
                done();
            }, (err) => {

            }, () => {
                //completed
            });
    });
});