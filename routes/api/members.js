const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');
const router = express.Router();

// Simple REST API
// Gets all members.
// Becasue of the use of router, don;t have to type '/api/members' (parent route) anymore
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
    // Create new member object.
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
    };

    // Check if user provided a name and email.
    if (!newMember.name || !newMember.email) {
        res.status(400).json({msg: 'Please include a name and a email!!'});
    }

    // Add data onto members array.
    members.push(newMember);
    // Send back updated array.
    res.json(members);
});

module.exports = router;
