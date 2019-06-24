const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;

        Flair.create({
          name:"blood color",
          color:"red"
        })
        .then((flair) =>{
          this.flair=flair;
          done();
        })

        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("POST /topics/:topicId/posts/:postId/flairs/create", () => {

   it("should create a new flair and redirect", (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
        form: {
          name: "blood color",
          color: "red"
        }
      };
      request.post(options,
        (err, res, color) => {

          Flair.findOne({where: {name: "blood color"}})
          .then((flair) => {
            expect(flair).not.toBeNull();
            expect(flair.color).toBe("red");
            expect(flair.id).not.toBeNull();
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

 describe("GET /topics/:topicId/posts/:postId/flairs/:flairId", () => {

     it("should render a view with the selected flair", (done) => {
       request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}`, (err, res, color) => {
         expect(err).toBeNull();
         expect(color).toContain("red");
         done();
       });
     });

   });

   describe("POST /topics/:topicId/posts/:postId/flairs/:flairId/destroy", () => {

     it("should delete the flair with the associated flairId", (done) => {

//#1
       expect(flair.id).toBe(1);

       request.post(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/destroy`, (err, res, color) => {

//#2
         Flair.findById(1)
         .then((flair) => {
           expect(err).toBeNull();
           expect(color).toBeNull();
           done();
         })
       });

     });

   });

   describe("GET /topics/:topicId/posts/:postId/flairs/:id/edit", () => {

     it("should render a view with an edit flair form", (done) => {
       request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/edit`, (err, res, color) => {
         expect(err).toBeNull();
         expect(color).toContain("Edit color");
         expect(color).toContain("Red");
         done();
       });
     });

   });

   describe("POST /topics/:topicId/posts/:postId/flairs/:id/update", () => {

     it("should return a status code 302", (done) => {
       request.post({
         url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
         form: {
           name: "blood color",
           color: "red."
         }
       }, (err, res, color) => {
         expect(res.statusCode).toBe(302);
         done();
       });
     });

     it("should update the flair with the given values", (done) => {
         const options = {
           url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
           form: {
             name: "blood color"
           }
         };
         request.post(options,
           (err, res, color) => {

           expect(err).toBeNull();

           Flair.findOne({
             where: {id: this.flair.id}
           })
           .then((flair) => {
             expect(flair.name).toBe("blood color");
             done();
           });
         });
     });

   });

});
