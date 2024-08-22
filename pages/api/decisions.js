import dbConnect from '../../lib/dbConnect';
import DrinkChoice from '../../models/DrinkChoice';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const decision = new DrinkChoice(req.body);
      await decision.save();
      res.status(201).json({ success: true, data: decision });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}