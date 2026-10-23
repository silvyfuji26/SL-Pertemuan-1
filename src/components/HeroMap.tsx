import React from 'react';
import { Play, Sparkles, Clock, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { Mission } from '../types/math';
import { sound } from '../utils/audio';

interface HeroMapProps {
  missions: Mission[];
  activeMissionId: number;
  onSelectMission: (id: number) => void;
  keysCount: number;
}

export const HeroMap: React.FC<HeroMapProps> = ({
  missions,
  onSelectMission,
  keysCount,
}) => {
  const completedCount = missions.filter((m) => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  const handleStartAdventure = () => {
    sound.playBubble();
    onSelectMission(1);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12">
      {/* Background soft ambient ocean blurs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Hero Welcome Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-cyan-500/20">
          {/* Subtle Water Reflection overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Text & Hero CTA */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Unboxed Metadata Strip */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-200">
                <span className="text-amber-300 font-bold uppercase tracking-wider">Sharky Learning</span>
                <span aria-hidden="true">·</span>
                <span>Kelas 4 SD</span>
                <span aria-hidden="true">·</span>
                <span>Pertemuan 1</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-300" /> 60 Menit
                </span>
                <span aria-hidden="true">·</span>
                <span>Sistem Shark Points 🪙</span>
              </div>

              {/* Big Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                SHARKY MATH <br />
                <span className="bg-gradient-to-r from-cyan-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  ADVENTURE!
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed max-w-xl font-normal">
                Siap jadi penjelajah matematika? Pecahkan rahasia angka, temukan trik berhitung cepat, dan kumpulkan kunci harta karun samudera!
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleStartAdventure}
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-blue-950 font-display font-extrabold text-base tracking-wide shadow-lg shadow-amber-400/30 transition-all flex items-center gap-2.5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>MULAI PETUALANGAN</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-medium text-cyan-100 bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Kunci Terkumpul: <strong className="text-amber-300 font-bold">{keysCount} dari 6</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-amber-300 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-300/40 shadow-2xl aspect-[16/10] bg-slate-900">
                  <img
                    src="/src/assets/images/hero_sharky_mascot_1792734664868.jpg"
                    alt="Maskot Hiu Penjelajah Matematika Sharky"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-transparent p-3 text-center">
                    <span className="text-xs font-bold text-cyan-200">
                      Sharky si Kapten Matematika Samudera
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adventure Roadmap Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-widest">
              <Compass className="w-4 h-4 text-cyan-600" />
              <span>Peta Pembelajaran 60 Menit</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Enam Tahap Ekspedisi Matematika
            </h2>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-4">
            <div className="text-left">
              <div className="text-[11px] font-semibold text-slate-500">Progres Misi</div>
              <div className="font-display font-extrabold text-blue-900 text-sm">
                {completedCount} dari {missions.length} Selesai
              </div>
            </div>
            <div className="w-24 bg-sky-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Stage Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {missions.map((mission, index) => {
            const isCompleted = mission.isCompleted;

            return (
              <button
                key={mission.id}
                onClick={() => {
                  sound.playBubble();
                  onSelectMission(mission.id);
                }}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 group relative overflow-hidden flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-50 shadow-xs'
                    : 'bg-white border-sky-100 hover:border-cyan-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-blue-900 font-extrabold text-xs flex items-center justify-center font-display">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-600" /> {mission.durationMinutes} Menit
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-cyan-600 transition-colors flex items-center gap-0.5">
                      Buka <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {mission.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-cyan-700">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {mission.id === 5 ? 'Kumpulkan 6 Kunci' : 'Dapatkan Shark Points'}
                  </span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
