import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroMap } from './components/HeroMap';
import { Mission1WarmUp } from './components/Mission1WarmUp';
import { Mission2NumberDetective } from './components/Mission2NumberDetective';
import { Mission3CardBattle } from './components/Mission3CardBattle';
import { Mission4MathHacksLab } from './components/Mission4MathHacksLab';
import { Mission5TreasureHunt } from './components/Mission5TreasureHunt';
import { Mission6FinalBoss } from './components/Mission6FinalBoss';
import { RewardModal } from './components/RewardModal';
import { TutorGuideModal } from './components/TutorGuideModal';
import { Mission, TutorObservation } from './types/math';
import { sound } from './utils/audio';

const INITIAL_MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'Sharky Warm-Up',
    subtitle: 'Pertanyaan cepat 4 soal pemanasan untuk mengaktifkan insting matematika.',
    durationMinutes: 5,
    iconName: 'Flame',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Number Detective HQ',
    subtitle: 'Bongkar nilai tempat s.d 10.000, rahasia angka nol, dan bandingkan bilangan.',
    durationMinutes: 12,
    iconName: 'Search',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Number Card Battle',
    subtitle: 'Aktivitas kartu kertas konkret 0–9: susun bilangan terbesar & terkecil.',
    durationMinutes: 8,
    iconName: 'Sparkles',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Math Hacks Lab',
    subtitle: 'Laboratorium trik berhitung cepat: penjumlahan, pengurangan, perkalian, pembagian.',
    durationMinutes: 15,
    iconName: 'Zap',
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Treasure Hunt Challenge',
    subtitle: 'Pecahkan 6 tantangan kunci emas untuk membuka peti harta karun samudera!',
    durationMinutes: 13,
    iconName: 'Key',
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Final Boss & Evaluasi',
    subtitle: 'Ujian komprehensif 5 soal, catatan tutor, dan gelar Sharky Math Explorer.',
    durationMinutes: 7,
    iconName: 'Trophy',
    isCompleted: false,
  },
];

