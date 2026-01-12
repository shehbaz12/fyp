import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { VolunteerService, VolunteerTask } from '../services/volunteer.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-my-tasks',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatChipsModule],
    templateUrl: './my-tasks.html',
    styleUrls: ['./my-tasks.css']
})
export class MyTasksComponent {
    volunteerService = inject(VolunteerService);

    tasks$ = this.volunteerService.tasks$;

    pendingTasks$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === 'Pending')));
    activeTasks$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === 'Active')));
    completedTasks$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === 'Completed')));

    startTask(id: string) {
        this.volunteerService.startTask(id);
    }

    completeTask(id: string) {
        this.volunteerService.completeTask(id);
    }
}
