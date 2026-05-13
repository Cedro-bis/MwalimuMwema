import React, { useState } from 'react';
import { X, Calculator as CalcIcon, Trash2, Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);

  const append = (val: string) => {
    setDisplay(prev => prev === '0' ? val : prev + val);
  };

  const clear = () => {
    setDisplay('0');
  };

  const remove = () => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const calculate = () => {
    try {
      // Replace symbols for JS calculation
      const expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      const result = eval(expression);
      const resStr = Number.isInteger(result) ? result.toString() : result.toFixed(4);
      setHistory(prev => [`${display} = ${resStr}`, ...prev].slice(0, 5));
      setDisplay(resStr);
    } catch (e) {
      setDisplay('Erreur');
      setTimeout(() => setDisplay('0'), 1500);
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', '^'],
    ['log(', 'ln(', 'π', 'e'],
    ['(', ')', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', 'C', 'del']
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-80 bg-white border border-black rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-6 bg-black text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CalcIcon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Calculatrice IA</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-black/5 text-right overflow-hidden">
                <div className="text-[10px] text-black/40 font-bold mb-1 h-4">
                  {history[0] || ''}
                </div>
                <div className="text-3xl font-black tracking-tight truncate">
                  {display}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === '=') calculate();
                      else if (btn === 'C') clear();
                      else if (btn === 'del') remove();
                      else append(btn);
                    }}
                    className={cn(
                      "py-3 rounded-xl text-xs font-bold transition-all",
                      btn === '=' ? "bg-black text-white col-span-1" : 
                      ['sin(', 'cos(', 'tan(', '^', 'log(', 'ln(', 'π', 'e', '(', ')'].includes(btn) ? "bg-slate-100 text-black/60 hover:bg-slate-200" :
                      ['÷', '×', '-', '+'].includes(btn) ? "bg-amber-50 text-amber-700 hover:bg-amber-100" :
                      btn === 'C' || btn === 'del' ? "text-rose-500 hover:bg-rose-50" :
                      "bg-white border border-black/5 text-black hover:border-black"
                    )}
                  >
                    {btn === 'del' ? <Delete className="w-4 h-4 mx-auto" /> : btn}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-black/20 transition-all border-4 border-white"
      >
        <CalcIcon className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
