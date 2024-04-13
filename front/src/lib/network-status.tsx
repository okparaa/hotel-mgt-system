export const NetworkStatus = () => {
  let online = true;
  if (typeof window !== "undefined" && !window.navigator.onLine) {
    online = false;
  }
  return (
    <small className="absolute -mt-8 w-9/12">
      {online ? (
        <span className="font-bold">Enter values below</span>
      ) : (
        <div className="text-red-900 font-extrabold">
          Your browser is offline
        </div>
      )}
    </small>
  );
};
