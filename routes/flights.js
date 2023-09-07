const express = require('express');
const router = express.Router();
const flightControl = require('../controllers/flights');

router.get('/', flightControl.listFlights)
// New Route - Show the form to create a new flight
router.get('/new', flightControl.showAddFlightForm);

// Create Route - Create a new flight
router.post('/', flightControl.addFlight);

module.exports = router;
