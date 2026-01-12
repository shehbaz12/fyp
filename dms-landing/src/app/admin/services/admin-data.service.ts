import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
    User,
    Organization,
    Disaster,
    RegionAssignment,
    ActivityLog,
    SystemStats
} from '../models/admin.models';

@Injectable({
    providedIn: 'root'
})
export class AdminDataService {

    // Mock Users Data
    private users: User[] = [
        {
            id: '1',
            name: 'Muhammad Ahmed',
            email: 'admin@gov.pk',
            role: 'admin',
            status: 'active',
            joinedDate: new Date('2024-01-15'),
            lastActive: new Date('2025-12-23'),
            phone: '+92 300 123 4567',
            region: 'Islamabad'
        },
        {
            id: '2',
            name: 'Edhi Foundation',
            email: 'contact@edhi.org.pk',
            role: 'ngo',
            status: 'active',
            joinedDate: new Date('2024-02-10'),
            lastActive: new Date('2025-12-22'),
            phone: '+92 21 3241 3232',
            region: 'National'
        },
        {
            id: '3',
            name: 'Aisha Bibi',
            email: 'aisha.volunteer@mail.com',
            role: 'volunteer',
            status: 'active',
            joinedDate: new Date('2024-06-20'),
            lastActive: new Date('2025-12-23'),
            phone: '+92 321 765 4321',
            region: 'Lahore'
        },
        {
            id: '4',
            name: 'Bilal Khan',
            email: 'bilal.victim@mail.com',
            role: 'victim',
            status: 'active',
            joinedDate: new Date('2025-11-15'),
            lastActive: new Date('2025-12-20'),
            phone: '+94 333 456 7890',
            region: 'Swat'
        },
        {
            id: '5',
            name: 'Al-Khidmat Foundation',
            email: 'info@alkhidmat.org',
            role: 'ngo',
            status: 'active',
            joinedDate: new Date('2024-03-05'),
            lastActive: new Date('2025-12-21'),
            phone: '+92 42 3755 1212',
            region: 'National'
        },
        {
            id: '6',
            name: 'Usman Ali',
            email: 'usman.volunteer@mail.com',
            role: 'volunteer',
            status: 'inactive',
            joinedDate: new Date('2024-08-12'),
            lastActive: new Date('2025-10-15'),
            phone: '+92 301 234 5678',
            region: 'Rawalpindi'
        },
        {
            id: '7',
            name: 'Suspicious User',
            email: 'suspicious@test.com',
            role: 'victim',
            status: 'blocked',
            joinedDate: new Date('2025-12-01'),
            lastActive: new Date('2025-12-05'),
            phone: '+92 300 000 0000',
            region: 'Unknown'
        }
    ];

    // Mock Organizations Data
    private organizations: Organization[] = [
        {
            id: 'org1',
            name: 'Edhi Foundation',
            type: 'ngo',
            contact: {
                email: 'contact@edhi.org.pk',
                phone: '+92 21 3241 3232',
                address: 'Boulton Market, Karachi'
            },
            capacity: {
                volunteers: 5000,
                resources: {
                    food: 50000,
                    medical: 10000,
                    shelter: 2000
                }
            },
            status: 'approved',
            registeredDate: new Date('2024-02-10'),
            currentWorkload: 45
        },
        {
            id: 'org2',
            name: 'Al-Khidmat Foundation',
            type: 'ngo',
            contact: {
                email: 'info@alkhidmat.org',
                phone: '+92 42 3755 1212',
                address: '56-A, Shadman, Lahore'
            },
            capacity: {
                volunteers: 3000,
                resources: {
                    food: 30000,
                    medical: 5000,
                    shelter: 1000
                }
            },
            status: 'approved',
            registeredDate: new Date('2024-03-05'),
            currentWorkload: 30
        },
        {
            id: 'org3',
            name: 'NDMA Pakistan',
            type: 'government',
            contact: {
                email: 'info@ndma.gov.pk',
                phone: '+92 51 9205037',
                address: 'Prime Ministers Office, Islamabad'
            },
            capacity: {
                volunteers: 1000,
                resources: {
                    food: 100000,
                    medical: 20000,
                    shelter: 5000
                }
            },
            status: 'approved',
            registeredDate: new Date('2024-01-01'),
            currentWorkload: 60
        },
        {
            id: 'org4',
            name: 'Chhipa Welfare',
            type: 'ngo',
            contact: {
                email: 'info@chhipa.org',
                phone: '+92 21 111 92 1020',
                address: 'FTC Bridge, Shahrah-e-Faisal, Karachi'
            },
            capacity: {
                volunteers: 1500,
                resources: {
                    food: 20000,
                    medical: 3000,
                    shelter: 500
                }
            },
            status: 'pending',
            registeredDate: new Date('2025-12-15'),
            currentWorkload: 0
        },
        {
            id: 'org5',
            name: 'Fake NGO Ltd',
            type: 'ngo',
            contact: {
                email: 'fake@test.com',
                phone: '+92 300 000 0000',
                address: 'Unknown'
            },
            capacity: {
                volunteers: 10,
                resources: {
                    food: 100,
                    medical: 50,
                    shelter: 20
                }
            },
            status: 'disabled',
            registeredDate: new Date('2025-11-20'),
            currentWorkload: 0
        }
    ];

