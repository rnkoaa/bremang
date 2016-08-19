/*/// <reference path="../node_modules/@types/mocha/index.d.ts" />*/

///<reference path="../typings/tsd.d.ts"/>

import { Greeter } from "../src/greeter";
import * as chai from "chai";

const expect = chai.expect;

describe("greeter", () => {
  it("should greet with message", () => {
    const greeter = new Greeter("friend");
    expect(greeter.greet()).to.equal("Bonjour, friend!");
  });

  it("should math expressions match", () => {
    expect(2).to.equal(1 + 1);
  });
});
