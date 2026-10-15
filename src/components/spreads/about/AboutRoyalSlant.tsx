import React from 'react';
import { CompanyProfileData, TogglesState, StrategicPillar } from '../../../types/monograph';
import { CropMarks, GridOverlay } from '../../common/CropMarks';

import { PageInfo } from '../../../utils/pagination';

interface Props {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  pageInfo?: PageInfo;
}

export const AboutRoyalSlant: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 border-2 border-[#1e3a8a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // ROYAL SLANT EDITORIAL" regText="ROYAL-SLANT // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* Diagonal Hatched Pattern in Corner */}
      <div
        className="absolute top-0 right-0 w-48 h-32 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #1e3a8a 0, #1e3a8a 1.5px, transparent 1.5px, transparent 8px)',
        }}
      />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-slate-300 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
        <span className="font-bold text-[#1e3a8a]">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* ROYAL SLANT HEADLINE */}
      <section className="border-b-2 border-[#1e3a8a] pb-4 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="transform -skew-x-12 bg-[#ea580c] text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
            <span className="inline-block transform skew-x-12">BAB 02 // ORIENTASI STRATEGIS</span>
          </div>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase tracking-[-0.02em] leading-tight text-[#1e3a8a]">
          Visi Korporasi <span className="text-[#ea580c]">&</span> Kepemimpinan Strategis
        </h1>
        <p className="font-editorial-body text-xs sm:text-sm text-slate-600 leading-[1.6] mt-2">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN VERTICAL STACKED CONTENT */}
      <section className="flex-1 flex flex-col gap-4 relative z-10">
        {/* CONDITIONAL DIRECTOR MESSAGE */}
        {isDirectorActive && (
          <div className={`border-2 border-[#1e3a8a] bg-white shadow-sm ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            {/* Header Bar with Slanted Parallelogram Accent */}
            <div className="bg-[#1e3a8a] text-white px-4 py-2 border-b-2 border-[#1e3a8a] flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#ea580c] transform -skew-x-12" />
                <span>Pernyataan Resmi Direktur Utama</span>
              </div>
              <span className="text-orange-200 text-[10px] font-folio-mono">EXECUTIVE ADDRESS</span>
            </div>

            <div className="p-4 flex flex-col sm:flex-row gap-4 items-start">
              {/* Director Photo with Slanted Orange Accent Ribbon */}
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border-2 border-[#1e3a8a] overflow-hidden bg-slate-100 relative shadow-xs">
                <img
                  src={data.director.photoUrl}
                  alt={data.director.name}
                  className="w-full h-full object-cover contrast-105"
                />
                {data.director.badge && (
                  <div className="absolute bottom-0 inset-x-0 bg-[#1e3a8a] text-white text-[8px] font-folio-mono text-center py-0.5 uppercase tracking-wider">
                    {data.director.badge}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-headline text-sm font-black uppercase text-[#1e3a8a] tracking-tight">{data.director.name}</h3>
                    <p className="text-[11px] font-bold text-[#ea580c] uppercase">{data.director.title}</p>
                    {data.director.regNo && (
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{data.director.regNo}</p>
                    )}
                  </div>
                  {data.director.signatureUrl && (
                    <div className="p-1 border border-slate-200 bg-white">
                      <img
                        src={data.director.signatureUrl}
                        alt="Tanda Tangan"
                        className="h-7 w-auto max-w-[80px] object-contain"
                      />
                    </div>
                  )}
                </div>

                {data.director.quote && (
                  <div className="font-editorial-body text-xs text-slate-800 leading-relaxed border-l-2 border-[#ea580c] pl-3 py-0.5 mb-2 italic bg-slate-50/70 font-semibold">
                    &ldquo;{data.director.quote}&rdquo;
                  </div>
                )}

                <p className="font-editorial-body text-xs text-slate-600 leading-[1.5]">
                  {data.director.paragraph1}
                </p>
                {!isVisionActive && data.director.paragraph2 && (
                  <p className="font-editorial-body text-xs text-slate-600 leading-[1.5] mt-2">
                    {data.director.paragraph2}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CONDITIONAL VISION & MISSION */}
        {isVisionActive && (
          <div className="flex-1 flex flex-col justify-between gap-3">
            <div className="grid grid-cols-1 gap-3">
              {/* Massive Vision Callout with Slanted Tag */}
              <div className="border-2 border-[#1e3a8a] bg-white p-4 shadow-xs relative">
                <div className="transform -skew-x-12 bg-[#1e3a8a] text-white inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                  <span className="inline-block transform skew-x-12">VISI STRATEGIS</span>
                </div>
                <h4 className="font-headline text-base sm:text-lg font-bold text-[#1e3a8a] uppercase leading-tight">
                  &ldquo;{data.visionMission.visionStatement}&rdquo;
                </h4>
              </div>
            </div>

            {/* Strategic Pillars with Slanted Number Badges */}
            {data.visionMission.pillars && data.visionMission.pillars.length > 0 && (
              <div className="border-2 border-slate-300 bg-white p-3.5 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">
                  <span className="w-2 h-2 bg-[#ea580c] transform -skew-x-12" />
                  <span>Pilar Tata Kelola & Transformasi Rekayasa</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {data.visionMission.pillars.map((pillar: StrategicPillar, idx: number) => (
                    <div key={pillar.no || idx} className="p-2.5 border border-slate-200 bg-slate-50 relative">
                      <div className="transform -skew-x-12 bg-[#1e3a8a] text-white w-6 h-5 flex items-center justify-center font-mono text-[10px] font-bold mb-1">
                        <span className="transform skew-x-12">0{idx + 1}</span>
                      </div>
                      <h5 className="font-headline text-xs font-bold text-slate-900 uppercase mt-1">{pillar.title}</h5>
                      <p className="font-editorial-body text-[11px] text-slate-600 leading-snug mt-1">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#ea580c]">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
