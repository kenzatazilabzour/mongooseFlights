const Flights = require('../models/flights');
// Controller function for listing all flights
module.exports = {
  listFlights,
  showAddFlightForm,
  addFlight,
}
async function listFlights  (req, res) {
  try {
    const flights = await Flight.find();
    const updatedFlights = flights.map(f => (
      {
        departs: formatDateTime(f.departs),
        _id: f._id,
        airline: f.airline,
        airport: f.airport
      }
    ))
    console.log(updatedFlights);
    res.render('flights/index', { flights: updatedFlights, title:'All Flights'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};
// Controller function
async function showAddFlightForm (req, res)  {
  // Render 'new' view
  res.render('flights/new',{departsDate:'string'});
};
// Controller function for new flight
async function addFlight (req, res)  {
  try {
    // Extract flight data from the request body
    const { airline, airport, flightNo, departs } = req.body;
    // Create a new Flight instance with the extracted data
    const newFlight = new Flight({
      airline,
      airport,
      flightNo,
      departs,
    });
    // Save the new flight to the database
    await newFlight.save();
    // Redirect to the list of flights after successfully adding a new flight
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};
function formatDateTime(dateTimeStr) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateTimeStr).toLocaleDateString(undefined, options);
}
