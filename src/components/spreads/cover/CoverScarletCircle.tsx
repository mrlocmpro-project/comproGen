import React from 'react';
import { CompanyProfileData } from '../../../types/monograph';
import { GridOverlay } from '../../common/CropMarks';

interface Props {
  data: CompanyProfileData;
  showGrid: boolean;
}

const DEFAULT_SKYSCRAPER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCFnd-g1Ab3xUTmrBXLjVVlVlObHrdy_NDYF7COiKiSBCh9SCe-Cn9bizoFkrXGRevjHUHaHCkXTRP-VlgOSKFcDMJ2BJQ1kjgIh051HH56KltrkQbXppLUF0rmBcklWgPiTP1-VmTOeOpJkqE1x_3muULM7WQmU70ytGr_8gMyhyJttN_uxUDDKI99b9t0MJ_qEZ8Ssylu1SWP8QuNMjMHC1CjhOjtvWUrJemtEMQMLfvuokThXdlw';

export const CoverScarletCircle: React.FC<Props> = ({ data, showGrid }) => {
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
    <article className="a4-page sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border border-slate-300 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto font-sans">
      <GridOverlay active={showGrid} />

      <div className="p-8 sm:p-10 pt-10 sm:pt-12 flex flex-col justify-between relative z-10 min-h-[1123px]">
        {/* HERO TITLE SECTION: Locked 2-Column CSS Grid (Prevents Title & Year from Colliding) */}
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
            {/* Left Column (Lebar 65% - 70%): Khusus untuk Judul Utama */}
            <div className="min-w-0">
              <h1 className="font-headline text-3xl sm:text-[42px] lg:text-[46px] font-black text-slate-950 uppercase tracking-[-0.03em] leading-[0.95]">
                ARCHITECTURAL <br />
                <span className="text-red-600">PORTFOLIO &amp;</span> <br />
                LEGALS
              </h1>
            </div>

            {/* Right Column (Lebar 30% - 35%): Khusus untuk Blok Periode & Akreditasi with fine tuning */}
            <div
              className="min-w-0 flex flex-col items-end text-right relative z-20 overflow-visible"
              style={{
                alignSelf,
                transform: `translate(${yearOffsetX}px, ${yearOffsetY}px)`,
                fontSize: `${yearFontSize}px`,
              }}
            >
              <div
                className="font-headline font-black text-slate-950 tracking-[-0.02em] leading-tight text-right whitespace-nowrap overflow-visible"
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
                  <span className="inline-block bg-red-600 text-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow-xs whitespace-nowrap">
                    TERAKREDITASI
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sub-header Metadata Bar (Berada rapi di bawah grid judul & tahun) */}
          <div className="mt-5 pt-3 border-t-2 border-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider">
              {data.legalEntity || 'PERSEROAN TERBATAS TERBUKA (TBK)'}
            </span>
            <span className="text-red-600 font-bold uppercase tracking-wider">
              {data.tagline}
            </span>
          </div>
          <p className="font-editorial-body text-xs text-[#64748b] mt-2.5 leading-[1.6] max-w-xl">
            {data.coverDescription ||
              'Kompilasi rekayasa proyek strategis, sertifikasi standar konstruksi nasional, dan keandalan operasional perusahaan.'}
          </p>
        </section>

        {/* MAIN VISUAL: CLEAN MONOCHROME PHOTO OVERLAID WITH GIANT ELEGANT SCARLET RING */}
        <section className="relative my-4 overflow-hidden rounded-xs border-2 border-slate-900 bg-black shadow-lg">
          <div className="h-72 sm:h-96 w-full relative overflow-hidden">
            <img
              src={data.coverPhotoUrl || DEFAULT_SKYSCRAPER_IMG}
              alt={data.portfolio.flagship.title || 'MENARA CAKRAWALA SCBD'}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== DEFAULT_SKYSCRAPER_IMG) {
                  target.src = DEFAULT_SKYSCRAPER_IMG;
                }
              }}
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
            />

            {/* GIANT SCARLET CIRCLE RING (Clean, elegant, non-target) */}
            <div
              className="absolute -top-16 -right-16 w-80 h-80 sm:w-96 sm:h-96 rounded-full border-[16px] sm:border-[22px] border-red-600 pointer-events-none z-10"
              style={{
                boxShadow: '0 0 50px rgba(220,38,38,0.35)',
              }}
            />

            {/* Photo Caption Strip */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div className="bg-red-600 px-4 py-2.5 shadow-md max-w-md">
                <span className="text-[10px] uppercase tracking-wider text-red-100 font-bold block">
                  Proyek Unggulan Nasional
                </span>
                <span className="font-headline text-base font-bold uppercase tracking-[-0.02em] block mt-0.5">
                  {data.portfolio.flagship.title}
                </span>
              </div>

              <div className="bg-black/85 backdrop-blur-xs px-3.5 py-2 border border-white/20 text-xs flex items-center gap-3">
                <span className="text-red-400 font-bold">Nilai: {data.portfolio.flagship.value}</span>
                <span className="text-zinc-400">•</span>
                <span className="font-medium text-white">Selesai 100%</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM METRIC BENTO */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          {data.stats.slice(0, 4).map((st) => (
            <div key={st.id} className="bg-white border-2 border-slate-900 p-3.5 shadow-xs relative">
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-600" />
              <div className="font-headline text-2xl font-bold text-slate-950 tracking-[-0.02em]">
                {st.value}
              </div>
              <div className="text-xs font-bold text-red-600 uppercase mt-1">
                {st.label}
              </div>
              <div className="text-[11px] text-[#64748b] mt-0.5">
                {st.subvalue}
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
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
