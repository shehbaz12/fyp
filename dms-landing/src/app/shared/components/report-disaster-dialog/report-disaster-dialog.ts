import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-report-disaster-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  templateUrl: './report-disaster-dialog.html',
  styleUrls: ['./report-disaster-dialog.css']
})
export class ReportDisasterDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ReportDisasterDialogComponent>);
  private snackBar = inject(MatSnackBar);

  reportForm: FormGroup = this.fb.group({
    location: ['', Validators.required],
    disasterType: ['', Validators.required],
    severity: ['medium', Validators.required],
    peopleAffected: [null], // Optional
    needs: this.fb.group({
      food: [false],
      water: [false],
      shelter: [false],
      medical: [false],
      rescue: [false],
      other: [false]
    }),
    comments: [''],
    contactName: [''],
    contactPhone: ['']
  });

  isSubmitting = false;

  onSubmit() {
    if (this.reportForm.invalid) return;

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.snackBar.open('Disaster report submitted. Monitoring team alerted.', 'OK', {
        duration: 5000,
        panelClass: ['bg-red-600', 'text-white']
      });
      this.dialogRef.close(true);
    }, 1500);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
