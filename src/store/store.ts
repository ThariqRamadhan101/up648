import { create } from 'zustand';
import { type Task, type Province } from '../types';
import { mockTasks, mockProvinces, mockProjects } from './mockData';

interface FilterState {
    project: string | null;
    province: string | null;
    creator: string | null;
    sprint: string | null;
    overlays: string[];
}

interface TaskStore {
    // Tasks
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    moveTask: (taskId: string, newStage: Task['stage']) => void;

    // Provinces
    provinces: Province[];
    addProvince: (province: Omit<Province, 'id'>) => void;
    updateProvince: (provinceId: string, updates: Partial<Province>) => void;
    deleteProvince: (provinceId: string) => void;
    addIndicator: (category: string, name: string) => void;

    // Projects
    projects: string[];

    // Filters
    filters: FilterState;
    setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
    resetFilters: () => void;

    // Filtered Data
    getFilteredTasks: () => Task[];
}

const defaultFilters: FilterState = {
    project: null,
    province: null,
    creator: null,
    sprint: null,
    overlays: [],
};

export const useStore = create<TaskStore>((set, get) => ({
    // Initial Data
    tasks: mockTasks,
    provinces: mockProvinces,
    projects: mockProjects,
    filters: defaultFilters,

    // Indicator Actions
    addIndicator: (_, name) => {
        set((state) => ({
            provinces: state.provinces.map(province => {
                const updatedIndicators = { ...province.indicators };
                if (!(name in updatedIndicators)) {
                    updatedIndicators[name] = 0;
                }
                return {
                    ...province,
                    indicators: updatedIndicators
                };
            })
        }));
    },

    // Task Actions
    addTask: (taskData) => {
        const task: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
    },

    // Province Actions
    addProvince: (provinceData) => {
        const province: Province = {
            ...provinceData,
            id: `province-${Date.now()}`
        };
        set((state) => ({ provinces: [...state.provinces, province] }));
    },

    updateProvince: (provinceId, updates) => {
        set((state) => ({
            provinces: state.provinces.map((province) =>
                province.id === provinceId
                    ? { ...province, ...updates }
                    : province
            ),
        }));
    },

    deleteProvince: (provinceId) => {
        set((state) => ({
            provinces: state.provinces.filter((province) => province.id !== provinceId),
        }));
    },

    updateTask: (taskId, updates) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId
                    ? { ...task, ...updates, updatedAt: new Date() }
                    : task
            ),
        }));
    },

    moveTask: (taskId, newStage) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId
                    ? { ...task, stage: newStage, updatedAt: new Date() }
                    : task
            ),
        }));
    },

    // Filter Actions
    setFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        }));
    },

    resetFilters: () => {
        set({ filters: defaultFilters });
    },

    // Filtered Data
    getFilteredTasks: () => {
        const { tasks, filters } = get();
        return tasks.filter((task) => {
            if (filters.project && task.project !== filters.project) return false;
            if (filters.province && task.province !== filters.province) return false;
            if (filters.creator && task.creator !== filters.creator) return false;
            if (filters.sprint && task.sprint !== filters.sprint) return false;
            return true;
        });
    },
}));