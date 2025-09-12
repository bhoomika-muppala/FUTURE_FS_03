import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-neutral mt-12 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} EcoStride. All rights reserved.</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Terms</a>
        </div>
      </div>
    </footer>
  )
}
