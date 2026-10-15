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

export const AboutHexagonCharcoal: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fbfbfb] text-[#18181b] border-2 border-[#18181b] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // HEXAGON APEX SPEC" regText="HEXAGON-CHARCOAL // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* Hexagonal Corner Cutout Accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 bg-[#18181b] pointer-events-none z-0"
        style={{
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
      />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-zinc-300 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0 relative z-10">
        <span className="font-bold text-[#18181b]">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* HEXAGON HEADLINE */}
      <section className="border-b-2 border-[#18181b] pb-4 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 bg-[#18181b] text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
            <span>BAB 02 // LANDASAN STRATEGIS</span>
          </div>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase tracking-[-0.02em] leading-tight text-[#18181b]">
          Visi Perusahaan <span className="text-[#f97316]">&</span> Kepemimpinan Terpadu
        </h1>
        <p className="font-editorial-body text-xs sm:text-sm text-zinc-600 leading-[1.6] mt-2">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN VERTICAL STACKED CONTENT */}
      <section className="flex-1 flex flex-col gap-4 relative z-10">
        {/* CONDITIONAL DIRECTOR MESSAGE */}
        {isDirectorActive && (
          <div className={`border-2 border-[#18181b] bg-white shadow-sm ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            {/* Header Bar */}
            <div className="bg-[#18181b] text-white px-4 py-2 border-b-2 border-[#18181b] flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f97316] rotate-45" />
                <span>Pernyataan Resmi Direktur Utama</span>
              </div>
              <span className="text-[#f97316] text-[10px] font-folio-mono">EXECUTIVE APEX</span>
            </div>

            <div className="p-4 flex flex-col sm:flex-row gap-4 items-start">
              {/* Director Photo with Hexagon Marker */}
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border-2 border-[#18181b] overflow-hidden bg-zinc-100 relative shadow-xs">
                <img
                  src={data.director.photoUrl}
                  alt={data.director.name}
                  className="w-full h-full object-cover contrast-105"
                />
                {data.director.badge && (
                  <div className="absolute bottom-0 inset-x-0 bg-[#18181b] text-[#f97316] text-[8px] font-folio-mono text-center py-0.5 uppercase tracking-wider">
                    {data.director.badge}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-headline text-sm font-black uppercase text-[#18181b] tracking-tight">{data.director.name}</h3>
                    <p className="text-[11px] font-bold text-[#f97316] uppercase">{data.director.title}</p>
                    {data.director.regNo && (
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{data.director.regNo}</p>
                    )}
                  </div>
                  {data.director.signatureUrl && (
                    <div className="p-1 border border-zinc-300 bg-white">
                      <img
                        src={data.director.signatureUrl}
                        alt="Tanda Tangan"
                        className="h-7 w-auto max-w-[80px] object-contain"
                      />
                    </div>
                  )}
                </div>

                {data.director.quote && (
                  <div className="font-editorial-body text-xs text-zinc-800 leading-relaxed border-l-2 border-[#f97316] pl-3 py-0.5 mb-2 italic bg-zinc-50 font-semibold">
                    &ldquo;{data.director.quote}&rdquo;
                  </div>
                )}

                <p className="font-editorial-body text-xs text-zinc-600 leading-[1.5]">
                  {data.director.paragraph1}
                </p>
                {!isVisionActive && data.director.paragraph2 && (
                  <p className="font-editorial-body text-xs text-zinc-600 leading-[1.5] mt-2">
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
              {/* Vision Card with Hexagon Indicator */}
              <div className="border-2 border-[#18181b] bg-white p-4 shadow-xs relative">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 bg-[#18181b] text-white flex items-center justify-center text-[10px] font-bold"
                    style={{
                      clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                    }}
                  >
                    V
                  </div>
                  <span className="text-xs font-black uppercase text-[#18181b] tracking-wide">VISI STRATEGIS</span>
                </div>
                <h4 className="font-headline text-base sm:text-lg font-bold text-[#18181b] uppercase leading-tight">
                  &ldquo;{data.visionMission.visionStatement}&rdquo;
                </h4>
              </div>
            </div>

            {/* Strategic Pillars with Hexagon Badges */}
            {data.visionMission.pillars && data.visionMission.pillars.length > 0 && (
              <div className="border-2 border-zinc-300 bg-white p-3.5 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#18181b] uppercase tracking-wider">
                  <span className="w-2 h-2 bg-[#f97316] rotate-45" />
                  <span>Pilar Keunggulan Arsitektur & Kepatuhan Statuter</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {data.visionMission.pillars.map((pillar: StrategicPillar, idx: number) => (
                    <div key={pillar.no || idx} className="p-2.5 border border-zinc-200 bg-zinc-50 relative">
                      <div
                        className="w-6 h-6 bg-[#18181b] text-[#f97316] flex items-center justify-center text-[10px] font-mono font-bold mb-1"
                        style={{
                          clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                        }}
                      >
                        0{idx + 1}
                      </div>
                      <h5 className="font-headline text-xs font-bold text-zinc-900 uppercase mt-1">{pillar.title}</h5>
                      <p className="font-editorial-body text-[11px] text-zinc-600 leading-snug mt-1">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-4 pt-3 border-t border-zinc-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0 relative z-10">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#f97316]">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
