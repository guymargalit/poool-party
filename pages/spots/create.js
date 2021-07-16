import React, { useState } from 'react';
// import Layout from '../components/Layout';
import Router from 'next/router';

const SpotCreate = () => {
  const [address, setAddress] = useState('');

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { address };
      await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/spots');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submitData}>
          <h1>New Hotspot</h1>
          <input
            autoFocus
            onChange={(e) => setAddress(e.target.value)}
            placeholder="HNT Address"
            type="text"
            value={address}
          />
          <input disabled={!address} type="submit" value="Create" />
          <a className="back" onClick={() => Router.push('/spots')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default SpotCreate;
