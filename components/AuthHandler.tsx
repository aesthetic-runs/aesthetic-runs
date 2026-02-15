'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import EmailVerifiedModal from './EmailVerifiedModal';

export default function AuthHandler() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);

  useEffect(() => {
    // Check current session immediately on mount
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Initial session check:', session);
      
      if (session?.user) {
        setAuth(
          { id: session.user.id || '', email: session.user.email || '' },
          session,
        );
      }
    };
    
    checkInitialSession();

    const subscription = auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', { event, session });

      if (event === 'SIGNED_IN') {
        if (!session?.user) return;
        
        setAuth(
          { id: session.user.id || '', email: session.user.email || '' },
          session,
        );

        const urlHash = window.location.hash;
        if (urlHash.includes('type=signup') && urlHash.includes('access_token')) {
          console.log('Email verified via signup link');
          setShowVerifiedModal(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else if (event === 'SIGNED_OUT') {
        setAuth(null, null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuth]);

  const handleClose = () => {
    setShowVerifiedModal(false);
  };

  const handleGoToLogin = () => {
    handleClose();
    router.push('/login');
  };

  return <EmailVerifiedModal isOpen={showVerifiedModal} onGoToLogin={handleGoToLogin} onClose={handleClose} />;
}
