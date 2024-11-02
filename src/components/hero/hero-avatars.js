import React from 'react';
import Image from 'next/image';

const HeadingWithAvatars = () => {
  return (
    <div className='py-32 grid place-items-center'><div className="text-[66px] leading-[1.1] tracking-[-0.02em]">
    Leverage the power
    <br />
    of AIA in{' '}
    <span className="inline-flex items-center align-middle">
      <Image
        src="/user1.jpeg"
        alt="Team member 1"
        width={64}
        height={64}
        className="rounded-full border-4 border-white -mr-6"
      />
      <Image
        src="/user1.jpeg"
        alt="Team member 2"
        width={64}
        height={64}
        className="rounded-full border-4 border-white -mr-6"
      />
      <div className="w-16 h-16 rounded-full bg-black border-4 border-white flex items-center justify-center">
        <span className="text-white text-4xl">+</span>
      </div>
    </span>
    {' '}aircraft
    <br />
    parts procurement
  </div></div>
    
  );
};

export default HeadingWithAvatars;