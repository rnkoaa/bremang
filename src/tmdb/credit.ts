import {Crew} from "./crew";
import {Cast} from "./cast";

export interface Credit {
    cast: Array<Cast>;
    crew: Array<Crew>;
}