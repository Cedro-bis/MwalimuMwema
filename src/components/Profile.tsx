import React from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Trash2, 
  ArrowLeft, 
  BookOpen, 
  Settings, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { User, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { FirestoreService } from '../lib/firestoreService';
import { Curriculum } from '../types';
import { cn } from '../lib/utils';

interface ProfileProps {
  user: User;
  curriculums: Curriculum[];
  onBack: () => void;
  onLogout: () => void;
  onSelectSubject: (curriculum: Curriculum) => void;
}

export const Profile = ({ user, curriculums, onBack, onLogout, onSelectSubject }: ProfileProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [deletePassword, setDeletePassword] = React.useState("");
  const [deleteError, setDeleteError] = React.useState("");

  const confirmDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError("Veuillez saisir votre mot de passe.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");
    try {
      if (user.email) {
        const credential = EmailAuthProvider.credential(user.email, deletePassword);
        await reauthenticateWithCredential(user, credential);
        await FirestoreService.deleteAccount(user.uid);
        await deleteUser(user);
        onLogout();
      }
    } catch (error: any) {
      console.error("Account deletion error:", error);
      if (error.code === 'auth/network-request-failed') {
        setDeleteError("Erreur réseau. Désactivez vos bloqueurs de contenu ou ouvrez l'app dans un nouvel onglet.");
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setDeleteError("Mot de passe incorrect.");
      } else {
        setDeleteError("Erreur lors de la suppression. Veuillez réessayer plus tard.");
      }
      setIsDeleting(false);
    }
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteConfirm(true);
  };

  const getProgressColor = (percent: number) => {
    if (percent < 50) return 'bg-rose-500';
    if (percent < 80) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="p-8 bg-white border-b border-black/5 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:opacity-60 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => signOut(auth).then(onLogout)}
            className="p-3 hover:bg-rose-50 text-rose-500 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm">
          <div className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center text-white text-3xl font-black overflow-hidden select-none">
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            ) : (() => {
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
            })()}
          </div>
          <div className="text-center md:text-left space-y-2 flex-1">
            <h1 className="text-3xl font-black tracking-tighter leading-none">
              {user.displayName || user.email?.split('@')[0]}
            </h1>
            <p className="text-black/40 font-bold uppercase text-[10px] tracking-widest">{user.email}</p>
          </div>
        </section>

        {/* Learning History */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Tableau de bord</h2>
            <span className="text-[10px] font-black text-black/20">{curriculums.length} COURS</span>
          </div>

          <div className="grid gap-4">
            {curriculums.length === 0 ? (
              <div className="bg-white p-12 rounded-[2rem] border border-black/5 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-black/10 mx-auto" />
                <p className="text-sm font-bold text-black/40 tracking-tight">Aucun cours commencé pour le moment.</p>
              </div>
            ) : (
              curriculums.map((curr, idx) => {
                const totalChapters = curr.chapters.length;
                const completedChapters = curr.completedChapters?.length || 0;
                const progress = Math.round((completedChapters / totalChapters) * 100);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelectSubject(curr)}
                    className="group bg-white p-8 rounded-[2.5rem] border border-black/5 hover:border-black transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black text-black/40 uppercase tracking-widest leading-none mb-1">{curr.level}</p>
                          <h3 className="text-xl font-black tracking-tighter leading-none">{curr.subject}</h3>
                        </div>
                        <span className="text-xs font-black tracking-tight">{progress}%</span>
                      </div>
                      
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className={cn("h-full transition-all duration-1000", getProgressColor(progress))}
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                          {completedChapters} / {totalChapters} Chapitres
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-black/20 group-hover:text-black transition-all" />
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-12 border-t border-black/5">
          <div className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100 space-y-6">
            <div className="flex items-center gap-4 text-rose-500">
               <Settings className="w-6 h-6" />
               <h2 className="text-xl font-black tracking-tighter">Paramètres de sécurité</h2>
            </div>
            <p className="text-xs text-rose-900/60 font-medium leading-relaxed max-w-lg">
              La suppression de votre compte effacera toutes vos progressions, vos certificats virtuels et vos données personnelles de manière définitive.
            </p>
            {!showDeleteConfirm ? (
              <button 
                onClick={handleDeleteAccountClick}
                className="flex items-center gap-3 px-8 py-4 bg-rose-500 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" /> Supprimer mon compte
              </button>
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-rose-200 mt-4 max-w-sm">
                <p className="font-bold text-rose-900 mb-4 text-sm tracking-tight text-center">Êtes-vous sûr ? Entrez votre mot de passe pour confirmer.</p>
                <input 
                  type="password" 
                  autoFocus
                  placeholder="Mot de passe" 
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/50 mb-4 outline-none focus:border-rose-500 font-bold placeholder:text-rose-900/30"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                       confirmDeleteAccount();
                    }
                  }}
                />
                
                {deleteError && (
                  <p className="text-xs font-bold text-rose-600 mb-4 text-center">{deleteError}</p>
                )}
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setShowDeleteConfirm(false); setDeleteError(""); }}
                    disabled={isDeleting}
                    className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black hover:bg-black/5 rounded-xl transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={confirmDeleteAccount}
                    disabled={isDeleting || !deletePassword}
                    className="flex-1 py-3 bg-rose-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all disabled:opacity-75"
                  >
                    {isDeleting ? "En cours..." : "Confirmer"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
