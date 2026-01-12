import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-help-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './help-request-dialog.html',
  styleUrls: ['./help-request-dialog.css']
})
export class HelpRequestDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<HelpRequestDialogComponent>);
  private snackBar = inject(MatSnackBar);

  helpForm: FormGroup = this.fb.group({
    fullName: [''],
    location: ['', Validators.required],
    items: this.fb.array([this.createItem()]), // Init with 1 item
    peopleCount: [1, [Validators.required, Validators.min(1)]],
    urgency: ['high', Validators.required],
    notes: ['']
  });

  isSubmitting = false;

  get items(): FormArray {
    return this.helpForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onSubmit() {
    if (this.helpForm.invalid) return;

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.snackBar.open('Help request sent successfully. Responders notified.', 'OK', {
        duration: 5000,
        panelClass: ['bg-green-600', 'text-white']
      });
      this.dialogRef.close(true);
    }, 1500);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
