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

export const AboutSwissTangerine: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white text-black border-2 border-black relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // SWISS STRICT GRID" regText="SWISS-TANGERINE // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-zinc-200 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0">
        <span className="font-bold text-black">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* SWISS HEADLINE */}
      <section className="border-b-2 border-black pb-4 mb-5 shrink-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold text-[#ff5722] uppercase tracking-wider block">
            Bab 02 // Orientasi Strategis Perusahaan
          </span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-[-0.02em] leading-tight">
          Visi, Orientasi & Tata Kelola Direksi<span className="text-[#ff5722]">.</span>
        </h1>
        <p className="font-editorial-body text-xs sm:text-sm text-[#64748b] leading-[1.6] mt-2">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN VERTICAL STACKED CONTENT FOR A4 PORTRAIT */}
      <section className="flex-1 flex flex-col gap-4">
        {/* CONDITIONAL DIRECTOR MESSAGE (Stacked Compact Card) */}
        {isDirectorActive && (
          <div className={`border-2 border-black bg-white ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            {/* Header Block in Solid Tangerine */}
            <div className="bg-[#ff5722] text-white px-3 py-1.5 border-b-2 border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>Sambutan Direktur Utama</span>
              <span className="opacity-90 font-medium">Dewan Direksi</span>
            </div>

            <div className="p-4 flex flex-col sm:flex-row gap-4 items-start">
              {/* Director Photo in Strict Black Frame */}
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border-2 border-black overflow-hidden bg-zinc-100 relative">
                <img
                  src={data.director.photoUrl}
                  alt={data.director.name}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                {data.director.badge && (
                  <div className="absolute bottom-0 inset-x-0 bg-black text-white text-[8px] font-mono text-center py-0.5">
                    {data.director.badge}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-headline text-sm font-bold uppercase text-black tracking-[-0.02em]">{data.director.name}</h3>
                    <p className="text-xs text-[#ff5722] font-bold uppercase mt-0.5">{data.director.title}</p>
                    {data.director.regNo && (
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{data.director.regNo}</p>
                    )}
                  </div>
                  {data.director.signatureUrl && (
                    <div className="p-1 border border-zinc-300">
                      <img
                        src={data.director.signatureUrl}
                        alt="Tanda Tangan"
                        className="h-8 w-auto max-w-[85px] object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Tangerine Quote Bar */}
                <div className="border-l-4 border-[#ff5722] pl-3 py-1 mb-2 italic text-xs text-black font-semibold">
                  "{data.director.quote}"
                </div>

                <p className="font-editorial-body text-xs text-[#64748b] leading-[1.5]">
                  {data.director.paragraph1}
                </p>
                {!isVisionActive && data.director.paragraph2 && (
                  <p className="font-editorial-body text-xs text-[#64748b] leading-[1.5] mt-2">
                    {data.director.paragraph2}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VISION & MISSION SECTION */}
        {isVisionActive && (
          <div className="flex-1 border-2 border-black flex flex-col justify-between">
            {/* Header Block in Solid Black */}
            <div className="bg-black text-white px-3 py-1.5 border-b-2 border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>
                {isDirectorActive
                  ? 'Matriks Visi & Misi Perusahaan'
                  : 'Matriks Visi, Misi & Tata Kelola Perusahaan (Ekspansi Penuh Zero-Gap)'}
              </span>
              <span className="text-[#ff5722]">
                Target 2035
              </span>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Massive Vision Callout */}
                <div className="bg-zinc-100 border-2 border-black p-4 mb-4">
                  <span className="text-[11px] text-[#ff5722] font-bold uppercase tracking-wider block mb-1">
                    Visi Strategis 2035
                  </span>
                  <h2 className="font-headline text-base sm:text-lg font-bold uppercase text-black leading-tight tracking-[-0.02em]">
                    "{data.visionMission.visionStatement}"
                  </h2>
                </div>

                {/* Mission Pillars Grid */}
                <div className={`grid gap-3 mb-3 ${data.visionMission.pillars.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
                  {data.visionMission.pillars.map((p: StrategicPillar, i: number) => (
                    <div key={p.no || i} className="border-2 border-black p-3 bg-white flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-black pb-1 mb-1.5">
                          <span className="font-headline text-xs font-bold text-[#ff5722]">0{i + 1}.</span>
                          <span className="text-[10px] font-bold text-zinc-600 uppercase">{p.tag || p.category}</span>
                        </div>
                        <h4 className="font-headline text-xs font-bold text-black uppercase mb-1 tracking-[-0.02em]">{p.title}</h4>
                        <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* HSE Policy Block if active */}
                {toggles.showHSEPolicy && (
                  <div className="border-2 border-black p-3 bg-white">
                    <div className="flex items-center justify-between border-b border-black pb-1 mb-1.5 text-xs font-bold text-black uppercase">
                      <span>{data.visionMission.qhseTitle}</span>
                      <span className="text-[#ff5722]">Zero Accident</span>
                    </div>
                    <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">
                      {data.visionMission.qhsePolicyText || (
                        <>Penerapan protokol keselamatan kerja ketat dengan pencapaian rekor <strong className="text-black font-semibold">{data.visionMission.safeHours}</strong>.</>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Swiss Bottom Folio Bar with Dynamic Quick Metrics */}
              <div className="mt-4 pt-2.5 border-t-2 border-black flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase text-zinc-700">
                <span>EST: {data.visionMission.foundedYear || '2008'}</span>
                <span>TENAGA AHLI: {data.visionMission.expertCount || data.team.engineersCount || '480+'}</span>
                <span className="text-[#ff5722]">REKOR K3: {data.visionMission.safeHours}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-5 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-black">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
