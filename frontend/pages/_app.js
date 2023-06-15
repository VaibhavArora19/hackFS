import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId='260356816232-qm10ch3k345h9jh2uhh7ma71f3m00pvo.apps.googleusercontent.com'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoogleOAuthProvider>
  );
}
