import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgoService } from '../services/ngo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { RegionDetailsDialogComponent } from './region-details-dialog';

@Component({
    selector: 'app-assigned-regions',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatDialogModule, MatDividerModule],
    templateUrl: './assigned-regions.html',
    styleUrls: ['./assigned-regions.css']
})
export class AssignedRegionsComponent {
    ngoService = inject(NgoService);
    dialog = inject(MatDialog);
    regions$ = this.ngoService.regions$;

    openDetails(region: any) {
        this.dialog.open(RegionDetailsDialogComponent, {
            width: '500px',
            data: region
        });
    }
}
