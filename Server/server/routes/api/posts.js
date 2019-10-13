const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get post

router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();

  res.send(await posts.find({}).toArray());
});

//Add post

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    name: req.body.name,
    createdAt: new Date()
  });
  res.status(200).send();
});

//Delete post

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();

  console.log("running");
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  console.log("finished");
  res.status.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017/",
    {
      useNewUrlParser: true
    }
  );

  return client.db("myLib").collection("books");
}

module.exports = router;
