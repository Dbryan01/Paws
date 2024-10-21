import { Schema, model } from 'mongoose';

const adoptionRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
  requestDate: { type: Date, default: Date.now }
});

export default model('AdoptionRequest', adoptionRequestSchema);
