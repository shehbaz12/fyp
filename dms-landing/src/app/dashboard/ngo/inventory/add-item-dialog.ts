import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-add-item-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule
    ],
    templateUrl: './add-item-dialog.html',
    styleUrls: ['./add-item-dialog.css']
})
export class AddItemDialogComponent {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<AddItemDialogComponent>);

    form = this.fb.group({
        name: ['', Validators.required],
        category: ['Food', Validators.required],
        quantity: [0, [Validators.required, Validators.min(1)]],
        unit: ['Units', Validators.required]
    });

    categories = ['Food', 'Medical', 'Shelter', 'Clothing', 'Water', 'Other'];
    units = ['Units', 'Bags', 'Bottles', 'Kits', 'Tents', 'Blankets', 'kg', 'Liters'];

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

    close() {
        this.dialogRef.close();
    }
}
