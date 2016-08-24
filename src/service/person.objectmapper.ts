import * as _ from "lodash";
import {Person} from "../tmdb/person";
import {BremPerson} from "../brem/person.brem";
import {CombinedCredits} from "../tmdb/person.credits";
import {BremCredit} from "../brem/credit.brem";
import {BremVideo} from "../brem/video.brem";
import {BremCast} from "../brem/cast.brem";
import {PersonCast} from "../tmdb/person.cast";
import {BremCrew} from "../brem/crew.brem";
import {PersonCrew} from "../tmdb/person.crew";
import {BremTitle} from "../brem/title.brem";

const transform = _.transform;

export class PersonObjectMapper {
    static map(person: Person): BremPerson {
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

    static mapCredits(credits: CombinedCredits): BremCredit<BremVideo> {
        let bremCredits = new BremCredit<BremVideo>();
        bremCredits.cast = this.mapCast(credits.cast);
        bremCredits.crew = this.mapCrew(credits.crew);
        return bremCredits;
    }

    static mapCast(cast: Array<PersonCast>): Array<BremCast<BremVideo>> {
        return transform(cast, (results: Array<BremCast<BremVideo>>, castItem: PersonCast) => {
            let bremCast = new BremCast<BremVideo>();
            bremCast.mediaType = castItem.media_type;
            bremCast.tmdbCreditId = castItem.credit_id;
            bremCast.character = castItem.character;

            bremCast.item = this.mapVideo(castItem);
            results.push(bremCast);
            return bremCast;
        }, []);
    }

    static mapCrew(crew: Array<PersonCrew>): Array<BremCrew<BremVideo>> {
        return transform(crew, (results: Array<BremCrew<BremVideo>>, crewItem: PersonCrew) => {
            let bremCrew = new BremCrew<BremVideo>();
            bremCrew.mediaType = crewItem.media_type;
            bremCrew.tmdbCreditId = crewItem.credit_id;
            bremCrew.job = crewItem.job;
            bremCrew.department = crewItem.department;

            bremCrew.item = this.mapVideo(crewItem);

            results.push(bremCrew);
            return bremCrew;
        }, []);
    };

    static mapVideo(item: any): BremVideo {

        let bremVideo = new BremVideo();
        if (item.release_date && (item.release_date != '')) {
            bremVideo.releaseDate = new Date(item.release_date);
        }
        bremVideo.tmdbId = item.id;
        bremVideo.posterPath = item.poster_path;
        bremVideo.adult = item.adult;

        let title = new BremTitle(item.title, "", "", false);
        title.isMain = true;
        bremVideo.title = title;

        bremVideo.titles.push(title);
        bremVideo.titles.push(new BremTitle(item.original_title, "", "", true));

        return bremVideo;
    }
}