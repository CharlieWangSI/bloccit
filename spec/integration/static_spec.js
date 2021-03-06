const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

//#4
        done();
      });
    });

  });

  describe("GET /marco", () => {

//#2
    it("should return status code 200", (done) => {

//#3
      request.get(marco, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toBe("polo");

//#4
        done();
      });
    });

  });
});
