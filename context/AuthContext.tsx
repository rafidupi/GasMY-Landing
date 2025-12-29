'use client';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { auth, isFirebaseConfigured } from '@/lib/firebaseConfig';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ensureAuth = () => {
  if (!auth) {
    throw new Error('Firebase auth is not configured.');
  }
  return auth;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = Boolean(isFirebaseConfigured && auth);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(ensureAuth(), (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isConfigured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isConfigured,
      signInWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(ensureAuth(), provider);
      },
      signInWithEmail: async (email, password) => {
        await signInWithEmailAndPassword(ensureAuth(), email, password);
      },
      signOutUser: async () => {
        await signOut(ensureAuth());
      },
    }),
    [user, loading, isConfigured]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }
  return context;
}

