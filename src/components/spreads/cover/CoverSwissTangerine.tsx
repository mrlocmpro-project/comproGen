import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCFnd-g1Ab3xUTmrBXLjVVlVlObHrdy_NDYF7COiKiSBCh9SCe-Cn9bizoFkrXGRevjHUHaHCkXTRP-VlgOSKFcDMJ2BJQ1kjgIh051HH56KltrkQbXppLUF0rmBcklWgPiTP1-VmTOeOpJkqE1x_3muULM7WQmU70ytGr_8gMyhyJttN_uxUDDKI99b9t0MJ_qEZ8Ssylu1SWP8QuNMjMHC1CjhOjtvWUrJemtEMQMLfvuokThXdlw';

export const CoverSwissTangerine: React.FC<Props> = ({ data, showGrid }) => {
  // Parse fiscal years (e.g. "2026 / 2027", "2026 - 2027", "2026")
  const rawFiscal = (data.fiscalYear || '2026 / 2027').trim();
  const parsedYears = rawFiscal
    .split(/[\/\-–—\s]+/)
    .map((s) => s.trim())
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
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white text-black border-2 border-black relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* HERO TITLE: Ultra-bold black "Company Profile." & Single-line Year */}
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
            {/* Left Column (Lebar 65% - 70%): Big Display Typography */}
            <div className="min-w-0">
              <h1 className="font-headline text-5xl sm:text-7xl font-extrabold text-black uppercase tracking-[-0.02em] leading-[0.9]">
                Company <br />
                Profile<span className="text-[#ff5722]">.</span>
              </h1>
            </div>

            {/* Right Column (Lebar 30% - 35%): Clean Single-Line Swiss Year Block with fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-20 overflow-visible"
              style={{
                alignSelf,
                transform: `translate(${yearOffsetX}px, ${yearOffsetY}px)`,
                fontSize: `${yearFontSize}px`,
              }}
            >
              <div
                className="font-headline font-black text-black tracking-[-0.02em] leading-tight text-right whitespace-nowrap overflow-visible"
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
                  <span className="inline-block bg-[#ff5722] text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-xs whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t-2 border-black max-w-xl">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-[-0.02em] text-black">
              {data.companyName}
            </h2>
            <p className="text-sm font-semibold text-zinc-700 mt-1">
              {data.tagline}
            </p>
            <p className="font-editorial-body text-xs text-[#64748b] mt-2 leading-[1.6]">
              {data.coverDescription ||
                'Rekayasa teknik konstruksi, kepatuhan legalitas terverifikasi, dan manajemen portofolio infrastruktur berskala nasional.'}
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION: SOLID TANGERINE VERTICAL BLOCK & ARCHITECTURAL PHOTO */}
        <section className="grid grid-cols-12 gap-0 border-2 border-black my-4 bg-black">
          {/* Vertical Solid Tangerine Block on the Left (Col 1-4) */}
          <div className="col-span-12 sm:col-span-4 bg-[#ff5722] p-6 flex flex-col justify-between text-white border-b-2 sm:border-b-0 sm:border-r-2 border-black min-h-[240px]">
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Rekayasa Struktural
            </span>
            <div className="my-auto py-4">
              <span className="font-headline text-2xl sm:text-3xl font-extrabold uppercase tracking-[-0.02em] leading-tight block">
                HEAVY <br />
                CIVIL & <br />
                EPC.
              </span>
              <p className="font-editorial-body text-xs mt-3 opacity-95 leading-[1.6]">
                Standarisasi konstruksi dan rekayasa sipil berintegritas tinggi dengan kepatuhan zero-incident.
              </p>
            </div>
            <div className="text-xs font-bold uppercase border-t border-white/30 pt-3">
              Divisi Konstruksi Nasional
            </div>
          </div>

          {/* Photo Container in Strict Swiss Grid (Col 5-12) */}
          <div className="col-span-12 sm:col-span-8 relative bg-zinc-900">
            <div className="h-72 sm:h-84 w-full overflow-hidden relative">
              <img
                src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
                alt={data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                    target.src = DEFAULT_SKYSCRAPER_IMG;
                  }
                }}
                className="w-full h-full object-cover grayscale contrast-115 brightness-95"
              />
              {/* High-contrast Black Caption Bar with distinct spacing */}
              <div className="absolute bottom-0 inset-x-0 bg-black/95 border-t border-zinc-800 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <span className="font-bold tracking-wide text-white uppercase">
                    {data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
                  </span>
                  <span className="text-[#ff5722] font-semibold px-0.5">|</span>
                  <span className="text-zinc-300 font-normal">
                    {data.portfolio.flagship.scope || 'Struktur, Fasad Parametrik, MEP Kompleks'}
                  </span>
                </div>
                <span className="font-folio-mono text-[11px] text-zinc-400 font-medium tracking-wider shrink-0 whitespace-nowrap">
                  // {data.portfolio.flagship.period || '2021 – 2024'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM SWISS MODULAR DATA GRID (3 Solid Structured Columns) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black my-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
          {/* Box 1: Solid Black Key Stat */}
          <div className="bg-black text-white p-5">
            <div className="text-xs font-bold text-[#ff5722] uppercase tracking-wider">
              Nilai Kontrak Kumulatif
            </div>
            <div className="font-headline text-3xl font-bold mt-2 tracking-[-0.02em]">
              {data.stats[0]?.value || '14.8 T'}
            </div>
            <div className="text-xs font-semibold text-zinc-300 uppercase mt-1">
              {data.stats[0]?.label || 'Konsolidasi Portofolio'}
            </div>
            <p className="font-editorial-body text-xs text-zinc-400 mt-2 leading-[1.6]">
              {data.stats[0]?.desc || 'Portofolio kontrak konstruksi dan rekayasa strategis.'}
            </p>
          </div>

          {/* Box 2: White background with sharp contrast */}
          <div className="bg-white text-black p-5">
            <div className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#ff5722] inline-block"></span>
              Realisasi Proyek
            </div>
            <div className="font-headline text-3xl font-bold mt-2 tracking-[-0.02em] text-black">
              {data.stats[1]?.value || '180+'}
            </div>
            <div className="text-xs font-semibold text-zinc-700 uppercase mt-1">
              {data.stats[1]?.label || 'Proyek Selesai'}
            </div>
            <p className="font-editorial-body text-xs text-[#64748b] mt-2 leading-[1.6]">
              Gedung tinggi, infrastruktur transportasi, dan kawasan industri terpadu.
            </p>
          </div>

          {/* Box 3: Quality & Safety Standards */}
          <div className="bg-white text-black p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-black uppercase tracking-wider">
                Keselamatan & Kualitas
              </div>
              <div className="font-headline text-3xl font-bold mt-2 tracking-[-0.02em] text-[#ff5722]">
                100%
              </div>
              <div className="text-xs font-semibold text-zinc-700 uppercase mt-1">
                Kepatuhan HSE & On-Time
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-200 text-xs text-[#64748b] font-medium">
              Sertifikasi ISO 9001, 14001, & 45001 Terintegrasi
            </div>
          </div>
        </section>

        {/* MINIMALIST COVER FOOTER */}
        <footer className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-folio-mono text-zinc-500">
          <span>{data.companyName}</span>
          <div className="flex items-center gap-3 text-zinc-600">
            <span>{data.contact.comms.website}</span>
            <span className="text-zinc-300">/</span>
            <span>{data.contact.comms.email}</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
