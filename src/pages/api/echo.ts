
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const queryObject = Object.fromEntries(Object.entries(query));
  res.status(200).json(queryObject);
}
