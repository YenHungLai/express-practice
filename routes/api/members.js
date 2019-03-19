const express = require('express');
const members = require('../../Members');
const router = express.Router();

// Simple REST API
// Gets all members.
router.get('/', (req, res) => res.json(members));

// Get single member.
// :id is URL parameter, use req.params.id to access.
// parseInt() parses a string argument and returns an integer of the specified radix.
router.get('/:id', (req, res) => {
  // If the id exists in the array some() returns true.
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.send(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
  }
});

// Create Member
router.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = router;
