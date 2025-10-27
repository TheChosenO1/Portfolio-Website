"use client"; // ⬅️ THIS MAKES IT A CLIENT COMPONENT

import dynamic from 'next/dynamic';

// Dynamic import of the actual morphing waves component
const MorphingWaves = dynamic(() => import('./morphingwaves'), {
  // Now 'ssr: false' is perfectly valid because this wrapper is a Client Component
  ssr: false, 
  loading: () => <div className="absolute inset-0 -z-10 bg-[#0b0b0c]" /> // Optional loading state
});

export default function DynamicWaves() {
  return <MorphingWaves />;
}