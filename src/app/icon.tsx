import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(240 60% 97%)', // Light background
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
              {/* These colors are hardcoded based on the theme in globals.css */}
              <stop offset="0%" stopColor="#8A2BE2" /> {/* Corresponds to primary */}
              <stop offset="100%" stopColor="#9932CC" /> {/* Corresponds to accent */}
            </linearGradient>
          </defs>
          <path
            d="M16 3.5L29.5 22.5L23.5 28.5L16 16.5L8.5 28.5L2.5 22.5L16 3.5Z"
            stroke="url(#logo-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
