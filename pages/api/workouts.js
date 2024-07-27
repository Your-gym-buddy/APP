import { getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { exercises } = req.body;
    const workout = await prisma.workout.create({
      data: {
        user: { connect: { email: session.user.email } },
        exercises,
      },
    });
    res.status(201).json(workout);
  } else if (req.method === 'GET') {
    const workouts = await prisma.workout.findMany({
      where: { user: { email: session.user.email } },
    });
    res.status(200).json(workouts);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
