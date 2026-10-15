import React, { useState } from 'react';
import {
  CompanyProfileData,
  TogglesState,
  SpreadId,
  LicenseItem,
  EpcContractRow,
  ThemeId,
  StatItem,
  StrategicPillar,
  CoverYearFineTune,
  YearVerticalAlign,
  PageVisibility,
} from '../../types/monograph';
import { presetTemplates } from '../../data/presetTemplates';
import { defaultCompanyData } from '../../data/defaultData';
import { THEME_LIST, getThemeMeta, getDefaultCoverYearFineTune } from '../../data/themes';
import {
  Sliders,
  Building,
  UserCheck,
  Compass,
  Users,
  ShieldCheck,
  FolderKanban,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Eye,
  FileText,
  Printer,
  Sparkles,
  X,
  Palette,
  PhoneCall,
  Image as ImageIcon,
  MapPin,
  Globe,
  Mail,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface EditorPanelProps {
  data: CompanyProfileData;
  onChange: (newData: CompanyProfileData) => void;
  toggles: TogglesState;
  onTogglesChange: (newToggles: TogglesState) => void;
  activeSpread: SpreadId;
  onSelectSpread: (spread: SpreadId) => void;
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  amberAccent?: boolean;
  onToggleAmberAccent?: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
}

type TabKey =
  | 'cover'
  | 'about'
  | 'themes'
  | 'toggles'
  | 'company'
  | 'director'
  | 'vision'
  | 'team'
  | 'legal'
  | 'portfolio'
  | 'backCover'
  | 'presets';

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  onChange,
  toggles,
  onTogglesChange,
  activeSpread,
  onSelectSpread,
  isOpen,
  onClose,
  onPrint,
  amberAccent,
  onToggleAmberAccent,
  currentTheme,
  onSelectTheme,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('themes');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');
  const [fineTuneOpen, setFineTuneOpen] = useState(true);

  const updateField = <K extends keyof CompanyProfileData>(
    field: K,
    value: CompanyProfileData[K]
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const currentFineTune: CoverYearFineTune =
    data.coverYearFineTune || getDefaultCoverYearFineTune(currentTheme);

  const updateFineTune = (patch: Partial<CoverYearFineTune>) => {
    updateField('coverYearFineTune', {
      ...currentFineTune,
      ...patch,
    });
  };

  const handleResetFineTune = () => {
    updateField('coverYearFineTune', getDefaultCoverYearFineTune(currentTheme));
  };

  // Centralized Page Visibility State synchronized with both data.pageVisibility & toggles
  const pageVisibility: PageVisibility = {
    cover: data.pageVisibility?.cover ?? toggles.showCover ?? true,
    about: data.pageVisibility?.about ?? toggles.showAbout ?? true,
    team: data.pageVisibility?.team ?? toggles.showTeam ?? true,
    legal: data.pageVisibility?.legal ?? toggles.showLegal ?? true,
    portfolio: data.pageVisibility?.portfolio ?? toggles.showProjects ?? true,
    backCover: data.pageVisibility?.backCover ?? toggles.showBackCover ?? true,
  };

  const togglePageVisibility = (pageKey: keyof PageVisibility) => {
    const nextVal = !pageVisibility[pageKey];
    const newVisibility: PageVisibility = {
      ...pageVisibility,
      [pageKey]: nextVal,
    };

    const togglesPatch: Partial<TogglesState> = {};
    if (pageKey === 'cover') togglesPatch.showCover = nextVal;
    if (pageKey === 'about') togglesPatch.showAbout = nextVal;
    if (pageKey === 'team') togglesPatch.showTeam = nextVal;
    if (pageKey === 'legal') togglesPatch.showLegal = nextVal;
    if (pageKey === 'portfolio') togglesPatch.showProjects = nextVal;
    if (pageKey === 'backCover') togglesPatch.showBackCover = nextVal;

    onTogglesChange({
      ...toggles,
      ...togglesPatch,
    });

    onChange({
      ...data,
      pageVisibility: newVisibility,
    });
  };

  const renderPageVisibilityBanner = (
    pageKey: keyof PageVisibility,
    title: string,
    sublabel: string,
    chapterCode: string
  ) => {
    const isVisible = pageVisibility[pageKey] !== false;

    return (
      <div
        className={`p-3.5 border-2 transition-all flex items-center justify-between gap-3 ${
          isVisible
            ? 'bg-amber-50/80 border-amber-400 text-zinc-900 shadow-xs'
            : 'bg-zinc-100 border-zinc-300 text-zinc-500'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-3 h-3 rounded-full shrink-0 ${
              isVisible ? 'bg-amber-500 ring-4 ring-amber-200' : 'bg-zinc-400'
            }`}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs uppercase tracking-tight text-zinc-900">
                {title}
              </span>
              <span
                className={`font-mono text-[9px] px-1.5 py-0.2 border ${
                  isVisible
                    ? 'bg-amber-400 text-black border-amber-500 font-bold'
                    : 'bg-zinc-200 text-zinc-600 border-zinc-300 font-semibold'
                }`}
              >
                {isVisible ? 'AKTIF (ON)' : 'NON-AKTIF (OFF)'}
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">
              {sublabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isVisible}
          onClick={() => togglePageVisibility(pageKey)}
          title={`Klik untuk ${isVisible ? 'menonaktifkan' : 'mengaktifkan'} ${title}`}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isVisible ? 'bg-amber-500' : 'bg-zinc-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isVisible ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    );
  };

  const handleToggle = (key: keyof TogglesState) => {
    onTogglesChange({
      ...toggles,
      [key]: !toggles[key],
    });
  };

  // Export JSON
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monograph-${data.monogram.toLowerCase()}-profile.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy JSON
  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // Import JSON from text
  const handleApplyImport = () => {
    try {
      setImportError('');
      const parsed = JSON.parse(importJsonText);
      if (!parsed.companyName || !parsed.portfolio) {
        throw new Error('Format JSON tidak sesuai struktur profil perusahaan.');
      }
      if (parsed.pageVisibility) {
        onTogglesChange({
          ...toggles,
          showCover: parsed.pageVisibility.cover ?? true,
          showAbout: parsed.pageVisibility.about ?? true,
          showTeam: parsed.pageVisibility.team ?? true,
          showLegal: parsed.pageVisibility.legal ?? true,
          showProjects: parsed.pageVisibility.portfolio ?? true,
          showBackCover: parsed.pageVisibility.backCover ?? true,
        });
      }
      onChange(parsed);
      setImportModalOpen(false);
      setImportJsonText('');
    } catch (err: any) {
      setImportError(err.message || 'JSON tidak valid');
    }
  };

  // Import JSON from file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.companyName) {
          throw new Error('Format data tidak dikenali.');
        }
        if (parsed.pageVisibility) {
          onTogglesChange({
            ...toggles,
            showCover: parsed.pageVisibility.cover ?? true,
            showAbout: parsed.pageVisibility.about ?? true,
            showTeam: parsed.pageVisibility.team ?? true,
            showLegal: parsed.pageVisibility.legal ?? true,
            showProjects: parsed.pageVisibility.portfolio ?? true,
            showBackCover: parsed.pageVisibility.backCover ?? true,
          });
        }
        onChange(parsed);
        setImportModalOpen(false);
      } catch (err: any) {
        alert('Gagal memuat preset: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const updateStatItem = (index: number, key: keyof StatItem, val: string) => {
    const newStats = [...data.stats];
    if (newStats[index]) {
      newStats[index] = { ...newStats[index], [key]: val };
      updateField('stats', newStats);
    }
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        updateField('coverPhotoUrl', base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDirectorPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onChange({
          ...data,
          director: {
            ...data.director,
            photoUrl: base64,
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDirectorSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onChange({
          ...data,
          director: {
            ...data.director,
            signatureUrl: base64,
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const addMissionPillar = () => {
    const currentCount = data.visionMission.pillars.length;
    const newPillar: StrategicPillar = {
      no: `0${currentCount + 1}`,
      category: 'INOVASI',
      title: 'Transformasi Digital Berkelanjutan',
      description: 'Integrasi otomatisasi dan optimasi proses konstruksi berbasis teknologi hijau terkini.',
      tag: `→ PILAR 0${currentCount + 1}`,
    };
    onChange({
      ...data,
      visionMission: {
        ...data.visionMission,
        pillars: [...data.visionMission.pillars, newPillar],
      },
    });
  };

  const updateMissionPillar = (index: number, key: keyof StrategicPillar, value: string) => {
    const newPillars = [...data.visionMission.pillars];
    if (newPillars[index]) {
      newPillars[index] = { ...newPillars[index], [key]: value };
      onChange({
        ...data,
        visionMission: {
          ...data.visionMission,
          pillars: newPillars,
        },
      });
    }
  };

  const removeMissionPillar = (index: number) => {
    const newPillars = data.visionMission.pillars.filter((_, idx) => idx !== index);
    onChange({
      ...data,
      visionMission: {
        ...data.visionMission,
        pillars: newPillars,
      },
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <aside
        className="no-print fixed top-14 left-0 bottom-0 w-[420px] max-w-[95vw] bg-white border-r border-zinc-200 z-50 flex flex-col shadow-2xl transition-transform duration-300"
        aria-label="Editor Monograf Arsitektural"
      >
        {/* Editor Header */}
        <div className="h-14 px-4 bg-[#1c1917] text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#f59e0b] block"></span>
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#f59e0b] uppercase">
                LEFT EDITOR PANEL
              </div>
              <div className="text-[11px] text-zinc-400">Live InDesign Parameters</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              title="Print / Export PDF"
              className="p-1.5 bg-[#f59e0b] hover:bg-amber-500 text-[#1c1917] font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip (7 Document Tabs + Presets) */}
        <div className="flex bg-zinc-100 border-b border-zinc-200 overflow-x-auto custom-scrollbar shrink-0 text-xs font-mono">
          <button
            onClick={() => {
              setActiveTab('cover');
              if (activeSpread !== 'all') onSelectSpread('01');
            }}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'cover'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : !pageVisibility.cover
                ? 'border-transparent text-zinc-400 hover:text-zinc-600 opacity-60'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>1. Sampul / Cover</span>
            {!pageVisibility.cover && <span className="text-[9px] text-zinc-400">(OFF)</span>}
          </button>
          <button
            onClick={() => {
              setActiveTab('about');
              if (activeSpread !== 'all') onSelectSpread('02');
            }}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'about'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : !pageVisibility.about
                ? 'border-transparent text-zinc-400 hover:text-zinc-600 opacity-60'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>2. Tentang &amp; Visi-Misi</span>
            {!pageVisibility.about && <span className="text-[9px] text-zinc-400">(OFF)</span>}
          </button>
          <button
            onClick={() => {
              setActiveTab('team');
              if (activeSpread !== 'all') onSelectSpread('03');
            }}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'team'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : !pageVisibility.team
                ? 'border-transparent text-zinc-400 hover:text-zinc-600 opacity-60'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Tim Eksekutif</span>
            {!pageVisibility.team && <span className="text-[9px] text-zinc-400">(OFF)</span>}
          </button>
          <button
            onClick={() => {
              setActiveTab('legal');
              if (activeSpread !== 'all') onSelectSpread('04');
            }}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'legal'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : !pageVisibility.legal
                ? 'border-transparent text-zinc-400 hover:text-zinc-600 opacity-60'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>4. Legalitas &amp; Sertifikasi</span>
            {!pageVisibility.legal && <span className="text-[9px] text-zinc-400">(OFF)</span>}
          </button>
          <button
            onClick={() => {
              setActiveTab('portfolio');
              if (activeSpread !== 'all') onSelectSpread('05');
            }}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'portfolio'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : !pageVisibility.portfolio
                ? 'border-transparent text-zinc-400 hover:text-zinc-600 opacity-60'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-purple-600" />
            <span>5. Portofolio Proyek</span>
            {!pageVisibility.portfolio && <span className="text-[9px] text-zinc-400">(OFF)</span>}
          </button>
          <button
            onClick={() => {
              setActiveTab('backCover');
              if (activeSpread !== 'all') onSelectSpread('06');
            }}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'backCover'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : !pageVisibility.backCover
                ? 'border-transparent text-zinc-400 hover:text-zinc-600 opacity-60'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>6. Kontak &amp; Penutup</span>
            {!pageVisibility.backCover && <span className="text-[9px] text-zinc-400">(OFF)</span>}
          </button>
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'themes'
                ? 'border-[#1c1917] bg-white text-[#1c1917]'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-500" />
            7. Desain &amp; Tema
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'presets'
                ? 'border-[#f59e0b] bg-white text-[#1c1917]'
                : 'border-transparent text-zinc-600 hover:text-[#1c1917]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Presets
          </button>
        </div>

        {/* Scrollable Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
          {/* TAB: SAMPUL / COVER (HALAMAN 01) */}
          {activeTab === 'cover' && (
            <div className="space-y-4">
              {renderPageVisibilityBanner(
                'cover',
                'Tampilkan Halaman Cover',
                'Default: ON (disarankan tetap ON). Halaman sampul muka utama monograf arsitektur.',
                '01'
              )}

              {/* Cover Tab Header Card */}
              <div className="p-3 bg-zinc-900 text-white border-l-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    01. SAMPUL / COVER ARCHITECTURAL MONOGRAPH
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectSpread('01')}
                    className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black px-2 py-0.5 font-bold uppercase transition-colors"
                  >
                    Lihat di Preview
                  </button>
                </div>
                <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                  Pengaturan langsung elemen visual sampul muka. Perubahan nama, jenis dokumen, sub-judul, tahun fiskal, foto hero, dan 4 metrik kinerja langsung tersinkronisasi seketika dan adaptif pada 5 tema desain.
                </p>
              </div>

              {/* SECTION 1: IDENTITAS & TIPOGRAFI JUDUL */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider border-b border-zinc-200 pb-1.5 flex items-center justify-between">
                  <span>Identitas &amp; Tipografi Sampul</span>
                  <span className="text-[10px] text-amber-600 font-mono">LIVE EDIT</span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                    Nama Perusahaan (PT / CV / Perseroan)
                  </label>
                  <input
                    type="text"
                    value={data.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    placeholder="PT ARYA CIPTA KONSTRUKSI TBK"
                    className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                    Bentuk Badan Hukum (Legal Entity)
                  </label>
                  <input
                    type="text"
                    value={data.legalEntity}
                    onChange={(e) => updateField('legalEntity', e.target.value)}
                    placeholder="PERSEROAN TERBATAS TERBUKA (TBK)"
                    className="w-full px-2 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                    Tipe Dokumen (Cover Document Type)
                  </label>
                  <input
                    type="text"
                    value={data.coverDocumentType || 'COMPANY PROFILE'}
                    onChange={(e) => updateField('coverDocumentType', e.target.value)}
                    placeholder="COMPANY PROFILE"
                    className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs font-bold uppercase tracking-wider"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {[
                      'COMPANY PROFILE',
                      'CORPORATE PROFILE',
                      'ARCHITECTURAL PORTFOLIO',
                      'PORTFOLIO & LEGALS',
                      'PROFIL KORPORASI',
                    ].map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => updateField('coverDocumentType', pill)}
                        className={`text-[9px] px-2 py-0.5 border font-mono transition-colors ${
                          (data.coverDocumentType || 'COMPANY PROFILE') === pill
                            ? 'bg-amber-500 text-black border-amber-600 font-bold'
                            : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                    Tagline / Sub-judul Sampul
                  </label>
                  <input
                    type="text"
                    value={data.tagline}
                    onChange={(e) => updateField('tagline', e.target.value)}
                    placeholder="KONTRAKTOR UTAMA ARSITEKTUR KOMERSIAL & INFRASTRUKTUR PRESISI TINGGI"
                    className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono uppercase text-zinc-600">
                      Tahun Dokumen / Periode Fiskal
                    </label>
                    <span className="text-[9px] text-emerald-600 font-mono font-bold">
                      Tema Adaptif
                    </span>
                  </div>
                  <input
                    type="text"
                    value={data.fiscalYear}
                    onChange={(e) => updateField('fiscalYear', e.target.value)}
                    placeholder="2026 / 2027"
                    className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs font-mono font-bold"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['2026', '2026 / 2027', '2028', '2029', '2026–2030'].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => updateField('fiscalYear', yr)}
                        className={`text-[9px] px-2 py-0.5 border font-mono transition-colors ${
                          data.fiscalYear === yr
                            ? 'bg-amber-500 text-black border-amber-600 font-bold'
                            : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1 italic">
                    Contoh: tema Swiss Tangerine menampilkan <strong>/{data.fiscalYear || '2029'}</strong>, tema Cyber Crimson menampilkan tipografi raksasa <strong>{data.fiscalYear ? data.fiscalYear.split('/')[0].trim() : '2028'}</strong>, dan tema Tech Navy &amp; Sage menampilkan di Folio Header.
                  </p>

                  {/* SUB-SECTION COLLAPSIBLE: PENGATURAN POSISI & TIPOGRAFI TAHUN (FINE-TUNING) */}
                  <div className="mt-3 border border-amber-300 bg-amber-50/40 rounded-none overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setFineTuneOpen(!fineTuneOpen)}
                      className="w-full px-3 py-2 bg-amber-100/70 hover:bg-amber-100 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-[11px] uppercase tracking-wider">
                        <Sliders className="w-3.5 h-3.5 text-amber-700" />
                        <span>Pengaturan Posisi &amp; Tipografi Tahun (Fine-Tuning)</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-600 font-mono text-[10px]">
                        <span>{fineTuneOpen ? 'Tutup' : 'Buka'}</span>
                        {fineTuneOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 text-zinc-700" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                        )}
                      </div>
                    </button>

                    {fineTuneOpen && (
                      <div className="p-3 space-y-3 bg-white border-t border-amber-200 text-xs">
                        <p className="text-[10px] text-zinc-600 leading-relaxed">
                          Atur posisi presisi koordinat (X &amp; Y), ukuran tipografi tahun, dan perataan vertikal agar tidak bertubrukan dengan judul atau ornamen dekoratif.
                        </p>

                        {/* 1. Posisi Vertikal (Y-Offset) */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-700 font-bold">
                              Posisi Vertikal (Y-Offset)
                            </label>
                            <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                              {currentFineTune.yOffset > 0 ? `+${currentFineTune.yOffset}` : currentFineTune.yOffset}px
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={-50}
                              max={50}
                              step={1}
                              value={currentFineTune.yOffset}
                              onChange={(e) => updateFineTune({ yOffset: Number(e.target.value) })}
                              className="flex-1 accent-amber-600 cursor-pointer"
                            />
                            <input
                              type="number"
                              min={-50}
                              max={50}
                              value={currentFineTune.yOffset}
                              onChange={(e) => updateFineTune({ yOffset: Number(e.target.value) })}
                              className="w-16 px-1.5 py-1 border border-zinc-300 font-mono text-[11px] text-center focus:border-amber-500 focus:outline-none"
                            />
                          </div>
                          <span className="text-[9px] text-zinc-400 block mt-0.5">Rentang: -50px sampai +50px (default: 0px)</span>
                        </div>

                        {/* 2. Posisi Horizontal (X-Offset) */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-700 font-bold">
                              Posisi Horizontal (X-Offset)
                            </label>
                            <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                              {currentFineTune.xOffset > 0 ? `+${currentFineTune.xOffset}` : currentFineTune.xOffset}px
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={-100}
                              max={50}
                              step={1}
                              value={currentFineTune.xOffset}
                              onChange={(e) => updateFineTune({ xOffset: Number(e.target.value) })}
                              className="flex-1 accent-amber-600 cursor-pointer"
                            />
                            <input
                              type="number"
                              min={-100}
                              max={50}
                              value={currentFineTune.xOffset}
                              onChange={(e) => updateFineTune({ xOffset: Number(e.target.value) })}
                              className="w-16 px-1.5 py-1 border border-zinc-300 font-mono text-[11px] text-center focus:border-amber-500 focus:outline-none"
                            />
                          </div>
                          <span className="text-[9px] text-zinc-400 block mt-0.5">Rentang: -100px (geser ke kiri) sampai +50px (kanan)</span>
                        </div>

                        {/* 3. Ukuran Font Tahun (Font Size) */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-700 font-bold">
                              Ukuran Font Tahun (Font Size)
                            </label>
                            <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                              {currentFineTune.fontSize}px
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={18}
                              max={40}
                              step={1}
                              value={currentFineTune.fontSize}
                              onChange={(e) => updateFineTune({ fontSize: Number(e.target.value) })}
                              className="flex-1 accent-amber-600 cursor-pointer"
                            />
                            <input
                              type="number"
                              min={18}
                              max={40}
                              value={currentFineTune.fontSize}
                              onChange={(e) => updateFineTune({ fontSize: Number(e.target.value) })}
                              className="w-16 px-1.5 py-1 border border-zinc-300 font-mono text-[11px] text-center focus:border-amber-500 focus:outline-none"
                            />
                          </div>
                          <span className="text-[9px] text-zinc-400 block mt-0.5">Rentang: 18px sampai 40px (default tema: 28px)</span>
                        </div>

                        {/* 4. Perataan Vertikal (Vertical Align) */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-1">
                            Perataan Vertikal (Vertical Align)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                            {[
                              { id: 'top', label: 'Sejajar Atas Judul' },
                              { id: 'middle', label: 'Sejajar Tengah Judul' },
                              { id: 'bottom', label: 'Sejajar Baseline Bawah' },
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => updateFineTune({ verticalAlign: opt.id as YearVerticalAlign })}
                                className={`px-2 py-1.5 border text-center text-[10px] transition-colors cursor-pointer ${
                                  currentFineTune.verticalAlign === opt.id
                                    ? 'bg-amber-500 text-black border-amber-600 font-bold shadow-xs'
                                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-300'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 5. Switch / Toggle: Tampilkan Badge Akreditasi */}
                        <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase font-bold text-zinc-800 block">
                              Tampilkan Badge Akreditasi
                            </span>
                            <span className="text-[9px] text-zinc-500">
                              Pita/Badge "TERAKREDITASI" di bawah angka tahun
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateFineTune({ showBadge: currentFineTune.showBadge === false })}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              currentFineTune.showBadge !== false ? 'bg-amber-500' : 'bg-zinc-300'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                currentFineTune.showBadge !== false ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* 6. Tombol Reset Posisi Elemen */}
                        <div className="pt-2 border-t border-zinc-200">
                          <button
                            type="button"
                            onClick={handleResetFineTune}
                            className="w-full py-2 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                            <span>🔄 Reset Tata Letak ke Default Tema</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-mono uppercase text-zinc-600">
                      Deskripsi Pengantar Sampul (Lead Paragraph)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'coverDescription',
                          'Monograf arsitektural dan portofolio rekayasa konstruksi terintegrasi dengan standar kepatuhan teknis, presisi struktural, dan tata kelola berintegritas tinggi.'
                        )
                      }
                      className="text-[9px] text-amber-700 hover:underline font-mono"
                    >
                      Reset Default
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={
                      data.coverDescription !== undefined
                        ? data.coverDescription
                        : 'Monograf arsitektural dan portofolio rekayasa konstruksi terintegrasi dengan standar kepatuhan teknis, presisi struktural, dan tata kelola berintegritas tinggi.'
                    }
                    onChange={(e) => updateField('coverDescription', e.target.value)}
                    placeholder="Paragraf pengantar singkat di bawah judul cover..."
                    className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* SECTION 2: FOTO UTAMA ARSITEKTUR SAMPUL (HERO SHOWCASE) */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider border-b border-zinc-200 pb-1.5 flex items-center justify-between">
                  <span>Foto Hero Arsitektur Sampul</span>
                  <span className="text-[10px] text-amber-600 font-mono">16:9 RATIO</span>
                </div>

                {/* Thumbnail Preview */}
                <div className="relative aspect-[16/9] w-full bg-zinc-900 border border-zinc-300 overflow-hidden shadow-inner group">
                  <img
                    src={data.coverPhotoUrl || data.portfolio.flagship.photoUrl}
                    alt="Cover Hero Preview"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-white text-xs">
                    Foto Sampul Aktif
                  </div>
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5">
                    HERO COVER
                  </div>
                </div>

                {/* Upload & Sync Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-black px-2.5 py-2 text-center font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverPhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => updateField('coverPhotoUrl', data.portfolio.flagship.photoUrl)}
                    className="bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 px-2.5 py-2 font-semibold text-[10px] flex items-center justify-center gap-1 transition-colors"
                    title="Gunakan foto yang sama dengan Proyek Flagship (Menara SCBD)"
                  >
                    <RefreshCw className="w-3 h-3 text-zinc-500" />
                    <span>Gunakan Foto Proyek</span>
                  </button>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                    URL Foto Arsitektur (Direct Web Link)
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={data.coverPhotoUrl || data.portfolio.flagship.photoUrl}
                      onChange={(e) => updateField('coverPhotoUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-2 py-1.5 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateField(
                          'coverPhotoUrl',
                          'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1600&q=85'
                        )
                      }
                      className="px-2 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-[10px] font-mono"
                      title="Reset URL ke Menara SCBD default"
                    >
                      Default
                    </button>
                  </div>
                </div>

                {/* Quick Presets Curated Architecture Images */}
                <div>
                  <span className="block text-[10px] font-mono uppercase text-zinc-500 mb-1.5">
                    Pilihan Preset Foto Arsitektur Resolusi Tinggi:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      {
                        name: 'SCBD Monolith Tower',
                        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1600&q=85',
                      },
                      {
                        name: 'Modern Glass Skyscraper',
                        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
                      },
                      {
                        name: 'Structural Steel Truss',
                        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
                      },
                      {
                        name: 'Minimalist Concrete & Glass',
                        url: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=1600&q=85',
                      },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => updateField('coverPhotoUrl', preset.url)}
                        className={`p-1.5 border text-left text-[10px] transition-colors flex items-center gap-1.5 ${
                          (data.coverPhotoUrl || data.portfolio.flagship.photoUrl) === preset.url
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                            : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-700'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3 shrink-0 text-amber-600" />
                        <span className="truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: METRIK STATISTIK CEPAT COVER */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider border-b border-zinc-200 pb-1.5 flex items-center justify-between">
                  <span>Metrik Statistik Cepat Cover</span>
                  <span className="text-[10px] text-amber-600 font-mono">4 INDIKATOR</span>
                </div>
                <p className="text-[10px] text-zinc-500">
                  Nilai statistik ini tampil di banner bawah Halaman Sampul (Cover). Anda dapat mengubah angka, label, atau keterangannya langsung:
                </p>

                <div className="space-y-2.5">
                  {data.stats.slice(0, 4).map((st, idx) => (
                    <div
                      key={st.id || idx}
                      className="p-2.5 bg-white border border-zinc-200 space-y-1.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">
                          Indikator {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {st.id}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5">
                          <label className="block text-[9px] font-mono uppercase text-zinc-500">
                            Angka / Nilai
                          </label>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => updateStatItem(idx, 'value', e.target.value)}
                            placeholder="180+"
                            className="w-full px-2 py-1 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs font-mono font-bold"
                          />
                        </div>
                        <div className="col-span-7">
                          <label className="block text-[9px] font-mono uppercase text-zinc-500">
                            Label Indikator
                          </label>
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => updateStatItem(idx, 'label', e.target.value)}
                            placeholder="01 / KAPASITAS PROYEK"
                            className="w-full px-2 py-1 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-zinc-500">
                          Sub-label / Keterangan Singkat
                        </label>
                        <input
                          type="text"
                          value={st.subvalue}
                          onChange={(e) => updateStatItem(idx, 'subvalue', e.target.value)}
                          placeholder="PROYEK STRATEGIS"
                          className="w-full px-2 py-1 border border-zinc-300 focus:border-amber-500 focus:outline-none text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 0: TEMA DESAIN STRUKTURAL (5 DESAIN REFERENSI) */}
          {activeTab === 'themes' && (
            <div className="space-y-4">
              <div className="p-3 bg-zinc-900 text-white border-l-4 border-amber-400">
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  SISTEM STRUKTUR TATA LETAK & ELEMEN GRAFIS
                </span>
                <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                  Bukan hanya warna! Memilih tema merombak <strong>seluruh struktur layout, grid modular, tipografi display, dan elemen grafis</strong> (lingkaran scarlet, wireframe mengambang, blok oranye vertikal, telemetry gelap). Data teks, logo, toggle, dan foto Anda tetap 100% utuh tanpa reset.
                </p>
              </div>

              <div className="space-y-3">
                {THEME_LIST.map((th, index) => {
                  const isSelected = th.id === currentTheme;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => onSelectTheme(th.id)}
                      className={`w-full text-left p-3.5 border-2 transition-all relative group flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#1c1917] bg-white shadow-md ring-2 ring-black/10'
                          : 'border-zinc-200 bg-white hover:border-zinc-400'
                      }`}
                    >
                      {/* Top Bar with Accent Pill & Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-xs shrink-0 border border-black/20"
                            style={{ backgroundColor: th.accentColor }}
                          />
                          <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">
                            TEMA 0{index + 1}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="bg-[#1c1917] text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-400" /> AKTIF
                          </span>
                        )}
                      </div>

                      {/* Theme Title & Subtitle */}
                      <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
                        {th.name}
                      </h4>
                      <p className="text-[11px] text-zinc-600 font-medium mt-0.5 font-sans">
                        {th.subtitle}
                      </p>

                      {/* Structural Description */}
                      <div className="mt-2.5 pt-2 border-t border-zinc-100 text-[11px] text-zinc-500 font-sans leading-relaxed">
                        {th.description}
                      </div>

                      {/* Graphic Features Tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1 font-mono text-[9px]">
                        {th.id === 'tech-navy' && (
                          <>
                            <span className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 border border-emerald-900">Navy Gelap (#0f172a)</span>
                            <span className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 border border-emerald-900">Garis Mint 1px</span>
                            <span className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 border border-emerald-900">2-Kolom Terstruktur</span>
                          </>
                        )}
                        {th.id === 'swiss-tangerine' && (
                          <>
                            <span className="bg-zinc-100 text-black px-1.5 py-0.5 border border-black">Putih Bersih</span>
                            <span className="bg-orange-500 text-white px-1.5 py-0.5">Blok Oranye Kiri</span>
                            <span className="bg-zinc-100 text-black px-1.5 py-0.5 border border-black">Tahun Vertikal /2029</span>
                          </>
                        )}
                        {th.id === 'cyber-crimson' && (
                          <>
                            <span className="bg-zinc-950 text-[#ff2d55] px-1.5 py-0.5 border border-rose-900">Tahun 2028 Raksasa</span>
                            <span className="bg-zinc-950 text-[#ff2d55] px-1.5 py-0.5 border border-rose-900">Split Vertikal Foto</span>
                            <span className="bg-zinc-950 text-[#ff2d55] px-1.5 py-0.5 border border-rose-900">Bab 01-03 Sudut</span>
                          </>
                        )}
                        {th.id === 'scarlet-circle' && (
                          <>
                            <span className="bg-red-600 text-white px-1.5 py-0.5">Cincin Merah Raksasa</span>
                            <span className="bg-red-50 text-red-700 px-1.5 py-0.5 border border-red-200">Header Merah Solid</span>
                            <span className="bg-red-50 text-red-700 px-1.5 py-0.5 border border-red-200">Bab Kotak Merah</span>
                          </>
                        )}
                        {th.id === 'sage-wireframe' && (
                          <>
                            <span className="bg-[#fcfbf8] text-[#627566] px-1.5 py-0.5 border border-[#d6ddd6]">Linen Hangat</span>
                            <span className="bg-[#fcfbf8] text-[#627566] px-1.5 py-0.5 border border-[#d6ddd6]">Wireframe Mengambang</span>
                            <span className="bg-[#fcfbf8] text-[#627566] px-1.5 py-0.5 border border-[#d6ddd6]">Whitespace Tenang</span>
                          </>
                        )}
                        {th.id === 'royal-slant' && (
                          <>
                            <span className="bg-[#1e3a8a] text-white px-1.5 py-0.5">Royal Navy</span>
                            <span className="bg-[#ea580c] text-white px-1.5 py-0.5">Tangerine Orange</span>
                            <span className="bg-slate-100 text-[#1e3a8a] px-1.5 py-0.5 border border-[#1e3a8a]/30">Parallelogram Miring</span>
                          </>
                        )}
                        {th.id === 'hexagon-charcoal' && (
                          <>
                            <span className="bg-[#18181b] text-white px-1.5 py-0.5">Dark Charcoal</span>
                            <span className="bg-[#f97316] text-white px-1.5 py-0.5">Saturated Orange</span>
                            <span className="bg-zinc-100 text-zinc-900 px-1.5 py-0.5 border border-zinc-300">Bingkai Hexagon</span>
                          </>
                        )}
                        {th.id === 'cobalt-slash' && (
                          <>
                            <span className="bg-[#2563eb] text-white px-1.5 py-0.5">Electric Cobalt</span>
                            <span className="bg-[#0f172a] text-sky-400 px-1.5 py-0.5">Deep Indigo</span>
                            <span className="bg-blue-50 text-[#2563eb] px-1.5 py-0.5 border border-blue-200">Diagonal Slash Ribbon</span>
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 1: SMART TOGGLES */}
          {activeTab === 'toggles' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200">
                <span className="font-mono text-[10px] text-amber-900 font-bold uppercase tracking-wider block">
                  ADAPTIVE ZERO-GAP REFLOW ENGINE
                </span>
                <p className="text-[11px] text-amber-800 mt-1">
                  Matikan Sambutan Direktur untuk melihat reflow otomatis: bagian Visi & Misi akan melebar 100% penuh tanpa ada ruang kosong.
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Director Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div className="pr-2">
                    <div className="font-bold text-[#1c1917] flex items-center gap-1.5">
                      <span>01. Sambutan Direktur</span>
                      {!toggles.showDirectorMessage && (
                        <span className="bg-[#1c1917] text-[#f59e0b] font-mono text-[9px] px-1 py-0.2 uppercase">
                          REFLOW FULL-WIDTH
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      {toggles.showDirectorMessage
                        ? 'Aktif (5 Kolom kiri + 7 Kolom kanan)'
                        : 'Nonaktif: Kolom Visi & Misi reflow melebar 100%'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showDirectorMessage}
                      onChange={() => handleToggle('showDirectorMessage')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>

                {/* Vision & Mission Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1c1917]">02. Visi & Misi Matrix</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Tampilkan target 2035 & 3 Pilar Strategis
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showVisionMission}
                      onChange={() => handleToggle('showVisionMission')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>

                {/* HSE Policy Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1c1917]">03. Kebijakan K3 & QHSE</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Tampilkan sertifikasi ISO & jam kerja aman 14.8M
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showHSEPolicy}
                      onChange={() => handleToggle('showHSEPolicy')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>

                {/* Team Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1c1917]">04. Bab Tim & Kepemimpinan</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Aktifkan atau sembunyikan lembar Spreads 03
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showTeam}
                      onChange={() => handleToggle('showTeam')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>

                {/* Legal Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1c1917]">05. Bab Kepatuhan & Legalitas</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Aktifkan atau sembunyikan lembar Spreads 04
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showLegal}
                      onChange={() => handleToggle('showLegal')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>

                {/* Projects Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1c1917]">06. Bab Portofolio Proyek</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Aktifkan atau sembunyikan lembar Spreads 05
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showProjects}
                      onChange={() => handleToggle('showProjects')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>

                {/* Back Cover Toggle */}
                <div className="p-3 border border-zinc-200 bg-white hover:border-[#1c1917] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1c1917]">07. Bab Kontak &amp; Penutup (Back Cover)</div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Aktifkan atau sembunyikan lembar Spreads 06 pada monograf &amp; cetak
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showBackCover !== false}
                      onChange={() => handleToggle('showBackCover')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>
              </div>

              {/* Accent Switcher Button */}
              <div className="pt-3 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={onToggleAmberAccent}
                  className="w-full py-2 px-3 border border-[#1c1917] bg-white hover:bg-[#1c1917] hover:text-[#f59e0b] font-mono text-[11px] font-bold uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <span className="w-2.5 h-2.5 bg-[#f59e0b] inline-block"></span>
                  {amberAccent ? 'AKTIF: HAZARD AMBER' : 'AKTIF: CARBON MONOCHROME'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TENTANG & VISI-MISI (HALAMAN 02) */}
          {(activeTab === 'about' || activeTab === 'company' || activeTab === 'director' || activeTab === 'vision') && (
            <div className="space-y-4">
              {renderPageVisibilityBanner(
                'about',
                'Tampilkan Halaman Tentang & Visi',
                'Default: ON. Lembar pengantar manifesto, sambutan direksi, visi misi korporasi, dan kebijakan QHSE.',
                '02'
              )}

              {/* Header Card */}
              <div className="p-3 bg-zinc-900 text-white border-l-4 border-emerald-500">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    02. TENTANG KAMI &amp; VISI-MISI STRATEGIS
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectSpread('02')}
                    className="text-[10px] bg-emerald-500 hover:bg-emerald-400 text-black px-2 py-0.5 font-bold uppercase transition-colors"
                  >
                    Lihat di Preview
                  </button>
                </div>
                <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                  Pengaturan terpadu untuk Halaman 02: Pesan Direktur Utama, Visi &amp; Misi Korporasi, Kebijakan Mutu &amp; K3 (QHSE), serta Angka Capaian Kinerja. Halaman ini otomatis reflow (zero-gap) saat toggle diaktifkan atau dinonaktifkan.
                </p>
              </div>

              {/* Paragraf Pengantar Bab 02 (Lead Manifesto) */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-2">
                <label className="block text-[10px] font-mono uppercase text-zinc-600 font-bold">
                  Paragraf Pengantar Bab 02 (Lead Manifesto)
                </label>
                <textarea
                  rows={2}
                  value={data.manifestoLead}
                  onChange={(e) => updateField('manifestoLead', e.target.value)}
                  placeholder="Rekayasa Arsitektur Modern, Infrastruktur Komersial Berkelanjutan..."
                  className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>

              {/* 1. TOGGLE & FORM: SAMBUTAN PESAN DIREKTUR */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div>
                    <span className="font-bold text-zinc-900 text-[11px] uppercase tracking-wider block">
                      1. Pesan &amp; Sambutan Direktur
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {toggles.showDirectorMessage ? 'Aktif (Muncul di Halaman 02)' : 'Nonaktif: Kolom Visi reflow melebar penuh 100%'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showDirectorMessage}
                      onChange={() => handleToggle('showDirectorMessage')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {toggles.showDirectorMessage ? (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                          Nama Direktur Utama
                        </label>
                        <input
                          type="text"
                          value={data.director.name}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              director: { ...data.director, name: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                          Jabatan Resmi
                        </label>
                        <input
                          type="text"
                          value={data.director.title}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              director: { ...data.director, title: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                          Nomor Registrasi BAPEKAN
                        </label>
                        <input
                          type="text"
                          value={data.director.regNo}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              director: { ...data.director, regNo: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                          Label Lencana Sudut Foto
                        </label>
                        <input
                          type="text"
                          value={data.director.badge}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              director: { ...data.director, badge: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                        Kutipan Utama (Lead Quote)
                      </label>
                      <textarea
                        rows={2}
                        value={data.director.quote}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            director: { ...data.director, quote: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs italic font-medium leading-snug"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                        Isi Teks Sambutan (Paragraf 1)
                      </label>
                      <textarea
                        rows={3}
                        value={data.director.paragraph1}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            director: { ...data.director, paragraph1: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                        Isi Teks Sambutan (Paragraf 2 - Muncul saat Ekspansi)
                      </label>
                      <textarea
                        rows={2}
                        value={data.director.paragraph2}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            director: { ...data.director, paragraph2: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs leading-relaxed"
                      />
                    </div>

                    {/* Foto Direktur */}
                    <div className="pt-2 border-t border-zinc-200">
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1.5 font-bold">
                        Foto Resmi Direktur Utama
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-16 bg-zinc-200 border border-zinc-300 overflow-hidden shrink-0">
                          <img
                            src={data.director.photoUrl}
                            alt="Preview Direktur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex gap-2">
                            <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 text-[10px] font-bold uppercase flex items-center gap-1 transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Upload Foto</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleDirectorPhotoUpload}
                                className="hidden"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                onChange({
                                  ...data,
                                  director: {
                                    ...data.director,
                                    photoUrl: defaultCompanyData.director.photoUrl,
                                  },
                                })
                              }
                              className="px-2 py-1 border border-zinc-300 bg-white hover:bg-zinc-100 text-[10px] text-zinc-600 font-mono"
                            >
                              Reset Default
                            </button>
                          </div>
                          <input
                            type="text"
                            value={data.director.photoUrl}
                            onChange={(e) =>
                              onChange({
                                ...data,
                                director: { ...data.director, photoUrl: e.target.value },
                              })
                            }
                            placeholder="URL Foto..."
                            className="w-full px-2 py-1 border border-zinc-300 text-[10px] font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tanda Tangan Direktur */}
                    <div className="pt-2 border-t border-zinc-200">
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1.5 font-bold">
                        Tanda Tangan Digital Direktur
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-10 bg-zinc-100 border border-zinc-300 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                          {data.director.signatureUrl ? (
                            <img
                              src={data.director.signatureUrl}
                              alt="TTD Direktur"
                              className="h-full w-auto object-contain"
                            />
                          ) : (
                            <span className="text-[9px] text-zinc-400 font-mono italic">Belum Ada</span>
                          )}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex gap-2">
                            <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 text-[10px] font-bold uppercase flex items-center gap-1 transition-colors">
                              <Upload className="w-3 h-3" />
                              <span>Upload TTD (PNG)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleDirectorSignatureUpload}
                                className="hidden"
                              />
                            </label>
                            {data.director.signatureUrl && (
                              <button
                                type="button"
                                onClick={() =>
                                  onChange({
                                    ...data,
                                    director: { ...data.director, signatureUrl: undefined },
                                  })
                                }
                                className="px-2 py-1 border border-rose-200 text-rose-700 hover:bg-rose-50 text-[10px] font-mono"
                              >
                                Hapus TTD
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={data.director.signatureUrl || ''}
                            onChange={(e) =>
                              onChange({
                                ...data,
                                director: { ...data.director, signatureUrl: e.target.value },
                              })
                            }
                            placeholder="URL Gambar TTD transparan..."
                            className="w-full px-2 py-1 border border-zinc-300 text-[10px] font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>
                      <strong>Reflow Otomatis Aktif:</strong> Sambutan Direktur disembunyikan. Matriks Visi &amp; Misi melebar penuh mengisi 100% tinggi lembar A4 tanpa rongga kosong.
                    </span>
                  </div>
                )}
              </div>

              {/* 2. TOGGLE & FORM: VISI & MISI PERUSAHAAN */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div>
                    <span className="font-bold text-zinc-900 text-[11px] uppercase tracking-wider block">
                      2. Visi &amp; Misi Korporasi
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {toggles.showVisionMission !== false ? 'Aktif (Muncul di Halaman 02)' : 'Nonaktif: Pesan Direktur reflow melebar'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showVisionMission !== false}
                      onChange={() => handleToggle('showVisionMission')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {toggles.showVisionMission !== false && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1 font-bold">
                        Pernyataan Visi Utama 2035
                      </label>
                      <textarea
                        rows={2}
                        value={data.visionMission.visionStatement}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            visionMission: {
                              ...data.visionMission,
                              visionStatement: e.target.value,
                            },
                          })
                        }
                        className="w-full px-2.5 py-1.5 border border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs uppercase font-bold leading-snug"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-zinc-500 mb-1">
                          Target Emisi Karbon
                        </label>
                        <input
                          type="text"
                          value={data.visionMission.targetEmissions}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              visionMission: {
                                ...data.visionMission,
                                targetEmissions: e.target.value,
                              },
                            })
                          }
                          className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-zinc-500 mb-1">
                          Target Implementasi BIM
                        </label>
                        <input
                          type="text"
                          value={data.visionMission.targetBim}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              visionMission: {
                                ...data.visionMission,
                                targetBim: e.target.value,
                              },
                            })
                          }
                          className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Dynamic Mission Pillars (Pilar-Pilar Misi) */}
                    <div className="pt-2 border-t border-zinc-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase text-zinc-600 font-bold">
                          Butir-Butir Misi Strategis ({data.visionMission.pillars.length} Pilar)
                        </span>
                        <button
                          type="button"
                          onClick={addMissionPillar}
                          className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 flex items-center gap-1 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Pilar</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {data.visionMission.pillars.map((pillar, idx) => (
                          <div
                            key={pillar.no || idx}
                            className="p-2.5 bg-white border border-zinc-300 space-y-1.5 shadow-xs"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-[10px] font-bold text-emerald-700">
                                PILAR 0{idx + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={pillar.category || pillar.tag}
                                  onChange={(e) => updateMissionPillar(idx, 'category', e.target.value)}
                                  placeholder="KATEGORI"
                                  className="w-24 px-1.5 py-0.5 border border-zinc-200 text-[10px] font-mono uppercase text-right"
                                />
                                {data.visionMission.pillars.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeMissionPillar(idx)}
                                    className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                                    title="Hapus butir misi ini"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => updateMissionPillar(idx, 'title', e.target.value)}
                              placeholder="Judul Pilar..."
                              className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold"
                            />
                            <textarea
                              rows={2}
                              value={pillar.description}
                              onChange={(e) => updateMissionPillar(idx, 'description', e.target.value)}
                              placeholder="Deskripsi pilar misi..."
                              className="w-full px-2 py-1 border border-zinc-300 text-xs leading-relaxed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. TOGGLE & FORM: KOMITMEN HSE / K3 */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div>
                    <span className="font-bold text-zinc-900 text-[11px] uppercase tracking-wider block">
                      3. Komitmen &amp; Kebijakan HSE / K3 (QHSE)
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {toggles.showHSEPolicy ? 'Aktif (Tampil di kotak K3)' : 'Nonaktif'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showHSEPolicy}
                      onChange={() => handleToggle('showHSEPolicy')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {toggles.showHSEPolicy && (
                  <div className="space-y-2.5 pt-1">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                        Judul Kebijakan Mutu &amp; K3
                      </label>
                      <input
                        type="text"
                        value={data.visionMission.qhseTitle}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            visionMission: {
                              ...data.visionMission,
                              qhseTitle: e.target.value,
                            },
                          })
                        }
                        className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                        Pernyataan Komitmen Kebijakan K3
                      </label>
                      <textarea
                        rows={2}
                        value={
                          data.visionMission.qhsePolicyText ||
                          'Komitmen tanpa henti terhadap keselamatan kerja dan zero-incident di seluruh tapak proyek konstruksi.'
                        }
                        onChange={(e) =>
                          onChange({
                            ...data,
                            visionMission: {
                              ...data.visionMission,
                              qhsePolicyText: e.target.value,
                            },
                          })
                        }
                        placeholder="Uraian kebijakan mutu keselamatan kerja..."
                        className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-zinc-600 mb-1">
                        Rekor Jam Kerja Selamat (Zero Accident / LTI)
                      </label>
                      <input
                        type="text"
                        value={data.visionMission.safeHours}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            visionMission: {
                              ...data.visionMission,
                              safeHours: e.target.value,
                            },
                          })
                        }
                        placeholder="14.850.000 JAM KERJA TANPA KECELAKAAN (ZERO LTI)"
                        className="w-full px-2.5 py-1.5 border border-zinc-300 font-mono text-xs font-bold text-emerald-800"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. ANGKA METRIK CAPAIAN SINGKAT */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-3">
                <div className="border-b border-zinc-200 pb-1.5 flex items-center justify-between">
                  <span className="font-bold text-zinc-900 text-[11px] uppercase tracking-wider block">
                    4. Angka Metrik Capaian Singkat Halaman 02
                  </span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">FOOTER STATS</span>
                </div>
                <p className="text-[10px] text-zinc-500">
                  Data ini tersinkronisasi di baris capaian kaki halaman Bab 02:
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-zinc-500 mb-1">
                      Tahun Berdiri
                    </label>
                    <input
                      type="text"
                      value={data.visionMission.foundedYear || '2008'}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          visionMission: {
                            ...data.visionMission,
                            foundedYear: e.target.value,
                          },
                        })
                      }
                      placeholder="2008"
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-zinc-500 mb-1">
                      Jumlah Ahli
                    </label>
                    <input
                      type="text"
                      value={data.visionMission.expertCount || '480+'}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          visionMission: {
                            ...data.visionMission,
                            expertCount: e.target.value,
                          },
                        })
                      }
                      placeholder="480+"
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-zinc-500 mb-1">
                      Jam Kerja K3
                    </label>
                    <input
                      type="text"
                      value={data.visionMission.safeHours}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          visionMission: {
                            ...data.visionMission,
                            safeHours: e.target.value,
                          },
                        })
                      }
                      placeholder="14.8M Jam"
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEAM MEMBERS (HALAMAN 03) */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              {renderPageVisibilityBanner(
                'team',
                'Tampilkan Halaman Tim Eksekutif',
                'Default: ON. Lembar profil dewan direksi, divisi operasional, spesialis BIM, dan rasio engineer.',
                '03'
              )}

              <div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block mb-2">
                  Tier I Leadership (Dewan Direksi)
                </span>
                {data.team.tier1.map((member, idx) => (
                  <div key={member.id} className="p-3 bg-zinc-50 border border-zinc-200 mb-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-[#f59e0b] font-bold">
                        {member.code}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-500">{member.exp}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={member.name}
                      onChange={(e) => {
                        const newTier1 = [...data.team.tier1];
                        newTier1[idx].name = e.target.value;
                        onChange({
                          ...data,
                          team: { ...data.team, tier1: newTier1 },
                        });
                      }}
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Jabatan"
                      value={member.title}
                      onChange={(e) => {
                        const newTier1 = [...data.team.tier1];
                        newTier1[idx].title = e.target.value;
                        onChange({
                          ...data,
                          team: { ...data.team, tier1: newTier1 },
                        });
                      }}
                      className="w-full px-2 py-1 border border-zinc-300 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="URL Foto"
                      value={member.photoUrl}
                      onChange={(e) => {
                        const newTier1 = [...data.team.tier1];
                        newTier1[idx].photoUrl = e.target.value;
                        onChange({
                          ...data,
                          team: { ...data.team, tier1: newTier1 },
                        });
                      }}
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-200 pt-3">
                <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block mb-2">
                  Metrik Kapasitas Enjiniring
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-0.5">Jumlah Insinyur</label>
                    <input
                      type="text"
                      value={data.team.engineersCount}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          team: { ...data.team, engineersCount: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-0.5">Ahli BIM VDC</label>
                    <input
                      type="text"
                      value={data.team.bimSpecialists}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          team: { ...data.team, bimSpecialists: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEGAL & COMPLIANCE TABLE (HALAMAN 04) */}
          {activeTab === 'legal' && (
            <div className="space-y-4">
              {renderPageVisibilityBanner(
                'legal',
                'Tampilkan Halaman Legalitas & Sertifikasi',
                'Default: ON. Lembar manifes lisensi OSS-RBA, sertifikasi LPJK PUPR, ISO audit, dan penandatangan statuter.',
                '04'
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold">
                    Tabel Manifes Lisensi Pemerintah
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newLic: LicenseItem = {
                        id: 'lic-' + Date.now(),
                        no: String(data.legal.licenses.length + 1).padStart(2, '0'),
                        name: 'Izin Tambahan Baru',
                        subtitle: 'Kualifikasi Standar KemenPUPR',
                        regNo: 'No. ' + Math.floor(10000000 + Math.random() * 90000000),
                        details: 'Bidang Pekerjaan Konstruksi Terakreditasi',
                        issuer: 'Kementerian Investasi / BKPM',
                        status: 'AKTIF VALID',
                      };
                      onChange({
                        ...data,
                        legal: {
                          ...data.legal,
                          licenses: [...data.legal.licenses, newLic],
                        },
                      });
                    }}
                    className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 bg-[#1c1917] text-[#f59e0b] font-bold"
                  >
                    <Plus className="w-3 h-3" /> Tambah Baris
                  </button>
                </div>

                <div className="space-y-3">
                  {data.legal.licenses.map((lic, idx) => (
                    <div key={lic.id} className="p-3 bg-zinc-50 border border-zinc-200 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          const newLics = data.legal.licenses.filter((_, i) => i !== idx);
                          onChange({
                            ...data,
                            legal: { ...data.legal, licenses: newLics },
                          });
                        }}
                        className="absolute top-2 right-2 text-zinc-400 hover:text-red-600"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="font-mono text-[10px] text-zinc-500 mb-1">BARIS {lic.no}</div>
                      <input
                        type="text"
                        placeholder="Nama Izin"
                        value={lic.name}
                        onChange={(e) => {
                          const newLics = [...data.legal.licenses];
                          newLics[idx].name = e.target.value;
                          onChange({
                            ...data,
                            legal: { ...data.legal, licenses: newLics },
                          });
                        }}
                        className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold mb-1"
                      />
                      <input
                        type="text"
                        placeholder="Nomor Registrasi"
                        value={lic.regNo}
                        onChange={(e) => {
                          const newLics = [...data.legal.licenses];
                          newLics[idx].regNo = e.target.value;
                          onChange({
                            ...data,
                            legal: { ...data.legal, licenses: newLics },
                          });
                        }}
                        className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono mb-1"
                      />
                      <input
                        type="text"
                        placeholder="Instansi Penerbit"
                        value={lic.issuer}
                        onChange={(e) => {
                          const newLics = [...data.legal.licenses];
                          newLics[idx].issuer = e.target.value;
                          onChange({
                            ...data,
                            legal: { ...data.legal, licenses: newLics },
                          });
                        }}
                        className="w-full px-2 py-1 border border-zinc-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-3">
                <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block mb-1">
                  Penandatangan Resmi Legal
                </span>
                <input
                  type="text"
                  value={data.legal.signatory.name}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      legal: {
                        ...data.legal,
                        signatory: {
                          ...data.legal.signatory,
                          name: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-2 py-1.5 border border-zinc-300 text-xs font-bold mb-1"
                />
                <input
                  type="text"
                  value={data.legal.signatory.title}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      legal: {
                        ...data.legal,
                        signatory: {
                          ...data.legal.signatory,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-2 py-1 border border-zinc-300 text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO & PHOTOS (HALAMAN 05) */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              {renderPageVisibilityBanner(
                'portfolio',
                'Tampilkan Halaman Portofolio Proyek',
                'Default: ON. Lembar showcase foto proyek arsitektural utama dan arsip kontrak sektor konstruksi.',
                '05'
              )}

              <div>
                <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block mb-2">
                  Proyek Utama (Flagship Project)
                </span>
                <div className="p-3 bg-zinc-50 border border-zinc-200 space-y-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-0.5">Nama Gedung / Proyek</label>
                    <input
                      type="text"
                      value={data.portfolio.flagship.title}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          portfolio: {
                            ...data.portfolio,
                            flagship: {
                              ...data.portfolio.flagship,
                              title: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-0.5">Nilai Kontrak</label>
                    <input
                      type="text"
                      value={data.portfolio.flagship.value}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          portfolio: {
                            ...data.portfolio,
                            flagship: {
                              ...data.portfolio.flagship,
                              value: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-0.5">URL Foto Flagship</label>
                    <input
                      type="text"
                      value={data.portfolio.flagship.photoUrl}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          portfolio: {
                            ...data.portfolio,
                            flagship: {
                              ...data.portfolio.flagship,
                              photoUrl: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-3">
                <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block mb-2">
                  4 Proyek Diversifikasi Sektoral
                </span>
                {data.portfolio.sectoralProjects.map((prj, idx) => (
                  <div key={prj.id} className="p-2.5 bg-zinc-50 border border-zinc-200 mb-2 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-[#f59e0b] font-bold">
                        {prj.sectorTag}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-500">{prj.city}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Judul Proyek"
                      value={prj.title}
                      onChange={(e) => {
                        const newSectoral = [...data.portfolio.sectoralProjects];
                        newSectoral[idx].title = e.target.value;
                        onChange({
                          ...data,
                          portfolio: {
                            ...data.portfolio,
                            sectoralProjects: newSectoral,
                          },
                        });
                      }}
                      className="w-full px-2 py-1 border border-zinc-300 text-xs font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nilai Kontrak"
                        value={prj.value}
                        onChange={(e) => {
                          const newSectoral = [...data.portfolio.sectoralProjects];
                          newSectoral[idx].value = e.target.value;
                          onChange({
                            ...data,
                            portfolio: {
                              ...data.portfolio,
                              sectoralProjects: newSectoral,
                            },
                          });
                        }}
                        className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Tahun"
                        value={prj.year}
                        onChange={(e) => {
                          const newSectoral = [...data.portfolio.sectoralProjects];
                          newSectoral[idx].year = e.target.value;
                          onChange({
                            ...data,
                            portfolio: {
                              ...data.portfolio,
                              sectoralProjects: newSectoral,
                            },
                          });
                        }}
                        className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="URL Foto Proyek"
                        value={prj.photoUrl}
                        onChange={(e) => {
                          const newSectoral = [...data.portfolio.sectoralProjects];
                          newSectoral[idx].photoUrl = e.target.value;
                          onChange({
                            ...data,
                            portfolio: {
                              ...data.portfolio,
                              sectoralProjects: newSectoral,
                            },
                          });
                        }}
                        className="w-full px-2 py-1 border border-zinc-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: KONTAK & BACK COVER (BAB 06) */}
          {activeTab === 'backCover' && (
            <div className="space-y-4">
              {renderPageVisibilityBanner(
                'backCover',
                'Tampilkan Halaman Penutup (Back Cover)',
                'Default: ON. Lembar penutup monograf, kantor pusat, verifikasi QR code, dan jaringan cabang.',
                '06'
              )}

              {/* Top Status & Master Toggle Box */}
              <div className="p-3.5 bg-zinc-900 text-white border-l-4 border-amber-400 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-amber-400"></span>
                    <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      BAB 06 // KONTAK &amp; PENUTUP (BACK COVER)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectSpread('06')}
                    className="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-[10px] font-bold uppercase flex items-center gap-1 transition-colors"
                    title="Buka Halaman 06 pada Canvas"
                  >
                    <Eye className="w-3 h-3" />
                    Buka Hal 06
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <div>
                    <span className="font-bold text-xs block text-slate-100">
                      Tampilkan Halaman Penutup (Back Cover)
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {toggles.showBackCover !== false
                        ? 'Halaman 06 Aktif & Muncul di Cetak PDF'
                        : 'Halaman 06 Dinonaktifkan / Tersembunyi'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggles.showBackCover !== false}
                      onChange={() => handleToggle('showBackCover')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f59e0b]"></div>
                  </label>
                </div>
              </div>

              {/* 1. Slogan & Headline Penutup */}
              <div className="p-3 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-100">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[#1c1917]">
                    1. Headline, Slogan &amp; Pernyataan Kemitraan
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                    Headline / Slogan Penutup:
                  </label>
                  <input
                    type="text"
                    placeholder="MEMBANGUN NEGERI DENGAN REKAYASA PRESISI &amp; STANDAR INTEGRITAS TERTINGGI."
                    value={data.backCover?.closingHeadline || ''}
                    onChange={(e) =>
                      updateField('backCover', {
                        ...data.backCover,
                        closingHeadline: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[9px] text-zinc-400 mt-0.5 block font-mono">
                    Teks display tebal di atas kotak CTA kemitraan resmi
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                    Sub-Headline / Kategori Portofolio:
                  </label>
                  <input
                    type="text"
                    placeholder="KONTRAKTOR UMUM EPC &amp; REKAYASA INFRASTRUKTUR SIPIL"
                    value={data.backCover?.closingSubheadline || ''}
                    onChange={(e) =>
                      updateField('backCover', {
                        ...data.backCover,
                        closingSubheadline: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                    Deskripsi Pernyataan Kemitraan &amp; Penugasan Proyek (CTA Box):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="PT Arya Cipta Konstruksi Tbk mengundang sinergi strategis..."
                    value={data.backCover?.body || ''}
                    onChange={(e) =>
                      updateField('backCover', {
                        ...data.backCover,
                        body: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* 2. Foto Arsitektur Back Cover */}
              <div className="p-3 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-100">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[#1c1917]">
                    2. Foto Arsitektur Back Cover (~45% Tinggi)
                  </span>
                </div>

                {/* Photo Preview Thumbnail */}
                <div className="w-full h-28 bg-zinc-900 border border-zinc-300 overflow-hidden relative">
                  <img
                    src={
                      data.backCover?.photoUrl ||
                      data.portfolio.flagship.photoUrl ||
                      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt="Back cover preview"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute bottom-1 left-2 font-mono text-[9px] bg-black/80 text-white px-2 py-0.5">
                    HEADQUARTERS &amp; STRATEGIC ASSETS // PREVIEW
                  </div>
                </div>

                {/* File Upload & Input */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label className="flex-1 py-1.5 px-3 bg-[#1c1917] hover:bg-zinc-800 text-white font-mono text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Unggah File Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const res = event.target?.result as string;
                            if (res) {
                              updateField('backCover', {
                                ...data.backCover,
                                photoUrl: res,
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        updateField('backCover', {
                          ...data.backCover,
                          photoUrl: data.portfolio.flagship.photoUrl,
                        })
                      }
                      className="px-2.5 py-1.5 border border-zinc-300 hover:bg-zinc-100 font-mono text-[10px] text-zinc-700 transition-colors"
                      title="Gunakan foto yang sama dengan Proyek Utama"
                    >
                      Samakan Flagship
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                      Atau Masukkan URL Gambar:
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={data.backCover?.photoUrl || ''}
                      onChange={(e) =>
                        updateField('backCover', {
                          ...data.backCover,
                          photoUrl: e.target.value,
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Architectural Presets */}
                  <div>
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">
                      Pilihan Cepat Foto Arsitektur:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                      <button
                        type="button"
                        onClick={() =>
                          updateField('backCover', {
                            ...data.backCover,
                            photoUrl:
                              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
                          })
                        }
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-left truncate"
                      >
                        ● Glass Skyscraper
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateField('backCover', {
                            ...data.backCover,
                            photoUrl:
                              'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80',
                          })
                        }
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-left truncate"
                      >
                        ● SCBD Monolith
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateField('backCover', {
                            ...data.backCover,
                            photoUrl:
                              'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
                          })
                        }
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-left truncate"
                      >
                        ● Steel Megastructure
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateField('backCover', {
                            ...data.backCover,
                            photoUrl:
                              'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
                          })
                        }
                        className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-left truncate"
                      >
                        ● Brutalist Facade
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Alamat Kantor Pusat */}
              <div className="p-3 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-100">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[#1c1917]">
                    3. Alamat Kantor Pusat (Headquarters)
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Gedung / Menara / Lantai (Baris 1):
                    </label>
                    <input
                      type="text"
                      value={data.contact.headquarters.line1}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            headquarters: {
                              ...data.contact.headquarters,
                              line1: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Jalan / Kawasan Bisnis (Baris 2):
                    </label>
                    <input
                      type="text"
                      value={data.contact.headquarters.line2}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            headquarters: {
                              ...data.contact.headquarters,
                              line2: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Kota &amp; Kode Pos (Baris 3):
                    </label>
                    <input
                      type="text"
                      value={data.contact.headquarters.line3}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            headquarters: {
                              ...data.contact.headquarters,
                              line3: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Kontak Komunikasi Resmi */}
              <div className="p-3 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-100">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[#1c1917]">
                    4. Saluran Komunikasi &amp; Surel Resmi
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Nomor Telepon / Hunting:
                    </label>
                    <input
                      type="text"
                      value={data.contact.comms.phone}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            comms: {
                              ...data.contact.comms,
                              phone: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Alamat Email Resmi (Korporat):
                    </label>
                    <input
                      type="email"
                      value={data.contact.comms.email}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            comms: {
                              ...data.contact.comms,
                              email: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Alamat Website / Portal Web:
                    </label>
                    <input
                      type="text"
                      value={data.contact.comms.website}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            comms: {
                              ...data.contact.comms,
                              website: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-0.5">
                      Email Khusus Divisi Tender / EPC:
                    </label>
                    <input
                      type="email"
                      value={data.backCover?.tenderEmail || ''}
                      onChange={(e) =>
                        updateField('backCover', {
                          ...data.backCover,
                          tenderEmail: e.target.value,
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Jaringan Kantor Cabang */}
              <div className="p-3 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-100">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[#1c1917]">
                    5. Daftar Kantor Cabang (Regional Directory)
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                    Daftar Kota Kantor Cabang:
                  </label>
                  <input
                    type="text"
                    placeholder="JAKARTA (HQ) // SURABAYA // BALIKPAPAN"
                    value={data.contact.regional || data.backCover?.branches || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange({
                        ...data,
                        contact: {
                          ...data.contact,
                          regional: val,
                        },
                        backCover: {
                          ...data.backCover,
                          branches: val,
                        },
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-zinc-300 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[9px] text-zinc-400 mt-0.5 block font-mono">
                    Pisahkan nama kota kantor cabang dengan tanda &quot;//&quot;
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                    Pilihan Format Cepat:
                  </span>
                  <div className="flex flex-wrap gap-1 font-mono text-[9px]">
                    <button
                      type="button"
                      onClick={() => {
                        const val = 'JAKARTA (HQ) // SURABAYA // BALIKPAPAN';
                        onChange({
                          ...data,
                          contact: { ...data.contact, regional: val },
                          backCover: { ...data.backCover, branches: val },
                        });
                      }}
                      className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300"
                    >
                      Jakarta // Sby // Bpn
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const val = 'JAKARTA (HQ) // SURABAYA // MEDAN // MAKASSAR // IKN';
                        onChange({
                          ...data,
                          contact: { ...data.contact, regional: val },
                          backCover: { ...data.backCover, branches: val },
                        });
                      }}
                      className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300"
                    >
                      5 Kota Metropolitan + IKN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const val = 'JAKARTA (HQ) // IKN NUSANTARA // BALIKPAPAN';
                        onChange({
                          ...data,
                          contact: { ...data.contact, regional: val },
                          backCover: { ...data.backCover, branches: val },
                        });
                      }}
                      className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300"
                    >
                      Fokus Koridor IKN
                    </button>
                  </div>
                </div>
              </div>

              {/* 6. Validasi Digital & Security Hash */}
              <div className="p-3 border border-zinc-200 bg-white space-y-3">
                <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[#1c1917]">
                    6. Validasi Digital &amp; Kode Registrasi QR
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                      Kode Berkas Validasi:
                    </label>
                    <input
                      type="text"
                      value={data.contact.legalVerify.legalCode}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            legalVerify: {
                              ...data.contact.legalVerify,
                              legalCode: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-2 py-1 border border-zinc-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                      Security Hash:
                    </label>
                    <input
                      type="text"
                      value={data.contact.legalVerify.hash}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            legalVerify: {
                              ...data.contact.legalVerify,
                              hash: val,
                            },
                          },
                          backCover: {
                            ...data.backCover,
                            digitalHash: val,
                          },
                        });
                      }}
                      className="w-full px-2 py-1 border border-zinc-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PRESETS & EXPORT / IMPORT */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="p-3 bg-zinc-50 border border-zinc-200">
                <span className="font-mono text-[10px] text-[#1c1917] font-bold uppercase block mb-1">
                  TEMPLATE PRESET INDUSTRI CEPAT
                </span>
                <p className="text-[11px] text-zinc-600 mb-3">
                  Pilih salah satu konfigurasi monograf untuk langsung mengganti seluruh teks, foto, dan struktur.
                </p>

                <div className="space-y-2">
                  {presetTemplates.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onChange(p.data)}
                      className="w-full text-left p-2.5 bg-white border border-zinc-300 hover:border-[#f59e0b] hover:bg-amber-50/30 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#1c1917] text-xs">{p.name}</span>
                        <span className="font-mono text-[9px] bg-zinc-100 px-1.5 py-0.2 text-zinc-600">
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-snug">{p.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold block">
                  EKSPOR & IMPOR KONFIGURASI JSON
                </span>

                <button
                  type="button"
                  onClick={handleExportJson}
                  className="w-full py-2 px-3 bg-[#1c1917] hover:bg-zinc-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#f59e0b]" />
                  Download Preset JSON
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="w-full py-2 px-3 border border-zinc-300 bg-white hover:bg-zinc-50 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors text-[#1c1917]"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      Preset Berhasil Disalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-500" />
                      Salin JSON ke Clipboard
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setImportModalOpen(true)}
                  className="w-full py-2 px-3 border border-[#f59e0b] bg-amber-50/50 hover:bg-amber-100/50 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors text-[#1c1917]"
                >
                  <Upload className="w-4 h-4 text-[#f59e0b]" />
                  Import Preset JSON
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Kembalikan semua teks & parameter ke data awal PT Arya Cipta Konstruksi Tbk?')) {
                      onChange(defaultCompanyData);
                    }
                  }}
                  className="w-full py-2 px-3 text-red-600 hover:bg-red-50 font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-red-200"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset ke Data Default
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Editor Bottom Bar */}
        <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-zinc-500 font-mono text-[10px] shrink-0">
          <span>REALTIME PREVIEW ENGINE</span>
          <span className="text-emerald-600 font-bold">● LIVE UPDATING</span>
        </div>
      </aside>

      {/* IMPORT JSON MODAL */}
      {importModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#1c1917] max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#f59e0b]"></span>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#1c1917]">
                  Import Preset JSON
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="text-zinc-400 hover:text-[#1c1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 mb-3">
              Unggah berkas <code>.json</code> yang pernah diekspor atau tempelkan teks JSON konfigurasi monograf Anda.
            </p>

            <div className="mb-4">
              <label className="block text-[11px] font-mono uppercase text-zinc-600 mb-1">
                Pilih Berkas JSON:
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="w-full text-xs font-mono file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-[#1c1917] file:text-white file:text-xs file:font-mono file:cursor-pointer hover:file:bg-zinc-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-mono uppercase text-zinc-600 mb-1">
                Atau Tempel Kode JSON:
              </label>
              <textarea
                rows={6}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{ "companyName": "...", "director": { ... } }'
                className="w-full p-2 border border-zinc-300 font-mono text-[11px] focus:outline-none focus:border-[#f59e0b]"
              />
              {importError && (
                <p className="text-xs text-red-600 mt-1 font-mono">{importError}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 border border-zinc-300 text-xs font-mono uppercase hover:bg-zinc-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApplyImport}
                disabled={!importJsonText.trim()}
                className="px-4 py-2 bg-[#f59e0b] hover:bg-amber-600 text-[#1c1917] font-mono text-xs font-bold uppercase disabled:opacity-50"
              >
                Terapkan Preset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
