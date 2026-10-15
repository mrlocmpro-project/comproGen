import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCFnd-g1Ab3xUTmrBXLjVVlVlObHrdy_NDYF7COiKiSBCh9SCe-Cn9bizoFkrXGRevjHUHaHCkXTRP-VlgOSKFcDMJ2BJQ1kjgIh051HH56KltrkQbXppLUF0rmBcklWgPiTP1-VmTOeOpJkqE1x_3muULM7WQmU70ytGr_8gMyhyJttN_uxUDDKI99b9t0MJ_qEZ8Ssylu1SWP8QuNMjMHC1CjhOjtvWUrJemtEMQMLfvuokThXdlw';

export const CoverSageWireframe: React.FC<Props> = ({ data, showGrid }) => {
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
  const vAlign = fineTune.verticalAlign || 'top';
  const alignSelf =
    vAlign === 'middle' ? 'center' : vAlign === 'bottom' ? 'flex-end' : 'flex-start';

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fcfbf8] text-[#2c332e] border border-[#d6ddd6] relative overflow-hidden transition-all duration-300 shadow-xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* QUIET ELEGANT TITLE: Locked 2-Column Grid */}
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
            {/* Left Column (65% - 70%): Main Title */}
            <div className="min-w-0">
              <h1 className="font-headline text-3xl sm:text-5xl font-extrabold text-[#1f2621] uppercase tracking-[-0.02em] leading-[0.98]">
                Selected Works <br />
                <span className="font-bold text-[#627566]">&amp; Company Profile</span>
              </h1>
            </div>

            {/* Right Column (30% - 35%): Clean Single-Line Year Block with fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-20 overflow-visible"
              style={{
                alignSelf,
                transform: `translate(${fineTune.xOffset || 0}px, ${fineTune.yOffset || 0}px)`,
              }}
            >
              <div
                className="font-headline font-black text-[#1f2621] tracking-[-0.02em] leading-tight text-right whitespace-nowrap overflow-visible"
                style={{
                  fontSize: `${fineTune.fontSize || 28}px`,
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                }}
              >
                {endYear ? `/ ${startYear} – ${endYear}` : `/ ${startYear}`}
              </div>
              {fineTune.showBadge !== false && (
                <div className="mt-2 flex justify-end self-end overflow-visible">
                  <span className="inline-block bg-[#627566] text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-xs whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#d6ddd6] max-w-xl">
            <p className="font-editorial-body text-xs sm:text-sm text-[#64748b] leading-[1.6]">
              {data.tagline} — {data.coverDescription || 'Standar rekayasa konstruksi berkelanjutan dengan harmoni estetika arsitektur dan kepatuhan struktural tinggi.'}
            </p>
          </div>
        </section>

        {/* PHOTO WITH CLEAN HAIRLINE WIREFRAME OFFSET BOX (1px solid hairline) */}
        <section className="relative my-6 px-4 py-4 flex justify-center">
          <div className="relative w-full max-w-xl">
            {/* Elegant 1px hairline wireframe offset box behind photo */}
            <div
              className="absolute -top-3 -right-3 w-full h-full border border-[#627566]/40 pointer-events-none z-0"
              style={{
                transform: 'translate(8px, -8px)',
              }}
            />

            {/* Main Photo Card */}
            <div className="relative z-10 border border-[#c5cec5] bg-white p-2.5 shadow-sm">
              <div className="h-72 sm:h-84 w-full overflow-hidden bg-stone-100">
                <img
                  src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
                  alt={data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                      target.src = DEFAULT_SKYSCRAPER_IMG;
                    }
                  }}
                  className="w-full h-full object-cover filter contrast-[1.03] brightness-95"
                />
              </div>

              {/* Serene Caption Below Photo */}
              <div className="pt-3 px-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-[#627566] font-medium">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#1f2621] uppercase">{data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}</span>
                  <span className="text-[#849688]">|</span>
                  <span className="text-[#627566] font-normal">{data.portfolio.flagship.scope || 'Struktur, Fasad Parametrik, MEP Kompleks'}</span>
                </div>
                <span className="text-[#849688] font-mono text-[11px]">// {data.portfolio.flagship.period || '2021 – 2024'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* AIRY MINIMALIST 3-COLUMN DATA */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 pt-6 border-t border-[#d6ddd6]">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#627566] block">
              Nilai Kontrak
            </span>
            <div className="font-headline text-2xl font-bold text-[#1f2621] tracking-[-0.02em]">
              {data.stats[0]?.value || '14.8 T'}
            </div>
            <div className="font-editorial-body text-xs text-[#64748b] leading-[1.6]">
              Akumulasi portofolio rekayasa konstruksi
            </div>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#d6ddd6] pt-3 sm:pt-0 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#627566] block">
              Proyek Tuntas
            </span>
            <div className="font-headline text-2xl font-bold text-[#1f2621] tracking-[-0.02em]">
              {data.stats[1]?.value || '180+'}
            </div>
            <div className="font-editorial-body text-xs text-[#64748b] leading-[1.6]">
              Kawasan industri dan fasilitas publik strategis
            </div>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#d6ddd6] pt-3 sm:pt-0 sm:pl-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#627566] block">
              Tingkat Keselamatan
            </span>
            <div className="font-headline text-2xl font-bold text-[#627566] tracking-[-0.02em]">
              100%
            </div>
            <div className="font-editorial-body text-xs text-[#64748b] leading-[1.6]">
              Zero incident & integrasi standar ISO
            </div>
          </div>
        </section>

        {/* MINIMALIST AIRY FOOTER */}
        <footer className="pt-4 border-t border-[#d6ddd6] flex items-center justify-between text-xs font-folio-mono text-[#849688]">
          <span className="font-semibold text-[#1f2621]">{data.companyName}</span>
          <div className="flex items-center gap-3">
            <span>{data.contact.comms.website}</span>
            <span className="text-[#d6ddd6]">/</span>
            <span>{data.contact.comms.email}</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
