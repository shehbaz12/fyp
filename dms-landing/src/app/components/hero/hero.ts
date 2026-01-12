import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HelpRequestDialogComponent } from '../../shared/components/help-request-dialog/help-request-dialog';
import { ReportDisasterDialogComponent } from '../../shared/components/report-disaster-dialog/report-disaster-dialog';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, MatDialogModule],
  // Note: We don't strictly typically need to import content components in directives/pipes arrays 
  // for MatDialog.open, but adding them here ensures they are retained by the optimizer.
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class HeroComponent {
  readonly dialog = inject(MatDialog);

  openHelpDialog() {
    this.dialog.open(HelpRequestDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'glass-dialog',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });
  }
}





