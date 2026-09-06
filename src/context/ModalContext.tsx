import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalId = 'council' | 'emergency' | 'auditC' | 'cardioHub' | 'graph';

interface ModalContextType {
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  isOpen: (id: ModalId) => boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const openModal = (id: ModalId) => {
    setActiveModal(id);
  };

  const closeModal = (id: ModalId) => {
    if (activeModal === id) {
      setActiveModal(null);
    }
  };

  const isOpen = (id: ModalId) => {
    return activeModal === id;
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
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
