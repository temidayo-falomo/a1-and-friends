"use client";

export default function CloudsDark() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large cloud at top left */}
      <div className="absolute top-10 left-5 md:top-20 md:left-10 w-32 h-20 md:w-48 md:h-32">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 60C50 45 60 35 75 35C80 35 85 37 90 40C95 30 105 25 115 25C130 25 140 35 140 50C145 50 150 52 152 55C160 52 170 58 170 68C170 78 162 85 152 85H50C40 85 30 75 30 65C30 55 40 50 50 60Z"
            fill="#F5E6D3"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Medium cloud at top center */}
      <div className="absolute top-5 right-10 md:top-16 md:right-20 w-24 h-16 md:w-40 md:h-24">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 50C40 40 48 32 58 32C62 32 66 34 70 36C74 28 82 24 90 24C100 24 108 32 108 42C112 42 116 44 118 46C124 44 130 48 130 54C130 60 124 65 118 65H40C32 65 24 57 24 49C24 41 32 36 40 50Z"
            fill="#F5E6D3"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Large cloud at top right */}
      <div className="absolute top-20 right-5 md:top-30 md:right-10 w-36 h-24 md:w-56 md:h-36">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 70C60 55 70 45 85 45C90 45 95 47 100 50C105 40 115 35 125 35C140 35 150 45 150 60C155 60 160 62 162 65C170 62 180 68 180 78C180 88 172 95 162 95H60C50 95 40 85 40 75C40 65 50 60 60 70Z"
            fill="#F5E6D3"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

