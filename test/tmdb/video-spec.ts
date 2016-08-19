///<reference path="../../typings/tsd.d.ts"/>

import {Video} from "../../src/tmdb/video";
import {readFile} from "fs";
import {Observer, Observable, TestScheduler} from "@reactivex/rxjs";
import * as chai from "chai";

const expect = chai.expect;

const scheduler = new TestScheduler(null);
describe('video', () => {
    let fileObservable: Observable<string>;
    beforeEach(() => {
        fileObservable = Observable.create((observer: Observer<string>) => {
            //readFile('../../testdata/1.movie.json', 'utf8', function(err, data){
            readFile('./testdata/550.movie.json', 'utf8', function (err, data) {
                if (err) {
                    observer.error(err);
                }
                observer.next(data);
                observer.complete();

            });
        })
    });

    it('parse a video to json', () => {
        let video: Video = <Video> {
            title: 'Ariel',
            popularity: 4.5
        };
        let results: string = '';

        //when:
        let subscriber = fileObservable.subscribe((data) => {
            results = data;
            expect(results).to.not.be.null;
            expect(results).to.not.be.empty;
        }, (err) => {
            console.log('error occurred');
            console.log(err)
        }, () => {
            console.log('completed');
            //subscriber.unsubscribe();
        });


        //when
        /*scheduler.schedule(() => {
         fileObservable.subscribe((data) => {
         results = data;
         }, null, () => {
         results = 'done';
         });
         });*/

        /*scheduler.flush();
         expect(results).to.be.equal(['hello, world');*/
    });
});