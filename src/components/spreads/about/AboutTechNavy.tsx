import React from 'react';
import { CompanyProfileData, TogglesState, StrategicPillar } from '../../../types/monograph';
import { CropMarks, GridOverlay } from '../../common/CropMarks';
import { ShieldCheck, Quote } from 'lucide-react';

import { PageInfo } from '../../../utils/pagination';

interface Props {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  pageInfo?: PageInfo;
}

export const AboutTechNavy: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0f172a] text-slate-100 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // EDITORIAL DOSSIER" regText="TECH-NAVY // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-slate-800 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 shrink-0">
        <span className="font-bold text-white">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* HEADLINE SECTION */}
      <section className="w-full border-b border-slate-800 pb-4 mb-6 relative z-10 shrink-0">
        <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase font-bold tracking-wider mb-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          <span>Bab 02 // Tentang Kami & Visi Perusahaan</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl text-white tracking-[-0.02em] uppercase font-extrabold leading-tight">
          Orientasi Strategis & Rekayasa Berkelanjutan
        </h1>
        <p className="font-editorial-body text-slate-300 text-xs sm:text-sm mt-2 leading-[1.6]">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN VERTICAL STACKED CONTENT FOR A4 PORTRAIT */}
      <section className="flex-1 flex flex-col gap-5 relative z-10">
        {/* CONDITIONAL DIRECTOR'S MESSAGE: Stacked Card */}
        {isDirectorActive && (
          <div className={`border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-sm ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-emerald-400" /> Sambutan Direksi
                </span>
                <span className="text-xs text-slate-400 font-medium">President Director</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Director Portrait */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border border-slate-800 bg-slate-950 overflow-hidden relative shadow-inner">
                  <img
                    src={data.director.photoUrl}
                    alt={data.director.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-95"
                  />
                  {data.director.badge && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-emerald-400 text-center py-0.5">
                      {data.director.badge}
                    </div>
                  )}
                </div>

                {/* Speech & Quote */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-headline text-sm font-bold text-white uppercase tracking-[-0.02em]">
                        {data.director.name}
                      </h3>
                      <p className="text-xs text-emerald-400 font-medium">{data.director.title}</p>
                      {data.director.regNo && (
                        <p className="text-[10px] text-slate-400 font-mono">{data.director.regNo}</p>
                      )}
                    </div>
                    {data.director.signatureUrl && (
                      <div className="p-1 bg-white/5 border border-slate-700 rounded-xs">
                        <img
                          src={data.director.signatureUrl}
                          alt="Tanda Tangan Direktur"
                          className="h-9 w-auto max-w-[90px] object-contain filter invert opacity-90"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-2.5 bg-slate-950/80 border-l-2 border-emerald-400 mb-2 text-xs text-slate-200 italic leading-relaxed">
                    "{data.director.quote}"
                  </div>
                  <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.5]">
                    {data.director.paragraph1}
                  </p>
                  {!isVisionActive && data.director.paragraph2 && (
                    <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.5] mt-2">
                      {data.director.paragraph2}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {!isVisionActive && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Tata Kelola Korporasi (GCG) Terakreditasi</span>
                <span className="text-emerald-400 font-mono font-bold">REF. SK DIREKSI ACK-2026</span>
              </div>
            )}
          </div>
        )}

        {/* VISION & STRATEGIC PILLARS */}
        {isVisionActive && (
          <div className="flex-1 flex flex-col justify-between border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">
                  Visi & Pilar Strategis Perusahaan
                </span>
                <span className="text-xs text-slate-400">
                  {isDirectorActive ? 'Tata Letak A4 Portrait' : 'Ekspansi Penuh (Zero-Gap Reflow)'}
                </span>
              </div>

              {/* Vision Banner */}
              <div className="p-4 bg-slate-950/80 border-l-4 border-emerald-400 mb-4">
                <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                  Visi Strategis 2035
                </span>
                <p className="font-headline text-sm sm:text-base font-bold text-white uppercase leading-snug tracking-[-0.02em]">
                  "{data.visionMission.visionStatement}"
                </p>
              </div>

              {/* Mission Pillars (Dynamic Cards) */}
              <div className={`grid gap-3 mb-4 ${data.visionMission.pillars.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
                {data.visionMission.pillars.map((pillar: StrategicPillar, idx: number) => (
                  <div key={pillar.no || idx} className="p-3 bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                        Pilar 0{idx + 1} // {pillar.tag || pillar.category}
                      </span>
                      <h4 className="font-headline text-xs font-bold text-white uppercase tracking-[-0.02em] mb-1">
                        {pillar.title}
                      </h4>
                      <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Terstandarisasi</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* HSE & K3 Policy Section if active */}
              {toggles.showHSEPolicy && (
                <div className="p-3 bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{data.visionMission.qhseTitle}</span>
                  </div>
                  <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">
                    {data.visionMission.qhsePolicyText || (
                      <>Komitmen tanpa henti terhadap keselamatan kerja dengan rekor operasional: <strong className="text-white font-semibold">{data.visionMission.safeHours}</strong> tanpa kecelakaan kerja.</>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Compliance Bar & Quick Metrics */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span>Berdiri Sejak:</span>
                <strong className="text-white font-mono">{data.visionMission.foundedYear || '2008'}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span>Tenaga Ahli Bersertifikat:</span>
                <strong className="text-white font-mono">{data.visionMission.expertCount || data.team.engineersCount || '480+'} Orang</strong>
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span>Rekor K3:</span>
                <span>{data.visionMission.safeHours}</span>
              </span>
            </div>
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-emerald-400">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
