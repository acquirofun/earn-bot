import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider
      manifestUrl="https://earn-bot-six.vercel.app//tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/earn_at_tgbot'
      }}
    >
      <App />
    </TonConnectUIProvider>
  </StrictMode>,
);