// Interactive Marquee concept made with Framer-Motion for 14islands blog post

import 'wipe.css';
import './styles.css';

import { useState, useEffect } from 'react';

import FontFaceObserver from 'fontfaceobserver';
import InteractiveMarquee from './components/InteractiveMarquee';

export default function App() {
  const [isFontAvailable, setIsFontAvailable] = useState(false);
  
  useEffect(() => {
    const font = new FontFaceObserver('Barlow Condensed');
    font.load(null, 5000).then(() => setIsFontAvailable(true));
  }, [setIsFontAvailable]);

  return isFontAvailable ? (
    <InteractiveMarquee />
  ) : (
    <div className="loader">Loading...</div>
  );
}
