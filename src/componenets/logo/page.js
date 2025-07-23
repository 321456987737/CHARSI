import React from 'react'
import Link from 'next/link'
const page = () => {
  const width = 200;
  const height = 45;
   return (
    <div>
       <svg
            width={width}
         height={height}
            viewBox="0 0 300 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Link href={"/userdashboard"}>
              <defs>
                <linearGradient
                  id="textGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#000000" stopOpacity={1} />
                  <stop offset="20%" stopColor="#000000" stopOpacity={1} />
                  <stop offset="40%" stopColor="#000000" stopOpacity={1} />
                  <stop offset="60%" stopColor="#000000" stopOpacity={1} />
                  <stop offset="80%" stopColor="#000000" stopOpacity={1} />
                  <stop offset="100%" stopColor="#000000" stopOpacity={1} />
                </linearGradient>
              </defs>
              <text
                x="150"
                y="50"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="42"
                fontWeight="bold"
                fill="url(#textGradient)"
                letterSpacing="2px"
              >
                CHARSI
              </text>
            </Link>
          </svg>
    </div>
  )
}

export default page