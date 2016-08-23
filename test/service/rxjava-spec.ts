///<reference path="../../typings/tsd.d.ts"/>

import {readFile} from "fs";
import {Observable} from "@reactivex/rxjs";
import * as chai from "chai";

const expect = chai.expect;

function convertToString(input: any) : string {
    return input.toString('utf8');
}

describe("when using rxjava to read file.", () => {
    const readFileObservable = Observable.bindNodeCallback<string>(readFile);

    it("when we read file through observables", (done)=> {
        readFileObservable("./testdata/550.movie.json")
            .map(convertToString)
            .subscribe((data: string) => {
                expect(data).to.not.be.undefined;
                expect(data).to.not.be.null;
                expect(data).to.not.be.empty;

            }, (err) => {
                console.log(err);
            }, () => {

                //after the observable is completed, we should complete the test.
                done();
            })

    });
});