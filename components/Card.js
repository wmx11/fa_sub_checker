import React from 'react';

function Card({ children }) {
  return (
    <div className="backdrop-blur-md relative bg-slate-800 shadow-xl rounded-md m-4 sm:rounded-3xl bg-clip-padding bg-opacity-60 border-2 border-gray-700 py-28 px-14 drop-shadow-[0px_0px_35px_rgba(250,100,140,0.25)]">
      {children}
    </div>
  );
}

export default Card;
