'use client'

import React from 'react';
import { useDraftModeEnvironment } from 'next-sanity/hooks'
import { useRouter } from 'next/navigation';

const DisableDraftMode = () => {
  const router = useRouter();
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when ouside of Presentation tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }
  
  const handleClick = async () => {
    await fetch('/draft-mode/disable')

    router.refresh();
  }
  
  return (
    <button onClick={handleClick} className="right-4 bottom-4 z-50 fixed bg-gray-50 px-4 py-2">
      Disable draft mode
    </button>
  );
};

export default DisableDraftMode;