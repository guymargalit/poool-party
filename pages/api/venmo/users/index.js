import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';
import redis from '../../../../lib/redis';
import { getToken, findTextObject } from '../../../../lib/utils';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).end();
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      id: true,
      venmo: { select: { id: true, accessToken: true } },
    },
  });

  const { query } = req.body;

  if (!query) {
    return res.status(200).send([]);
  }

  if (!user?.venmo?.accessToken) {
    const response = await fetch(`https://venmo.com/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response?.status !== 200) {
      return res.status(404).send([]);
    }
    const result = await response?.text();
    const object = findTextObject(result, 'venmo.load.MDJ = ');
    if (object) {
      try {
        const u = JSON.parse(`${object}}`);
        return res.json({
          data: [
            {
              id: u?.page_user_external_id,
              username: u?.page_user?.username,
              first_name: u?.page_user?.first_name,
              display_name: u?.page_user?.full_name,
              profile_picture_url: u?.page_user?.profile_picture?.replaceAll(
                '&amp;',
                '&'
              ),
            },
          ],
        });
      } catch (e) {
        return res.status(404).send([]);
      }
    }
    return res.status(200).send([]);
  }

  // if (!query) {
    // const result = await fetch(`https://api.venmo.com/v1/suggested`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${getToken(user?.venmo?.accessToken)}`,
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const response = await result.json();
  //   return res.json(response);
  // }

  const result = await fetch(
    `https://api.venmo.com/v1/users?query=${query}&type=username`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken(user?.venmo?.accessToken)}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const response = await result.json();
  if (response?.error) {
    await prisma.venmo.update({
      data: { expiredAt: new Date() },
      where: { id: user?.venmo?.id },
    });
    redis.del(`user-${user?.id}`);
  }
  return res.json(response);
}
