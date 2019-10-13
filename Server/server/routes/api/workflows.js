const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get workflows

router.get("/", async (req, res) => {
  const posts = await loadWorkflowsCollection();

  res.send(await posts.find({}).toArray());
});

//Get workflow

router.get("/:id", async (req, res) => {
  const posts = await loadWorkflowsCollection();
  let workflowDetail = await posts
    .find({ _id: new mongodb.ObjectID(req.params.id) })
    .toArray();
  res.send(workflowDetail[0]);
});

//Save workflow

router.post("/:id", async (req, res) => {
  const posts = await loadWorkflowsCollection();
  var myquery = { _id: new mongodb.ObjectID(req.params.id) };
  console.log(req.body.components);
  var newvalues = { $set: { components: req.body.components } };
  posts.updateOne(myquery, newvalues);
  res.status(200).send();
});

//Add workflow

router.post("/", async (req, res) => {
  const posts = await loadWorkflowsCollection();
  await posts.insertOne({
    name: req.body.name,
    desc: req.body.desc,
    components: req.body.components,
    createdAt: new Date()
  });
  res.status(200).send();
});

//Delete workflow

router.delete("/:id", async (req, res) => {
  const posts = await loadWorkflowsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status.status(200).send();
});

async function loadWorkflowsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017/",
    {
      useNewUrlParser: true
    }
  );

  return client.db("myLib").collection("workflows");
}

module.exports = router;
