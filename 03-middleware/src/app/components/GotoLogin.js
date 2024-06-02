"use client";

export default function GotoLogin() {
  const handleClick = () => {
    const redirectUrl = encodeURIComponent(window.location.href);
    window.location.href = `http://localhost:5000?redirectUrl=${redirectUrl}`;
  };

  return (
    <button
      className="mt-6 border-2 border-gray-800 p-10 rounded-lg"
      onClick={handleClick}
    >
      go to account service
    </button>
  );
}
