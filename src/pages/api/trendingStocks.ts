
import type { NextApiRequest, NextApiResponse } from 'next';
import getTrendingStocks from './getTrendingStocks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stocks = await getTrendingStocks();
    // console.log(stocks);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending stocks' });
  }
}
