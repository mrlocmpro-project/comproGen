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

export const AboutSageWireframe: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fcfbf8] text-[#2c332e] border border-[#d6ddd6] relative overflow-hidden transition-all duration-300 shadow-xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // ARCHITECTURAL MONOGRAPH" regText="SAGE-WIREFRAME // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full pb-2.5 border-b border-[#d6ddd6] mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-[#849688] shrink-0">
        <span className="font-bold text-[#1f2621]">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* QUIET ELEGANT HEADLINE */}
      <section className="mb-5 pb-4 border-b border-[#d6ddd6] shrink-0">
        <span className="text-xs font-bold text-[#627566] uppercase tracking-wider block mb-1">
          Bab 02 // Orientasi & Filosofi Konstruksi
        </span>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-[#1f2621] tracking-[-0.02em] leading-tight">
          Visi Keberlanjutan & Tata Kelola Strategis
        </h1>
        <p className="mt-2 font-editorial-body text-xs sm:text-sm text-[#64748b] leading-[1.6] max-w-2xl">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN SPREAD WITH SMART ZERO-GAP REFLOW FOR A4 PORTRAIT */}
      <section className="flex-1 flex flex-col gap-4">
        {/* CONDITIONAL DIRECTOR MESSAGE (Stacked Compact Card) */}
        {isDirectorActive && (
          <div className={`bg-white border border-[#d6ddd6] p-4 shadow-xs relative ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            <div>
              <div className="pb-2 mb-3 border-b border-[#d6ddd6] flex justify-between items-center">
                <span className="text-xs font-bold text-[#627566] uppercase tracking-wider">
                  Sambutan Direktur Utama
                </span>
                <span className="text-xs text-[#849688]">Dewan Direksi</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Photo with hairline border */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border border-[#c5cec5] overflow-hidden bg-stone-100 relative">
                  <img
                    src={data.director.photoUrl}
                    alt={data.director.name}
                    className="w-full h-full object-cover filter contrast-[1.02] brightness-95"
                  />
                  {data.director.badge && (
                    <div className="absolute bottom-0 inset-x-0 bg-[#627566] text-white text-[8px] font-mono text-center py-0.5">
                      {data.director.badge}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-headline text-sm font-bold uppercase text-[#1f2621] tracking-[-0.02em]">{data.director.name}</h3>
                      <p className="text-xs text-[#627566] font-bold uppercase mt-0.5">{data.director.title}</p>
                      {data.director.regNo && (
                        <p className="text-[10px] text-[#849688] font-mono mt-0.5">{data.director.regNo}</p>
                      )}
                    </div>
                    {data.director.signatureUrl && (
                      <div className="p-1 border border-[#d6ddd6] bg-stone-50">
                        <img
                          src={data.director.signatureUrl}
                          alt="Tanda Tangan"
                          className="h-8 w-auto max-w-[85px] object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 bg-[#f6f8f6] border-l-2 border-[#627566] mb-2 text-xs italic text-[#3f4a41]">
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
          <div className="flex-1 bg-white border border-[#d6ddd6] p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="pb-2 mb-3 border-b border-[#d6ddd6] flex justify-between items-center">
                <span className="text-xs font-bold text-[#627566] uppercase tracking-wider">
                  {isDirectorActive ? 'Matriks Visi & Misi 2035' : 'Matriks Visi & Misi 2035 (Ekspansi Penuh Zero-Gap)'}
                </span>
                <span className="text-xs text-[#849688]">Target Berkelanjutan</span>
              </div>

              {/* Quiet Vision Statement Banner */}
              <div className="p-4 bg-[#f7f9f7] border border-[#d6ddd6] mb-3">
                <span className="text-[11px] font-bold text-[#627566] uppercase tracking-wider block mb-1">
                  Pernyataan Visi Korporasi
                </span>
                <h2 className="font-headline text-sm sm:text-base font-bold text-[#1f2621] uppercase leading-relaxed tracking-[-0.02em]">
                  "{data.visionMission.visionStatement}"
                </h2>
              </div>

              {/* Dynamic Mission Pillars Grid */}
              <div className={`grid gap-3 mb-3 ${data.visionMission.pillars.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
                {data.visionMission.pillars.map((p: StrategicPillar, i: number) => (
                  <div key={p.no || i} className="p-3 bg-white border border-[#d6ddd6] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#627566] block mb-1">Pilar 0{i + 1} // {p.tag || p.category}</span>
                      <h4 className="font-headline text-xs font-bold uppercase text-[#1f2621] mb-1 tracking-[-0.02em]">{p.title}</h4>
                      <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* HSE Policy if active */}
              {toggles.showHSEPolicy && (
                <div className="p-3 bg-[#fcfbf8] border border-[#d6ddd6]">
                  <span className="text-xs font-bold text-[#627566] uppercase mb-1 block">
                    {data.visionMission.qhseTitle}
                  </span>
                  <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5]">
                    {data.visionMission.qhsePolicyText || (
                      <>Pencapaian jam kerja selamat: <strong className="text-[#1f2621] font-semibold">{data.visionMission.safeHours}</strong> dengan kepatuhan ISO 14001 dan ISO 45001.</>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Metrics Bar */}
            <div className="mt-4 pt-2.5 border-t border-[#d6ddd6] flex flex-wrap justify-between items-center gap-2 text-[11px] text-[#849688]">
              <span>DIDIRIKAN: <strong>{data.visionMission.foundedYear || '2008'}</strong></span>
              <span>TENAGA AHLI: <strong>{data.visionMission.expertCount || data.team.engineersCount || '480+'}</strong></span>
              <span className="text-[#627566] font-bold">JAM KERJA SELAMAT: {data.visionMission.safeHours}</span>
            </div>
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-5 pt-3 border-t border-[#d6ddd6] flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-[#849688] shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#1f2621]">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
