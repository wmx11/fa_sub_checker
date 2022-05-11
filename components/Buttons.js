const CoreButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`${className} px-4 py-3 rounded-md hover:shadow-md hover:brightness-110`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const BlueButton = (props) => {
  return (
    <CoreButton className="bg-indigo-900 text-white" {...props}>
      {props.children}
    </CoreButton>
  );
};

export const RedButton = (props) => {
  return (
    <CoreButton className="bg-red-600 text-white" {...props}>
      {props.children}
    </CoreButton>
  );
};
