import type { Province, Task } from '../types';

export const mockProvinces: Province[] = [
    {
        id: 'aceh',
        name: 'Aceh',
        code: 'AC',
        coordinates: [4.695135, 96.749397],
        indicators: {
            gdp: 4.2,
            unemployment: 6.5,
            povertyRate: 15.2,
            infrastructureIndex: 68.5,
            urbanizationRate: 45.2,
            internetAccess: 72.3,
            literacyRate: 98.2,
            schoolEnrollment: 92.5,
            teacherRatio: 16.8
        }
    },
    {
        id: 'sumut',
        name: 'Sumatera Utara',
        code: 'SU',
        coordinates: [2.1154, 99.5451],
        indicators: {
            gdp: 5.1,
            unemployment: 5.8,
            povertyRate: 12.5,
            infrastructureIndex: 72.3,
            urbanizationRate: 52.8,
            internetAccess: 75.6,
            literacyRate: 97.8,
            schoolEnrollment: 93.2,
            teacherRatio: 15.9
        }
    },
    {
        id: 'sumbar',
        name: 'Sumatera Barat',
        code: 'SB',
        coordinates: [-0.7399, 100.8000],
        indicators: {
            gdp: 4.8,
            unemployment: 5.5,
            povertyRate: 11.8,
            infrastructureIndex: 70.5,
            urbanizationRate: 48.9,
            internetAccess: 74.2,
            literacyRate: 98.5,
            schoolEnrollment: 94.1,
            teacherRatio: 15.5
        }
    },
    {
        id: 'riau',
        name: 'Riau',
        code: 'RI',
        coordinates: [0.2933, 101.7068],
        indicators: {
            gdp: 6.2,
            unemployment: 4.9,
            povertyRate: 10.2,
            infrastructureIndex: 75.8,
            urbanizationRate: 55.4,
            internetAccess: 78.9,
            literacyRate: 98.1,
            schoolEnrollment: 93.8,
            teacherRatio: 15.2
        }
    },
    {
        id: 'jambi',
        name: 'Jambi',
        code: 'JA',
        coordinates: [-1.4852, 103.7381],
        indicators: {
            gdp: 4.9,
            unemployment: 5.2,
            povertyRate: 11.1,
            infrastructureIndex: 69.8,
            urbanizationRate: 47.2,
            internetAccess: 73.5,
            literacyRate: 97.9,
            schoolEnrollment: 92.9,
            teacherRatio: 15.7
        }
    },
    {
        id: 'sumsel',
        name: 'Sumatera Selatan',
        code: 'SS',
        coordinates: [-3.3194, 104.9144],
        indicators: {
            gdp: 5.1,
            unemployment: 5.8,
            povertyRate: 12.5,
            infrastructureIndex: 72.3,
            urbanizationRate: 52.8,
            internetAccess: 75.6,
            literacyRate: 97.8,
            schoolEnrollment: 93.2,
            teacherRatio: 15.9
        }
    },
    {
        id: 'bengkulu',
        name: 'Bengkulu',
        code: 'BE',
        coordinates: [-3.7928, 102.2608],
        indicators: {
            gdp: 4.5,
            unemployment: 5.9,
            povertyRate: 13.5,
            infrastructureIndex: 67.9,
            urbanizationRate: 44.8,
            internetAccess: 71.6,
            literacyRate: 97.4,
            schoolEnrollment: 92.3,
            teacherRatio: 16.3
        }
    },
    {
        id: 'lampung',
        name: 'Lampung',
        code: 'LA',
        coordinates: [-4.5586, 105.4068],
        indicators: {
            gdp: 4.7,
            unemployment: 5.7,
            povertyRate: 12.9,
            infrastructureIndex: 69.1,
            urbanizationRate: 46.5,
            internetAccess: 72.8,
            literacyRate: 97.5,
            schoolEnrollment: 92.6,
            teacherRatio: 16.0
        }
    },
    {
        id: 'babel',
        name: 'Bangka Belitung',
        code: 'BB',
        coordinates: [-2.7411, 106.4406],
        indicators: {
            gdp: 4.8,
            unemployment: 5.1,
            povertyRate: 11.3,
            infrastructureIndex: 70.2,
            urbanizationRate: 47.8,
            internetAccess: 73.9,
            literacyRate: 97.8,
            schoolEnrollment: 92.8,
            teacherRatio: 15.8
        }
    },
    {
        id: 'jakarta',
        name: 'DKI Jakarta',
        code: 'JK',
        coordinates: [-6.200000, 106.816666],
        indicators: {
            gdp: 8.5,
            unemployment: 4.2,
            povertyRate: 3.8,
            infrastructureIndex: 92.5,
            urbanizationRate: 98.7,
            internetAccess: 95.6,
            literacyRate: 99.8,
            schoolEnrollment: 98.2,
            teacherRatio: 14.2
        }
    },
    {
        id: 'jabar',
        name: 'Jawa Barat',
        code: 'JB',
        coordinates: [-6.9147, 107.6098],
        indicators: {
            gdp: 7.2,
            unemployment: 4.8,
            povertyRate: 7.5,
            infrastructureIndex: 85.6,
            urbanizationRate: 75.4,
            internetAccess: 88.2,
            literacyRate: 98.9,
            schoolEnrollment: 95.8,
            teacherRatio: 14.8
        }
    },
    {
        id: 'jateng',
        name: 'Jawa Tengah',
        code: 'JT',
        coordinates: [-7.1510, 110.1403],
        indicators: {
            gdp: 6.8,
            unemployment: 4.9,
            povertyRate: 8.2,
            infrastructureIndex: 82.3,
            urbanizationRate: 70.2,
            internetAccess: 85.9,
            literacyRate: 98.5,
            schoolEnrollment: 94.9,
            teacherRatio: 15.1
        }
    },
    {
        id: 'jogja',
        name: 'DI Yogyakarta',
        code: 'YO',
        coordinates: [-7.7956, 110.3695],
        indicators: {
            gdp: 6.5,
            unemployment: 4.5,
            povertyRate: 7.8,
            infrastructureIndex: 84.7,
            urbanizationRate: 72.8,
            internetAccess: 87.4,
            literacyRate: 99.1,
            schoolEnrollment: 96.2,
            teacherRatio: 14.5
        }
    },
    {
        id: 'jatim',
        name: 'Jawa Timur',
        code: 'JI',
        coordinates: [-7.5360, 112.2384],
        indicators: {
            gdp: 7.0,
            unemployment: 4.7,
            povertyRate: 8.0,
            infrastructureIndex: 83.9,
            urbanizationRate: 71.5,
            internetAccess: 86.8,
            literacyRate: 98.7,
            schoolEnrollment: 95.3,
            teacherRatio: 14.9
        }
    },
    {
        id: 'banten',
        name: 'Banten',
        code: 'BT',
        coordinates: [-6.4058, 106.0640],
        indicators: {
            gdp: 6.9,
            unemployment: 5.0,
            povertyRate: 8.5,
            infrastructureIndex: 81.5,
            urbanizationRate: 68.9,
            internetAccess: 84.7,
            literacyRate: 98.3,
            schoolEnrollment: 94.5,
            teacherRatio: 15.3
        }
    }
];

