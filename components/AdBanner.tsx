
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ slot = 'default-slot', format = 'auto', className = '' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`my-8 overflow-hidden text-center ${className}`}>
      <p className="text-[10px] text-gray-400 font-bold tracking-widest mb-2 uppercase">Sponsored</p>
      <div className="bg-gray-100 rounded-xl min-h-[100px] flex items-center justify-center border border-dashed border-gray-300">
        {/* Actual Google AdSense Tag */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
        {/* Placeholder text for dev */}
        <span className="text-gray-300 text-xs italic">Advertisement Area</span>
      </div>
    </div>
  );
};

export default AdBanner;
