import { PageVisibility } from '../types/monograph';

export interface PageInfo {
  pageNumber: number; // 1, 2, 3...
  totalPages: number; // Total active numbered pages (e.g. 5 or 4)
  formatted: string; // e.g. "02 / 04"
  formattedLong: string; // e.g. "HALAMAN 02 / 04"
  formattedIndo: string; // e.g. "HALAMAN 02 DARI 04"
  sheetId: string; // e.g. "02"
  originalChapter: string; // e.g. "04"
  isEnabled: boolean;
}

export const defaultPageVisibility: PageVisibility = {
  cover: true,
  about: true,
  team: true,
  legal: true,
  portfolio: true,
  backCover: true,
};

// Internal editorial content pages that participate in 1..N page numbering
// Note: Cover is the unnumbered title cover (not counted in 1..N numbering)
export const NUMBERED_PAGES: Array<{ key: keyof PageVisibility; originalChapter: string }> = [
  { key: 'about', originalChapter: '02' },
  { key: 'team', originalChapter: '03' },
  { key: 'legal', originalChapter: '04' },
  { key: 'portfolio', originalChapter: '05' },
  { key: 'backCover', originalChapter: '06' },
];

export const getPageInfo = (
  pageKey: keyof PageVisibility,
  visibilityOrData?: Partial<PageVisibility> | any,
  toggles?: any
): PageInfo => {
  const vis = visibilityOrData && typeof visibilityOrData === 'object' && 'pageVisibility' in visibilityOrData
    ? visibilityOrData.pageVisibility
    : visibilityOrData;

  const currentVisibility: PageVisibility = {
    cover: vis?.cover ?? visibilityOrData?.showCover ?? toggles?.showCover ?? true,
    about: vis?.about ?? visibilityOrData?.showAbout ?? toggles?.showAbout ?? true,
    team: vis?.team ?? visibilityOrData?.showTeam ?? toggles?.showTeam ?? true,
    legal: vis?.legal ?? visibilityOrData?.showLegal ?? toggles?.showLegal ?? true,
    portfolio: vis?.portfolio ?? visibilityOrData?.showPortfolio ?? toggles?.showPortfolio ?? toggles?.showProjects ?? true,
    backCover: vis?.backCover ?? visibilityOrData?.showBackCover ?? toggles?.showBackCover ?? true,
  };

  const isEnabled = currentVisibility[pageKey] !== false;

  // Active numbered pages
  const activePages = NUMBERED_PAGES.filter((p) => currentVisibility[p.key] !== false);
  const totalPages = Math.max(1, activePages.length);

  // If cover, it is the unnumbered front page
  if (pageKey === 'cover') {
    return {
      pageNumber: 0,
      totalPages,
      formatted: 'COVER',
      formattedLong: 'HALAMAN SAMPUL',
      formattedIndo: 'HALAMAN SAMPUL',
      sheetId: '01',
      originalChapter: '01',
      isEnabled,
    };
  }

  const activeIndex = activePages.findIndex((p) => p.key === pageKey);
  const pageNumber = activeIndex !== -1 ? activeIndex + 1 : 1;

  const padNum = String(pageNumber).padStart(2, '0');
  const padTotal = String(totalPages).padStart(2, '0');

  const pageItem = NUMBERED_PAGES.find((p) => p.key === pageKey);
  const originalChapter = pageItem?.originalChapter || padNum;

  return {
    pageNumber,
    totalPages,
    formatted: `${padNum} / ${padTotal}`,
    formattedLong: `HALAMAN ${padNum} / ${padTotal}`,
    formattedIndo: `HALAMAN ${padNum} DARI ${padTotal}`,
    sheetId: padNum,
    originalChapter,
    isEnabled,
  };
};

export const getAllActivePageCount = (visibility?: Partial<PageVisibility>): number => {
  const currentVisibility: PageVisibility = {
    ...defaultPageVisibility,
    ...(visibility || {}),
  };
  return Object.values(currentVisibility).filter(Boolean).length;
};
