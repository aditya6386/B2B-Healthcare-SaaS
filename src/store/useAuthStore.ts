import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  initAuth: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
  initAuth: () => {
    // listen for login state changes from firebase
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || null,
          },
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false, isInitialized: true });
      }
    });
  },
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuthenticated: false }); // clear user from store
    } catch (error) {
      console.error('Logout error:', error); // just log it for now
    }
  },
}));
