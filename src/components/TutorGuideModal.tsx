import React, { useState } from 'react';
import { X, Printer, CheckSquare, Clock, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { TutorObservation } from '../types/math';
import { sound } from '../utils/audio';

interface TutorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  observation: TutorObservation;
  onUpdateObservation: (obs: TutorObservation) => void;
}

export const TutorGuideModal: React.FC<TutorGuideModalProps> = ({
  isOpen,
  onClose,
  observation,
  onUpdateObservation,
}) => {
  const [equipmentChecked, setEquipmentChecked] = useState<Record<string, boolean>>({
    kartuAngka: true,
    kertasCoretan: true,
    pensilPenghapus: true,
    stikerReward: false,
    kuasaiTrik: true,
  });

  if (!isOpen) return null;

  const toggleEquipment = (key: string) => {
    sound.playBubble();
    setEquipmentChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    sound.playBubble();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-sky-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">
              📋
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-slate-900">
                Panduan Mengajar & Checklist Tutor
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Sharky Learning · Matematika Kelas 4 SD (Pertemuan 1 · 60 Menit)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="Cetak Lembar Panduan"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak Panduan</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Pedagogical Rule of Thumb */}
          <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <strong className="text-sm font-bold block">
                Pola Emas Mengajar Sharky (Hindari Ceramah Panjang!)
              </strong>
              <div className="font-semibold text-amber-900">
                Jelaskan konsep singkat (1–2 menit) → Tunjukkan 1 contoh → Ajak siswa mencoba → Berikan tantangan seru!
              </div>
              <p className="text-amber-800">
                Fokuskan waktu pada aktivitas aktif siswa, eksplorasi angka fisik, dan melatih penalaran verbal mengapa suatu jawaban benar.
              </p>
            </div>
          </div>

          {/* Section 1: Equipment Checklist */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-cyan-600" /> Checklist Perlengkapan Sebelum Sesi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'kartuAngka', label: 'Kartu angka 0–9 (potongan kertas konkret)' },
                { id: 'kertasCoretan', label: 'Kertas coretan bersih untuk siswa' },
                { id: 'pensilPenghapus', label: 'Pensil dan penghapus siap pakai' },
                { id: 'stikerReward', label: 'Stiker bintang / reward fisik opsional' },
                { id: 'kuasaiTrik', label: 'Tutor memahami trik Friendly Number & Count Up' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleEquipment(item.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                    equipmentChecked[item.id]
                      ? 'bg-sky-50 border-sky-300 text-sky-950 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={equipmentChecked[item.id]}
                    readOnly
                    className="w-4 h-4 text-cyan-600 rounded"
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Lesson Plan Breakdown */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-600" /> Distribusi Waktu 60 Menit
            </h3>
            <div className="space-y-2 text-xs">
              {[
                {
                  phase: '1. Sharky Warm-Up',
                  time: '5 Menit',
                  target: 'Ice breaking matematika 4 soal kilat untuk menguji kesiapan awal.',
                },
                {
                  phase: '2. Number Detective',
                  time: '12 Menit',
                  target: 'Bongkar nilai tempat s.d 10.000, trik posisi angka nol, bandingkan dari digit kiri.',
                },
                {
                  phase: '3. Number Card Battle',
                  time: '8 Menit',
                  target: 'Duel susun kartu kertas konkret (2, 4, 6, 8) terbesar & terkecil di meja fisik.',
                },
                {
                  phase: '4. Math Hacks Lab',
                  time: '15 Menit',
                  target: 'Trik Make a Friendly Number, Count Up, Break Apart perkalian, pasangan pembagian.',
                },
                {
                  phase: '5. Treasure Hunt Challenge',
                  time: '13 Menit',
                  target: 'Buka 6 kunci samudera untuk membuka peti emas harta karun.',
                },
                {
                  phase: '6. Final Boss & Evaluasi',
                  time: '7 Menit',
                  target: '5 soal komprehensif, feedback motivatif, dan penganugerahan sertifikat explorer.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-slate-900 text-sm">
                      {item.phase}
                    </span>
                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-md">
                      {item.time}
                    </span>
                  </div>
                  <div className="text-slate-600 text-xs">
                    {item.target}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Student Competencies Checklist */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-600" /> Rubrik Capaian Pembelajaran Siswa
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { k: 'membacaBilangan', t: 'Membaca bilangan cacah s.d 10.000' },
                { k: 'nilaiTempat', t: 'Menguraikan nilai tempat (termasuk angka 0)' },
                { k: 'perbandinganBilangan', t: 'Membandingkan digit paling kiri' },
                { k: 'penjumlahan', t: 'Penjumlahan Friendly Number' },
                { k: 'pengurangan', t: 'Pengurangan Count Up selisih kecil' },
                { k: 'perkalian', t: 'Perkalian Break Apart (puluhan & satuan)' },
                { k: 'pembagian', t: 'Pembagian pasangan perkalian' },
              ].map((c) => {
                const key = c.k as keyof Omit<TutorObservation, 'notes'>;
                const checked = observation[key];

                return (
                  <button
                    key={c.k}
                    onClick={() =>
                      onUpdateObservation({
                        ...observation,
                        [key]: !checked,
                      })
                    }
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 ${
                      checked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>{c.t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
