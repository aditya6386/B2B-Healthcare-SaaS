import { create } from 'zustand';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: 'critical' | 'stable' | 'recovering';
  lastVisit: string;
  avatar?: string;
}

interface PatientState {
  patients: Patient[];
  viewMode: 'list' | 'grid';
  searchQuery: string;
  setPatients: (patients: Patient[]) => void;
  setViewMode: (mode: 'list' | 'grid') => void;
  setSearchQuery: (query: string) => void;
}

export const usePatientStore = create<PatientState>()((set) => ({
  patients: [],
  viewMode: 'grid', // default to grid view
  searchQuery: '',
  setPatients: (patients) => set({ patients }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
