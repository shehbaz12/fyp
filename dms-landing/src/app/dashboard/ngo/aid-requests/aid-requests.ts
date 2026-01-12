import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgoService } from '../services/ngo.service';

@Component({
    selector: 'app-aid-requests',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
    templateUrl: './aid-requests.html',
    styleUrls: ['./aid-requests.css']
})
export class AidRequestsComponent {
    ngoService = inject(NgoService);
    requests$ = this.ngoService.aidRequests$;
    displayedColumns = ['victim', 'priority', 'region', 'items', 'status', 'actions'];

    moveToReady(id: string) {
        this.ngoService.moveToReady(id);
    }
}
