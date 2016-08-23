import * as _ from "lodash";
import {Person} from "../tmdb/person";
import {BremPerson} from "../brem/person.brem";

const transform = _.transform;

export class PersonObjectMapper {
    static map(person: Person) : BremPerson {

        return new BremPerson();
    }
}