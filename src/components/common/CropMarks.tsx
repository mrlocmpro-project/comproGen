import React from 'react';

interface CropMarksProps {
  sheetId?: string;
  bleedText?: string;
  regText?: string;
}

export const CropMarks: React.FC<CropMarksProps> = ({
  sheetId = '01',
  bleedText = '+ 210 × 297 MM // BLEED 3MM',
  regText = `+ REG: ACK-IND-SP${sheetId}`,
}) => {
  return (
    <>
      {/* Registration Marks text */}
      <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-400 select-none pointer-events-none z-30">
        {bleedText}
      </div>
      <div className="absolute top-2 right-2 text-[8px] font-mono text-zinc-400 select-none pointer-events-none z-30">
        {regText}
      </div>
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-400 select-none pointer-events-none z-30">
        + ISO 216 STANDARD (A4)
      </div>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-400 select-none pointer-events-none z-30">
        REGISTRATION: PASS +
      </div>

      {/* Top Left Corner Tick */}
      <div className="absolute top-2 left-2 pointer-events-none z-30 select-none">
        <div className="w-3.5 h-[1.5px] bg-[#1c1917] mb-[2px]"></div>
        <div className="w-[1.5px] h-3.5 bg-[#1c1917]"></div>
      </div>

      {/* Top Right Corner Tick */}
      <div className="absolute top-2 right-2 pointer-events-none z-30 select-none flex flex-col items-end">
        <div className="w-3.5 h-[1.5px] bg-[#1c1917] mb-[2px]"></div>
        <div className="w-[1.5px] h-3.5 bg-[#1c1917]"></div>
      </div>

      {/* Bottom Left Corner Tick */}
      <div className="absolute bottom-2 left-2 pointer-events-none z-30 select-none">
        <div className="w-[1.5px] h-3.5 bg-[#1c1917] mb-[2px]"></div>
        <div className="w-3.5 h-[1.5px] bg-[#1c1917]"></div>
      </div>

      {/* Bottom Right Corner Tick */}
      <div className="absolute bottom-2 right-2 pointer-events-none z-30 select-none flex flex-col items-end">
        <div className="w-[1.5px] h-3.5 bg-[#1c1917] mb-[2px]"></div>
        <div className="w-3.5 h-[1.5px] bg-[#1c1917]"></div>
      </div>
    </>
  );
};

export const GridOverlay: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none grid grid-cols-12 gap-4 px-6 md:px-10 z-40 transition-opacity duration-200"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-full border-x border-[#f59e0b]/40 bg-[#f59e0b]/[0.02] flex flex-col justify-between py-2 text-[8px] font-mono text-[#f59e0b]/60 select-none"
        >
          <span className="text-center">{i + 1}</span>
          <span className="text-center">{i + 1}</span>
        </div>
      ))}
    </div>
  );
};
