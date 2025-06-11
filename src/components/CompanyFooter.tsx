import React from 'react';
import logo from '@/assets/logo2.png';
import logo2 from '@/assets/tessi5.png';
export default function CompanyFooter() {
  return (
    <div className="mt-8 text-center">
      <div className="flex flex-col items-center justify-center mb-2">
        <img
          src={logo}
          alt="Logo Looky"
          className="h-12 w-auto object-contain mb-1"
        />
        
      </div>
      <div className="flex items-center justify-center gap-2 text-xs text-[#1a1a40]">
          <span className="font-medium">Powered by</span>
          <img src={logo2} alt="Tessi Logo" className="h-5 w-auto object-contain" />
        </div>
    </div>
  );
}

