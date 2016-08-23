
import {BremCast} from "./cast.brem";
import {BremCrew} from "./crew.brem";

export class BremCredit<T> {
    cast: Array<BremCast<T>>;
    crew: Array<BremCrew<T>>;

    constructor() {
        this.cast = [];
        this.crew = [];
    }
}