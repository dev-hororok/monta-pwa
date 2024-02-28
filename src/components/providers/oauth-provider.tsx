import * as React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_CLIENT_ID } from '@/constants/constants';

interface OAuthProvidersProps {
  children: React.ReactNode;
}

export const OAuthProviders = ({ children }: OAuthProvidersProps) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};
