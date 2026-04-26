/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle, 
  Play, 
  Award, 
  Brain,
  ArrowLeft,
  Loader2,
  Youtube,
  Trash2,
  FileText,
  Newspaper,
  History,
  Microscope,
  Stethoscope,
  Rocket,
  Cpu,
  Globe,
  Zap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Level, Curriculum, Chapter, ScienceNews, HistoryItem } from './types';
import { GeminiService } from './services/geminiService';
import { cn } from './lib/utils';

// --- Improved Components ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled = false,
  loading = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 transition-all duration-300",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100",
    outline: "bg-white border-2 border-black text-black hover:bg-black hover:text-white",
    dark: "bg-zinc-950 text-white hover:bg-black shadow-lg"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "px-10 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base tracking-tight",
        variants[variant],
        className
      )}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

const Card = ({ children, className, padding = true }: { children: React.ReactNode; className?: string; padding?: boolean }) => (
  <div className={cn("bg-white border border-black rounded-[3rem] overflow-hidden", padding && "p-10", className)}>
    {children}
  </div>
);

// --- Sections ---

const App = () => {
  const [view, setView] = useState<'onboarding' | 'curriculum' | 'lesson' | 'quiz' | 'news'>('onboarding');
  const [level, setLevel] = useState<Level>('Lycée');
  const [subject, setSubject] = useState('');
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [scienceNews, setScienceNews] = useState<ScienceNews[]>([]);
  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quote, setQuote] = useState({ text: "L'éducation est l'arme la plus puissante pour changer le monde.", author: "Nelson Mandela" });
  
  const quotes = [
    { text: "Rien n'est à craindre, tout est à comprendre.", author: "Marie Curie" },
    { text: "L'imagination est plus importante que la connaissance.", author: "Albert Einstein" },
    { text: "Le plus grand ennemi de la connaissance n'est pas l'ignorance, c'est l'illusion de la connaissance.", author: "Stephen Hawking" },
    { text: "La science est un moyen de ne pas se tromper soi-même.", author: "Richard Feynman" },
    { text: "L'éducation est le passeport pour l'avenir.", author: "Malcolm X" },
    { text: "On n'apprend que de ce qu'on aime.", author: "Johann Wolfgang von Goethe" }
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // Load History
    const saved = localStorage.getItem('mwalimumwema_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Sync state to History
  useEffect(() => {
    if (!curriculum) return;

    const historyId = `${curriculum.level}_${curriculum.subject}`;
    const newHistory: HistoryItem[] = [
      {
        id: historyId,
        curriculum,
        completedChapters,
        lastUpdated: Date.now()
      },
      ...history.filter(h => h.id !== historyId)
    ].slice(0, 5); // Keep last 5

    setHistory(newHistory);
    localStorage.setItem('mwalimumwema_history', JSON.stringify(newHistory));
  }, [curriculum, completedChapters]);

  const handleStartCourse = async () => {
    if (!subject.trim()) return;
    setLoading(true);
    try {
      const data = await GeminiService.generateCurriculum(level, subject);
      setCurriculum(data);
      setView('curriculum');
    } catch (error) {
      console.error("Failed to generate curriculum:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChapter = async (chapter: Chapter) => {
    if (!curriculum) return;
    if (chapter.content) {
      setActiveChapter(chapter);
      setView('lesson');
      return;
    }
    setLoading(true);
    try {
      const details = await GeminiService.generateChapterDetails(curriculum.level, curriculum.subject, chapter.title);
      const updatedChapter = { ...chapter, ...details };
      setActiveChapter(updatedChapter);
      setCurriculum({
        ...curriculum,
        chapters: curriculum.chapters.map(c => c.id === chapter.id ? updatedChapter : c)
      });
      setView('lesson');
    } catch (error) {
      console.error("Failed to fetch chapter details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishChapter = () => {
    setView('quiz');
    setQuizScore(null);
    setQuizAnswers([]);
  };

  const handleQuizSubmit = (answers: number[]) => {
    if (!activeChapter?.quiz) return;
    let score = 0;
    answers.forEach((ans, idx) => {
      if (ans === activeChapter.quiz![idx].correctAnswer) score++;
    });
    setQuizScore(score);
    if (!completedChapters.includes(activeChapter.id)) {
      setCompletedChapters([...completedChapters, activeChapter.id]);
    }
  };

  const handleFetchNews = async (domain?: string) => {
    setLoading(true);
    try {
      const data = await GeminiService.generateScienceNews(domain);
      setScienceNews(data);
      setView('news');
      if (domain) setNewsSearchQuery('');
    } catch (error) {
      console.error("Failed to fetch science news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeCourse = (historyItem: HistoryItem) => {
    setCurriculum(historyItem.curriculum);
    setCompletedChapters(historyItem.completedChapters);
    setView('curriculum');
  };

  const handleDeleteHistory = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('mwalimumwema_history', JSON.stringify(newHistory));
  };

  const progress = curriculum ? Math.round((completedChapters.length / curriculum.chapters.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* --- Header --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl z-50 px-10 flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('onboarding')}>
          <h1 className="text-2xl font-black text-black tracking-tighter">
            MwalimuMwema
          </h1>
        </div>
        
        {curriculum && view !== 'onboarding' && (
          <div className="flex items-center gap-6">
            <div className="bg-white border border-black px-5 py-2 rounded-full text-xs font-bold text-black hidden md:flex items-center gap-3">
              <span className="opacity-40 uppercase tracking-widest text-[9px]">Niveau</span>
              <span>{curriculum.level}</span>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span>{curriculum.subject}</span>
            </div>
            <div className="w-10 h-10 bg-black rounded-full border border-black flex items-center justify-center overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${curriculum.subject}`} alt="avatar" />
            </div>
          </div>
        )}
      </header>

      <main className="pt-32 pb-24 px-12 max-w-7xl mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          
          {/* --- ONBOARDING --- */}
          {view === 'onboarding' && (
            <motion.div 
              key="onboarding"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10"
            >
              <div className="md:col-span-12 py-6 text-center flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-8 text-black"
                >
                  <Brain className="w-16 h-16" />
                </motion.div>
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {['Primaire', 'Collège', 'Lycée', 'Université'].map((l) => (
                        <button
                          key={l}
                          onClick={() => setLevel(l as Level)}
                          className={cn(
                            "px-5 py-4 rounded-2xl border-2 transition-all text-[11px] uppercase tracking-widest font-bold",
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
                  onClick={handleStartCourse} 
                  variant="primary"
                  className="w-full h-16 text-lg"
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
                    onClick={() => handleFetchNews()} 
                    variant="outline" 
                    className="bg-white text-black hover:bg-zinc-100 border-none h-14 mt-8 rounded-2xl"
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
                          onClick={() => handleResumeCourse(item)}
                        >
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em]">{item.curriculum.level}</span>
                            <button 
                              onClick={(e) => handleDeleteHistory(e, item.id)}
                              className="text-black/10 hover:text-red-500 transition-colors"
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
          )}

          {/* --- CURRICULUM BENTO GRID --- */}
          {view === 'curriculum' && curriculum && (
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
                <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                  {curriculum.chapters.map((chapter, index) => {
                    const isDone = completedChapters.includes(chapter.id);
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={chapter.id}
                        onClick={() => handleSelectChapter(chapter)}
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
                  <Button variant="secondary" className="mt-6 px-8 py-3 rounded-full uppercase tracking-wider text-xs font-black">
                     Partager mon profil
                  </Button>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute top-10 right-20 opacity-10 pointer-events-none">
                   <Brain className="w-40 h-40 text-white" />
                </div>
              </Card>
            </motion.div>
          )}

          {/* --- SCIENCE NEWS BENTO GRID --- */}
          {view === 'news' && (
            <motion.div 
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <button 
                  onClick={() => setView('onboarding')}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
                </button>
                
                <div className="flex-1 max-w-xl w-full flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Chercher un domaine (ex: Biologie marine, Nanotech...)"
                      value={newsSearchQuery}
                      onChange={(e) => setNewsSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleFetchNews(newsSearchQuery)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none text-sm font-medium"
                    />
                  </div>
                  <Button onClick={() => handleFetchNews(newsSearchQuery)} className="h-11 px-5 whitespace-nowrap">
                    Rechercher
                  </Button>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                   <Newspaper className="w-4 h-4" /> Actualités Scientifiques
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {scienceNews.map((domain, domainIdx) => {
                  const domainIcons: Record<string, any> = {
                    'Astronomie': Rocket,
                    'Médecine': Stethoscope,
                    'Intelligence Artificielle': Cpu,
                    'Environnement': Globe,
                    'Physique': Zap,
                  };
                  const Icon = domainIcons[domain.domain] || Microscope;
                  
                  return (
                    <React.Fragment key={domainIdx}>
                      <Card className={cn(
                        "p-8 flex flex-col gap-6",
                        domainIdx % 3 === 0 ? "md:col-span-8" : "md:col-span-4"
                      )}>
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{domain.domain}</h2>
                        </div>
                        <div className="space-y-10">
                          {domain.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="space-y-4">
                              <div className="flex justify-between items-start gap-4">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.title}</h3>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{item.date}</span>
                              </div>
                              <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{item.summary}</p>
                              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                              <div className="flex flex-wrap gap-2 pt-1 border-l-2 border-slate-200 pl-4 ml-1">
                                <p className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ressources & Étude</p>
                                {item.resources.map((res, resIdx) => (
                                  <a 
                                    key={resIdx} 
                                    href={res.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-200 hover:border-slate-300 transition-all group"
                                  >
                                    {res.type === 'video' && <Play className="w-3 h-3 text-red-600 fill-red-600" />}
                                    {res.type === 'book' && <BookOpen className="w-3 h-3 text-slate-600" />}
                                    {res.type === 'article' && <FileText className="w-3 h-3 text-slate-400" />}
                                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-slate-900">{res.title}</span>
                                  </a>
                                ))}
                              </div>
                              <div className="pt-2">
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-slate-50 mt-2 px-2 py-1 rounded-md border border-slate-200 block w-fit">
                                  Impact: {item.impact}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* --- LESSON BENTO GRID --- */}
          {view === 'lesson' && activeChapter && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-12 mb-2">
                <button 
                  onClick={() => setView('curriculum')}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour au programme
                </button>
              </div>

              {/* Main Content Card */}
              <Card className="md:col-span-8 p-10 flex flex-col gap-6 h-fit">
                <div className="space-y-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Leçon</span>
                      <span className="text-black/10 mx-1">|</span>
                      <span className="text-black/40 font-medium text-[11px] tracking-tight">{curriculum?.subject}</span>
                    </div>
                    <h1 className="text-[24px] font-black text-black tracking-tight leading-tight">
                      {activeChapter.title}
                    </h1>
                    {activeChapter.description && (
                      <p className="text-[14px] text-black/40 font-medium leading-relaxed">
                        {activeChapter.description}
                      </p>
                    )}
                </div>

                <div className="prose prose-slate max-w-none font-normal text-[18px] leading-relaxed">
                  <ReactMarkdown>{activeChapter.content || ""}</ReactMarkdown>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                  <div className="flex w-full justify-between gap-4">
                    {curriculum && (() => {
                      const currentIndex = curriculum.chapters.findIndex(c => c.id === activeChapter.id);
                      const prevChapter = currentIndex > 0 ? curriculum.chapters[currentIndex - 1] : null;
                      const nextChapter = currentIndex < curriculum.chapters.length - 1 ? curriculum.chapters[currentIndex + 1] : null;

                      return (
                        <>
                          <button 
                            onClick={() => prevChapter && handleSelectChapter(prevChapter)}
                            disabled={!prevChapter}
                            className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-black text-sm font-bold disabled:opacity-20 transition-all hover:bg-slate-50"
                          >
                            <ArrowLeft className="w-4 h-4" /> Précédent
                          </button>
                          <button 
                            onClick={() => nextChapter && handleSelectChapter(nextChapter)}
                            disabled={!nextChapter}
                            className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-black text-sm font-bold disabled:opacity-20 transition-all hover:bg-slate-50"
                          >
                            Suivant <ArrowRight className="w-4 h-4" />
                          </button>
                        </>
                      );
                    })()}
                  </div>

                  <Button 
                     onClick={handleFinishChapter} 
                     className="h-14 px-10 text-base rounded-2xl shadow-xl shadow-slate-100 w-full"
                  >
                     Débuter l'évaluation <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </Card>

              {/* Resources Card (Bento right column) */}
              <div className="md:col-span-4 space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Youtube className="text-red-600 w-5 h-5" /> Vidéos suggérées
                  </h3>
                  <div className="space-y-4">
                    {activeChapter.youtubeLinks?.map((video, i) => (
                      <a 
                        key={i} 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group block space-y-3"
                      >
                        <div className="aspect-video bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-100 hover:border-slate-300 transition-all">
                          <img 
                            src={`https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80&sep=${i}`} 
                            alt="preview" 
                            className="w-full h-full object-cover opacity-20 transition-transform group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-red-200">
                               <Play className="text-white fill-white w-5 h-5 ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors line-clamp-2 px-1">
                          {video.title}
                        </p>
                      </a>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 bg-slate-900 border-none text-white text-center flex flex-col items-center justify-center gap-4 h-[240px]">
                   <Award className="text-slate-400 w-12 h-12" />
                   <h4 className="font-bold">Mémorisation active</h4>
                   <p className="text-xs text-slate-300 opacity-60 leading-relaxed font-medium">Prendre des notes pendant la lecture augmente significativement votre taux de réussite à l'évaluation.</p>
                </Card>
              </div>
            </motion.div>
          )}

          {/* --- QUIZ BENTO GRID --- */}
          {view === 'quiz' && activeChapter?.quiz && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-12 text-center mb-4">
                <div className="bg-slate-100 text-slate-900 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border border-slate-200 mb-4">Évaluation Finale</div>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Validez vos acquis</h1>
                <p className="text-slate-400 mt-2 font-medium">Répondez à ces questions pour finaliser votre maîtrise du chapitre.</p>
              </div>

              {quizScore === null ? (
                <>
                  <div className="md:col-span-8 space-y-6">
                    {activeChapter.quiz.map((q, qIndex) => (
                      <Card key={qIndex} className="p-8 space-y-6 bg-white border-slate-100">
                        <div className="flex gap-4">
                           <span className="text-slate-900 font-black text-3xl">0{qIndex + 1}</span>
                           <h3 className="text-lg font-bold text-slate-800 pt-1.5 leading-snug">{q.question}</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:pl-12">
                          {q.options.map((option, oIndex) => {
                            const isActive = quizAnswers[qIndex] === oIndex;
                            return (
                              <button
                                key={oIndex}
                                onClick={() => {
                                  const newAnswers = [...quizAnswers];
                                  newAnswers[qIndex] = oIndex;
                                  setQuizAnswers(newAnswers);
                                }}
                                className={cn(
                                  "text-left p-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-wider",
                                  isActive 
                                    ? "border-slate-900 bg-slate-900 text-white ring-4 ring-slate-100" 
                                    : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                                )}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="md:col-span-4 sticky top-28 h-fit">
                    <Card className="p-6 bg-slate-100 border-slate-200 shadow-none space-y-6">
                       <div className="space-y-2">
                         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Résumé du Quiz</h4>
                         <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            Vous devez répondre à toutes les questions ({activeChapter.quiz.length}) pour voir vos résultats.
                         </p>
                       </div>
                       <Button 
                        onClick={() => handleQuizSubmit(quizAnswers)} 
                        className="w-full h-14 text-sm"
                        disabled={quizAnswers.length < activeChapter.quiz.length}
                      >
                        Finaliser le module
                      </Button>
                    </Card>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <Card className="p-12 text-center bg-slate-900 border-none text-white flex flex-col items-center justify-center gap-6">
                    <div className="bg-white/10 w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-inner ring-1 ring-white/10">
                       <Award className="text-slate-400 w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                       <h2 className="text-4xl font-bold">Score: {quizScore} / {activeChapter.quiz.length}</h2>
                       <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">{quizScore >= activeChapter.quiz.length / 2 ? "Félicitations !" : "Encore un petit effort"}</p>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full max-w-[200px]">
                       <div 
                         className="h-full bg-white transition-all duration-1000 rounded-full" 
                         style={{ width: `${(quizScore / activeChapter.quiz.length) * 100}%` }} 
                       />
                    </div>
                          <div className="flex gap-3 w-full max-w-sm mt-4">
                            <Button variant="secondary" onClick={() => setView('onboarding')} className="flex-1 rounded-2xl h-12 text-sm">
                              Nouveau sujet
                            </Button>
                            <Button onClick={() => setView('curriculum')} className="flex-1 rounded-2xl h-12 text-sm">
                              Continuer
                            </Button>
                          </div>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Correction détaillée</h3>
                    <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                      {activeChapter.quiz.map((q, i) => (
                        <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl space-y-3 transition-shadow hover:shadow-sm">
                          <div className="flex items-start gap-4">
                              {quizAnswers[i] === q.correctAnswer ? (
                                <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                   <CheckCircle className="text-white w-4 h-4" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-lg bg-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                                   <div className="text-white font-black text-[10px]">X</div>
                                </div>
                              )}
                              <div className="space-y-1.5 flex-1">
                                <p className="font-bold text-xs text-slate-800 leading-tight">{q.question}</p>
                                <p className="text-slate-900 text-[10px] font-black uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full inline-block">Réponse: {q.options[q.correctAnswer]}</p>
                                <p className="text-slate-400 text-[10px] italic leading-relaxed pt-1">{q.explanation}</p>
                              </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-50/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-2 border-slate-900/10 border-t-slate-900 rounded-[2rem] animate-spin" />
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-900 w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Artificielle en action</p>
              <p className="text-slate-400 font-medium max-w-sm">MwalimuMwema structure votre programme et rédige vos leçons personnalisées...</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
