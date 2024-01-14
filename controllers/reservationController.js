// const Resource = require('../models/resourceModel');
// const Student = require('../models/studentModel');

// exports.reserveResource = async (req, res) => {
//   try {
//     // TODO: Extract necessary details from the request body (resourceId, studentId, startTime, endTime)
//     // TODO: Check resource availability by fetching it from the database
//     // TODO: Check student existence by fetching it from the database
//     // TODO: Create reservation by updating resource details and save it
//     // TODO: Send a success response with the reservation details
//     // res.status(200).json({ message: 'Resource reserved successfully', reservation: resource.reservations });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const Resource = require('../models/Resource');

const reserveResource = async (req, res) => {
  try {
    const { studentId, resourceId, startTime, endTime } = req.body;

    // Check if the resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check resource availability for the given time period
    const overlappingReservation = resource.reservations.find(
      (reservation) =>
        (startTime >= reservation.startTime && startTime < reservation.endTime) ||
        (endTime > reservation.startTime && endTime <= reservation.endTime) ||
        (startTime <= reservation.startTime && endTime >= reservation.endTime)
    );

    if (overlappingReservation) {
      return res.status(409).json({ message: 'Resource not available for the specified time period' });
    }

    // Create a new reservation
    const newReservation = {
      studentId,
      startTime,
      endTime,
    };

    // Update the resource's reservations array and set it as unavailable
    resource.reservations.push(newReservation);
    resource.isAvailable = false;
    await resource.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: {
        id: newReservation._id, // You may customize this based on your preference
        studentId: newReservation.studentId,
        resourceId,
        startTime: newReservation.startTime.toISOString(),
        endTime: newReservation.endTime.toISOString(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { reserveResource };
