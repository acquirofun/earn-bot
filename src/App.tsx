import { useEffect, useState } from 'react';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const walletAddress = useTonAddress();
  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (telegram && telegram.initDataUnsafe?.user) {
      setUser(telegram.initDataUnsafe.user.first_name || 'Unknown User');
    } else {
      setUser('No user data');
    }
  }, []);
  return (
    <div className="app-container">
      <h1>Telegram Mini App</h1>
      <p>User: {user || 'Loading...'}</p>
      <TonConnectButton />
      <p>Wallet Address: {walletAddress || 'Not connected'}</p>
    </div>
  );
}
export default App;