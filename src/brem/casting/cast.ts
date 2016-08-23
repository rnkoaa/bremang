export class Cast<T> {
    item: T;
    character: string;
    mediaType: string;
    order: number;
    tmdbCreditId: string;
}

export class Credit<T> {
    cast: Array<Cast<T>>;
    crew: Array<Crew<T>>;

    constructor() {
        this.cast = [];
        this.crew = [];
    }
}

export class Crew<T> {
    item: T;
    job: string;
    department: string;
    tmdbId: string;
    mediaType: string;
    tmdbCreditId: string;
}

export class Person {
    id: string;
    credits: Credit<Movie>;
    birthday: string;
    imdbId: string;
    placeOfBirth: string;
    popularity: number;
    profilePath: string;
    adult: boolean;
    homepage: string;
    tmdbId: number;
    name: string;
    biography: string;
    deathday: string;
    alsoKnownAs: Array<string>;
}

export class Movie {
    id: string;
    title: string;
    adult: boolean;
    credits: Credit<Person>;
    imdbId: string;
    releaseDate: string;
    originalTitle: string;
    posterPath: string;
    tmdbId: number;
}

export function movieTest() {
    console.log('movie tester');

    let person = new Person();

    let movieCredits = new Credit<Movie>();

    let movieCast = new Cast<Movie>();
    movieCast.mediaType = "movie";

    let millionDollar = new Movie();
    millionDollar.title = "Million Dollar Baby";
    millionDollar.originalTitle = "Million Dollar Baby";
    millionDollar.posterPath = "/h4VZKi2Jt4VoBYJmtC4c3bO8KqM.jpg";
    millionDollar.releaseDate = "2004-12-14";
    millionDollar.tmdbId = 70;

    movieCast.item = millionDollar;
    movieCast.order = 0;
    movieCast.tmdbCreditId = '52fe4213c3a36847f8002019';
    movieCast.character = "Danger Barch";
    movieCredits.cast.push(movieCast);

    //=================================================
    let movieCrew = new Crew<Movie>();
    movieCrew.mediaType = "movie";

    let goon = new Movie();
    goon.title = "Goon";
    goon.originalTitle = "Goon";
    goon.posterPath = "/84mA0tnArvMdr5alUFVgfOypk7i.jpg";
    goon.releaseDate = "2011-09-10";
    goon.tmdbId = 74387;

    movieCrew.item = goon;
    movieCrew.tmdbCreditId = '52fe48c8c3a368484e10abc3';
    movieCrew.job = "job";
    movieCrew.department = "Writing";
    movieCredits.crew.push(movieCrew);

    //====================================================================

    person.credits = movieCredits;
    person.id = 'adbced';
    person.tmdbId = 449;
    person.imdbId = "nm0059431";
    person.placeOfBirth = "Ottawa, Ontario, Canada";
    person.name = "Jay Baruchel";
    person.birthday = "1982-04-09";
    person.adult = false;
    person.popularity = 6.041311;
    person.homepage = "";
    person.deathday = "";
    person.profilePath = "/9SFoTtDoB0oozIWH7L8BtuWKR37.jpg";
    person.biography = "Jonathan Adam Saunders \"Jay\" Baruchel (born April 9, 1982) is a Canadian actor. He has had a successful career in comedy films, and has appeared in such box office successes as Million Dollar Baby, Knocked Up, Tropic Thunder, and How to Train Your Dragon, as well as the films She's Out of My League, The Trotsky, and The Sorcerer's Apprentice.\n\nDescription above from the Wikipedia article Jay Baruchel, licensed under CC-BY-SA, full list of contributors on Wikipedia";
    person.alsoKnownAs = ["Джей Барушель"];
    //let credits = new Credit<Person>();

    /*let person = new Person();
     person.name = 'Richard Agyei';
     credits.cast.push(new Cast<Person>());
     credits.crew.push(new Crew<Person>());

     movie.credits = credits;*/

    // person.credits = credits;

    // console.log(JSON.stringify(movie));
    //console.log(JSON.stringify(person));

    console.log("=============================================================")
    let movie = new Movie();
    movie.id = 'adbc';
    let personCredits = new Credit<Person>();
    let personCast = new Cast<Person>();
    personCast.mediaType = 'movie';
    personCast.character = "The Narrator";
    personCast.order = 0;
    personCast.tmdbCreditId = "52fe4250c3a36847f80149f3";

    let moviePerson = new Person();
    //moviePerson.credits.cast.push(personCast);
    moviePerson.adult = false;
    moviePerson.name = "Edward Norton";
    moviePerson.tmdbId = 819;

    moviePerson.profilePath = "/iUiePUAQKN4GY6jorH9m23cbVli.jpg";

    personCast.item = moviePerson;
    personCredits.cast.push(personCast);

    let personCrew = new Crew<Person>();
    personCrew.department = "Production";
    personCrew.job = "Producer";
    personCrew.tmdbCreditId = "52fe4250c3a36847f8014a0b";

    let crewPerson = new Person();
    crewPerson.tmdbId = 7475;
    crewPerson.name = "Ceán Chaffin";
    crewPerson.profilePath = null;

    personCrew.item = crewPerson;

    personCredits.crew.push(personCrew);
    movie.credits = personCredits;
    console.log(JSON.stringify(movie));
}