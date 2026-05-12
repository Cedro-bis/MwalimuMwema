import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const AuthUI = ({ onAuthSuccess }: { onAuthSuccess: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mustVerify, setMustVerify] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setMustVerify(true);
          await sendEmailVerification(userCredential.user);
          setLoading(false);
          return;
        }
        onAuthSuccess(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMustVerify(true);
      }
    } catch (err: any) {
      console.error("Firebase Auth Error:", err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('Cet email est déjà utilisé.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Format d\'email invalide.');
      } else if (err.code === 'auth/weak-password') {
        setError('Le mot de passe est trop court.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('compte inexistant');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Veuillez patienter quelques minutes.');
      } else {
        // As requested by the user, show generic message for other errors (like operation-not-allowed)
        setError('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setMustVerify(false);
    setEmail('');
    setPassword('');
  };

  if (mustVerify) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 bg-white border border-black rounded-[3rem] w-full max-w-md mx-auto">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center">
          <Mail className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight leading-none text-green-600">SUCCÈS !</h2>
          <p className="text-black font-bold uppercase tracking-tight">Votre compte Mwalimu mwema a été créé avec succès.</p>
          <p className="text-black/60 font-medium leading-relaxed">
            Un lien de vérification a été envoyé à <span className="text-black font-bold">{email}</span>. 
            Veuillez cliquer sur le lien pour activer votre compte.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={async () => {
              try {
                if (auth.currentUser) {
                  await sendEmailVerification(auth.currentUser);
                  alert("E-mail renvoyé !");
                }
              } catch (err: any) {
                if (err.code === 'auth/too-many-requests') {
                  alert("Trop de tentatives. Veuillez patienter un instant avant de réessayer.");
                } else {
                  alert("Une erreur est survenue lors de l'envoi.");
                }
              }
            }}
            className="w-full py-4 bg-slate-100 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            Renvoyer l'e-mail
          </button>

          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-black text-white rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors"
          >
            J'ai vérifié mon e-mail
          </button>
        </div>

        <button 
          onClick={handleSignOut}
          className="text-sm font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-12 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-[32px] font-black tracking-tighter leading-none uppercase">
            {isLogin ? 'Bon retour.' : 'Rejoindre.'}
          </h2>
          <p className="text-black/60 font-medium leading-relaxed">
            {isLogin 
              ? 'Connectez-vous pour retrouver vos cours et vos progrès.' 
              : 'Créez votre compte pour apprendre sur mesure et partout.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-black uppercase tracking-[0.4em] px-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-black rounded-[1.5rem] focus:ring-4 focus:ring-black/5 transition-all outline-none text-base font-bold placeholder:text-black/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-black uppercase tracking-[0.4em] px-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-black rounded-[1.5rem] focus:ring-4 focus:ring-black/5 transition-all outline-none text-base font-bold placeholder:text-black/10"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-4 bg-red-50 text-red-900 rounded-2xl text-xs font-bold border border-red-100"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all text-base tracking-tight disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                {isLogin ? 'Se connecter' : 'Créer un compte'} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
          >
            {isLogin ? "Pas de compte ? Créer" : "Déjà inscrit ? Connexion"}
          </button>
        </div>
      </Card>
    </div>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white border border-black rounded-[3rem] overflow-hidden", className)}>
    {children}
  </div>
);
