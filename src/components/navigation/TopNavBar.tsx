import React, { useState, useRef, useEffect } from 'react';
import { SpreadId, ThemeId, PageVisibility } from '../../types/monograph';
import { THEME_LIST, getThemeMeta } from '../../data/themes';
import { Printer, Grid, Sliders, Palette, ChevronDown, Check } from 'lucide-react';

interface TopNavBarProps {
  activeSpread: SpreadId;
  onSelectSpread: (spread: SpreadId) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  editorOpen: boolean;
  onToggleEditor: () => void;
  onPrint: () => void;
  zoom: number;
  onZoomChange: (delta: number) => void;
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  pageVisibility?: PageVisibility;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeSpread,
  onSelectSpread,
  showGrid,
  onToggleGrid,
  editorOpen,
  pageVisibility,
  onToggleEditor,
  onPrint,
  zoom,
  onZoomChange,
  currentTheme,
  onSelectTheme,
}) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeThemeMeta = getThemeMeta(currentTheme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const spreads: Array<{ id: SpreadId; pageKey?: keyof PageVisibility; label: string }> = [
    { id: '01', pageKey: 'cover', label: '01 // Cover' },
    { id: '02', pageKey: 'about', label: '02 // About & Vision' },
    { id: '03', pageKey: 'team', label: '03 // Team' },
    { id: '04', pageKey: 'legal', label: '04 // Legalitas' },
    { id: '05', pageKey: 'portfolio', label: '05 // Portfolio' },
    { id: '06', pageKey: 'backCover', label: '06 // Back Cover' },
    { id: 'all', label: 'All // Full Dossier' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-zinc-200 no-print">
      <div className="h-14 w-full px-3 md:px-6 flex items-center justify-between gap-3">
        {/* Left Zone: Editor Button & Monograph Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleEditor}
            className={`px-2.5 py-1.5 border font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5 ${
              editorOpen
                ? 'bg-[#1c1917] text-amber-400 border-[#1c1917]'
                : 'bg-zinc-100 text-[#1c1917] border-zinc-300 hover:bg-zinc-200'
            }`}
            title="Buka / Tutup Left Editor Panel"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editor Panel</span>
          </button>

          {/* THEME SELECTION DROPDOWN (Directly in Top Bar) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setThemeDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-2.5 py-1.5 border border-zinc-300 hover:border-zinc-800 bg-zinc-50 hover:bg-white text-[#1c1917] font-mono text-xs font-bold transition-all shadow-xs"
              title="Pilih Desain Struktur Tata Letak Monograf"
            >
              <span
                className="w-3 h-3 rounded-xs shrink-0 border border-black/20"
                style={{ backgroundColor: activeThemeMeta.accentColor }}
              />
              <span className="hidden md:inline truncate max-w-[170px]">
                {activeThemeMeta.name}
              </span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute left-0 mt-1 w-72 sm:w-80 bg-white border-2 border-[#1c1917] shadow-xl z-50 py-1 font-mono text-xs">
                <div className="px-3 py-2 bg-zinc-100 border-b border-zinc-200 text-[10px] uppercase font-bold text-zinc-600">
                  PILIH STRUKTUR DESAIN (5 DESAIN REFERENSI)
                </div>
                {THEME_LIST.map((theme) => {
                  const isSelected = theme.id === currentTheme;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        onSelectTheme(theme.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 flex items-start gap-3 transition-colors border-b border-zinc-100 hover:bg-zinc-50 ${
                        isSelected ? 'bg-zinc-50 font-bold' : ''
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-xs shrink-0 mt-0.5 border border-black/20"
                        style={{ backgroundColor: theme.accentColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-900 font-bold truncate">
                            {theme.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 font-normal line-clamp-1 mt-0.5">
                          {theme.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Center Zone: Spread Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 border-x border-zinc-200 px-2 overflow-x-auto custom-scrollbar max-w-full">
          {spreads.map((s) => {
            const isEnabled = s.pageKey ? (pageVisibility ? pageVisibility[s.pageKey] !== false : true) : true;
            const isActive = activeSpread === s.id;

            return (
              <button
                key={s.id}
                disabled={!isEnabled}
                onClick={() => onSelectSpread(s.id)}
                title={!isEnabled ? `${s.label} dinonaktifkan di panel editor` : s.label}
                className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  !isEnabled
                    ? 'opacity-40 line-through text-zinc-400 cursor-not-allowed bg-zinc-50 border border-dashed border-zinc-200 select-none'
                    : isActive
                    ? 'bg-[#1c1917] text-white font-bold shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-[#1c1917]'
                }`}
              >
                <span>{s.label}</span>
                {!isEnabled && (
                  <span className="text-[9px] no-underline font-normal text-zinc-400">
                    (OFF)
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: View Controls & Primary Print CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center border border-zinc-300">
            <button
              type="button"
              onClick={() => onZoomChange(-15)}
              className="px-2 py-1 border-r border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors font-mono text-xs"
              title="Perkecil Tampilan"
            >
              -
            </button>
            <span className="px-2 py-1 font-mono text-[11px] text-[#1c1917] select-none min-w-[38px] text-center font-semibold">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => onZoomChange(15)}
              className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors font-mono text-xs"
              title="Perbesar Tampilan"
            >
              +
            </button>
          </div>

          {/* Grid Toggle */}
          <button
            type="button"
            onClick={onToggleGrid}
            className={`px-2.5 py-1.5 border font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1 ${
              showGrid
                ? 'bg-[#1c1917] text-white border-[#1c1917]'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
            }`}
            title="Toggle 12-Column Swiss Architectural Grid Overlay"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-bold">GRID</span>
          </button>

          {/* PRINT EXPORT (A4) BUTTON */}
          <button
            type="button"
            onClick={onPrint}
            className="bg-[#1c1917] hover:bg-zinc-800 text-white font-mono text-xs font-black uppercase px-3 py-1.5 transition-colors border border-[#1c1917] flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">PRINT (A4)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
