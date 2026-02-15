import { supabase } from './supabase';

export interface AuthError {
  message: string;
  code?: string;
}

async function handleAuthError(error: unknown): Promise<AuthError> {
  console.error('Auth error:', error);

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    const errorMessage = error.message;

    if (message.includes('email not confirmed') || message.includes('email_not_confirmed')) {
      return {
        message:
          'Please check your email and click the confirmation link to activate your account.',
        code: 'EMAIL_NOT_CONFIRMED',
      };
    }

    if (
      message.includes('invalid login credentials') ||
      message.includes('invalid_login_credentials')
    ) {
      return {
        message: 'Invalid email or password. Please check your credentials.',
        code: 'INVALID_CREDENTIALS',
      };
    }

    if (message.includes('invalid email') || message.includes('invalid_email')) {
      return {
        message: 'Invalid email address. Please try again.',
        code: 'INVALID_EMAIL',
      };
    }

    if (message.includes('weak password') || message.includes('weak_password')) {
      return {
        message: 'Password is too weak. Please use a stronger password.',
        code: 'WEAK_PASSWORD',
      };
    }

    if (
      message.includes('user already registered') ||
      message.includes('user_already_registered') ||
      message.includes('duplicate') ||
      message.includes('already been registered') ||
      message.includes('already registered') ||
      message.includes('already exists') ||
      errorMessage.includes('User already registered') ||
      errorMessage.includes('A user with this email address has already been registered')
    ) {
      return {
        message: 'An account with this email already exists. Please log in instead.',
        code: 'USER_EXISTS',
      };
    }

    return {
      message: error.message || 'An authentication error occurred. Please try again.',
      code: 'AUTH_ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR',
  };
}

export const auth = {
  login: async (email: string, password: string) => {
    console.log('Attempting login for:', email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Login result:', { data, error });

      if (error) throw error;

      return data;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  register: async (email: string, password: string) => {
    console.log('Attempting registration for:', email);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!signInError && signInData.user) {
        const existingError = new Error('User already registered');
        throw existingError;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('Registration result:', { data, error });

      if (error) throw error;

      return data;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  resendVerificationEmail: async (email: string) => {
    console.log('Resending verification email to:', email);

    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      console.log('Resend result:', { data, error });

      if (error) throw error;

      return data;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  getSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      return session;
    } catch (error) {
      throw await handleAuthError(error);
    }
  },

  onAuthStateChange: (callback: (event: string, session: { user?: { id?: string; email?: string } } | null) => void) => {
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', { event, hasSession: !!session });
        callback(event, session);
      });

      return subscription;
    } catch (error) {
      console.error('Error setting up auth state change:', error);
      throw error;
    }
  },
};
