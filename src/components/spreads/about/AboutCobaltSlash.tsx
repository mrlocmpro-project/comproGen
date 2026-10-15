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

export const AboutCobaltSlash: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border-2 border-[#0f172a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // COBALT SLASH SPEC" regText="COBALT-SLASH // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* Dynamic Cobalt Slash Ribbon Flair */}
      <div
        className="absolute top-0 right-0 w-64 h-24 bg-[#2563eb] opacity-10 pointer-events-none z-0"
        style={{
          clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-slate-300 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
        <span className="font-bold text-[#0f172a]">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* COBALT SLASH HEADLINE */}
      <section className="border-b-2 border-[#0f172a] pb-4 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="transform -skew-x-12 bg-[#0f172a] text-white px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-l-2 border-[#2563eb]">
            <span className="inline-block transform skew-x-12">BAB 02 // BLUEPRINT STRATEGIS</span>
          </div>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase tracking-[-0.02em] leading-tight text-[#0f172a]">
          Visi Korporasi <span className="text-[#2563eb]">&</span> Strategi Pertumbuhan
        </h1>
        <p className="font-editorial-body text-xs sm:text-sm text-slate-600 leading-[1.6] mt-2">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN VERTICAL STACKED CONTENT */}
      <section className="flex-1 flex flex-col gap-4 relative z-10">
        {/* CONDITIONAL DIRECTOR MESSAGE */}
        {isDirectorActive && (
          <div className={`border-2 border-[#0f172a] bg-white shadow-sm ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            {/* Header Bar with Cobalt Accent */}
            <div className="bg-[#0f172a] text-white px-4 py-2 border-b-2 border-[#0f172a] flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1.5 bg-[#2563eb]" />
                <span>Pernyataan Resmi Direktur Utama</span>
              </div>
              <span className="text-sky-300 text-[10px] font-folio-mono">EXECUTIVE STATEMENT</span>
            </div>

            <div className="p-4 flex flex-col sm:flex-row gap-4 items-start">
              {/* Director Photo with Deep Indigo Frame */}
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border-2 border-[#0f172a] overflow-hidden bg-slate-100 relative shadow-xs">
                <img
                  src={data.director.photoUrl}
                  alt={data.director.name}
                  className="w-full h-full object-cover contrast-105"
                />
                {data.director.badge && (
                  <div className="absolute bottom-0 inset-x-0 bg-[#0f172a] text-sky-400 text-[8px] font-folio-mono text-center py-0.5 uppercase tracking-wider border-t border-slate-700">
                    {data.director.badge}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-headline text-sm font-black uppercase text-[#0f172a] tracking-tight">{data.director.name}</h3>
                    <p className="text-[11px] font-bold text-[#2563eb] uppercase">{data.director.title}</p>
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
                  <div className="font-editorial-body text-xs text-slate-800 leading-relaxed border-l-2 border-[#2563eb] pl-3 py-0.5 mb-2 italic bg-slate-50 font-semibold">
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
              {/* Vision Card with Cobalt Slash Banner */}
              <div className="border-2 border-[#0f172a] bg-white p-4 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-1.5 bg-[#2563eb]" />
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-[#2563eb]" />
                  <span className="text-xs font-black uppercase text-[#0f172a] tracking-wide">VISI KORPORASI</span>
                </div>
                <h4 className="font-headline text-base sm:text-lg font-bold text-[#0f172a] uppercase leading-tight">
                  &ldquo;{data.visionMission.visionStatement}&rdquo;
                </h4>
              </div>
            </div>

            {/* Strategic Pillars with Modern Progress Curve/Matrix */}
            {data.visionMission.pillars && data.visionMission.pillars.length > 0 && (
              <div className="border-2 border-slate-300 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                    <span className="w-2 h-2 bg-[#2563eb]" />
                    <span>Pilar Rekayasa & Matriks Pertumbuhan Korporat</span>
                  </div>
                  {/* Modern Curve Indicator (SVG) */}
                  <div className="hidden sm:flex items-center gap-1 text-[10px] font-folio-mono text-[#2563eb]">
                    <svg className="w-12 h-4 text-[#2563eb]" viewBox="0 0 48 16" fill="none">
                      <path d="M2 14 C 16 14, 24 4, 46 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>GROWTH CURVE</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {data.visionMission.pillars.map((pillar: StrategicPillar, idx: number) => (
                    <div key={pillar.no || idx} className="p-2.5 border border-slate-200 bg-slate-50 relative">
                      <div className="w-5 h-5 bg-[#2563eb] text-white flex items-center justify-center font-mono text-[10px] font-bold mb-1">
                        0{idx + 1}
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
        <span className="font-bold text-[#2563eb]">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