    // Mock Disasters Data
    private disasters: Disaster[] = [
        {
            id: 'dis1',
            type: 'flood',
            name: 'Karachi Urban Floods',
            affectedRegions: ['Karachi', 'Hyderabad', 'Thatta'],
            severity: 'high',
            status: 'active',
            reportedDate: new Date('2025-12-20'),
            affectedPopulation: 25000,
            description: 'Heavy torrential rains causing urban flooding in DHA and Clifton.'
        },
        {
            id: 'dis2',
            type: 'landslide',
            name: 'Murree Landslide Incident',
            affectedRegions: ['Murree', 'Galyat'],
            severity: 'critical',
            status: 'active',
            reportedDate: new Date('2025-12-18'),
            affectedPopulation: 1000,
            description: 'Major landslide blocking Expressway, tourists stranded.'
        },
        {
            id: 'dis3',
            type: 'fire',
            name: 'Raja Bazaar Fire',
            affectedRegions: ['Rawalpindi'],
            severity: 'medium',
            status: 'closed',
            reportedDate: new Date('2025-11-10'),
            affectedPopulation: 500,
            description: 'Short circuit caused fire in commercial market, now extinguished.'
        },
        {
            id: 'dis4',
            type: 'cyclone',
            name: 'Cyclone Alert - Coastal Belt',
            affectedRegions: ['Gwadar', 'Pasni', 'Ormara'],
            severity: 'high',
            status: 'active',
            reportedDate: new Date('2025-12-22'),
            affectedPopulation: 15000,
            description: 'Cyclone approaching Makran coast, Section 144 imposed.'
        }
    ];

    // Mock Region Assignments Data
    private assignments: RegionAssignment[] = [
        {
            id: 'assign1',
            disasterId: 'dis1',
            disasterName: 'Karachi Urban Floods',
            region: 'Karachi',
            assignedNGOs: ['org1', 'org3'],
            resourceRequirements: {
                food: 10000,
                medical: 2000,
                shelter: 500
            },
            resourceCoverage: 85,
            affectedPopulation: 10000,
            status: 'in-progress',
            assignedDate: new Date('2025-12-21'),
            assignedBy: 'Admin User'
        },
        {
            id: 'assign2',
            disasterId: 'dis2',
            disasterName: 'Murree Landslide Incident',
            region: 'Murree',
            assignedNGOs: ['org3'], // NDMA
            resourceRequirements: {
                food: 500,
                medical: 100,
                shelter: 50
            },
            resourceCoverage: 60,
            affectedPopulation: 500,
            status: 'assigned',
            assignedDate: new Date('2025-12-19'),
            assignedBy: 'Admin User'
        },
        {
            id: 'assign3',
            disasterId: 'dis1',
            disasterName: 'Karachi Urban Floods',
            region: 'Hyderabad',
            assignedNGOs: ['org4'], // Chhipa
            resourceRequirements: {
                food: 3000,
                medical: 300,
                shelter: 200
            },
            resourceCoverage: 100,
            affectedPopulation: 5000,
            status: 'completed',
            assignedDate: new Date('2025-12-20'),
            assignedBy: 'Admin User'
        }
    ];

