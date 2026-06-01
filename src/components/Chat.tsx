import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare, User } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface ChatProps {
  level: string;
  subject: string;
  chapterTitle: string;
  lessonContent: string;
}

export const Chat = ({ level, subject, chapterTitle, lessonContent }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await GeminiService.askAi(level, subject, chapterTitle, lessonContent, userMessage);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'ai', content: "Désolé, une erreur est survenue lors de la génération de la réponse." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-50 rounded-[2rem] overflow-hidden border border-black/5 shadow-sm">
      <div className="p-6 bg-white border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-xs uppercase tracking-widest text-black">Assistant IA</h3>
            <p className="text-[10px] text-black/40 font-medium tracking-tight">Posez vos questions sur ce chapitre</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
               <User className="w-6 h-6 text-black/20" />
            </div>
            <p className="text-xs font-medium text-black/40 leading-relaxed">
              Un doute sur une notion ? <br /> Une question sur un exemple ? <br /> Je suis là pour vous aider.
            </p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col w-full max-w-[85%] md:max-w-[80%] overflow-hidden",
                m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed w-full border overflow-hidden break-words",
                m.role === 'user' 
                  ? "bg-black text-white border-black rounded-tr-none" 
                  : "bg-amber-50 text-amber-900 border-amber-100 rounded-tl-none"
              )}>
                <div className={cn(
                  "prose prose-sm max-w-none w-full overflow-hidden break-words",
                  m.role === 'user' ? "prose-invert" : "text-amber-900"
                )}>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0 whitespace-pre-wrap break-words leading-relaxed">{children}</p>,
                      a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 break-all">{children}</a>,
                      ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2 break-words">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-2 break-words">{children}</ol>,
                      li: ({ children }) => <li className="break-words">{children}</li>,
                      code: ({ className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isBlock = !!(match || String(children).includes('\n'));
                        return isBlock ? (
                          <pre className="max-w-full overflow-x-auto bg-black/10 p-3 rounded-lg text-xs font-mono my-2 break-all whitespace-pre-wrap leading-tight">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        ) : (
                          <code className={cn("px-1 py-0.5 rounded text-xs font-mono break-all font-semibold", m.role === 'user' ? "bg-white/10" : "bg-black/5")} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
             <div className="p-4 bg-white rounded-2xl rounded-tl-none shadow-sm border border-black/5">
                <Loader2 className="w-4 h-4 animate-spin text-black/20" />
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-black/5">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Posez votre question ici..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-black/5 transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center disabled:opacity-20 hover:bg-zinc-800 transition-all shadow-lg shadow-black/10"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
