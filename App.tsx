
import React, { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { DetailView } from './components/DetailView';
import { ViewType, Artefact } from './types';
import { ARTEFACTS_RAW, REMOTE_TABLE_URL } from './constants';
import { fetchRemoteArtefacts } from './services/dataService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [artefacts, setArtefacts] = useState<Artefact[]>(ARTEFACTS_RAW);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const selectedArtefact = artefacts.find(a => a.id === selectedId) || null;
  const currentIndex = artefacts.findIndex(a => a.id === selectedId);

  // 初始化加载远程表格数据
  useEffect(() => {
    if (REMOTE_TABLE_URL) {
      handleSync();
    }
  }, []);

  const handleSync = async () => {
    if (!REMOTE_TABLE_URL) return;
    setSyncStatus('SYNCING');
    try {
      const remoteData = await fetchRemoteArtefacts(REMOTE_TABLE_URL);
      if (remoteData.length > 0) {
        setArtefacts(remoteData);
        setSyncStatus('SUCCESS');
        setTimeout(() => setSyncStatus('IDLE'), 3000);
      }
    } catch (e) {
      setSyncStatus('ERROR');
      setTimeout(() => setSyncStatus('IDLE'), 3000);
    }
  };

  const handleSelectArt = (art: Artefact) => {
    setSelectedId(art.id);
    setCurrentView(ViewType.DETAIL);
  };

  const handleUpdateArt = (updatedArt: Artefact) => {
    setArtefacts(prev => prev.map(a => a.id === updatedArt.id ? updatedArt : a));
  };

  const handleBack = () => {
    setCurrentView(selectedId && currentView === ViewType.DETAIL ? ViewType.CATALOG : ViewType.HOME);
    setSelectedId(null);
  };

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % artefacts.length;
    setSelectedId(artefacts[nextIdx].id);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + artefacts.length) % artefacts.length;
    setSelectedId(artefacts[prevIdx].id);
  };

  return (
    <HUD syncStatus={syncStatus} onSync={REMOTE_TABLE_URL ? handleSync : undefined}>
      {/* Top Nav Switcher */}
      <div className="absolute top-10 flex gap-6 z-50">
        <button 
          onClick={() => setCurrentView(ViewType.HOME)}
          className={`px-6 py-1.5 text-xs tracking-[0.2em] border transition-all duration-300 relative group ${
            currentView === ViewType.HOME 
              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
              : 'border-white/20 text-white/60 hover:text-white hover:border-white hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
          }`}
        >
          首页
          <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full transition-opacity ${currentView === ViewType.HOME ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
        </button>
        <button 
          onClick={() => setCurrentView(ViewType.CATALOG)}
          className={`px-6 py-1.5 text-xs tracking-[0.2em] border transition-all duration-300 relative group ${
            currentView === ViewType.CATALOG 
              ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
              : 'border-white/20 text-white/60 hover:text-white hover:border-white hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
          }`}
        >
          展品总览
          <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full transition-opacity ${currentView === ViewType.CATALOG ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
        </button>
      </div>

      <div className={`w-full h-full transition-opacity duration-500 ${syncStatus === 'SYNCING' ? 'opacity-30' : 'opacity-100'}`}>
        {currentView === ViewType.HOME && <HomeView artefacts={artefacts} onSelect={handleSelectArt} />}
        {currentView === ViewType.CATALOG && <CatalogView artefacts={artefacts} onSelect={handleSelectArt} />}
        {currentView === ViewType.DETAIL && selectedArtefact && (
          <DetailView 
            art={selectedArtefact} 
            currentIndex={currentIndex + 1}
            totalCount={artefacts.length}
            onBack={handleBack} 
            onUpdate={handleUpdateArt} 
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </HUD>
  );
};

export default App;
