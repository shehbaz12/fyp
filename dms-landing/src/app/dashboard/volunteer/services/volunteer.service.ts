import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface VolunteerTask {
    id: string;
    title: string;
    description: string;
    status: 'Pending' | 'Active' | 'Completed';
    location: string;
    startDate: Date;
    deadline: Date;
    assignedNGO: string;
}

export interface VolunteerStats {
    hoursServed: number;
    tasksCompleted: number;
    distributionsAssisted: number;
    currentStreak: number;
}

@Injectable({
    providedIn: 'root'
})
export class VolunteerService {

    // Mock Tasks
    private _tasks = new BehaviorSubject<VolunteerTask[]>([
        {
            id: '1',
            title: 'Distribute Food Rations',
            description: 'Assist in distributing food packets to 50 families in Sector F-10.',
            status: 'Active',
            location: 'Sector F-10 Relief Camp',
            startDate: new Date(),
            deadline: new Date(Date.now() + 86400000), // +1 day
            assignedNGO: 'Edhi Foundation'
        },
        {
            id: '2',
            title: 'Medical Camp Setup',
            description: 'Help set up tents and tables for the upcoming medical camp.',
            status: 'Pending',
            location: 'Blue Area Park',
            startDate: new Date(Date.now() + 172800000), // +2 days
            deadline: new Date(Date.now() + 259200000), // +3 days
            assignedNGO: 'Red Crescent'
        },
        {
            id: '3',
            title: 'Logistics Support',
            description: 'Load and unload medical supplies from trucks.',
            status: 'Completed',
            location: 'Central Warehouse',
            startDate: new Date(Date.now() - 172800000), // -2 days
            deadline: new Date(Date.now() - 86400000), // -1 day
            assignedNGO: 'Al-Khidmat'
        }
    ]);

    tasks$ = this._tasks.asObservable();

    // Mock Stats
    private _stats = new BehaviorSubject<VolunteerStats>({
        hoursServed: 42,
        tasksCompleted: 15,
        distributionsAssisted: 8,
        currentStreak: 4
    });

    stats$ = this._stats.asObservable();

    // Mock Check-in State
    private _isCheckedIn = new BehaviorSubject<boolean>(false);
    isCheckedIn$ = this._isCheckedIn.asObservable();

    constructor() { }

    // Actions
    startTask(taskId: string) {
        const tasks = this._tasks.value.map(t => {
            if (t.id === taskId) return { ...t, status: 'Active' as const };
            return t;
        });
        this._tasks.next(tasks);
    }

    completeTask(taskId: string) {
        const tasks = this._tasks.value.map(t => {
            if (t.id === taskId) return { ...t, status: 'Completed' as const };
            return t;
        });
        this._tasks.next(tasks);

        // Update stats
        const currentStats = this._stats.value;
        this._stats.next({
            ...currentStats,
            tasksCompleted: currentStats.tasksCompleted + 1,
            hoursServed: currentStats.hoursServed + 4 // Mock hours
        });
    }

    toggleCheckIn() {
        this._isCheckedIn.next(!this._isCheckedIn.value);
    }

    getAssignedRegion() {
        return {
            name: 'Sector F-10',
            city: 'Islamabad',
            supervisor: 'Ahmed Khan',
            contact: '+92 300 9876543',
            reportingPoint: 'F-10 Markaz Park',
            coordinates: { lat: 33.69, lng: 73.04 }
        };
    }
}
