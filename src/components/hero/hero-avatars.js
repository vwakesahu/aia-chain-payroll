import React from 'react';
import Image from 'next/image';

const HeadingWithAvatars = () => {
  return (
    <div className='py-32 grid place-items-center'>
      <div className="text-[66px] text-center leading-[1.1] tracking-[-0.02em]">
        Trusted by
        <br />
        dev's like{' '}
        <span className="inline-flex items-center align-middle">
          <Image
            src="/user1.jpeg"
            alt="Anonymous user 1"
            width={64}
            height={64}
            className="rounded-full border-4 border-white -mr-6"
          />
          <Image
            src="/user2.png"
            alt="Anonymous user 2"
            width={64}
            height={64}
            className="rounded-full border-4 border-white -mr-6"
          />
          <Image
            src="/user3.png"
            alt="Anonymous user 3"
            width={64}
            height={64}
            className="rounded-full border-4 border-white -mr-6"
          />
          <div className="w-16 h-16 rounded-full bg-black border-4 border-white flex items-center justify-center">
            <span className="text-white text-4xl">+</span>
          </div>
        </span>
        {' '}for
        <br />
        Confidential Tranfers.
      </div>
    </div>
  );
};

export default HeadingWithAvatars;