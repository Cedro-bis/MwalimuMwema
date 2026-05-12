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
import { FirestoreService } from '../lib/firestoreService';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const AuthUI = ({ onAuthSuccess }: { onAuthSuccess: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'auth' | 'verification' | 'success'>('auth');
  const [verificationCode, setVerificationCode] = useState('');
  const [actualCode, setActualCode] = useState('');

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const isVerified = await FirestoreService.checkUserVerification(userCredential.user.uid);
        
        if (!isVerified) {
          const code = generateCode();
          setActualCode(code);
          await FirestoreService.saveVerificationCode(userCredential.user.uid, code);
          setStep('verification');
          setLoading(false);
          return;
        }
        onAuthSuccess(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await FirestoreService.ensureUser(userCredential.user.uid, email);
        
        const code = generateCode();
        setActualCode(code);
        await FirestoreService.saveVerificationCode(userCredential.user.uid, code);
        
        // In a real app, this is where you'd call a backend to send the email
        console.log(`[REAL APP - EMAIL SENT TO ${email}] Code: ${code}`);
        
        setStep('verification');
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
        setError('Une erreur est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const trimmedCode = verificationCode.trim();
      const trimmedActual = actualCode.trim();
      
      if (trimmedCode === trimmedActual) {
        if (auth.currentUser) {
          await FirestoreService.setUserVerified(auth.currentUser.uid);
          setStep('success');
          
          setTimeout(() => {
            if (auth.currentUser) {
              onAuthSuccess(auth.currentUser);
            }
          }, 2000);
        } else {
          setError('Utilisateur non identifié. Veuillez vous reconnecter.');
        }
      } else {
        setError('Code incorrect. Veuillez réessayer.');
      }
    } catch (err: any) {
      console.error("[AUTH] Verification error:", err);
      setError('Une erreur est survenue lors de la vérification');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setStep('auth');
    setEmail('');
    setPassword('');
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 bg-white border border-black rounded-[3rem] w-full max-w-md mx-auto">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight leading-none text-green-600 uppercase">FÉLICITATIONS !</h2>
          <p className="text-black font-extrabold text-lg leading-tight">
            Votre compte Mwalimu mwema a été créé avec succès.
          </p>
          <p className="text-black/60 font-medium pt-2">
            Redirection vers votre tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  if (step === 'verification') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-10 bg-white border border-black rounded-[3rem] w-full max-w-md mx-auto">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-[28px] font-black tracking-tighter leading-none uppercase">VÉRIFICATION</h2>
          <p className="text-black/60 font-medium leading-relaxed">
            Saisissez le code à <span className="text-black font-bold">6 chiffres</span> envoyé à <span className="text-black font-bold">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="w-full space-y-6">
          <div className="space-y-2">
            <input 
              type="text"
              required
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full text-center py-5 bg-slate-50 border-2 border-black rounded-[1.5rem] text-4xl font-black tracking-[0.5em] focus:ring-4 focus:ring-black/5 outline-none transition-all"
            />
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-800 text-left">
            <p>Note : Dans cette demo, le code est : <span className="font-black text-black">{actualCode}</span></p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div className="flex items-center gap-3 p-4 bg-red-50 text-red-900 rounded-2xl text-xs font-bold border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={loading || verificationCode.length !== 6}
            className="w-full bg-black text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all text-base disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirmer le code'}
          </button>
        </form>
        
        <button 
          onClick={handleSignOut}
          className="text-sm font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
        >
          Annuler
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
              ? 'Connectez-vous pour retrouver vos cours.' 
              : 'Créez votre compte pour apprendre sur mesure.'}
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
              <motion.div className="flex items-center gap-3 p-4 bg-red-50 text-red-900 rounded-2xl text-xs font-bold border border-red-100">
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
