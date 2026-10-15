import React, { useState } from 'react';
import { CompanyProfileData, TogglesState, SpreadId, ThemeId } from './types/monograph';
import { defaultCompanyData } from './data/defaultData';
import { THEME_LIST, getThemeMeta } from './data/themes';
import { TopNavBar } from './components/navigation/TopNavBar';
import { EditorPanel } from './components/editor/EditorPanel';
import { Spread01Cover } from './components/spreads/Spread01Cover';
import { Spread02AboutVision } from './components/spreads/Spread02AboutVision';
import { Spread03Team } from './components/spreads/Spread03Team';
import { Spread04Legal } from './components/spreads/Spread04Legal';
import { Spread05Portfolio } from './components/spreads/Spread05Portfolio';
import { Spread06BackCover } from './components/spreads/Spread06BackCover';
import { Sliders, Printer, Grid, ChevronLeft, ChevronRight, Layers, Palette } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<CompanyProfileData>(defaultCompanyData);
  const [toggles, setToggles] = useState<TogglesState>({
    showDirectorMessage: true,
    showVisionMission: true,
    showHSEPolicy: true,
    showTeam: true,
    showLegal: true,
    showProjects: true,
    showBackCover: true,
  });
  const [activeSpread, setActiveSpread] = useState<SpreadId>('01');
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('swiss-tangerine');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [editorOpen, setEditorOpen] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(100);

  const activeThemeMeta = getThemeMeta(currentTheme);

  const handleZoomChange = (delta: number) => {
    setZoom((prev) => Math.min(150, Math.max(60, prev + delta)));
  };

  const handlePrint = () => {
    window.print();
  };

  const spreadOrder: SpreadId[] = ['01', '02', '03', '04', '05', '06'];
  const currentIndex = spreadOrder.indexOf(activeSpread);

  const handleNextSpread = () => {
    if (activeSpread === 'all') {
      setActiveSpread('01');
      return;
    }
    if (currentIndex < spreadOrder.length - 1) {
      setActiveSpread(spreadOrder[currentIndex + 1]);
    }
  };

  const handlePrevSpread = () => {
    if (activeSpread === 'all') {
      setActiveSpread('06');
      return;
    }
    if (currentIndex > 0) {
      setActiveSpread(spreadOrder[currentIndex - 1]);
    }
  };

  return (
    <div className={`min-h-screen bg-[#f4f3f0] text-[#1d1b1a] flex flex-col font-sans theme-${currentTheme}`}>
      {/* Top Application Bar with Theme Selector */}
      <TopNavBar
        activeSpread={activeSpread}
        onSelectSpread={setActiveSpread}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid((prev) => !prev)}
        editorOpen={editorOpen}
        onToggleEditor={() => setEditorOpen((prev) => !prev)}
        onPrint={handlePrint}
        zoom={zoom}
        onZoomChange={handleZoomChange}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Left Editor Panel */}
      <EditorPanel
        data={data}
        onChange={setData}
        toggles={toggles}
        onTogglesChange={setToggles}
        activeSpread={activeSpread}
        onSelectSpread={setActiveSpread}
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onPrint={handlePrint}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Main Workspace Stage */}
      <main
        className={`w-full pt-14 flex-1 flex flex-col transition-all duration-300 ${
          editorOpen ? 'lg:pl-[420px]' : ''
        }`}
      >
        {/* Document Controller Sub-Ribbon (Editorial Context) */}
        <div className="w-full bg-white border-b border-zinc-200 px-4 md:px-8 py-2 no-print flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#1c1917] font-bold uppercase tracking-wider">
              DOC.ID: {data.docId}
            </span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-700 font-bold uppercase flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: activeThemeMeta.accentColor }}
              />
              TEMA STRUKTURAL: {activeThemeMeta.name}
            </span>
            <span className="text-zinc-400 hidden lg:inline">
              [{activeSpread === 'all' ? 'SEMUA 6 HALAMAN' : `HALAMAN ${activeSpread}`}]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Pagination */}
            {activeSpread !== 'all' && (
              <div className="flex items-center border border-zinc-300 bg-white mr-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={handlePrevSpread}
                  className="p-1 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Halaman Sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-mono text-[11px] font-bold">
                  {activeSpread} / 06
                </span>
                <button
                  type="button"
                  disabled={currentIndex === spreadOrder.length - 1}
                  onClick={handleNextSpread}
                  className="p-1 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Halaman Berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveSpread(activeSpread === 'all' ? '01' : 'all')}
              className="px-2 py-1 border border-zinc-300 hover:border-[#1c1917] bg-white text-[#1c1917] text-[11px] font-mono flex items-center gap-1.5 transition-colors font-medium"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{activeSpread === 'all' ? 'Single View' : 'Full Dossier (All 6)'}</span>
            </button>
          </div>
        </div>

        {/* Spread Viewport Canvas with Zoom Scaler */}
        <div className="w-full flex-1 bg-[#eeecea] py-6 px-2 sm:px-4 md:px-6 flex justify-center items-start overflow-x-auto">
          <div
            style={{
              zoom: `${zoom}%`,
              transformOrigin: 'top center',
            }}
            className="w-full flex flex-col items-center gap-8 transition-transform duration-150"
          >
            {/* VIEW MODE: Single or All Spreads with themeId prop passed */}
            {activeSpread === '01' && (
              <Spread01Cover
                data={data}
                showGrid={showGrid}
                themeId={currentTheme}
              />
            )}

            {activeSpread === '02' && (
              <Spread02AboutVision
                data={data}
                toggles={toggles}
                showGrid={showGrid}
                themeId={currentTheme}
              />
            )}

            {activeSpread === '03' && (
              <Spread03Team
                data={data}
                toggles={toggles}
                showGrid={showGrid}
                themeId={currentTheme}
              />
            )}

            {activeSpread === '04' && (
              <Spread04Legal
                data={data}
                toggles={toggles}
                showGrid={showGrid}
                themeId={currentTheme}
              />
            )}

            {activeSpread === '05' && (
              <Spread05Portfolio
                data={data}
                toggles={toggles}
                showGrid={showGrid}
                themeId={currentTheme}
              />
            )}

            {activeSpread === '06' && (
              <Spread06BackCover
                data={data}
                toggles={toggles}
                showGrid={showGrid}
                themeId={currentTheme}
              />
            )}

            {activeSpread === 'all' && (
              <div className="w-full flex flex-col gap-10 items-center">
                <Spread01Cover
                  data={data}
                  showGrid={showGrid}
                  themeId={currentTheme}
                />
                <Spread02AboutVision
                  data={data}
                  toggles={toggles}
                  showGrid={showGrid}
                  themeId={currentTheme}
                />
                <Spread03Team
                  data={data}
                  toggles={toggles}
                  showGrid={showGrid}
                  themeId={currentTheme}
                />
                <Spread04Legal
                  data={data}
                  toggles={toggles}
                  showGrid={showGrid}
                  themeId={currentTheme}
                />
                <Spread05Portfolio
                  data={data}
                  toggles={toggles}
                  showGrid={showGrid}
                  themeId={currentTheme}
                />
                <Spread06BackCover
                  data={data}
                  toggles={toggles}
                  showGrid={showGrid}
                  themeId={currentTheme}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sticky Utility Action Bar (No Print) */}
        <section className="w-full bg-white border-t border-zinc-200 py-3 px-4 md:px-8 no-print shrink-0">
          <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-xs"
                style={{ backgroundColor: activeThemeMeta.accentColor }}
              />
              <span className="text-[#1c1917] font-bold">DESAIN STRUKTUR AKTIF:</span>
              <span className="text-zinc-700 font-bold uppercase">
                {activeThemeMeta.name}
              </span>
              <span className="text-zinc-500 hidden sm:inline">
                — {activeThemeMeta.subtitle}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              {!editorOpen && (
                <button
                  type="button"
                  onClick={() => setEditorOpen(true)}
                  className="px-3 py-1.5 border border-[#1c1917] bg-white text-[#1c1917] hover:bg-[#1c1917] hover:text-white transition-colors font-mono uppercase font-bold flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Buka Editor Panel</span>
                </button>
              )}

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-1.5 bg-[#1c1917] hover:bg-zinc-800 text-white font-mono text-xs font-black uppercase flex items-center gap-2 transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>PRINT / EXPORT A4</span>
              </button>
            </div>
          </div>
        </section>

        {/* Global Footer (No Print) */}
        <footer className="w-full bg-zinc-50 border-t border-zinc-200 py-3 px-4 md:px-8 no-print text-[11px] font-mono text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1c1917]">ARCHITECTURAL MONOGRAPH PUBLICATION ENGINE</span>
            <span className="text-zinc-300">/</span>
            <span>A4 COMPLIANT (210 × 297 MM) // 5 STRUCTURAL THEMES</span>
          </div>
          <div className="flex items-center gap-3">
            <span>© 2026 HEAVY CIVIL & ARCHITECTURAL ARCHIVE</span>
            <span className="bg-[#1c1917] text-white px-2 py-0.5 font-bold uppercase text-[10px]">
              {activeThemeMeta.id.toUpperCase()}
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
