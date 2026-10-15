import { PageVisibility } from '../types/monograph';

export interface PageInfo {
  pageNumber: number; // 1, 2, 3...
  totalPages: number; // e.g. 5
  formatted: string; // e.g. "03 / 05"
  formattedLong: string; // e.g. "HALAMAN 03 / 05"
  formattedIndo: string; // e.g. "HALAMAN 03 DARI 05"
  sheetId: string; // e.g. "03"
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

export const getPageInfo = (
  pageKey: keyof PageVisibility,
  visibility?: Partial<PageVisibility>
): PageInfo => {
  const currentVisibility: PageVisibility = {
    ...defaultPageVisibility,
    ...(visibility || {}),
  };

  const pagesOrder: Array<{ key: keyof PageVisibility; originalChapter: string }> = [
    { key: 'cover', originalChapter: '01' },
    { key: 'about', originalChapter: '02' },
    { key: 'team', originalChapter: '03' },
    { key: 'legal', originalChapter: '04' },
    { key: 'portfolio', originalChapter: '05' },
    { key: 'backCover', originalChapter: '06' },
  ];

  const activePages = pagesOrder.filter((p) => currentVisibility[p.key] !== false);
  const totalPages = Math.max(1, activePages.length);

  const activeIndex = activePages.findIndex((p) => p.key === pageKey);
  const pageNumber = activeIndex !== -1 ? activeIndex + 1 : 1;
  const isEnabled = currentVisibility[pageKey] !== false;

  const padNum = String(pageNumber).padStart(2, '0');
  const padTotal = String(totalPages).padStart(2, '0');

  const pageItem = pagesOrder.find((p) => p.key === pageKey);
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
