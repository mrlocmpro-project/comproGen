import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80';

export const CoverRoyalSlant: React.FC<Props> = ({ data, showGrid }) => {
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
  const vAlign = fineTune.verticalAlign || 'top';
  const alignSelf =
    vAlign === 'middle' ? 'center' : vAlign === 'bottom' ? 'flex-end' : 'flex-start';

  // Two-tone title: First word Orange (#ea580c), subsequent words Royal Navy (#1e3a8a)
  const titleText = data.coverDocumentType || 'COMPANY PROFILE';
  const words = titleText.trim().split(/\s+/);
  const firstWord = words[0] || 'COMPANY';
  const remainingWords = words.slice(1).join(' ') || 'PROFILE';

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 border-2 border-[#1e3a8a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      {/* GEOMETRIC ACCENT: Diagonal Hatched Pattern at Top-Right Corner */}
      <div
        className="absolute top-0 right-0 w-72 h-44 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #1e3a8a 0, #1e3a8a 2px, transparent 2px, transparent 10px)',
          maskImage: 'linear-gradient(to bottom left, black, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom left, black, transparent 80%)',
        }}
      />

      {/* GEOMETRIC ACCENT: Slanted Royal Navy Parallelogram Accent at Top */}
      <div
        className="absolute -top-10 -left-12 w-48 h-24 bg-[#1e3a8a] transform -skew-x-12 opacity-90 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -top-6 -left-4 w-32 h-14 bg-[#ea580c] transform -skew-x-12 opacity-90 z-0"
        aria-hidden="true"
      />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* HERO TITLE SECTION: Locked 2-Column CSS Grid */}
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
            {/* Left Column (Lebar 68%): Two-tone Title (Orange & Royal Navy) */}
            <div className="min-w-0">
              <h1 className="font-headline text-5xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-[0.92]">
                <span className="text-[#ea580c] block">{firstWord}</span>
                <span className="text-[#1e3a8a] block mt-1">{remainingWords}</span>
              </h1>
            </div>

            {/* Right Column (Lebar 32%): Single-Line Year & Slanted Accreditation Badge with fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-20 overflow-visible pr-2 sm:pr-4"
              style={{
                alignSelf,
                transform: `translate(${fineTune.xOffset || 0}px, ${fineTune.yOffset || 0}px)`,
              }}
            >
              <div
                className="font-headline font-black text-[#1e3a8a] tracking-[-0.02em] leading-tight text-right whitespace-nowrap overflow-visible"
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
                  {/* Slanted Parallelogram Badge */}
                  <div className="transform -skew-x-12 bg-[#ea580c] text-white px-3 py-1 shadow-sm whitespace-nowrap">
                    <span className="inline-block transform skew-x-12 text-[10px] font-extrabold uppercase tracking-wider">
                      TERAKREDITASI
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Company Entity & Subtitle Bar with Slanted Left Marker */}
          <div className="mt-5 pt-4 border-t-2 border-[#1e3a8a] max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 bg-[#ea580c] transform -skew-x-12 shrink-0" />
              <h2 className="font-headline text-2xl font-black uppercase tracking-[-0.02em] text-[#1e3a8a]">
                {data.companyName}
              </h2>
            </div>
            <p className="text-sm font-semibold text-slate-700 ml-5">
              {data.tagline}
            </p>
            <p className="font-editorial-body text-xs text-slate-600 mt-2 leading-[1.6] ml-5">
              {data.coverDescription ||
                'Rekayasa teknik konstruksi, kepatuhan legalitas terverifikasi, dan manajemen portofolio infrastruktur berskala nasional.'}
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION: SLANTED PARALLELOGRAM PHOTO HERO */}
        <section className="relative my-4">
          <div className="border-2 border-[#1e3a8a] bg-slate-900 overflow-hidden relative shadow-lg">
            {/* Parallelogram Color Stripe Overlay */}
            <div className="absolute top-0 right-0 z-20 flex">
              <div className="h-10 w-28 bg-[#1e3a8a] transform -skew-x-12 -mr-4 flex items-center justify-center">
                <span className="transform skew-x-12 font-folio-mono text-[10px] text-white font-bold tracking-widest uppercase">
                  SLANT SPEC
                </span>
              </div>
              <div className="h-10 w-8 bg-[#ea580c] transform -skew-x-12" />
            </div>

            <div className="h-72 sm:h-80 w-full overflow-hidden relative">
              <img
                src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
                alt={data.portfolio.flagship.title || 'PORTFOLIO HERO'}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                    target.src = DEFAULT_SKYSCRAPER_IMG;
                  }
                }}
                className="w-full h-full object-cover contrast-110 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/70 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption with Slanted Orange Accent Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 text-white px-5 py-2.5 flex flex-wrap items-center justify-between gap-x-4 text-xs border-t border-[#ea580c]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#ea580c] transform -skew-x-12" />
                  <span className="font-bold tracking-wide uppercase text-white">
                    {data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
                  </span>
                  <span className="text-[#ea580c] font-bold">/</span>
                  <span className="text-slate-300">
                    {data.portfolio.flagship.scope || 'Struktur & Rekayasa Rekonstruksi Sipil'}
                  </span>
                </div>
                <span className="font-folio-mono text-[11px] text-slate-400">
                  // {data.portfolio.flagship.period || '2022 – 2026'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM METRIC CARDS WITH SLANTED ACCENTS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          {/* Card 1: Royal Navy Deep Card */}
          <div className="bg-[#1e3a8a] text-white p-5 relative overflow-hidden shadow-sm border border-[#1e3a8a]">
            <div className="absolute top-0 right-0 w-16 h-8 bg-[#ea580c] transform -skew-x-12 -mr-3" />
            <div className="text-[11px] font-bold text-orange-200 uppercase tracking-wider">
              {data.stats[0]?.label || 'Nilai Kontrak Terkelola'}
            </div>
            <div className="font-headline text-3xl font-black mt-2 tracking-tight text-white">
              {data.stats[0]?.value || '14.8 T'}
            </div>
            <p className="font-editorial-body text-xs text-slate-200 mt-2 leading-[1.5]">
              {data.stats[0]?.desc || 'Portofolio kontrak konstruksi dan rekayasa strategis.'}
            </p>
          </div>

          {/* Card 2: White Card with Slanted Orange Divider */}
          <div className="bg-white text-slate-900 p-5 border-2 border-[#1e3a8a] relative shadow-sm">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#ea580c] uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#ea580c] transform -skew-x-12" />
              {data.stats[1]?.label || 'Proyek Selesai'}
            </div>
            <div className="font-headline text-3xl font-black mt-2 tracking-tight text-[#1e3a8a]">
              {data.stats[1]?.value || '180+'}
            </div>
            <p className="font-editorial-body text-xs text-slate-600 mt-2 leading-[1.5]">
              Infrastruktur sipil, gedung tinggi, dan kawasan industri modern.
            </p>
          </div>

          {/* Card 3: Tangerine Highlight Card */}
          <div className="bg-white text-slate-900 p-5 border-2 border-[#ea580c] relative shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-[#1e3a8a] uppercase tracking-wider">
                Indeks Keselamatan & Mutu
              </div>
              <div className="font-headline text-3xl font-black mt-2 tracking-tight text-[#ea580c]">
                100%
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1 uppercase">
                Zero Lost-Time Injury
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
              Sertifikasi ISO 9001 / 14001 / 45001 Terintegrasi
            </div>
          </div>
        </section>

        {/* MINIMALIST COVER FOOTER */}
        <footer className="pt-4 border-t border-slate-300 flex items-center justify-between text-xs font-folio-mono text-slate-600">
          <span className="font-bold text-[#1e3a8a]">{data.companyName}</span>
          <div className="flex items-center gap-3">
            <span>{data.contact.comms.website}</span>
            <span className="text-slate-300">/</span>
            <span>{data.contact.comms.email}</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
