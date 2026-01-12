import { Injectable, inject, effect } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';


export interface AidHistory {
    id: string;
    type: string;
    date: Date;
    ngoName: string;
    pointName: string;
    quantity: string;
}

export interface DistributionPoint {
    id: string;
    name: string;
    location: string;
    activeNGOs: string[];
    hours: string;
    status: 'Active' | 'Closed';
}

export interface VictimRequest {
    id: string;
    type: 'Food' | 'Medical' | 'Shelter';
    urgency: 'Low' | 'Medium' | 'Critical';
    note?: string;
    status: 'Pending' | 'Approved' | 'Ready' | 'Fulfilled';
    allocatedNGO?: string;
    allocatedPoint?: string;
    validUntil?: Date;
    createdAt: Date;
}

export interface VictimProfile {
    id?: string;
    name: string;
    familySize?: number;
    specialNeeds?: string[];
    contact?: string;
    qrCodeData?: string;
    location?: string;
    phone?: string;
    email?: string;
}

@Injectable({
    providedIn: 'root'
})
export class VictimService {

    // Mock Data
    private _history = new BehaviorSubject<AidHistory[]>([
        { id: 'H1', type: 'Food Pack', date: new Date(Date.now() - 86400000 * 2), ngoName: 'Edhi Foundation', pointName: 'Swat Camp A', quantity: '2 Bags' },
        { id: 'H2', type: 'Medical Kit', date: new Date(Date.now() - 86400000 * 10), ngoName: 'Red Crescent', pointName: 'Mobile Unit 4', quantity: '1 Kit' }
    ]);

    private _points = new BehaviorSubject<DistributionPoint[]>([
        { id: 'P1', name: 'Swat Central Camp', location: 'Mingora, Swat', activeNGOs: ['Edhi', 'Al-Khidmat'], hours: '08:00 AM - 06:00 PM', status: 'Active' },
        { id: 'P2', name: 'Charsadda Relief Point', location: 'Charsadda Bazaar', activeNGOs: ['Red Crescent'], hours: '09:00 AM - 05:00 PM', status: 'Active' },
        { id: 'P3', name: 'Nowshera Medical Camp', location: 'Nowshera Cantt', activeNGOs: ['Doctors Without Borders'], hours: '24/7', status: 'Active' }
    ]);
    private authService = inject(AuthService);

    private _profile = new BehaviorSubject<VictimProfile>({
        name: 'Guest',
        familySize: 1,
        specialNeeds: [],
        contact: '',
        qrCodeData: '',
        location: '',
        phone: '',
        email: ''
    });

    private _requests = new BehaviorSubject<VictimRequest[]>([
        { id: 'R1', type: 'Shelter', urgency: 'Critical', note: 'Need tent for 5 people', status: 'Ready', allocatedNGO: 'Al-Khidmat', allocatedPoint: 'Swat Central Camp', validUntil: new Date(Date.now() + 86400000), createdAt: new Date(Date.now() - 3600000) },
        { id: 'R2', type: 'Medical', urgency: 'Medium', note: 'Insulin required', status: 'Pending', createdAt: new Date() }
    ]);

    // Observables
    history$ = this._history.asObservable();
    points$ = this._points.asObservable();
    requests$ = this._requests.asObservable();
    profile$ = this._profile.asObservable();

    constructor() {
        // Reactively update profile when user changes
        effect(() => {
            const user = this.authService.getCurrentUser();
            if (user) {
                this._profile.next({
                    id: user.id,
                    name: user.name,
                    familySize: 1,
                    specialNeeds: [],
                    contact: user.phone || 'Not provided',
                    qrCodeData: user.id || 'SECURE-TOKEN',
                    location: user.region || 'Unknown',
                    phone: user.phone || 'Not provided',
                    email: user.email || 'Not provided'
                });
            }
        });
    }

    // Methods
    submitRequest(type: any, urgency: any, note: string) {
        const newReq: VictimRequest = {
            id: 'R' + Math.floor(Math.random() * 1000),
            type,
            urgency,
            note,
            status: 'Pending',
            createdAt: new Date()
        };

        // Simulate auto-allocation after delay
        this._requests.next([newReq, ...this._requests.value]);

        // Mock Backend Allocation Logic
        setTimeout(() => {
            const reqs = this._requests.value;
            const target = reqs.find(r => r.id === newReq.id);
            if (target) {
                target.status = 'Approved';
                target.allocatedNGO = 'Auto-Assigned NGO';
                target.allocatedPoint = 'Nearest Camp';
                this._requests.next([...reqs]);
            }
        }, 3000); // 3 sec delay
    }
}
