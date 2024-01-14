
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  reservations: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
