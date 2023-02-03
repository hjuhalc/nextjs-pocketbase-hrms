// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { pb } from '.';
import { ClientResponseError } from 'pocketbase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    await pb
      .collection('users')
      .authWithPassword(req.body.email, req.body.password);
    res.status(200).json({
      message: 'Successfully logged in',
    });
  } catch (error: any) {
    if (error instanceof ClientResponseError) {
      res.status(error.status).json(error);
    }
  }
}
