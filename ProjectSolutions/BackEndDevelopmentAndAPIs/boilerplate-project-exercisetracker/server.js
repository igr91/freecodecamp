require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// ============================================
// FCC boilerplate ends here
// ============================================

const userSchema = new Schema({
  username: { type: String, required: true },
});

const exerciseSchema = new Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  dateD: { type: Date },
  date: { type: String },
})

const userModel = mongoose.model("users", userSchema);
const excerciseModel = mongoose.model("excercises", exerciseSchema);


app.post("/api/users", (req, res) => {
  const inputName = req.body.username;

  const postUser = new userModel({
    username: inputName
  });

  postUser.save((e, data) => {
    if (!data) {
      return res.json({ error: "could not save user" });
    }
    return res.json({
      username: data.username,
      _id: data._id
    });

  });
});


app.get("/api/users", (req, res) => {
  userModel.find({}, (e, data) => {
    if (!data) {
      return res.json({ error: "could not get users" });
    }
    res.json(data);
  });
});


app.post("/api/users/:_id/exercises", (req, res) => {
  const id = req.params._id;
  const { description, duration } = req.body;
  let date;
  let dateD;

  if (req.body.date) {
    date = new Date(req.body.date).toDateString();
    dateD = new Date(req.body.date);
  } else {
    date = new Date(Date.now()).toDateString();
    dateD = new Date(Date.now());
  }

  const postExcercise = new excerciseModel({
    userId: id,
    description: description,
    duration: duration,
    dateD: dateD,
    date: date
  });

  userModel.findById(id, (e, dataUser) => {
    if (!dataUser) {
      return res.json({ error: "user does not exist" });
    }

    postExcercise.save((e, dataExc) => {
      if (!dataExc) {
        return res.json({ error: "could not save excercise data" });
      }
      return res.json({
        _id: dataUser._id,
        username: dataUser.username,
        description: dataExc.description,
        duration: dataExc.duration,
        date: date
      });
    });
  });
});


app.get("/api/users/:_id/logs", (req, res) => {
  const id = req.params._id;
  const { from, to, limit } = req.query;

  let query = {
    userId: id
  };

  if (from) {
    query = {
      userId: id,
      dateD: { $gte: new Date(from) }
    };
  }

  if (to) {
    query = {
      userId: id,
      dateD: { $lte: new Date(to) }
    };
  }

  if (from && to) {
    query = {
      userId: id,
      dateD: { $gte: new Date(from), $lte: new Date(to) }
    };
  }

  userModel.findById(id, (e, dataUser) => {
    if (!dataUser) {
      return res.json({ error: "user does not exist" });
    }

    excerciseModel.find(query)
      .limit(limit)
      .select(["description", "duration", "date"])
      .exec((e, execData) => {
        if (!execData) {
          return res.json({ error: "excercise data not found" });
        }
        return res.json({
          username: dataUser.username,
          _id: id,
          count: execData.length,
          log: execData
        });
      })
  });
});


