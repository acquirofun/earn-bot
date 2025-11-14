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
      telegram.ready();
    } else {
      setUser('No user data');
    }
  }, []);

  // Rewarded Interstitial
  const handleInterstitial = () => {
    // @ts-ignore
    show_10187929()
      .then(() => {
        alert('You watched the interstitial ad! Reward the user here.');
        window.Telegram?.WebApp.sendData(JSON.stringify({ action: 'rewardedInterstitialWatched' }));
      })
      .catch((err: any) => console.error('Interstitial ad error:', err));
  };

  // Rewarded Popup
  const handlePopup = () => {
    // @ts-ignore
    show_10187929('pop')
      .then(() => {
        alert('You watched the popup ad! Reward the user here.');
        window.Telegram?.WebApp.sendData(JSON.stringify({ action: 'rewardedPopupWatched' }));
      })
      .catch((err: any) => console.error('Popup ad error:', err));
  };

  // In-App Interstitial
  const handleInApp = () => {
    // @ts-ignore
    show_10187929({
      type: 'inApp',
      inAppSettings: {
        frequency: 2,
        capping: 0.1,
        interval: 30,
        timeout: 5,
        everyPage: false
      }
    });
  };

  return (
    <div className="app-container" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Telegram Mini App</h1>
      <p>User: {user || 'Loading...'}</p>
      <TonConnectButton />
      <p>Wallet Address: {walletAddress || 'Not connected'}</p>

      <div style={{ marginTop: '30px' }}>
        <button
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '15px 30px', margin: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          onClick={handleInterstitial}
        >
          Rewarded Interstitial
        </button>
        <button
          style={{ backgroundColor: '#2196F3', color: 'white', padding: '15px 30px', margin: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          onClick={handlePopup}
        >
          Rewarded Popup
        </button>
        <button
          style={{ backgroundColor: '#FF9800', color: 'white', padding: '15px 30px', margin: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          onClick={handleInApp}
        >
          In-App Interstitial
        </button>
      </div>
    </div>
  );
}

export default App;
