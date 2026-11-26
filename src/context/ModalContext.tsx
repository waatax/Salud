import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalId = 'emergency' | 'auditC' | 'cardioHub' | 'graph' | 'search' | 'simulators' | 'backpack';

interface ModalContextType {
  openModal: (id: ModalId) => void;
  /** Open site search, optionally pre-filled with a lay query from home/guide shortcuts. */
  openSearch: (initialQuery?: string) => void;
  searchSeed: string;
  clearSearchSeed: () => void;
  closeModal: (id: ModalId) => void;
  isOpen: (id: ModalId) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [searchSeed, setSearchSeed] = useState('');

  const openModal = (id: ModalId) => {
    if (id === 'search') setSearchSeed('');
    setActiveModal(id);
  };

  const openSearch = (initialQuery = '') => {
    setSearchSeed(initialQuery);
    setActiveModal('search');
  };

  const clearSearchSeed = () => setSearchSeed('');

  const closeModal = (id: ModalId) => {
    if (activeModal === id) {
      if (id === 'search') setSearchSeed('');
      setActiveModal(null);
    }
  };

  const isOpen = (id: ModalId) => {
    return activeModal === id;
  };

  return (
    <ModalContext.Provider value={{ openModal, openSearch, searchSeed, clearSearchSeed, closeModal, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
