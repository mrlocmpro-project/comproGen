import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCFnd-g1Ab3xUTmrBXLjVVlVlObHrdy_NDYF7COiKiSBCh9SCe-Cn9bizoFkrXGRevjHUHaHCkXTRP-VlgOSKFcDMJ2BJQ1kjgIh051HH56KltrkQbXppLUF0rmBcklWgPiTP1-VmTOeOpJkqE1x_3muULM7WQmU70ytGr_8gMyhyJttN_uxUDDKI99b9t0MJ_qEZ8Ssylu1SWP8QuNMjMHC1CjhOjtvWUrJemtEMQMLfvuokThXdlw';

export const CoverTechNavy: React.FC<Props> = ({ data, showGrid }) => {
  const parsedYears = (data.fiscalYear || '2026/2027')
    .split('/')
    .map((y) => y.trim())
    .filter(Boolean);
  const startYear = parsedYears[0] || '2026';
  const endYear = parsedYears.length > 1 ? parsedYears[1] : '';

  const fineTune = data.coverYearFineTune || {
    yOffset: 0,
    xOffset: 0,
    fontSize: 28,
    verticalAlign: 'top',
    showBadge: true,
  };
  const yearOffsetX =
    data.yearOffsetX ?? data.coverYearFineTune?.yearOffsetX ?? fineTune.xOffset ?? 0;
  const yearOffsetY =
    data.yearOffsetY ?? data.coverYearFineTune?.yearOffsetY ?? fineTune.yOffset ?? 0;
  const yearFontSize =
    data.yearFontSize ?? data.coverYearFineTune?.yearFontSize ?? fineTune.fontSize ?? 28;
  const showBadge =
    data.showBadge !== undefined ? data.showBadge : fineTune.showBadge !== false;
  const vAlign = fineTune.verticalAlign || 'top';
  const alignSelf =
    vAlign === 'middle' ? 'center' : vAlign === 'bottom' ? 'flex-end' : 'flex-start';

  return (
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0f172a] text-slate-100 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* HERO TITLE SECTION: Locked 2-Column Grid */}
        <section className="mt-2 mb-6">
          <div
            className="w-full grid grid-cols-[68%_1fr] items-start justify-between gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 68%) minmax(0, 32%)',
              gap: '24px',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {/* Left Column (65% - 70%): Title & Brand Accent */}
            <div className="min-w-0">
              {/* Mint Accent Line 1px */}
              <div className="w-12 h-[2px] bg-emerald-400 mb-4" />

              <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-[-0.02em] leading-[0.98]">
                {data.companyName}
              </h1>
            </div>

            {/* Right Column (30% - 35%): Clean Single-Line Year Block with fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-20 overflow-visible"
              style={{
                alignSelf,
                transform: `translate(${yearOffsetX}px, ${yearOffsetY}px)`,
                fontSize: `${yearFontSize}px`,
              }}
            >
              <div
                className="font-headline font-black text-white tracking-[-0.02em] leading-tight text-right whitespace-nowrap overflow-visible"
                style={{
                  fontSize: `${yearFontSize}px`,
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                }}
              >
                {endYear ? `/ ${startYear} – ${endYear}` : `/ ${startYear}`}
              </div>
              {showBadge && (
                <div className="mt-2 flex justify-end self-end overflow-visible">
                  <span className="inline-block bg-emerald-400 text-slate-950 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-xs whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 max-w-xl">
            <p className="font-headline text-base sm:text-lg font-medium text-slate-300 leading-snug tracking-[-0.01em]">
              {data.tagline}
            </p>

            <p className="font-editorial-body text-xs sm:text-sm text-[#94a3b8] mt-3 leading-[1.6]">
              {data.coverDescription ||
                'Monograf arsitektural dan portofolio rekayasa konstruksi terintegrasi dengan standar kepatuhan teknis, presisi struktural, dan tata kelola berintegritas tinggi.'}
            </p>
          </div>
        </section>

        {/* LARGE ARCHITECTURAL PHOTO: Clean 16:9 Architectural Bleed */}
        <section className="my-4">
          <div className="w-full relative overflow-hidden bg-slate-950 aspect-[16/9] shadow-lg">
            <img
              src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
              alt={data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                  target.src = DEFAULT_SKYSCRAPER_IMG;
                }
              }}
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95"
            />
            {/* Clean, subtle caption strip */}
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-100 uppercase">
                  {data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
                </span>
                <span className="text-emerald-400 font-semibold">|</span>
                <span className="text-slate-300 font-normal">
                  {data.portfolio.flagship.scope || 'Struktur, Fasad Parametrik, MEP Kompleks'}
                </span>
              </div>
              <span className="font-folio-mono text-[11px] text-slate-400 font-medium tracking-wide">
                // {data.portfolio.flagship.period || '2021 – 2024'}
              </span>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN STRUCTURED DATA */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 pt-6 border-t border-slate-800">
          {/* Column 1: Key Performance Metrics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Indikator Kapasitas Operasional
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.stats.slice(0, 4).map((st) => (
                <div key={st.id} className="border-l-2 border-emerald-500/50 pl-3 py-1">
                  <div className="font-headline text-2xl font-bold text-white tracking-[-0.02em]">
                    {st.value}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-0.5">
                    {st.label}
                  </div>
                  <div className="text-[11px] text-[#64748b]">
                    {st.subvalue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Legal & Institutional Standards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Kualifikasi & Akreditasi Resmi
              </h3>
            </div>
            <div className="bg-slate-900/60 p-4 border border-slate-800 space-y-2.5">
              <div className="flex justify-between items-baseline text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Nomor Induk Berusaha (NIB)</span>
                <span className="text-white font-semibold">{data.nib}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs pb-2 border-b border-slate-800">
                <span className="text-slate-400 font-medium">Sertifikat Badan Usaha (SBU)</span>
                <span className="text-white font-semibold">{data.sbu}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-400 font-medium">Standar Manajemen Mutu & K3</span>
                <span className="text-emerald-400 font-semibold">{data.isoSummary}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CLEAN EDITORIAL FOOTER */}
        <footer className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-folio-mono text-slate-500">
          <span>{data.companyName}</span>
          <div className="flex items-center gap-3 text-slate-400">
            <span>{data.contact.comms.website}</span>
            <span className="text-slate-600">/</span>
            <span>{data.contact.comms.email}</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
