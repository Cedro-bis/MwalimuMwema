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
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { AuthUI } from './components/Auth';
import { Chat } from './components/Chat';
import { Profile } from './components/Profile';
import { Calculator } from './components/Calculator';
import { FirestoreService } from './lib/firestoreService';
import { GeminiService } from './services/geminiService';
import { cn } from './lib/utils';
import { LogOut, User as UserIcon, MessageSquare } from 'lucide-react';

const getFirstNameInitial = (user: User | null): string => {
  if (!user) return '?';
  if (user.displayName) {
    const firstName = user.displayName.split(' ')[0];
    if (firstName) return firstName[0].toUpperCase();
  }
  if (user.email) {
    const prefix = user.email.split('@')[0];
    const parts = prefix.split(/[._-]/);
    const firstName = parts[0];
    if (firstName) return firstName[0].toUpperCase();
    return prefix[0].toUpperCase();
  }
  return '?';
};

const isTextAnswerCorrect = (userAnswer: any, correctAnswerText: string | undefined): boolean => {
  const uStr = String(userAnswer || '').trim().toLowerCase();
  const cStr = String(correctAnswerText || '').trim().toLowerCase();
  if (!uStr || !cStr) return false;

  // 1. Direct or reciprocal substring match
  if (uStr.includes(cStr) || cStr.includes(uStr)) {
    return true;
  }

  // 2. Split by separator (commas, semicolons, slashes, or dashes) to extract individual keyword terms
  const terms = cStr.split(/[;,/-]+/).map(t => t.trim()).filter(t => t.length > 2);
  if (terms.length > 0) {
    const matchedCount = terms.filter(term => uStr.includes(term)).length;
    if (matchedCount >= 1 && uStr.length >= 8) {
      return true;
    }
  }

  // 3. Fallback word-by-word intersection check:
  // Split both into individual words, keeping only meaningful words (length > 3) and filtering out French grammatical stop words.
  const stopWords = ['avec', 'dans', 'pour', 'plus', 'sans', 'sous', 'vers', 'chez', 'sont', 'être', 'elle', 'elles', 'nous', 'vous', 'leur', 'leurs', 'cette', 'ces', 'mais', 'donc', 'parce', 'comme', 'alors'];
  const userWords = uStr.split(/[\s,.'";?!()-]+/).map(w => w.trim()).filter(w => w.length > 3 && !stopWords.includes(w));
  const correctWords = cStr.split(/[\s,.'";?!()-]+/).map(w => w.trim()).filter(w => w.length > 3 && !stopWords.includes(w));

  if (correctWords.length > 0) {
    const matchedWords = correctWords.filter(cw => userWords.some(uw => uw.includes(cw) || cw.includes(uw)));
    const threshold = Math.max(1, Math.ceil(correctWords.length * 0.45)); // Need ~45% of the keywords matched
    if (matchedWords.length >= threshold) {
      return true;
    }
  }

  return false;
};

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

const SUB_LEVELS: Record<string, string[]> = {
  'Primaire': ['1ère', '2e', '3e', '4e', '5e', '6e'],
  'Collège': ['7e', '8e'],
  'Lycée': ['1ère', '2e', '3e', '4e'],
  'Université': ['Bac1', 'Bac2', 'Bac3'],
  'Master': ['Master1', 'Master2'],
  'Études approfondies': []
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<'onboarding' | 'curriculum' | 'lesson' | 'quiz' | 'news' | 'profile'>('onboarding');
  const [level, setLevel] = useState<Level>('Lycée');
  const [subLevel, setSubLevel] = useState<string>('1ère');
  const [subject, setSubject] = useState('');
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [scienceNews, setScienceNews] = useState<ScienceNews[]>([]);
  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Analyse approfondie...');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [chapterScores, setChapterScores] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<(number | string)[]>([]);
  const [quote, setQuote] = useState({ text: "L'éducation est l'arme la plus puissante pour changer le monde.", author: "Nelson Mandela" });
  
  // Handle user initialization when user is set or verified
  useEffect(() => {
    const initUser = async () => {
      if (user) {
        // Optimisation: On ne bloque plus complétement l'UI (le dashboard peut s'afficher pendant que l'historique charge)
        console.log(`[APP] Initializing data for user: ${user.email}`);
        try {
          // Exécuter en parallèle pour diviser le temps de chargement par deux
          const [_, cloudHistory] = await Promise.all([
            FirestoreService.ensureUser(user.uid, user.email!),
            FirestoreService.getUserCurriculums(user.uid)
          ]);
          setHistory(cloudHistory.map(c => ({
            id: `${c.level}_${c.subject}`.replace(/\s+/g, '_'),
            curriculum: c,
            completedChapters: c.completedChapters || [],
            chapterScores: c.chapterScores || {},
            lastUpdated: c.lastAccessed?.toMillis() || Date.now()
          })));
        } catch (err) {
          console.error("[APP] Initialization error:", err);
        } finally {
          setAuthLoading(false);
        }
      }
    };
    initUser();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log(`[APP] Auth state changed: ${currentUser.email}, checking verification...`);
        const isVerified = await FirestoreService.checkUserVerification(currentUser.uid);
        if (isVerified) {
          console.log(`[APP] User is verified, logging in.`);
          setUser(currentUser);
        } else {
          console.log(`[APP] User is NOT verified, showing auth UI.`);
          // Don't set user to null immediately to avoid flickering during verification process
          // unless checkUserVerification definitely says they are not verified
        }
      } else {
        console.log(`[APP] No user signed in.`);
        setUser(null);
        setHistory([]);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
  }, []);

  // Sync state to History and Cloud
  useEffect(() => {
    if (!curriculum || !user) return;

    const historyId = `${curriculum.level}_${curriculum.subject}`.replace(/\s+/g, '_');
    
    // Sync to Cloud safely
    FirestoreService.updateProgress(user.uid, historyId, completedChapters, chapterScores).catch(err => {
      console.warn("[APP] Cloud progress sync deferred/failed (offline mode):", err);
    });

    const newHistory: HistoryItem[] = [
      {
        id: historyId,
        curriculum,
        completedChapters,
        chapterScores,
        lastUpdated: Date.now()
      },
      ...history.filter(h => h.id !== historyId)
    ].slice(0, 10); 

    setHistory(newHistory);
  }, [curriculum, completedChapters, chapterScores, user]);

  const handleStartCourse = async () => {
    if (!subject.trim() || !user) return;
    setLoading(true);
    setLoadingMessage('Génération de votre programme sur mesure...');
    try {
      const finalLevel = subLevel ? `${level} (${subLevel})` : level;
      const data = await GeminiService.generateCurriculum(finalLevel, subject);
      setCurriculum(data);
      setCompletedChapters([]);
      setChapterScores({});
      setView('curriculum');
      // Save to cloud
      await FirestoreService.saveCurriculum(user.uid, data);
    } catch (error) {
      console.error("Failed to generate curriculum:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChapter = async (chapter: Chapter) => {
    if (!curriculum || !user) return;
    
    // Try to load from cloud first
    const curriculumId = `${curriculum.level}_${curriculum.subject}`.replace(/\s+/g, '_');
    let cloudDetails = null;
    try {
      cloudDetails = await FirestoreService.getChapterDetails(user.uid, curriculumId, chapter.title);
    } catch (error) {
      console.warn("[APP] Could not fetch chapter details from cloud (offline mode):", error);
    }
    
    // Mark as started/being studied if not already
    if (!completedChapters.includes(chapter.id)) {
       // We can mark it as "studied" just by opening it to show progress in profile
       // but user might want it only after quiz. Let's stick to quiz for "mastered"
       // but maybe add a "current" flag? For now, we'll keep the quiz logic.
    }

    if (cloudDetails) {
      const updatedChapter = { ...chapter, ...cloudDetails };
      setActiveChapter(updatedChapter);
      setCurriculum({
        ...curriculum,
        chapters: curriculum.chapters.map(c => c.id === chapter.id ? updatedChapter : c)
      });
      setView('lesson');
      return;
    }

    if (chapter.content) {
      setActiveChapter(chapter);
      setView('lesson');
      return;
    }

    setLoading(true);
    setLoadingMessage(`Rédaction du chapitre : ${chapter.title}...`);
    try {
      const details = await GeminiService.generateChapterDetails(curriculum.level, curriculum.subject, chapter.title);
      const updatedChapter = { ...chapter, ...details };
      setActiveChapter(updatedChapter);
      setCurriculum({
        ...curriculum,
        chapters: curriculum.chapters.map(c => c.id === chapter.id ? updatedChapter : c)
      });
      // Save details to cloud
      await FirestoreService.saveChapterDetails(user.uid, curriculumId, updatedChapter);
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

  const handleQuizSubmit = async (answers: (number | string)[]) => {
    if (!activeChapter?.quiz) return;
    let score = 0;
    activeChapter.quiz.forEach((q, idx) => {
      const userAns = answers[idx];
      if (q.type === 'text') {
        if (isTextAnswerCorrect(userAns, q.correctAnswerText)) {
          score++;
        }
      } else {
        const correctIdx = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.correctAnswer;
        if (userAns !== undefined && Number(userAns) === Number(correctIdx)) {
          score++;
        }
      }
    });

    setQuizScore(score);
    
    // Save the score in local chapterScores state
    setChapterScores(prev => ({
      ...prev,
      [activeChapter.id]: score
    }));

    if (score >= 6) {
      if (!completedChapters.includes(activeChapter.id)) {
        setCompletedChapters([...completedChapters, activeChapter.id]);
      }
    } else {
      // Score < 6: We fail validation. Ensure it is removed from completedChapters in state and cloud
      setCompletedChapters(prev => prev.filter(id => id !== activeChapter.id));
      
      if (curriculum && user) {
        const curriculumId = `${curriculum.level}_${curriculum.subject}`.replace(/\s+/g, '_');
        try {
          // Delete chapter cache in Firestore
          await FirestoreService.deleteChapterDetails(user.uid, curriculumId, activeChapter.title);
        } catch (error) {
          console.error("Failed to delete chapter details:", error);
        }

        // Wipe local chapters cached info to force reload + regenerate next time
        setCurriculum({
          ...curriculum,
          chapters: curriculum.chapters.map(c => {
            if (c.id === activeChapter.id) {
              const { content, quiz, youtubeLinks, objectives, ...rest } = c;
              return { ...rest };
            }
            return c;
          })
        });
      }
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
    setCompletedChapters(historyItem.completedChapters || []);
    setChapterScores(historyItem.chapterScores || {});
    setView('curriculum');
  };

  const handleDeleteHistory = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!user) return;
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    try {
      await FirestoreService.deleteCurriculum(user.uid, id);
    } catch (err) {
      console.error("Failed to delete from cloud", err);
    }
  };

  const progress = curriculum ? Math.round((completedChapters.length / curriculum.chapters.length) * 100) : 0;
  const isMathSubject = curriculum?.subject.toLowerCase().includes('math') || subject.toLowerCase().includes('math');

  // Calculate overall course score out of 20
  const overallCourseScore = (() => {
    if (!completedChapters.length) return 0;
    const sum = completedChapters.reduce((acc, cid) => {
      return acc + (chapterScores[cid] !== undefined ? chapterScores[cid] : 10);
    }, 0);
    return (sum / (completedChapters.length * 10)) * 20;
  })();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* Advanced Calculator for Math */}
      {user && isMathSubject && (view === 'lesson' || view === 'curriculum') && <Calculator />}

      {/* --- Header --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl z-50 px-10 flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('onboarding')}>
          <h1 className="text-2xl font-black text-black tracking-tighter">
            MwalimuMwema
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          {curriculum && view !== 'onboarding' && view !== 'profile' && (
            <div className="bg-white border border-black px-5 py-2 rounded-full text-xs font-bold text-black hidden md:flex items-center gap-3">
              <span className="opacity-40 uppercase tracking-widest text-[9px]">Niveau</span>
              <span>{curriculum.level}</span>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span>{curriculum.subject}</span>
            </div>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setView('profile')}
                className="w-10 h-10 bg-black text-white rounded-full border border-black flex items-center justify-center overflow-hidden hover:scale-105 transition-transform font-bold text-sm uppercase select-none"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  getFirstNameInitial(user)
                )}
              </button>
              <button 
                onClick={() => signOut(auth)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors order-last md:order-none"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="pt-32 pb-24 px-12 max-w-7xl mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          
          {authLoading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="w-20 h-20 border-2 border-black/5 border-t-black rounded-full animate-spin" />
            </div>
          ) : !user ? (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <AuthUI onAuthSuccess={(u) => setUser(u)} />
            </motion.div>
          ) : (
            <>
          {/* --- PROFILE VIEW --- */}
          {view === 'profile' && (
            <Profile 
              user={user} 
              curriculums={history.map(h => h.curriculum)}
              onBack={() => setView('onboarding')}
              onLogout={() => {
                setUser(null);
                setView('onboarding');
              }}
              onSelectSubject={(curr) => {
                const hist = history.find(h => h.id === `${curr.level}_${curr.subject}`.replace(/\s+/g, '_'));
                if (hist) {
                  handleResumeCourse(hist);
                } else {
                  setCurriculum(curr);
                  setCompletedChapters(curr.completedChapters || []);
                  setChapterScores(curr.chapterScores || {});
                  setView('curriculum');
                }
              }}
            />
          )}

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

                {/* Course Objectives Banner according to promotion */}
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
              <Card className="md:col-span-8 p-12 flex flex-col gap-10 h-fit border-none shadow-none">
                <div className="space-y-4">
                    <h1 className="text-[36px] font-black text-black tracking-tighter leading-[1.1]">
                      {activeChapter.title}
                    </h1>

                    {/* Chapter objectives display */}
                    <div className="pt-2 pb-5 border-b border-black/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-3">
                        🎯 Objectifs d'apprentissage du chapitre
                      </p>
                      <div className="flex flex-col gap-2">
                        {(activeChapter.objectives && activeChapter.objectives.length > 0
                          ? activeChapter.objectives
                          : [
                              "Comprendre les notions théoriques majeures abordées dans ce chapitre.",
                              "Être capable de mettre en pratique et d'exposer les concepts clés de manière fluide.",
                              "Réussir l'évaluation finale avec un score de validation optimal."
                            ]
                        ).map((obj, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm text-black/70 font-medium leading-relaxed">
                            <span className="text-black/30 font-bold">•</span>
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>

                <div className="prose prose-slate max-w-none font-normal text-[18px] leading-relaxed text-black/80">
                  <ReactMarkdown components={{
                    a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                  }}>
                    {activeChapter.content?.replace(/^Chapitre\s*:\s*.*?\n/i, '').trim() || ""}
                  </ReactMarkdown>
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

                  {(chapterScores[activeChapter.id] || 0) >= 6 ? (
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2 mt-4 shadow-sm">
                      <div className="inline-flex w-10 h-10 bg-slate-900 rounded-full items-center justify-center text-white font-bold mx-auto mb-1">
                        ✓
                      </div>
                      <p className="text-sm font-bold text-slate-900">Chapitre maîtrisé ! ({chapterScores[activeChapter.id]} / 10)</p>
                      <p className="text-xs text-slate-500 font-medium">Vous avez déjà validé ce chapitre avec brio (score ≥ 6/10). L'accès à l'évaluation pour ce chapitre a été clôturé.</p>
                    </div>
                  ) : (
                    <Button 
                       onClick={handleFinishChapter} 
                       className="h-14 px-10 text-base rounded-2xl shadow-xl shadow-slate-100 w-full"
                    >
                       Débuter l'évaluation <ChevronRight className="w-5 h-5" />
                    </Button>
                  )}
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

                <Chat 
                  level={curriculum?.level || ''} 
                  subject={curriculum?.subject || ''} 
                  chapterTitle={activeChapter.title}
                  lessonContent={activeChapter.content || ''}
                />
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
                           <span className="text-slate-900 font-black text-3xl">
                             {qIndex + 1 < 10 ? `0${qIndex + 1}` : qIndex + 1}
                           </span>
                           <div className="flex-1 pt-1.5">
                             <div className="flex flex-wrap items-center gap-2 mb-1">
                               <h3 className="text-lg font-bold text-slate-800 leading-snug">{q.question}</h3>
                               {q.type === 'text' && (
                                 <span className="bg-amber-100 text-amber-800 text-[9px] uppercase font-black px-2 py-0.5 rounded-full inline-block">
                                   Question ouverte
                                 </span>
                               )}
                             </div>
                           </div>
                        </div>

                        {q.type === 'text' ? (
                          <div className="sm:pl-12 space-y-2">
                            <input
                              type="text"
                              placeholder="Tapez votre réponse ici..."
                              value={String(quizAnswers[qIndex] || '')}
                              onChange={(e) => {
                                const newAnswers = [...quizAnswers];
                                newAnswers[qIndex] = e.target.value;
                                setQuizAnswers(newAnswers);
                              }}
                              className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none text-sm font-bold bg-slate-50 text-slate-900"
                            />
                            <p className="text-[10px] text-amber-700/90 font-semibold bg-amber-50 rounded-lg px-3 py-1 inline-block border border-amber-100">Question explicative : S'il vous plaît, expliquez et rédigez votre raisonnement ou concept clé.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3 sm:pl-12">
                            {(q.options || []).map((option, oIndex) => {
                              const isActive = quizAnswers[qIndex] === oIndex;
                              return (
                                <button
                                  key={oIndex}
                                  type="button"
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
                        )}
                      </Card>
                    ))}
                  </div>

                  <div className="md:col-span-4 sticky top-28 h-fit">
                    <Card className="p-6 bg-slate-100 border-slate-200 shadow-none space-y-6">
                       <div className="space-y-2">
                         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Résumé du Quiz</h4>
                         <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            Vous devez répondre à toutes les questions ({activeChapter.quiz.length}) pour voir vos résultats et valider le module.
                         </p>
                       </div>
                       <Button 
                        onClick={() => handleQuizSubmit(quizAnswers)} 
                        className="w-full h-14 text-sm"
                        disabled={
                          activeChapter.quiz.some((_, idx) => {
                            const ans = quizAnswers[idx];
                            return ans === undefined || String(ans).trim() === "";
                          })
                        }
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
                  <Card className={cn(
                    "p-12 text-center border-none text-white flex flex-col items-center justify-center gap-6",
                    (quizScore !== null && quizScore >= 6) ? "bg-slate-900" : "bg-red-950 border border-red-900"
                  )}>
                    <div className={cn(
                      "w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-inner ring-1",
                      (quizScore !== null && quizScore >= 6) ? "bg-white/10 ring-white/10" : "bg-white/5 ring-red-500/20"
                    )}>
                       <Award className={cn("w-12 h-12", (quizScore !== null && quizScore >= 6) ? "text-slate-400" : "text-red-400")} />
                    </div>
                    <div className="space-y-1">
                       <h2 className="text-4xl font-bold">Score: {quizScore} / {activeChapter.quiz.length}</h2>
                       <p className={cn(
                         "font-bold uppercase text-[10px] tracking-[0.2em]",
                         (quizScore !== null && quizScore >= 6) ? "text-slate-400" : "text-red-400"
                       )}>
                         {(quizScore !== null && quizScore >= 6) ? "Félicitations ! Chapitre maîtrisé" : "Score insuffisant (< 6/10)"}
                       </p>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full max-w-[200px]">
                       <div 
                         className={cn("h-full transition-all duration-1000 rounded-full", (quizScore !== null && quizScore >= 6) ? "bg-white" : "bg-red-500")} 
                         style={{ width: `${((quizScore || 0) / activeChapter.quiz.length) * 100}%` }} 
                       />
                    </div>
                    
                    {quizScore !== null && quizScore >= 6 ? (
                      <div className="flex flex-col gap-3 w-full max-w-sm mt-4">
                        <Button onClick={() => setView('curriculum')} className="w-full rounded-2xl h-12 text-sm bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg">
                          Retourner au Syllabus
                        </Button>
                        <Button variant="secondary" onClick={() => setView('onboarding')} className="w-full rounded-2xl h-12 text-sm bg-white/10 hover:bg-white/20 text-white">
                          Choisir un Nouveau Sujet
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 w-full max-w-sm mt-4">
                        <p className="text-xs text-red-200/80 leading-relaxed max-w-xs mx-auto mb-2">
                          Vous devez obtenir au moins 6/10 pour valider cette étape. Le cours et son évaluation ont été réinitialisés.
                        </p>
                        <Button 
                          onClick={() => {
                            handleSelectChapter({
                              id: activeChapter.id,
                              title: activeChapter.title,
                              description: activeChapter.description
                            });
                          }} 
                          className="w-full rounded-2xl h-12 text-sm bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg"
                        >
                          Reprendre la lecture & Réessayer
                        </Button>
                        <Button variant="secondary" onClick={() => setView('curriculum')} className="w-full rounded-2xl h-12 text-sm bg-white/10 hover:bg-white/20 text-white border-none">
                          Retourner au Syllabus
                        </Button>
                      </div>
                    )}
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Correction détaillée</h3>
                    <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                      {activeChapter.quiz.map((q, i) => {
                        const isCorrect = (() => {
                          if (q.type === 'text') {
                            return isTextAnswerCorrect(quizAnswers[i], q.correctAnswerText);
                          } else {
                            const correctIdx = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.correctAnswer;
                            return quizAnswers[i] !== undefined && Number(quizAnswers[i]) === Number(correctIdx);
                          }
                        })();

                        const correctDisplayStr = (() => {
                          if (q.type === 'text') {
                            return q.correctAnswerText || '';
                          } else {
                            const correctIdx = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.correctAnswer;
                            return q.options && q.options[Number(correctIdx)] ? q.options[Number(correctIdx)] : '';
                          }
                        })();

                        return (
                          <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl space-y-3 transition-shadow hover:shadow-sm">
                            <div className="flex items-start gap-4">
                                {isCorrect ? (
                                  <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                     <CheckCircle className="text-white w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                     <div className="text-white font-black text-[10px]">X</div>
                                  </div>
                                )}
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-bold text-xs text-slate-800 leading-tight">{q.question}</p>
                                    {q.type === 'text' && (
                                      <span className="bg-amber-100 text-amber-800 text-[8px] uppercase font-black px-1.5 py-0.2 rounded-full inline-block">
                                        Libre
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-2 pt-1">
                                    <p className="text-slate-900 text-[10px] font-black uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full inline-block">
                                      Votre réponse: {q.type === 'text' ? (quizAnswers[i] || '(vide)') : (q.options ? q.options[Number(quizAnswers[i])] : '')}
                                    </p>
                                    <p className="text-green-800 text-[10px] font-black uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-full inline-block">
                                      Attendu : {correctDisplayStr}
                                    </p>
                                  </div>
                                  <p className="text-slate-400 text-[10px] italic leading-relaxed pt-1">{q.explanation}</p>
                                </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

            </>
          )}
        </AnimatePresence>
      </main>

      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
            >
               <div className="w-16 h-16 border-[3px] border-black/5 border-t-black rounded-full animate-spin" />
            </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
