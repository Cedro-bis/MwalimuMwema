import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Square, Download, Settings2, User as UserIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface LessonControlsProps {
  title: string;
  content: string;
}

export function LessonControls({ title, content }: LessonControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceGender, setVoiceGender] = useState<'female' | 'male' | 'auto'>('auto');

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        // Filter French voices
        const frVoices = availableVoices.filter(v => v.lang.startsWith('fr'));
        setVoices(frVoices.length > 0 ? frVoices : availableVoices);
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Try to pick a voice based on gender preference
  useEffect(() => {
    if (voices.length === 0) return;
    
    if (voiceGender === 'auto') {
      setSelectedVoice(voices[0]);
      return;
    }

    // Heuristic: Some voice URIs or names contain indicators of gender
    // For Microsoft/Google voices, we can try to guess.
    let preferredVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      if (voiceGender === 'female') {
        return name.includes('female') || name.includes('julie') || name.includes('denise') || name.includes('hortense') || name.includes('margot');
      } else {
        return name.includes('male') || name.includes('paul') || name.includes('henri') || name.includes('claude') || name.includes('thomas') || name.includes('guy');
      }
    });

    if (!preferredVoice) {
      // Fallback
      preferredVoice = voices[0];
    }
    
    setSelectedVoice(preferredVoice);
    
    // If currently playing, we should restart with the new voice
    if (isPlaying || isPaused) {
      window.speechSynthesis.cancel();
      setIsPaused(false);
      playText();
    }
  }, [voiceGender, voices]);


  const playText = () => {
    if (!content) return;
    
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown before speaking
    const cleanText = content
      .replace(/[#*_~`]/g, '') // Remove basic markdown symbols
      .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Replace links with just text

    const fullText = `${title}. ${cleanText}`;
    
    // Chunk text by sentences to avoid speech synthesis length limits
    const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    
    sentences.forEach((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence.trim());
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      
      if (index === sentences.length - 1) {
        utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
      }
      utterance.onerror = (e) => { 
        console.error("Speech error:", e);
        setIsPlaying(false); 
        setIsPaused(false); 
      };
      
      window.speechSynthesis.speak(utterance);
    });
    
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseText = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const stopText = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseText();
    } else {
      playText();
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('full-curriculum-pdf');
      if (element) {
        // Clone the element to render it properly
        const clone = element.cloneNode(true) as HTMLElement;
        clone.classList.remove('hidden', 'print:block');
        clone.style.display = 'block';
        clone.style.width = '800px'; // Set a fixed width for consistent rendering
        
        // append to body temporarily
        const container = document.createElement('div');
        container.appendChild(clone);
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        document.body.appendChild(container);
        
        const opt: any = {
          margin:       15,
          filename:     `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cours.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        await html2pdf().set(opt).from(clone).save();
        
        document.body.removeChild(container);
      } else {
        window.print();
      }
    } catch (e) {
      console.error("PDF generation error:", e);
      window.print(); // fallback
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 print:hidden">
      <button
        onClick={downloadPDF}
        disabled={isDownloading}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold shadow-sm border transition-all text-black",
          isDownloading ? "border-slate-300 opacity-70 cursor-wait" : "border-black/5 hover:border-black/20 hover:scale-105"
        )}
      >
        <Download className={cn("w-4 h-4", isDownloading && "animate-pulse")} />
        <span className="hidden sm:inline">
          {isDownloading ? "Préparation PDF..." : "Télécharger PDF"}
        </span>
      </button>

      <div className="w-px h-8 bg-slate-200 mx-1"></div>

      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all",
            isPlaying 
              ? "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100" 
              : isPaused
                ? "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                : "bg-white text-blue-600 border border-blue-100 hover:border-blue-300 hover:scale-105"
          )}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">Mettre en pause</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isPaused ? "Reprendre" : "Lire à haute voix"}</span>
            </>
          )}
        </button>

        {(isPlaying || isPaused) && (
          <button
            onClick={stopText}
            className="p-2 bg-red-50 text-red-600 rounded-xl border border-red-200 hover:bg-red-100 transition-colors"
            title="Arrêter"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowVoiceSettings(!showVoiceSettings)}
          className="p-2 bg-white rounded-xl border border-black/5 hover:bg-slate-100 transition-colors text-slate-500"
        >
          <Settings2 className="w-4 h-4" />
        </button>

        {showVoiceSettings && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 z-50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 pt-1">
              Voix de l'assistant
            </p>
            <div className="space-y-1">
              <button
                onClick={() => setVoiceGender('auto')}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors",
                  voiceGender === 'auto' ? "bg-slate-100 text-black" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                Automatique
              </button>
              <button
                onClick={() => setVoiceGender('female')}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2",
                  voiceGender === 'female' ? "bg-slate-100 text-black" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <UserIcon className="w-4 h-4" /> Femme
              </button>
              <button
                onClick={() => setVoiceGender('male')}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2",
                  voiceGender === 'male' ? "bg-slate-100 text-black" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <UserIcon className="w-4 h-4" /> Homme
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
