import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('tom_db'); 
      const collection = db.collection('requestResponses');

      const result = await collection.insertOne(req.body);

      await client.close();

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('Failed to save request and response:', error);
      res.status(500).json({ success: false, error: 'Failed to save data' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
