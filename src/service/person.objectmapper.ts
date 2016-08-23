import * as _ from "lodash";
import {Person} from "../tmdb/person";
import {BremPerson} from "../brem/person.brem";
import {CombinedCredits} from "../tmdb/person.credits";
import {BremCredit} from "../brem/credit.brem";
import {BremVideo} from "../brem/video.brem";

const transform = _.transform;

export class PersonObjectMapper {
    static map(person: Person) : BremPerson {
        let bremPerson = new BremPerson();
        bremPerson.tmdbId = person.id;
        bremPerson.imdbId = person.imdb_id;
        bremPerson.placeOfBirth = person.place_of_birth;
        bremPerson.birthday = person.birthday;
        bremPerson.deathday = person.deathday;
        bremPerson.homepage = person.homepage;
        bremPerson.name = person.name;
        bremPerson.profilePath = person.profile_path;
        bremPerson.biography = person.biography;
        bremPerson.popularity = person.popularity;
        bremPerson.alsoKnownAs = person.also_known_as;
        bremPerson.adult = person.adult;

        bremPerson.credits = this.mapCredits(person.combined_credits);
        return bremPerson;
    }

    static mapCredits(credits: CombinedCredits) : BremCredit<BremVideo> {
        let bremCredits = new BremCredit<BremVideo>();

        return bremCredits;
    }
}