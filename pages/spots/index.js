import React from 'react';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { spots: [] } };
  }

  const spots = await prisma.spot.findMany({
    select: { id: true, name: true },
  });
  return {
    props: { spots },
  };
};

const Spots = (props) => {
  return (
    <>
      <div className="page">
        <h1>Spots</h1>
        <main>
          {(props.spots || []).map((spot) => (
            <div key={spot.id} className="post">
              <div>{spot.name}</div>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default Spots;
