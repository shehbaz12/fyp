import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgoService } from '../services/ngo.service';
import { AddItemDialogComponent } from './add-item-dialog';

@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    templateUrl: './inventory.html',
    styleUrls: ['./inventory.css']
})
export class InventoryComponent {
    ngoService = inject(NgoService);
    dialog = inject(MatDialog);
    inventory$ = this.ngoService.inventory$;
    displayedColumns = ['name', 'category', 'quantity', 'unit', 'lastUpdated', 'actions'];

    updateQuantity(id: string, delta: number) {
        this.ngoService.updateInventoryQuantity(id, delta);
    }

    addItem() {
        const dialogRef = this.dialog.open(AddItemDialogComponent, {
            width: '450px',
            panelClass: 'glass-dialog'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngoService.addInventoryItem(result);
            }
        });
    }
}
