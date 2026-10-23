import React, { useState } from 'react';
import { X, Trophy, Sparkles, Printer, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  keysCount: number;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  isOpen,
  onClose,
  points,
  keysCount,
}) => {
  const [studentName, setStudentName] = useState<string>('Petualang Cilik');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playBubble();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-amber-300 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-20 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Inner Frame */}
        <div className="p-6 sm:p-10 text-center relative space-y-6">
          {/* Certificate Header Banner */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Sharky Learning · Sertifikat Resmi Samudera
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-blue-950 tracking-tight">
              SHARKY MATH EXPLORER OF THE DAY!
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              "Keep Swimming, Keep Learning!"
            </p>
          </div>

          {/* Certificate Shark Graphic */}
          <div className="relative max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md aspect-[16/9]">
            <img
              src="/src/assets/images/hero_sharky_mascot_1792734664868.jpg"
              alt="Mascot Sharky"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Award Recipient */}
          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 max-w-md mx-auto">
            <span className="text-xs text-slate-500 block mb-1">
              Dianugerahkan dengan Bangga Kepada:
            </span>
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="px-3 py-1.5 border-2 border-cyan-500 rounded-xl font-display font-extrabold text-xl text-center text-blue-950 focus:outline-hidden"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-blue-950 underline decoration-amber-400 decoration-wavy">
                  {studentName}
                </h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-cyan-600 hover:underline no-print font-medium"
                >
                  (Ubah Nama)
                </button>
              </div>
            )}
            <p className="text-xs text-slate-600 mt-2">
              Telah berhasil menuntaskan seluruh 6 Misi Pembelajaran Matematika Kelas 4 SD dengan penuh semangat, keberanian, dan kecerdasan!
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">Total Poin</span>
              <span className="font-display font-extrabold text-2xl text-amber-900">{points} 🪙</span>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-2xl">
              <span className="text-[10px] font-bold text-cyan-700 uppercase block">Kunci Harta</span>
              <span className="font-display font-extrabold text-2xl text-cyan-900">{keysCount} / 6 🗝️</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 no-print">
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sertifikat</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
