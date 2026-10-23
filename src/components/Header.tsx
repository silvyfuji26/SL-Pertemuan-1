import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Plus, RefreshCw, ClipboardList, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  points: number;
  onAddPoints: (amount: number, reason: string) => void;
  onResetSession: () => void;
  onOpenTutorGuide: () => void;
  onOpenRewardModal: () => void;
  activeMissionId: number;
  onNavigate: (missionId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  points,
  onAddPoints,
  onResetSession,
  onOpenTutorGuide,
  onOpenRewardModal,
  onNavigate,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);
  const [showPointsMenu, setShowPointsMenu] = useState(false);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playBubble();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate(0)}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            title="Ke Beranda Sharky Math Adventure"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              {/* Cute Shark SVG icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.24 4.09 8.04l.91-.91C5.03 17.65 3.75 15 3.75 12c0-4.56 3.69-8.25 8.25-8.25 3 0 5.65 1.28 7.13 3.25l1.07-.86C18.25 3.61 15.31 2 12 2zm8.5 7c-.28 0-.5.22-.5.5v1.75c0 1.24-.5 2.37-1.31 3.19l-.71-.71c.62-.62 1.02-1.48 1.02-2.48V9.5c0-.83-.67-1.5-1.5-1.5H16v-1h1.5c1.38 0 2.5 1.12 2.5 2.5v.5zm-5 4c-.83 0-1.5-.67-1.5-1.5S14.67 10 15.5 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 12c0 2.31-.79 4.43-2.11 6.13l-1.07-.86C19.83 15.82 20.25 14 20.25 12c0-.52-.06-1.03-.17-1.52l1.22-.38C21.75 10.74 22 11.35 22 12z" />
                <path d="M11 6.5C8 9 6.5 12 6.5 14.5c0 2.5 2 3.5 4.5 3.5s4.5-1 4.5-3.5C15.5 12 14 9 11 6.5z" opacity="0.3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-blue-950">
                  SHARKY
                </span>
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest hidden sm:inline">
                  Learning
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-none hidden sm:block">
                Keep Swimming, Keep Learning!
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onNavigate(0)}
            className="hover:text-cyan-600 transition-colors whitespace-nowrap"
          >
            Peta Petualangan
          </button>
          <button
            onClick={() => onNavigate(2)}
            className="hover:text-cyan-600 transition-colors whitespace-nowrap"
          >
            Detektif Angka
          </button>
          <button
            onClick={() => onNavigate(3)}
            className="hover:text-cyan-600 transition-colors whitespace-nowrap"
          >
            Kartu Angka
          </button>
          <button
            onClick={() => onNavigate(4)}
            className="hover:text-cyan-600 transition-colors whitespace-nowrap"
          >
            Lab Trik Cepat
          </button>
          <button
            onClick={() => onNavigate(5)}
            className="hover:text-cyan-600 transition-colors whitespace-nowrap"
          >
            Peti Harta
          </button>
          <button
            onClick={() => onNavigate(6)}
            className="hover:text-cyan-600 transition-colors whitespace-nowrap"
          >
            Evaluasi Akhir
          </button>
        </nav>

        {/* Zone 3: Interactive Points & Tutor Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Shark Points Display */}
          <div className="relative">
            <button
              onClick={() => setShowPointsMenu(!showPointsMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl transition-all shadow-xs group"
              title="Klik untuk tambah poin tutor"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 text-amber-900 flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-110 transition-transform">
                🪙
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block leading-none">
                  Shark Points
                </span>
                <span className="font-display font-extrabold text-amber-900 text-sm sm:text-base tabular-nums">
                  {points}
                </span>
              </div>
              <Plus className="w-3.5 h-3.5 text-amber-600" />
            </button>

            {/* Quick Points Menu for Tutor */}
            {showPointsMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 text-xs">
                <div className="px-2 py-1 font-bold text-slate-700 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span>Bonus Tutor</span>
                  <span className="text-[10px] text-slate-400 font-normal">Apresiasi Siswa</span>
                </div>
                <button
                  onClick={() => {
                    onAddPoints(5, 'Percobaan & Usaha Baik');
                    sound.playCoin();
                    setShowPointsMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-amber-50 rounded-lg flex items-center justify-between text-slate-700 font-medium"
                >
                  <span>+5 Usaha Baik</span>
                  <span className="text-amber-600 font-bold">+5 🪙</span>
                </button>
                <button
                  onClick={() => {
                    onAddPoints(10, 'Penjelasan Logis!');
                    sound.playCoin();
                    setShowPointsMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-amber-50 rounded-lg flex items-center justify-between text-slate-700 font-medium"
                >
                  <span>+10 Penjelasan Keren</span>
                  <span className="text-amber-600 font-bold">+10 🪙</span>
                </button>
                <button
                  onClick={() => {
                    onAddPoints(20, 'Kreativitas Berhitung!');
                    sound.playCoin();
                    setShowPointsMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-amber-50 rounded-lg flex items-center justify-between text-slate-700 font-medium"
                >
                  <span>+20 Trik Jenius</span>
                  <span className="text-amber-600 font-bold">+20 🪙</span>
                </button>
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 text-slate-500 hover:text-cyan-700 hover:bg-sky-50 rounded-lg transition-colors"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-cyan-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Tutor Checklist & Guide button */}
          <button
            onClick={onOpenTutorGuide}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-900 bg-cyan-100 hover:bg-cyan-200 rounded-lg transition-colors whitespace-nowrap"
            title="Buka Lembar Kerja & Checklist Tutor"
          >
            <ClipboardList className="w-4 h-4 text-cyan-700" />
            <span>Panduan Tutor</span>
          </button>

          {/* Explorer Certificate Modal */}
          <button
            onClick={onOpenRewardModal}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-lg shadow-xs shadow-blue-500/20 transition-transform active:scale-95 whitespace-nowrap"
            title="Lihat Sertifikat Explorer"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Penghargaan</span>
          </button>

          {/* Reset Session */}
          <button
            onClick={onResetSession}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Reset Sesi Belajar Baru"
            aria-label="Reset Sesi"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
