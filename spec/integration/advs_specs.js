const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advs/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advs = require("../../src/db/models").Advs;

describe("routes : advs", () => {

  beforeEach((done) => {
      this.Advs;
      sequelize.sync({force: true}).then((res) => {

       Advs.create({
         title: "Advertising",
         description: "There is a lot of them"
       })
        .then((Advs) => {
          this.Advs = advs;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });

  describe("GET /advs", () => {

    it("should return a status code 200 and all ads", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advs");
        done();
      });
    });
  });

  describe("GET /advs/new", () => {

    it("should render a new advs form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advs");
        done();
      });
    });

  });

  describe("POST /advs/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "all the advertising",
          description: "this is where we keep all the advs"
        }
      };

      it("should create a new advs and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Topic.findOne({where: {title: "all the advertising"}})
            .then((topic) => {
              expect(res.statusCode).toBe(303);
              expect(advs.title).toBe("all the advertising");
              expect(advs.description).toBe("this is where we keep all the advs");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /advs/:id", () => {

     it("should render a view with the selected advs", (done) => {
       request.get(`${base}${this.advs.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("advertising");
         done();
       });
     });

   });

   describe("POST /advs/:id/destroy", () => {

     it("should delete the ads with the associated ID", (done) => {

 //#1
       Advs.all()
       .then((advs) => {

 //#2
         const advsCountBeforeDelete = advs.length;

         expect(advsCountBeforeDelete).toBe(1);

 //#3
         request.post(`${base}${this.advs.id}/destroy`, (err, res, body) => {
           Advs.all()
           .then((advs) => {
             expect(err).toBeNull();
             expect(advs.length).toBe(advsCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

   });

   describe("GET /advs/:id/edit", () => {

    it("should render a view with an edit advs form", (done) => {
      request.get(`${base}${this.advs.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Advs");
        done();
      });
    });

  });

  describe("POST /advs/:id/update", () => {

     it("should update the advs with the given values", (done) => {
        const options = {
           url: `${base}${this.advs.id}/update`,
           form: {
             title: "Advertising",
             description: "New Advertising"
           }
         };
//#1
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();
//#2
           Advs.findOne({
             where: { id: this.Advs.id }
           })
           .then((Advs) => {
             expect(advs.title).toBe("Advertising");
             done();
           });
         });
     });

   });

    });
