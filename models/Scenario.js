const mongoose = require('mongoose');

const ScenarioSchema = new mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('Scenario', ScenarioSchema);
