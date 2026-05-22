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
      const normalizedEmail = email.trim().toLowerCase();
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        const isVerified = await FirestoreService.checkUserVerification(userCredential.user.uid);
        
        if (!isVerified) {
          const code = generateCode();
          setActualCode(code);
          await FirestoreService.saveVerificationCode(userCredential.user.uid, code);
          setStep('verification');
          setLoading(false);
          setPassword(''); // Confidentialité: effacer le mot de passe
          return;
        }
        setEmail('');
        setPassword('');
        onAuthSuccess(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
        await FirestoreService.ensureUser(userCredential.user.uid, normalizedEmail);
        
        const code = generateCode();
        setActualCode(code);
        await FirestoreService.saveVerificationCode(userCredential.user.uid, code);
        
        // Simulation d'envoi de mail
        console.log(`[SIMULATION] Email de vérification envoyé à ${normalizedEmail}. Code: ${code}`);
        
        setPassword(''); // Confidentialité
        setStep('verification');
      }
    } catch (err: any) {
      console.error("Firebase Auth Error:", err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('Cet email est déjà utilisé par un autre compte.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Format d\'email invalide.');
      } else if (err.code === 'auth/weak-password') {
        setError('Le mot de passe doit contenir au moins 6 caractères.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Aucun compte trouvé avec cet email.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Email ou mot de passe incorrect.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Veuillez patienter.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Erreur réseau (auth/network-request-failed). Si vous êtes dans l\'aperçu ou sur téléphone, votre navigateur bloque l\'authentification sécurisée dans l\'iFrame. Pour résoudre cela, ouvrez l\'application dans un nouvel onglet (bouton de partage ou d\'ouverture externe en haut à droite) ou désactivez les bloqueurs de contenu (ex: Brave Shields).');
      } else {
        setError('Erreur de connexion. Vérifiez vos identifiants.');
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
          setVerificationCode(''); // Effacer le code après validation
          
          setTimeout(() => {
            if (auth.currentUser) {
              setEmail(''); // Clear email too
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
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 bg-white w-full max-w-md mx-auto">
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
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-10 bg-white w-full max-w-md mx-auto">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-[28px] font-black tracking-tighter leading-none uppercase">VÉRIFICATION</h2>
          <p className="text-black/60 font-medium leading-relaxed">
            Saisissez le code envoyé à <span className="text-black font-bold">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="w-full space-y-8">
          <div className="relative">
            <input 
              type="text"
              required
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Saisir le code ici"
              className="w-full text-center py-4 bg-transparent border-b-2 border-black/10 text-3xl font-black tracking-[0.5em] focus:border-black outline-none transition-all placeholder:text-black/20 placeholder:tracking-normal placeholder:font-bold placeholder:text-base mb-2"
            />
            {step === 'verification' && (
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-2">
                Le code est : <span className="text-black">{actualCode}</span> (Simulation mail)
              </p>
            )}
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
      <div className="p-12 space-y-12 bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-[40px] font-black tracking-tighter leading-none uppercase">
            {isLogin ? 'Bon retour.' : 'Rejoindre.'}
          </h2>
          <p className="text-black/60 font-medium leading-relaxed">
            {isLogin 
              ? 'Connectez-vous pour retrouver vos cours.' 
              : 'Créez votre compte pour apprendre sur mesure.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="relative">
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-4 bg-transparent border-b-2 border-black/10 focus:border-black transition-all outline-none text-lg font-bold placeholder:text-black/20"
            />
          </div>

          <div className="relative">
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full py-4 bg-transparent border-b-2 border-black/10 focus:border-black transition-all outline-none text-lg font-bold placeholder:text-black/20"
            />
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
            className="w-full bg-black text-white px-10 py-6 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all text-base tracking-tight disabled:opacity-50"
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
      </div>
    </div>
  );
};


const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white overflow-hidden", className)}>
    {children}
  </div>
);
