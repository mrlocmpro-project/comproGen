import React from 'react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-100 animate-in fade-in zoom-in duration-150">
                {/* Tombol Tutup Silang */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                    aria-label="Tutup modal"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Badge & Versi */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        About
                    </span>
                    <span className="text-xs font-mono text-slate-400">v1.0</span>
                </div>

                {/* Nama Aplikasi & Deskripsi */}
                <h3 className="text-xl font-bold text-white tracking-tight">ComproGen</h3>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    Generator company profile interaktif
                </p>

                {/* Info Pembuat & Kontak */}
                <div className="mt-5 space-y-3 p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-sm">
                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                            Creator / Developer
                        </div>
                        <div className="text-base font-bold text-amber-400 mt-0.5">
                            ECP Corp
                        </div>
                    </div>

                    <div>
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                            Kontak
                        </div>
                        <a
                            href="mailto:ecpcorp.id@gmail.com"
                            className="text-slate-200 hover:text-amber-400 hover:underline flex items-center gap-1.5 mt-0.5 font-medium transition"
                        >
                            <span>✉️</span>
                            <span>ecpcorp.id@gmail.com</span>
                        </a>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60 text-xs text-slate-400">
                        © 2026 ECP Corp. All rights reserved.
                    </div>
                </div>

                {/* Tombol Tutup Bawah */}
                <div className="mt-5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};