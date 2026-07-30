import React from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight, Newspaper, History, Trash2 } from 'lucide-react';
import { Level, HistoryItem } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { cn } from '../../lib/utils';

export const SUB_LEVELS: Record<string, string[]> = {
  'Primaire': ['1ère', '2e', '3e', '4e', '5e', '6e'],
  'Collège': ['7e', '8e'],
  'Lycée': ['1ère', '2e', '3e', '4e'],
  'Université': ['Bac1', 'Bac2', 'Bac3'],
  'Master': ['Master1', 'Master2'],
  'Études approfondies': []
};

export interface OnboardingViewProps {
  level: Level;
  subLevel: string;
  subject: string;
  loading: boolean;
  history: HistoryItem[];
  quote: { text: string; author: string };
  setLevel: (level: Level) => void;
  setSubLevel: (subLevel: string) => void;
  setSubject: (subject: string) => void;
  onStartCourse: () => void;
  onFetchNews: () => void;
  onResumeCourse: (item: HistoryItem) => void;
  onDeleteHistory: (e: React.MouseEvent, id: string) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  level,
  subLevel,
  subject,
  loading,
  history,
  quote,
  setLevel,
  setSubLevel,
  setSubject,
  onStartCourse,
  onFetchNews,
  onResumeCourse,
  onDeleteHistory,
}) => {
  return (
    <motion.div 
      key="onboarding"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-10"
    >
      <div className="md:col-span-12 py-6 text-center flex flex-col items-center">
        <h1 className="text-[30px] font-black tracking-tight mb-6 text-black leading-[0.95] uppercase">
           Apprendre <br />sans limites.
        </h1>
        <p className="text-base text-black/60 max-w-xl mx-auto font-medium leading-relaxed">
           Définissez vos objectifs et laissez MwalimuMwema concevoir votre programme sur mesure en quelques secondes.
        </p>
      </div>

      <Card className="md:col-span-8 p-10 space-y-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-[9px] font-black text-black uppercase tracking-[0.3em]">
              01 / Votre Niveau
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {['Primaire', 'Collège', 'Lycée', 'Université', 'Master', 'Études approfondies'].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLevel(l as Level);
                    const options = SUB_LEVELS[l] || [];
                    if (options.length > 0) {
                      setSubLevel(options[0]);
                    } else {
                      setSubLevel('');
                    }
                  }}
                  className={cn(
                    "px-5 py-4 rounded-2xl border-2 transition-all text-[11px] uppercase tracking-widest font-bold cursor-pointer",
                    level === l 
                      ? "border-black bg-black text-white" 
                      : "border-black/5 bg-white text-black/40 hover:border-black/20"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {SUB_LEVELS[level] && SUB_LEVELS[level].length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <label className="block text-[9px] font-black text-black uppercase tracking-[0.3em]">
                Sélectionner la classe / promotion
              </label>
              <div className="relative">
                <select
                  value={subLevel}
                  onChange={(e) => setSubLevel(e.target.value)}
                  className="w-full px-5 py-5 bg-white border-2 border-black rounded-[1.5rem] focus:ring-4 focus:ring-black/5 transition-all outline-none text-base font-bold appearance-none cursor-pointer"
                >
                  {SUB_LEVELS[level].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-black">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <label className="block text-[9px] font-black text-black uppercase tracking-[0.3em]">
              02 / Le Sujet
            </label>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
              <input 
                type="text"
                placeholder="Ex: Analyse de données, Géopolitique..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full pl-14 pr-5 py-5 bg-white border-2 border-black rounded-[1.5rem] focus:ring-4 focus:ring-black/5 transition-all outline-none text-lg font-bold placeholder:text-black/10"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={onStartCourse} 
          variant="primary"
          className="w-full h-16 text-lg cursor-pointer"
          loading={loading}
        >
          Générer mon cours <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Card>

      <div className="md:col-span-4 flex flex-col gap-8">
        <Card className="bg-black text-white p-8 flex flex-col justify-between h-full border-none rounded-[2rem]">
          <div className="space-y-4">
            <Newspaper className="w-8 h-8" />
            <h3 className="text-2xl font-black tracking-tight leading-none">Actualités et Veille.</h3>
            <p className="text-white/60 font-medium text-xs leading-relaxed">
              Restez informé des dernières découvertes scientifiques et innovations.
            </p>
          </div>
          <Button 
            onClick={onFetchNews} 
            variant="outline" 
            className="bg-white text-black hover:bg-zinc-100 border-none h-14 mt-8 rounded-2xl cursor-pointer"
          >
            Découvrir <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>

      {/* Quote Bar */}
      <Card className="md:col-span-12 p-10 bg-slate-50 border-none flex flex-col md:flex-row items-center justify-between gap-8 rounded-[2.5rem]">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <img 
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} 
                alt="user" 
                className="w-12 h-12 rounded-full border-4 border-white bg-white shadow-sm"
              />
            ))}
          </div>
          <div>
            <p className="font-black text-black tracking-tight">+5,000 étudiants</p>
            <p className="text-sm text-black/40 font-medium tracking-tight">Apprennent avec MwalimuMwema.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm max-w-md">
           <p className="text-xs italic text-black/60 font-medium leading-relaxed">"{quote.text}" — <span className="font-black text-black not-italic ml-1">{quote.author}</span></p>
        </div>
      </Card>

      {/* History */}
      {history.length > 0 && (
        <div className="md:col-span-12 pt-10">
          <div className="flex items-center gap-4 mb-8">
            <History className="w-5 h-5 text-black" />
            <h3 className="text-[10px] font-black text-black uppercase tracking-[0.4em]">Archives Personnelles</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {history.map((item) => {
              const histProgress = Math.round((item.completedChapters.length / item.curriculum.chapters.length) * 100);
              return (
                <div 
                  key={item.id} 
                  className="group bg-white p-8 rounded-[2.5rem] border-2 border-black/5 hover:border-black transition-all cursor-pointer relative"
                  onClick={() => onResumeCourse(item)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em]">{item.curriculum.level}</span>
                    <button 
                      onClick={(e) => onDeleteHistory(e, item.id)}
                      className="text-black/10 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-black text-black text-xl tracking-tighter mb-6">{item.curriculum.subject}</h4>
                  <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black rounded-full" 
                      style={{ width: `${histProgress}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};
