const sequelize = require("../../src/db/models/index").sequelize;

describe("topic", () => {

  beforeEach((done) => {
//#1
    this.topic;
    sequelize.sync({force: true}).then((res) => {

//#2
Topic.create({
  title: "Expeditions to Alpha Centauri",
  description: "A compilation of reports from recent visits to the star system."
})
.then((topic) => {
  this.topic = topic;
//#3
  Post.create({
    title: "My first visit to Proxima Centauri b",
    body: "I saw some rocks.",
//#4
    topicId: this.topic.id
  })
  .then((post) => {
    this.post = post;
    done();
  });
})
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
});


  describe("#create()", () => {

     it("should create a topic object with a title and description", (done) => {
//#1
       Topic.create({
         title: "Pros of Cryosleep during the long journey",
         description: "1. Not having to answer the 'are we there yet?' question."
       })
       .then((topic) => {
//#2
         expect(topic.title).toBe("Pros of Cryosleep during the long journey");
         expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create a post with missing title, body, or assigned topic", (done) => {
     Topic.create({
       title: "Pros of Cryosleep during the long journey"
     })
     .then((post) => {

      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there

       done();

     })
     .catch((err) => {

       expect(err.message).toContain("Topic.description cannot be null");
       done();

     })
   });
 });

 describe("#getPost()", () => {

   it("should return the associated posts", (done) => {

     this.getPost()
     .then((associatedPost) => {
       expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
       done();
     });

   });

 });
