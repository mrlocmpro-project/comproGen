import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';

export const CoverHexagonCharcoal: React.FC<Props> = ({ data, showGrid }) => {
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
    verticalAlign: 'middle',
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
  const vAlign = fineTune.verticalAlign || 'middle';
  const alignSelf =
    vAlign === 'middle' ? 'center' : vAlign === 'bottom' ? 'flex-end' : 'flex-start';

  return (
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fbfbfb] text-[#18181b] border-2 border-[#18181b] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      {/* GEOMETRIC ACCENT: Dark Angled Corner Block at Top-Right (Scaled & Positioned Safely) */}
      <div
        className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 bg-[#18181b] pointer-events-none z-0"
        style={{
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-28 h-28 sm:w-32 sm:h-32 border-b-2 border-l-2 border-[#f97316] pointer-events-none z-0 opacity-70"
        style={{
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
        aria-hidden="true"
      />

      {/* GEOMETRIC ACCENT: Bottom-Left Dark Charcoal Cutout Block */}
      <div
        className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#18181b] pointer-events-none z-0"
        style={{
          clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
        }}
        aria-hidden="true"
      />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* HERO TITLE SECTION: Locked 2-Column CSS Grid with Corner Safe Margin */}
        <section className="mt-2 mb-4">
          <div
            className="w-full grid grid-cols-[64%_1fr] items-start justify-between gap-4"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 64%) minmax(0, 36%)',
              gap: '16px',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {/* Left Column (Lebar ~64%): Stacked "THE COMPANY PROFILE" with "PROFILE" in Orange */}
            <div className="min-w-0">
              <div className="font-folio-mono text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">
                CORPORATE MONOGRAPH
              </div>
              <h1 className="font-headline text-5xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-[#18181b]">
                THE COMPANY <br />
                <span className="text-[#f97316]">PROFILE</span>
              </h1>
            </div>

            {/* Right Column (Lebar ~36%): Safe from Top-Right Corner Ornament with generous padding-right & fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-30 overflow-visible"
              style={{
                paddingRight: '64px',
                alignSelf,
                transform: `translate(${yearOffsetX}px, ${yearOffsetY}px)`,
                fontSize: `${yearFontSize}px`,
              }}
            >
              <div
                className="font-headline font-black text-[#18181b] tracking-[-0.02em] leading-tight text-right whitespace-nowrap overflow-visible"
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
                  <span className="inline-block bg-[#18181b] text-[#f97316] border border-[#f97316] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow-sm whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Company Details Line */}
          <div className="mt-4 pt-3.5 border-t-2 border-[#18181b] max-w-xl">
            <h2 className="font-headline text-2xl font-black uppercase tracking-[-0.02em] text-[#18181b]">
              {data.companyName}
            </h2>
            <p className="text-sm font-semibold text-zinc-700 mt-1">
              {data.tagline}
            </p>
            <p className="font-editorial-body text-xs text-zinc-600 mt-2 leading-[1.6]">
              {data.coverDescription ||
                'Rekayasa teknik konstruksi, kepatuhan legalitas terverifikasi, dan manajemen portofolio infrastruktur berskala nasional.'}
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION: HEXAGON FRAMED ARCHITECTURAL HERO */}
        <section className="relative my-2 py-4 flex flex-col items-center justify-center">
          {/* Hexagon Outer Frame */}
          <div className="relative w-full max-w-[460px] h-[340px] flex items-center justify-center">
            {/* Hexagon Accent Glow/Border Layer 1 (Dark Charcoal) */}
            <div
              className="absolute inset-0 bg-[#18181b] shadow-xl"
              style={{
                clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
              }}
            />

            {/* Hexagon Accent Layer 2 (Saturated Orange Border Ring) */}
            <div
              className="absolute inset-1.5 bg-[#f97316]"
              style={{
                clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
              }}
            />

            {/* Hexagon Photo Container Layer 3 */}
            <div
              className="absolute inset-3 bg-zinc-900 overflow-hidden"
              style={{
                clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
              }}
            >
              <img
                src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
                alt={data.portfolio.flagship.title || 'HEXAGON APEX ARCHITECTURE'}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                    target.src = DEFAULT_SKYSCRAPER_IMG;
                  }
                }}
                className="w-full h-full object-cover grayscale contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/80 via-transparent to-transparent" />
            </div>

            {/* Center-Bottom Floating Hexagon Spec Badge */}
            <div className="absolute bottom-1 bg-[#18181b] border border-[#f97316] text-white px-4 py-1.5 z-20 flex items-center gap-2 shadow-md">
              <span className="w-2 h-2 bg-[#f97316] rotate-45" />
              <span className="font-folio-mono text-[10px] uppercase tracking-widest text-[#f97316] font-bold">
                {data.portfolio.flagship.title || 'MENARA CAKRAWALA'}
              </span>
              <span className="text-zinc-400 text-[10px]">
                // {data.portfolio.flagship.period || '2023 – 2026'}
              </span>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION: 3 CHARCOAL & ORANGE MODULAR DATA BLOCKS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          {/* Card 1: Solid Dark Charcoal */}
          <div className="bg-[#18181b] text-white p-5 border-t-4 border-[#f97316] shadow-sm relative">
            <div className="text-[11px] font-bold text-[#f97316] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
              {data.stats[0]?.label || 'Nilai Kontrak Terkelola'}
            </div>
            <div className="font-headline text-3xl font-black mt-2 tracking-tight text-white">
              {data.stats[0]?.value || '14.8 T'}
            </div>
            <p className="font-editorial-body text-xs text-zinc-400 mt-2 leading-[1.5]">
              {data.stats[0]?.desc || 'Portofolio kontrak konstruksi dan rekayasa strategis.'}
            </p>
          </div>

          {/* Card 2: White Card with Charcoal Border & Hexagon Pill */}
          <div className="bg-white text-[#18181b] p-5 border-2 border-[#18181b] shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#18181b] rotate-45" />
                {data.stats[1]?.label || 'Proyek Selesai'}
              </div>
              <div className="font-headline text-3xl font-black mt-2 tracking-tight text-[#18181b]">
                {data.stats[1]?.value || '180+'}
              </div>
              <p className="font-editorial-body text-xs text-zinc-600 mt-2 leading-[1.5]">
                Gedung tinggi, fasilitas transportasi, dan kawasan industri modern.
              </p>
            </div>
          </div>

          {/* Card 3: Orange Accent & Standards */}
          <div className="bg-white text-[#18181b] p-5 border-2 border-zinc-300 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-[#f97316] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
                Standar Kualitas & K3
              </div>
              <div className="font-headline text-3xl font-black mt-2 tracking-tight text-[#f97316]">
                100%
              </div>
              <div className="text-xs font-semibold text-zinc-700 mt-1 uppercase">
                Zero Lost-Time Incident
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-zinc-200 text-[11px] text-zinc-500 font-medium">
              Sertifikasi ISO 9001, 14001, & 45001 Terintegrasi
            </div>
          </div>
        </section>

        {/* MINIMALIST COVER FOOTER */}
        <footer className="pt-4 border-t border-zinc-300 flex items-center justify-between text-xs font-folio-mono text-zinc-600">
          <span className="font-bold text-[#18181b]">{data.companyName}</span>
          <div className="flex items-center gap-3">
            <span>{data.contact.comms.website}</span>
            <span className="text-zinc-300">/</span>
            <span>{data.contact.comms.email}</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
