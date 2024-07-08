import React from 'react'

export default function useLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-24 h-24 animate-spin"></div>
        <div className="mt-4 text-xl">Loading...</div>
      </div>
    </div>
  )
}
