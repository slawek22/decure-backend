const express = require('express');
const router = express.Router();
const Scenario = require('../models/Scenario');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const scenarios = await Scenario.find();
  res.json(scenarios);
});

router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Admins only');
  const scenario = new Scenario({ title: req.body.title, content: req.body.content });
  try {
    await scenario.save();
    res.send('Scenario created');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
