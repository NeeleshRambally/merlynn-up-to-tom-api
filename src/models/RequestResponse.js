import mongoose from 'mongoose';

const RequestResponseSchema = new mongoose.Schema({
  modelId: { type: String, required: true },
  inputVariables: { type: Map, of: String, required: true },
  decision: { type: mongoose.Schema.Types.Mixed, required: false },
  error: { type: String, required: false }, 
  createdAt: { type: Date, default: Date.now },
});

let RequestResponse;

if (mongoose.models.RequestResponse) {
  RequestResponse = mongoose.model('RequestResponse');
} else {
  RequestResponse = mongoose.model('RequestResponse', RequestResponseSchema);
}

export default RequestResponse;
