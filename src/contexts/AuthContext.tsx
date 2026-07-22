'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { BerlinUser, UserRole } from '@/types';

// ─── Auth Context Types ───────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  userProfile: BerlinUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Auth Provider ────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<BerlinUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = useCallback(async (firebaseUser: User) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserProfile(userSnap.data() as BerlinUser);
      } else {
        // Create profile for new users
        const newProfile: Partial<BerlinUser> = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Berlin Customer',
          photoURL: firebaseUser.photoURL || '',
          role: 'customer' as UserRole,
          rewardPoints: 0,
          emailVerified: firebaseUser.emailVerified,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await setDoc(userRef, { ...newProfile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        setUserProfile(newProfile as BerlinUser);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  const refreshUserProfile = useCallback(async () => {
    if (user) await fetchUserProfile(user);
  }, [user, fetchUserProfile]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser);
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // Sign In with Email & Password
  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Up with Email & Password
  const signUp = async (email: string, password: string, name: string) => {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
    await sendEmailVerification(newUser);
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Send Verification Email
  const sendVerificationEmail = async () => {
    if (user) await sendEmailVerification(user);
  };

  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'superadmin';

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      isLoading,
      isAdmin,
      signIn,
      signUp,
      signInWithGoogle,
      logout,
      resetPassword,
      sendVerificationEmail,
      refreshUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── useAuth Hook ─────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
