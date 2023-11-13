// pages/api/search.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;
  if (typeof query !== 'string') {
    res.status(400).send('Invalid query');
    return;
  }

  try {
    const response = await fetch(`https://www.wealthbase.com/investments/${query}/details`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'
        }
      });
      
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
