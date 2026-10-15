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

export const AboutScarletCircle: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border border-slate-300 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // SCARLET EDITORIAL" regText="SCARLET-CIRCLE // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-slate-200 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0">
        <span className="font-bold text-slate-900">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* HEADLINE */}
      <section className="border-b-2 border-red-600 pb-4 mb-5 shrink-0">
        <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
          Arah Kebijakan Korporasi
        </span>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-slate-950 tracking-[-0.02em] leading-tight">
          Visi Strategis & Kepemimpinan Direksi
        </h1>
        <p className="font-editorial-body text-xs sm:text-sm text-[#64748b] max-w-2xl mt-2 leading-[1.6]">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN CONTENT WITH SMART REFLOW FOR A4 PORTRAIT */}
      <section className="flex-1 flex flex-col gap-4">
        {/* CONDITIONAL DIRECTOR MESSAGE (Stacked Compact Card) */}
        {isDirectorActive && (
          <div className={`bg-white border-2 border-slate-900 p-4 shadow-xs relative ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            <div>
              <div className="border-b-2 border-red-600 pb-2 mb-3">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                  Sambutan Direktur Utama
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Photo with Clean Framing */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border-2 border-slate-900 overflow-hidden bg-slate-100 relative">
                  <img
                    src={data.director.photoUrl}
                    alt={data.director.name}
                    className="w-full h-full object-cover filter contrast-[1.03] brightness-95"
                  />
                  {data.director.badge && (
                    <div className="absolute bottom-0 inset-x-0 bg-red-600 text-white text-[8px] font-mono text-center py-0.5 font-bold">
                      {data.director.badge}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-headline text-sm font-bold uppercase text-slate-900 tracking-[-0.02em]">{data.director.name}</h3>
                      <p className="text-xs text-red-600 font-bold uppercase mt-0.5">{data.director.title}</p>
                      {data.director.regNo && (
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{data.director.regNo}</p>
                      )}
                    </div>
                    {data.director.signatureUrl && (
                      <div className="p-1 border border-slate-300 bg-white">
                        <img
                          src={data.director.signatureUrl}
                          alt="Tanda Tangan"
                          className="h-8 w-auto max-w-[85px] object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-l-4 border-red-600 pl-3 py-1 mb-2 italic text-xs text-slate-800">
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
          </div>
        )}

        {/* VISION & MISSION SECTION */}
        {isVisionActive && (
          <div className="flex-1 bg-white border-2 border-slate-900 p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="border-b-2 border-slate-900 pb-2 mb-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {isDirectorActive ? 'Visi & Misi Perusahaan' : 'Visi, Misi & Pilar Strategis (Ekspansi Penuh Zero-Gap)'}
                </span>
                <span className="text-xs text-red-600 font-bold">Target 2035</span>
              </div>

              {/* Vision Banner with Scarlet Border */}
              <div className="bg-red-50 border-2 border-red-600 p-4 mb-3 relative">
                <span className="text-[11px] text-red-600 font-bold uppercase tracking-wider block mb-1">
                  Pernyataan Visi Utama
                </span>
                <h2 className="font-headline text-sm sm:text-base font-bold uppercase text-slate-950 leading-snug tracking-[-0.02em]">
                  "{data.visionMission.visionStatement}"
                </h2>
              </div>

              {/* Dynamic Mission Pillars Grid */}
              <div className={`grid gap-3 mb-3 ${data.visionMission.pillars.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
                {data.visionMission.pillars.map((p: StrategicPillar, i: number) => (
                  <div key={p.no || i} className="border border-slate-300 p-3 bg-slate-50 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white font-headline text-[10px] font-bold flex items-center justify-center">
                      0{i + 1}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{p.tag || p.category}</span>
                      <h4 className="font-headline text-xs font-bold uppercase text-slate-900 mb-1 tracking-[-0.02em]">{p.title}</h4>
                      <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* HSE Policy if active */}
              {toggles.showHSEPolicy && (
                <div className="border border-red-200 bg-red-50/50 p-3">
                  <span className="text-xs font-bold text-red-600 uppercase mb-1 block">
                    {data.visionMission.qhseTitle}
                  </span>
                  <p className="font-editorial-body text-[11px] text-slate-700 leading-[1.5]">
                    {data.visionMission.qhsePolicyText || (
                      <>Pencapaian rekor jam kerja selamat: <strong className="text-black font-semibold">{data.visionMission.safeHours}</strong> dengan pengawasan tanpa kompromi.</>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Metrics Bar */}
            <div className="mt-4 pt-2.5 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2 text-[11px] text-slate-600">
              <span>PENDIRIAN: <strong>{data.visionMission.foundedYear || '2008'}</strong></span>
              <span>TENAGA AHLI: <strong>{data.visionMission.expertCount || data.team.engineersCount || '480+'}</strong></span>
              <span className="text-red-600 font-bold">REKOR K3: {data.visionMission.safeHours}</span>
            </div>
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-red-600">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