export const mockSprints = [
    { id: 'sprint-1', name: 'Sprint 1 - October 2025' },
    { id: 'sprint-2', name: 'Sprint 2 - November 2025' },
    { id: 'sprint-3', name: 'Sprint 3 - December 2025' },
];

export const mockTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Elementary School Renovation in Banda Aceh',
        project: 'Education Facilities',
        province: 'aceh',
        creator: 'John Doe',
        stage: 'backlog',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-10-15')
    },
    {
        id: 'task-2',
        title: 'High School Laboratory Construction in Medan',
        project: 'Education Facilities',
        province: 'sumut',
        creator: 'Jane Smith',
        stage: 'procurement',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-10'),
        updatedAt: new Date('2025-10-20')
    },
    {
        id: 'task-3',
        title: 'University Library Expansion in Padang',
        project: 'Education Facilities',
        province: 'sumbar',
        creator: 'Ahmad Ibrahim',
        stage: 'construction',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-12'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-4',
        title: 'Vocational School Workshop in Pekanbaru',
        project: 'Education Facilities',
        province: 'riau',
        creator: 'Sarah Johnson',
        stage: 'construction-verification',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-18'),
        updatedAt: new Date('2025-10-23')
    },
    {
        id: 'task-5',
        title: 'Primary School Sports Complex in Jambi',
        project: 'Education Facilities',
        province: 'jambi',
        creator: 'Michael Chen',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-05'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-6',
        title: 'School IT Infrastructure in Palembang',
        project: 'Education Facilities',
        province: 'sumsel',
        creator: 'Linda Wilson',
        stage: 'backlog',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-10-20')
    },
    {
        id: 'task-7',
        title: 'Special Education Center in Bengkulu',
        project: 'Education Facilities',
        province: 'bengkulu',
        creator: 'David Lee',
        stage: 'procurement',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-19'),
        updatedAt: new Date('2025-10-24')
    },
    {
        id: 'task-8',
        title: 'School Cafeteria Renovation in Bandar Lampung',
        project: 'Education Facilities',
        province: 'lampung',
        creator: 'Emily Brown',
        stage: 'construction',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-21'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-9',
        title: 'Elementary School Expansion in Pangkal Pinang',
        project: 'Education Facilities',
        province: 'babel',
        creator: 'Robert Taylor',
        stage: 'handover',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-17'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-10',
        title: 'Smart Classroom Initiative in Jakarta',
        project: 'Education Facilities',
        province: 'jakarta',
        creator: 'Sofia Putri',
        stage: 'done',
        sprint: 'sprint-1',
        createdAt: new Date('2025-10-08'),
        updatedAt: new Date('2025-10-24')
    },
    {
        id: 'task-11',
        title: 'School Auditorium Construction in Bandung',
        project: 'Education Facilities',
        province: 'jabar',
        creator: 'Kevin Wong',
        stage: 'backlog',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-22'),
        updatedAt: new Date('2025-10-22')
    },
    {
        id: 'task-12',
        title: 'Technical School Equipment Upgrade in Semarang',
        project: 'Education Facilities',
        province: 'jateng',
        creator: 'Maria Garcia',
        stage: 'procurement',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-23'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-13',
        title: 'University Research Center in Yogyakarta',
        project: 'Education Facilities',
        province: 'jogja',
        creator: 'James Wilson',
        stage: 'construction',
        sprint: 'sprint-2',
        createdAt: new Date('2025-10-16'),
        updatedAt: new Date('2025-10-21')
    },
    {
        id: 'task-14',
        title: 'School Science Laboratory in Surabaya',
        project: 'Education Facilities',
        province: 'jatim',
        creator: 'Anna Lee',
        stage: 'construction-verification',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-24'),
        updatedAt: new Date('2025-10-25')
    },
    {
        id: 'task-15',
        title: 'School Library Modernization in Serang',
        project: 'Education Facilities',
        province: 'banten',
        creator: 'Thomas Anderson',
        stage: 'backlog',
        sprint: 'sprint-3',
        createdAt: new Date('2025-10-25'),
        updatedAt: new Date('2025-10-25')
    }
];

export const mockProjects = [
    'Infrastructure Development',
    'Education Facilities',
    'Healthcare Centers',
    'Public Transportation',
    'Urban Planning',
];