export default function App() {
  const [activeMissionId, setActiveMissionId] = useState<number>(0);
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('sharky_points');
    return saved ? parseInt(saved, 10) : 50;
  });
  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('sharky_missions');
    return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
  });
  const [unlockedKeys, setUnlockedKeys] = useState<number[]>(() => {
    const saved = localStorage.getItem('sharky_keys');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTutorGuideOpen, setIsTutorGuideOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [tutorObservation, setTutorObservation] = useState<TutorObservation>(() => {
    const saved = localStorage.getItem('sharky_tutor_obs');
    return saved
      ? JSON.parse(saved)
      : {
          membacaBilangan: false,
          nilaiTempat: false,
          perbandinganBilangan: false,
          penjumlahan: false,
          pengurangan: false,
          perkalian: false,
          pembagian: false,
          notes: '',
        };
  });

  // Recent toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local state
  useEffect(() => {
    localStorage.setItem('sharky_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('sharky_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('sharky_keys', JSON.stringify(unlockedKeys));
  }, [unlockedKeys]);

  useEffect(() => {
    localStorage.setItem('sharky_tutor_obs', JSON.stringify(tutorObservation));
  }, [tutorObservation]);

  const handleAddPoints = (amount: number, reason: string) => {
    setPoints((prev) => prev + amount);
    setToastMessage(`+${amount} Shark Points! (${reason})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCompleteMission = (missionId: number) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isCompleted: true } : m))
    );
  };

  const handleUnlockKey = (keyId: number) => {
    if (!unlockedKeys.includes(keyId)) {
      setUnlockedKeys((prev) => [...prev, keyId]);
    }
  };

  const handleResetSession = () => {
    if (window.confirm('Mulai sesi belajar baru? Shark Points dan progres misi akan direset untuk siswa baru.')) {
      sound.playBubble();
      setPoints(50);
      setMissions(INITIAL_MISSIONS);
      setUnlockedKeys([]);
      setTutorObservation({
        membacaBilangan: false,
        nilaiTempat: false,
        perbandinganBilangan: false,
        penjumlahan: false,
        pengurangan: false,
        perkalian: false,
        pembagian: false,
        notes: '',
      });
      setActiveMissionId(0);
      localStorage.clear();
      setToastMessage('Sesi baru telah dimulai!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/70 text-slate-800 relative selection:bg-cyan-200">
      {/* Decorative Ocean Bubbles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -bottom-10 left-10 w-16 h-16 rounded-full bg-cyan-200/20 blur-xs animate-float-slow" />
        <div className="absolute top-1/3 right-12 w-24 h-24 rounded-full bg-sky-300/20 blur-xs animate-float-slow" />
        <div className="absolute top-2/3 left-1/4 w-12 h-12 rounded-full bg-blue-200/20 blur-xs animate-float-slow" />
      </div>

      {/* Header Bar */}
      <Header
        points={points}
        onAddPoints={handleAddPoints}
        onResetSession={handleResetSession}
        onOpenTutorGuide={() => {
          sound.playBubble();
          setIsTutorGuideOpen(true);
        }}
        onOpenRewardModal={() => {
          sound.playBubble();
          setIsRewardModalOpen(true);
        }}
        activeMissionId={activeMissionId}
        onNavigate={(id) => {
          sound.playBubble();
          setActiveMissionId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-blue-950 font-display font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl border border-amber-300 flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span>🪙</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub-nav breadcrumb if in mission */}
      {activeMissionId > 0 && (
        <div className="bg-sky-100/70 border-b border-sky-200/60 py-2.5 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
            <button
              onClick={() => {
                sound.playBubble();
                setActiveMissionId(0);
              }}
              className="font-bold text-slate-600 hover:text-cyan-700 flex items-center gap-1"
            >
              ← Kembali ke Peta Petualangan
            </button>
            <div className="flex items-center gap-2 font-semibold text-slate-500">
              <span>Misi Aktif: <strong className="text-blue-950 font-display">{missions[activeMissionId - 1]?.title}</strong></span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-700">{missions[activeMissionId - 1]?.durationMinutes} Menit</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeMissionId === 0 && (
          <HeroMap
            missions={missions}
            activeMissionId={activeMissionId}
            onSelectMission={(id) => {
              setActiveMissionId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            keysCount={unlockedKeys.length}
          />
        )}

        {activeMissionId === 1 && (
          <Mission1WarmUp
            onComplete={() => handleCompleteMission(1)}
            onAddPoints={handleAddPoints}
            onNextMission={() => {
              setActiveMissionId(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeMissionId === 2 && (
          <Mission2NumberDetective
            onComplete={() => handleCompleteMission(2)}
            onAddPoints={handleAddPoints}
            onNextMission={() => {
              setActiveMissionId(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeMissionId === 3 && (
          <Mission3CardBattle
            onComplete={() => handleCompleteMission(3)}
            onAddPoints={handleAddPoints}
            onNextMission={() => {
              setActiveMissionId(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeMissionId === 4 && (
          <Mission4MathHacksLab
            onComplete={() => handleCompleteMission(4)}
            onAddPoints={handleAddPoints}
            onNextMission={() => {
              setActiveMissionId(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeMissionId === 5 && (
          <Mission5TreasureHunt
            unlockedKeys={unlockedKeys}
            onUnlockKey={handleUnlockKey}
            onComplete={() => handleCompleteMission(5)}
            onAddPoints={handleAddPoints}
            onNextMission={() => {
              setActiveMissionId(6);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeMissionId === 6 && (
          <Mission6FinalBoss
            onComplete={() => handleCompleteMission(6)}
            onAddPoints={handleAddPoints}
            onOpenCertificate={() => setIsRewardModalOpen(true)}
            tutorObservation={tutorObservation}
            onUpdateObservation={setTutorObservation}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sky-100 py-6 px-4 text-center text-xs text-slate-500 space-y-2 mt-12 no-print">
        <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-slate-700">
          <span className="text-cyan-700">SHARKY MATH ADVENTURE</span>
          <span aria-hidden="true">·</span>
          <span>Sharky Learning</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-600 font-semibold italic">“Keep Swimming, Keep Learning!”</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Media Ajar Interaktif Kelas 4 SD · Pertemuan 1 (60 Menit) · Dilengkapi Panduan Tutor & Sistem Reward
        </p>
      </footer>

      {/* Modals */}
      <RewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        points={points}
        keysCount={unlockedKeys.length}
      />

      <TutorGuideModal
        isOpen={isTutorGuideOpen}
        onClose={() => setIsTutorGuideOpen(false)}
        observation={tutorObservation}
        onUpdateObservation={setTutorObservation}
      />
    </div>
  );
}