    // Mock Activity Logs Data
    private activityLogs: ActivityLog[] = [
        {
            id: 'log1',
            timestamp: new Date('2025-12-23T10:30:00'),
            action: 'region_assignment',
            performedBy: 'Admin User',
            details: 'Assigned Karachi region to Edhi Foundation and NDMA for flood relief',
            entityId: 'assign1',
            entityType: 'assignment'
        },
        {
            id: 'log2',
            timestamp: new Date('2025-12-22T14:15:00'),
            action: 'ngo_approval',
            performedBy: 'Admin User',
            details: 'Approved Al-Khidmat Foundation NGO registration',
            entityId: 'org2',
            entityType: 'organization'
        },
        {
            id: 'log3',
            timestamp: new Date('2025-12-21T09:00:00'),
            action: 'user_status_change',
            performedBy: 'Admin User',
            details: 'Blocked suspicious user account',
            entityId: '7',
            entityType: 'user'
        },
        {
            id: 'log4',
            timestamp: new Date('2025-12-20T16:45:00'),
            action: 'organization_status_change',
            performedBy: 'Admin User',
            details: 'Disabled Fake NGO Ltd due to verification failure',
            entityId: 'org5',
            entityType: 'organization'
        },
        {
            id: 'log5',
            timestamp: new Date('2025-12-19T11:20:00'),
            action: 'region_assignment',
            performedBy: 'Admin User',
            details: 'Assigned Murree region to NDMA for landslide relief',
            entityId: 'assign2',
            entityType: 'assignment'
        }
    ];

    constructor() { }

    // System Stats
    getSystemStats(): Observable<SystemStats> {
        const stats: SystemStats = {
            totalUsers: this.users.length,
            totalNGOs: this.organizations.filter(o => o.type === 'ngo').length,
            totalVolunteers: this.users.filter(u => u.role === 'volunteer').length,
            activeDisasters: this.disasters.filter(d => d.status === 'active').length,
            affectedRegions: [...new Set(this.disasters.flatMap(d => d.affectedRegions))].length,
            pendingAssignments: this.assignments.filter(a => a.status === 'assigned').length,
            userGrowth: 12.5,
            ngoGrowth: 8.3,
            volunteerGrowth: 15.7,
            disasterGrowth: -5.2
        };
        return of(stats);
    }

    // Users
    getUsers(): Observable<User[]> {
        return of(this.users);
    }

    updateUserStatus(userId: string, status: 'active' | 'inactive' | 'blocked'): Observable<User> {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.status = status;
            this.addActivityLog('user_status_change', `Changed user ${user.name} status to ${status}`, userId, 'user');
        }
        return of(user!);
    }

    // Organizations
    getOrganizations(): Observable<Organization[]> {
        return of(this.organizations);
    }

    updateOrganizationStatus(orgId: string, status: 'pending' | 'approved' | 'disabled'): Observable<Organization> {
        const org = this.organizations.find(o => o.id === orgId);
        if (org) {
            org.status = status;
            const action = status === 'approved' ? 'ngo_approval' : status === 'disabled' ? 'organization_status_change' : 'ngo_rejection';
            this.addActivityLog(action, `Changed ${org.name} status to ${status}`, orgId, 'organization');
        }
        return of(org!);
    }

    // Disasters
    getDisasters(): Observable<Disaster[]> {
        return of(this.disasters);
    }

    getActiveDisasters(): Observable<Disaster[]> {
        return of(this.disasters.filter(d => d.status === 'active'));
    }

    // Assignments
    getAssignments(): Observable<RegionAssignment[]> {
        return of(this.assignments);
    }

    createAssignment(assignment: Omit<RegionAssignment, 'id' | 'assignedDate' | 'assignedBy'>): Observable<RegionAssignment> {
        const newAssignment: RegionAssignment = {
            ...assignment,
            id: `assign${this.assignments.length + 1}`,
            assignedDate: new Date(),
            assignedBy: 'Admin User'
        };
        this.assignments.push(newAssignment);
        this.addActivityLog('region_assignment', `Assigned ${assignment.region} to NGO(s) for disaster relief`, newAssignment.id, 'assignment');
        return of(newAssignment);
    }

    // Activity Logs
    getActivityLogs(): Observable<ActivityLog[]> {
        return of(this.activityLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    }

    private addActivityLog(action: ActivityLog['action'], details: string, entityId: string, entityType: ActivityLog['entityType']): void {
        const log: ActivityLog = {
            id: `log${this.activityLogs.length + 1}`,
            timestamp: new Date(),
            action,
            performedBy: 'Admin User',
            details,
            entityId,
            entityType
        };
        this.activityLogs.unshift(log);
    }

    // Helper methods
    getOrganizationById(id: string): Organization | undefined {
        return this.organizations.find(o => o.id === id);
    }

    getDisasterById(id: string): Disaster | undefined {
        return this.disasters.find(d => d.id === id);
    }

    getEligibleNGOsForRegion(disasterId: string, region: string): Observable<Organization[]> {
        // Filter NGOs that are approved and have capacity
        const eligible = this.organizations.filter(org =>
            org.status === 'approved' &&
            org.currentWorkload < 80 &&
            org.capacity.volunteers > 0
        );
        return of(eligible);
    }
}
