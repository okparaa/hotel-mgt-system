const Fallback = () => {
  return (
    <div className="flex justify-center items-center h-[530px]">
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="#e879f9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="4" />
        <g>
          <circle className="fallback_loading" cx="4" cy="12" r="2" />
          <circle className="fallback_loading" cx="20" cy="12" r="2" />
        </g>
      </svg>
    </div>
  );
};

export default Fallback;
