
import {BremRole} from "./role.brem";
export class BremCrew<T> extends BremRole<T>{
    job: string;
    department: string;
    tmdbId: string;
}
