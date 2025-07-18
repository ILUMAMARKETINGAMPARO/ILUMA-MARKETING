import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-black px-4 py-2 rounded-md z-50 focus:z-[9999] font-semibold"
      tabIndex={1}
    >
      Aller au contenu principal
    </a>
  );
};

export default SkipToContent;