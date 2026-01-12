import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { NgoService } from '../services/ngo.service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddVolunteerDialogComponent } from './add-volunteer-dialog';

@Component({
    selector: 'app-volunteers',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatMenuModule, MatChipsModule, MatDividerModule, MatDialogModule],
    templateUrl: './volunteers.html',
    styleUrls: ['./volunteers.css']
})
export class VolunteersComponent {
    ngoService = inject(NgoService);
    dialog = inject(MatDialog);
    volunteers$ = this.ngoService.volunteers$;

    openAddVolunteer() {
        const dialogRef = this.dialog.open(AddVolunteerDialogComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngoService.addVolunteer(result);
            }
        });
    }
    displayedColumns = ['name', 'expertise', 'contact', 'availability', 'task', 'actions'];

    assignTask(id: string, task: string) {
        this.ngoService.assignVolunteer(id, task);
    }

    unassign(id: string) {
        this.ngoService.unassignVolunteer(id);
    }
}
