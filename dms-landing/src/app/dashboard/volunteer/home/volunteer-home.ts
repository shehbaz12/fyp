import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { VolunteerService } from '../services/volunteer.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-volunteer-home',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule],
    templateUrl: './volunteer-home.html',
    styleUrls: ['./volunteer-home.css']
})
export class VolunteerHomeComponent {
    volunteerService = inject(VolunteerService);
    private router = inject(Router);

    tasks$ = this.volunteerService.tasks$;
    stats$ = this.volunteerService.stats$;
    isCheckedIn$ = this.volunteerService.isCheckedIn$;

    // Get only the first active task for the "Current Task" card
    currentTask$ = this.tasks$.pipe(
        map(tasks => tasks.find(t => t.status === 'Active') || tasks.find(t => t.status === 'Pending'))
    );

    toggleCheckIn() {
        this.volunteerService.toggleCheckIn();
    }

    viewAllTasks() {
        this.router.navigate(['/dashboard/volunteer/tasks']);
    }
}
