// Assuming useFadeIn is a custom hook that provides a fade-in effect
import { useEffect, useState } from 'react';

const useFadeIn = () => {
  const [style, setStyle] = useState({ opacity: 0, transition: 'opacity 1s' });

  useEffect(() => {
    setStyle({ opacity: 1, transition: 'opacity 1s' });
  }, []);

  const Section = ({ children }) => (
    <div style={style}>
      {children}
    </div>
  );

  return Section;
};

export default useFadeIn;
