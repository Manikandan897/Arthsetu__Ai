import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  fetchUserProfileFromFirestore,
  saveUserProfileToFirestore,
  testConnection
} from '../services/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  userEmail: string | null;
  userName: string | null;
  isSaving: boolean;
  lastSavedAt: string | null;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  saveUserProfile: (profile: UserProfile) => Promise<boolean>;
  loadUserProfile: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
  onProfileLoaded?: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}> = ({ children, onProfileLoaded, currentProfile }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoading(false);

      if (user) {
        try {
          const cloudProfile = await fetchUserProfileFromFirestore(user.uid);
          if (cloudProfile && onProfileLoaded) {
            onProfileLoaded({
              ...cloudProfile,
              email: user.email || cloudProfile.email,
              userId: user.uid,
              fullName: cloudProfile.fullName || user.displayName || 'Entrepreneur'
            });
            setLastSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setSaveStatus('saved');
          } else if (!cloudProfile) {
            // First time login - auto seed profile with their email and name
            const initialProfile: UserProfile = {
              ...currentProfile,
              email: user.email || '',
              fullName: user.displayName || currentProfile.fullName || 'Citizen Entrepreneur',
              userId: user.uid
            };
            await saveUserProfileToFirestore(user.uid, initialProfile, user.email || '');
            if (onProfileLoaded) {
              onProfileLoaded(initialProfile);
            }
            setLastSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setSaveStatus('saved');
          }
        } catch (err) {
          console.error('Error loading user profile on auth change:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<User | null> => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setCurrentUser(user);

      // Load or create profile
      const cloudProfile = await fetchUserProfileFromFirestore(user.uid);
      if (cloudProfile && onProfileLoaded) {
        onProfileLoaded({
          ...cloudProfile,
          email: user.email || cloudProfile.email,
          userId: user.uid
        });
      } else {
        const seededProfile: UserProfile = {
          ...currentProfile,
          email: user.email || '',
          fullName: user.displayName || currentProfile.fullName || 'Citizen Entrepreneur',
          userId: user.uid
        };
        await saveUserProfileToFirestore(user.uid, seededProfile, user.email || '');
        if (onProfileLoaded) {
          onProfileLoaded(seededProfile);
        }
      }
      setLastSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setSaveStatus('saved');
      setIsLoading(false);
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setSaveStatus('idle');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const saveUserProfile = useCallback(
    async (profile: UserProfile): Promise<boolean> => {
      if (!currentUser) {
        return false;
      }
      try {
        setIsSaving(true);
        setSaveStatus('saving');
        await saveUserProfileToFirestore(currentUser.uid, profile, currentUser.email || profile.email || '');
        setIsSaving(false);
        setSaveStatus('saved');
        setLastSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        return true;
      } catch (error) {
        console.error('Failed to save profile to Firestore:', error);
        setIsSaving(false);
        setSaveStatus('error');
        return false;
      }
    },
    [currentUser]
  );

  const loadUserProfile = useCallback(async (): Promise<UserProfile | null> => {
    if (!currentUser) return null;
    try {
      const profile = await fetchUserProfileFromFirestore(currentUser.uid);
      return profile;
    } catch (err) {
      console.error('Failed to load profile:', err);
      return null;
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        userEmail: currentUser?.email || null,
        userName: currentUser?.displayName || currentUser?.email?.split('@')[0] || null,
        isSaving,
        lastSavedAt,
        saveStatus,
        loginWithGoogle,
        logout,
        saveUserProfile,
        loadUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
