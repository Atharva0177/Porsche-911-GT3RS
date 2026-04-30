import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'Porsche 911 GT3 RS — Scrollytelling',
  description: 'High-end scrollytelling showcase for the 911 GT3 RS'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
