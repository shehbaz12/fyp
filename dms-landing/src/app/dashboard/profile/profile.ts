import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../auth/services/auth.service';
import { VictimService } from '../victim/services/victim.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule],
    templateUrl: './profile.html',
    styleUrls: ['./profile.css']
})
export class ProfileComponent {
    authService = inject(AuthService);
    victimService = inject(VictimService);
    dialog = inject(MatDialog);

    victimProfile$ = this.victimService.profile$;

    get user() {
        return this.authService.getCurrentUser();
    }

    // Mock activity
    activities = [
        { action: 'Logged in', time: new Date() },
        { action: 'Updated Settings', time: new Date(Date.now() - 3600000) },
        { action: 'Viewed Reports', time: new Date(Date.now() - 86400000) }
    ];

    openEditProfile() {
        this.dialog.open(EditProfileDialogComponent, {
            width: '500px',
            data: { user: this.user }
        }).afterClosed().subscribe(result => {
            if (result) {
                console.log('Profile updated:', result);
                // In a real app, we would update the service here.
                // For now, allow the UI to reflect changes if binding to a mutable object, 
                // but since 'user' is a getter from service, we'd need to update the service mock user.
            }
        });
    }
}
