import Image from 'next/image';
import React from 'react';

function Layout({ children }) {
  return (
    <div>
      <main className="relative flex flex-col-reverse md:flex-row justify-center items-center min-h-screen bg-black">
        <div className="z-10 mt-[-150px] md:mt-0">{children}</div>
        <div className=" top-0 lg:relative z-0">
          <Image
            src="/freedom-average/fa.jpg"
            alt="Freedom Average"
            width="800"
            height="800"
          />
        </div>
      </main>
    </div>
  );
}

export default Layout;
