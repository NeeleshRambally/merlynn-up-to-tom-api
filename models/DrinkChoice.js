import mongoose from 'mongoose';

const DrinkChoiceSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  inputVariables: { type: Object, required: true },
  decision: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DrinkChoice || mongoose.model('DrinkChoice', DrinkChoiceSchema);