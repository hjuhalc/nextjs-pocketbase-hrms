// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ClientResponseError } from 'pocketbase';
import { pb } from '.';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const employees = await pb.collection('employees').getFullList();

    res.status(200).json({ employees });
  } catch (error: any) {
    if (error instanceof ClientResponseError) {
      res.status(error.status).json(error);
    }

    res.status(500).json({ error: 'Something went wrong' });
  }
}
