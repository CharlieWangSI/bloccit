const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;
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

          Flair.create({
            name:"blood color",
            color:"red",

            postId: this.post.id
          })
          .then((flair) => {
            this.flair = flair;

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

describe("#create()", () => {

     it("should create a flair object with a name and color", (done) => {
//#1
       Flair.create({
         name: "blood color",
         color: "red"
       })
       .then((flair) => {

//#2
         expect(flair.name).toBe("blood color");
         expect(flair.color).toBe("red");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
    });

    it("should not create a flair with missing name or color", (done) => {
    Flair.create({
      name: "Pros of Cryosleep during the long journey"
    })
    .then((flair) => {

     // the code in this block will not be evaluated since the validation error
     // will skip it. Instead, we'll catch the error in the catch block below
     // and set the expectations there

      done();

    })
    .catch((err) => {

      expect(err.message).toContain("Flair.color cannot be null");
      done();

    })
  });

});

describe("#setFlair()", () => {

     it("should associate a post and a flair together", (done) => {

// #1
       Post.create({
         title: "Challenges of interstellar travel",
         body: "1. The Wi-Fi is terrible"
       })
       .then((newPost) => {
         Flair.create({
           name: "blood color",
           color:"red",
           postId:newPost.id
         })

         .then((flair) => {
// #4
           expect(flair.postId).toBe(newPost.id);
           done();

         });
       })
     });

});

describe("#getFlair()", () => {

     it("should return the associated flair", (done) => {

       this.post.getFlair()
       .then((associatedFlair) => {
         expect(associatedFlair.name).toBe("blood color");
         done();
       });

     });

   });






});
