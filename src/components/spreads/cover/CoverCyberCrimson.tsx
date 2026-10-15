import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCFnd-g1Ab3xUTmrBXLjVVlVlObHrdy_NDYF7COiKiSBCh9SCe-Cn9bizoFkrXGRevjHUHaHCkXTRP-VlgOSKFcDMJ2BJQ1kjgIh051HH56KltrkQbXppLUF0rmBcklWgPiTP1-VmTOeOpJkqE1x_3muULM7WQmU70ytGr_8gMyhyJttN_uxUDDKI99b9t0MJ_qEZ8Ssylu1SWP8QuNMjMHC1CjhOjtvWUrJemtEMQMLfvuokThXdlw';

export const CoverCyberCrimson: React.FC<Props> = ({ data, showGrid }) => {
  const parsedYears = (data.fiscalYear || '2026/2027')
    .split('/')
    .map((y) => y.trim())
    .filter(Boolean);
  const startYear = parsedYears[0] || '2026';
  const endYear = parsedYears.length > 1 ? parsedYears[1] : '';

  const fineTune = data.coverYearFineTune || {
    yOffset: 0,
    xOffset: 0,
    fontSize: 32,
    verticalAlign: 'top',
    showBadge: true,
  };
  const yearOffsetX =
    data.yearOffsetX ?? data.coverYearFineTune?.yearOffsetX ?? fineTune.xOffset ?? 0;
  const yearOffsetY =
    data.yearOffsetY ?? data.coverYearFineTune?.yearOffsetY ?? fineTune.yOffset ?? 0;
  const yearFontSize =
    data.yearFontSize ?? data.coverYearFineTune?.yearFontSize ?? fineTune.fontSize ?? 32;
  const showBadge =
    data.showBadge !== undefined ? data.showBadge : fineTune.showBadge !== false;

  return (
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0b0f19] text-white border border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* VERTICAL SPLIT COVER: HALF PHOTO / HALF DARK CRIMSON EDITORIAL */}
        <section className="mt-2 mb-6 grid grid-cols-12 gap-6 items-stretch flex-1">
          {/* Left Column: Headline & Typography (Col 1-7) */}
          <div className="col-span-12 sm:col-span-7 flex flex-col justify-between pr-0 sm:pr-2">
            <div>
              {/* Year & Badge Header with fine tuning */}
              <div
                className="flex items-center justify-between gap-4 mb-4 relative z-20 overflow-visible"
                style={{
                  transform: `translate(${yearOffsetX}px, ${yearOffsetY}px)`,
                  fontSize: `${yearFontSize}px`,
                }}
              >
                <div
                  className="font-headline font-black tracking-[-0.02em] text-[#ff2d55] leading-tight whitespace-nowrap overflow-visible"
                  style={{
                    fontSize: `${yearFontSize}px`,
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                  }}
                >
                  {endYear ? `/ ${startYear} – ${endYear}` : `/ ${startYear}`}
                </div>
                {showBadge && (
                  <span className="inline-block bg-[#ff2d55] text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-xs whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                )}
              </div>

              {/* HEADLINE: Plus Jakarta Sans, 700/800, tracking -0.02em */}
              <h1 className="font-headline text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-[-0.02em] mt-2 leading-[1.08]">
                {data.companyName}
              </h1>

              <div className="h-0.5 w-16 bg-[#ff2d55] my-4" />

              <p className="text-sm font-semibold text-slate-200">
                {data.tagline}
              </p>

              {/* BODY: Inter, weight 400, neutral gray #94a3b8, line-height 1.6 */}
              <div className="mt-5 p-4 bg-slate-900/60 border-l-2 border-[#ff2d55]">
                <span className="text-xs text-[#ff2d55] font-bold uppercase tracking-wider block mb-1">
                  Orientasi Strategis
                </span>
                <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.6]">
                  {data.coverDescription || data.manifestoLead || 'Menciptakan presisi infrastruktur masa depan melalui sinergi rekayasa mekatronika dan integritas kepatuhan.'}
                </p>
              </div>
            </div>

            {/* Bottom Registration Data */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-400 font-medium">Nomor Induk Berusaha (NIB)</span>
                <span className="text-white font-bold">{data.nib}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Architectural Photo Split (Col 8-12) */}
          <div className="col-span-12 sm:col-span-5 relative bg-slate-900 overflow-hidden flex flex-col justify-end min-h-[420px] shadow-lg">
            <img
              src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
              alt={data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                  target.src = DEFAULT_SKYSCRAPER_IMG;
                }
              }}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />

            {/* Bottom Project Card */}
            <div className="relative z-10 p-4 m-3 bg-[#0b0f19]/90 border border-slate-800 backdrop-blur-xs">
              <span className="text-[10px] text-[#ff2d55] font-bold uppercase tracking-wider block">
                Proyek Utama
              </span>
              <div className="font-headline text-sm font-bold text-white uppercase tracking-[-0.02em] mt-0.5">
                {data.portfolio.flagship.title}
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 font-medium">Skala: {data.portfolio.flagship.floorArea}</span>
                <span className="text-[#ff2d55] font-bold">{data.portfolio.flagship.value}</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM METRIC RIBBON */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3 py-3 border-y border-slate-800">
          {data.stats.slice(0, 4).map((st) => (
            <div key={st.id} className="p-3 bg-slate-900/40 border-l border-[#ff2d55]">
              <div className="font-headline text-xl font-bold text-white tracking-[-0.02em]">{st.value}</div>
              <div className="text-xs font-semibold text-slate-300 uppercase mt-0.5">{st.label}</div>
              <div className="text-[11px] text-[#94a3b8] mt-0.5">{st.subvalue}</div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
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
