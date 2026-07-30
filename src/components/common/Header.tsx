import React from 'react';
import { User, signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { Curriculum } from '../../types';
import { getFirstNameInitial } from '../../utils/userUtils';

export interface HeaderProps {
  user: User | null;
  customPhotoUrl: string | null;
  curriculum: Curriculum | null;
  view: string;
  onNavigate: (view: 'onboarding' | 'profile') => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  customPhotoUrl,
  curriculum,
  view,
  onNavigate
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl z-50 px-10 flex items-center justify-between border-b border-black print:hidden">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('onboarding')}>
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
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 bg-black text-white rounded-full border border-black flex items-center justify-center overflow-hidden hover:scale-105 transition-transform font-bold text-sm uppercase select-none cursor-pointer"
              title="Voir mon profil"
            >
              {(customPhotoUrl || user.photoURL) ? (
                <img src={customPhotoUrl || user.photoURL || undefined} alt="avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                getFirstNameInitial(user)
              )}
            </button>
            <button 
              onClick={() => signOut(auth)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors order-last md:order-none cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
