///<reference path="../../typings/tsd.d.ts"/>
import * as _ from 'lodash';
import * as chai from "chai";
import{BremGenre} from "../../src/brem/genre.brem";
import{Genre} from "../../src/tmdb/genre";


const expect = chai.expect;
const transform = _.transform;

describe("when we test out lodash methods", ()=> {
   it("test transforming of an array", ()=>{
    let results =  transform([2, 3, 4], function(result, n) {
         result.push(n *= n);
         return n % 2 == 0;
      }, []);
// ➜ [4, 9]

      expect(results.length).to.be.eq(2);
   }) ;

    it("test transformation of genre", ()=> {
       // let bremGenre = new BremGenre("Drama", 18);
        let genre = new Genre();
        genre.name = "Drama";
        genre.id = 18;

       let bremGenres = transform([genre], function(result, item){
           //trust that it works now
           result.push(new BremGenre(item.name, item.id));
           return new BremGenre(item.name, item.id);
        }, []);

        expect(bremGenres.length).to.eq(1);
        expect(bremGenres[0].tmdbId).to.eq(18);
        expect(bremGenres[0].name).to.eq("Drama");
    })
});