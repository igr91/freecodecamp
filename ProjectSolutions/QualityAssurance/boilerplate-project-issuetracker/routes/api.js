'use strict';

module.exports = function (app) {

  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const { Schema } = mongoose;
  const { v4: uuidv4 } = require('uuid');

  const projectSchema = new Schema({
    project: { type: String, required: true },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String },
    status_text: { type: String },
    open: { type: Boolean, required: true },
    created_on: { type: Date, required: true },
    updated_on: { type: Date, required: true },
    _id: { type: String, required: true },
    __v: { type: Number, select: false }
  });

  const projectModel = mongoose.model("projects", projectSchema);

  app.route('/api/issues/:project')

    .get(function (req, res) {
      const project = req.params.project;

      let query = {
        project: project
      }

      Object.assign(query, req.query);

      projectModel.find(query).exec((e, data) => {
        return res.json(data);
      });

    })

    .post(function (req, res) {
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      if (project == null || issue_title == null || issue_text == null || created_by == null) {
        return res.json({ error: 'required field(s) missing' });
      }

      const newIssue = new projectModel({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to != null ? assigned_to : "",
        status_text: status_text != null ? status_text : "",
        open: true,
        created_on: new Date(),
        updated_on: new Date(),
        _id: uuidv4(),
      })

      newIssue.save((e, data) => {
        if (e || !data) {
          return res.json({ error: 'could not save data' })
        } else {
          return res.json(data);
        }
      })

    })

    .put(function (req, res) {
      const { _id } = req.body;

      if (Object.keys(req.body).length === 0 || _id == null) {
        return res.json({ error: 'missing _id' });
      }

      if (Object.keys(req.body).length === 1 && _id != null) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }

      let updates = {
        updated_on: new Date()
      }

      Object.assign(updates, req.body);

      projectModel.findOneAndUpdate({ '_id': _id }, updates, (e, result) => {
        if (result == null) {
          return res.json({ error: 'could not update', '_id': _id });
        } else {
          return res.json({ result: 'successfully updated', '_id': _id });
        }
      });

    })

    .delete(function (req, res) {
      const { _id } = req.body;

      if (_id == null) {
        return res.json({ error: 'missing _id' });
      }

      projectModel.findOneAndDelete({ '_id': _id }, (e, result) => {
        if (result == null) {
          return res.json({ error: 'could not delete', '_id': _id });
        } else {
          return res.json({ result: 'successfully deleted', '_id': _id });
        }
      })

    });

};
