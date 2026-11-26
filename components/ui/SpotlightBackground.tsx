import React from 'react';

// Fixed page background: faint grid and two soft glows.
// (A mouse-following spotlight used to live here, but the layer can't receive mouse events
// — it is pointer-events-none behind the page — so it never showed. Removed; nothing visible changes.)
const SpotlightBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-black overflow-hidden pointer-events-none">
    {/* Base Grid */}
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
    />

    {/* Floating Particles/Ambient Glow */}
    <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
  </div>
);

export default SpotlightBackground;
