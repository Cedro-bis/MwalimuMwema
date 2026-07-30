import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { Curriculum, Chapter } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { cn } from '../../lib/utils';

export interface CurriculumViewProps {
  curriculum: Curriculum;
  completedChapters: string[];
  chapterScores: Record<string, number>;
  onSelectChapter: (chapter: Chapter) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  curriculum,
  completedChapters,
  chapterScores,
  onSelectChapter,
}) => {
  const progress = Math.round((completedChapters.length / curriculum.chapters.length) * 100);

  const overallCourseScore = (() => {
    if (!completedChapters.length) return 0;
    const sum = completedChapters.reduce((acc, cid) => {
      return acc + (chapterScores[cid] !== undefined ? chapterScores[cid] : 10);
    }, 0);
    return (sum / (completedChapters.length * 10)) * 20;
  })();

  return (
    <motion.div 
      key="curriculum"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
    >
      {/* Stats Card */}
      <Card className="md:col-span-4 bg-slate-900 border-none text-white p-8 flex flex-col justify-between min-h-[300px]">
        <div>
          <h2 className="text-2xl font-bold mb-2">Progression</h2>
          <p className="text-slate-400 text-sm italic opacity-80">"Continue tes efforts pour réussir ton programme !"</p>
        </div>
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="transparent" />
              <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="12" fill="transparent" strokeDasharray="439.8" strokeDashoffset={439.8 - (439.8 * progress / 100)} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <span className="absolute text-3xl font-bold">{progress}%</span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{completedChapters.length} chapitres maîtrisés</p>

          <div className="mt-4 pt-4 border-t border-white/10 w-full text-center">
            <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Note globale du cours</p>
            <p className="text-2xl font-black text-white">
              {completedChapters.length > 0 
                ? `${overallCourseScore.toFixed(1)} / 20` 
                : "-- / 20"
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Syllabus Card */}
      <Card className="md:col-span-8 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
             <BookOpen className="text-slate-900 w-6 h-6" /> Syllabus du Parcours
           </h3>
           <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">
             {curriculum.chapters.length} Étapes
           </span>
        </div>

        {/* Course Objectives Banner */}
        <div className="mb-6 p-5 bg-stone-50 border border-stone-200 rounded-2xl">
          <h4 className="text-xs font-black uppercase text-stone-900 tracking-widest mb-3 flex items-center gap-2">
            🎯 Objectifs globaux du cours ({curriculum.level})
          </h4>
          <ul className="space-y-2">
            {(curriculum.objectives && curriculum.objectives.length > 0
              ? curriculum.objectives
              : [
                  `Acquérir des bases solides et approfondies en ${curriculum.subject}`,
                  `Maîtriser les compétences clés et les applications pratiques adaptées au niveau ${curriculum.level}`,
                  `Valider l'ensemble des chapitres par des évaluations interactives`
                ]
            ).map((obj, idx) => (
              <li key={idx} className="text-xs text-stone-600 font-medium flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {curriculum.chapters.map((chapter, index) => {
            const isDone = completedChapters.includes(chapter.id);
            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={chapter.id}
                onClick={() => onSelectChapter(chapter)}
                className={cn(
                  "group p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-5",
                  isDone 
                    ? "bg-slate-50 border-slate-200" 
                    : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-md"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                  isDone ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-900"
                )}>
                  {isDone ? <CheckCircle className="w-5 h-5" /> : `0${index + 1}`}
                </div>
                <div className="flex-1">
                  <h3 className={cn("text-lg tracking-tight", isDone ? "text-slate-900 opacity-20" : "text-black font-semibold")}>{chapter.title}</h3>
                  <p className="text-slate-400 text-[11px] mt-1 line-clamp-2 leading-relaxed font-normal">{chapter.description}</p>
                </div>
                <ChevronRight className={cn("w-4 h-4 transition-colors", isDone ? "text-slate-300" : "text-slate-200 group-hover:text-slate-900")} />
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Promo Card */}
      <Card className="md:col-span-12 bg-slate-900 border-none p-10 text-white relative overflow-hidden flex items-center">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-3 tracking-tight text-white">Prêt pour une expérience complète ?</h2>
          <p className="text-slate-300 text-base opacity-90 leading-relaxed font-medium">
            Utilisez MwalimuMwema comme compagnon quotidien. Chaque cours exploré enrichit votre profil et nous permet de vous proposer des leçons de plus en plus pertinentes.
          </p>
          <Button variant="secondary" className="mt-6 px-8 py-3 rounded-full uppercase tracking-wider text-xs font-black cursor-pointer">
             Partager mon profil
          </Button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
      </Card>
    </motion.div>
  );
};
