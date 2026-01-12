import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ReportDisasterDialogComponent } from '../report-disaster-dialog/report-disaster-dialog';

interface DisasterMarker {
  id: string;
  type: 'flood' | 'fire' | 'earthquake' | 'landslide' | 'cyclone' | 'accident';
  location: [number, number];
  severity: 'low' | 'medium' | 'high' | 'critical';
  peopleAffected: number;
  needs: string[];
  description: string;
  timestamp: Date;
}

interface ReliefResource {
  id: string;
  type: 'shelter' | 'hospital' | 'aid_center' | 'rescue_team';
  name: string;
  location: [number, number];
  capacity?: number;
  contact?: string;
}

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './interactive-map.html',
  styleUrls: ['./interactive-map.css']
})
export class InteractiveMapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private dialog = inject(MatDialog);

  selectedDisasterType: string = 'all';
  selectedSeverity: string = 'all';
  searchQuery: string = '';

  disasterTypes = ['all', 'flood', 'fire', 'earthquake', 'landslide', 'cyclone', 'accident'];
  severityLevels = ['all', 'low', 'medium', 'high', 'critical'];

  // Mock data - replace with API calls
  private disasters: DisasterMarker[] = [
    {
      id: '1',
      type: 'flood',
      location: [24.8607, 67.0011], // Karachi
      severity: 'high',
      peopleAffected: 5000,
      needs: ['Food', 'Water', 'Boats'],
      description: 'Urban flooding in Clifton and DHA areas',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'fire',
      location: [31.5204, 74.3587], // Lahore
      severity: 'critical',
      peopleAffected: 200,
      needs: ['Rescue', 'Medical'],
      description: 'Factory fire in industrial estate',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'landslide',
      location: [34.3313, 73.5025], // Muzaffarabad
      severity: 'medium',
      peopleAffected: 50,
      needs: ['Shelter', 'Food'],
      description: 'Landslide blocking Neelum Valley Road',
      timestamp: new Date()
    },
    {
      id: '4',
      type: 'earthquake',
      location: [30.1798, 66.9750], // Quetta
      severity: 'high',
      peopleAffected: 1000,
      needs: ['Shelter', 'Medical', 'Blankets'],
      description: 'Magnitude 5.4 earthquake tremors',
      timestamp: new Date()
    }
  ];

  private reliefResources: ReliefResource[] = [
    {
      id: 'r1',
      type: 'hospital',
      name: 'Jinnah Hospital',
      location: [24.8568, 67.0435], // Karachi
      capacity: 800,
      contact: '+92 21 99201300'
    },
    {
      id: 'r2',
      type: 'shelter',
      name: 'Edhi Home - Islamabad',
      location: [33.6844, 73.0479], // Islamabad
      capacity: 300
    },
    {
      id: 'r3',
      type: 'aid_center',
      name: 'Al-Khidmat Center Peshawar',
      location: [34.0151, 71.5249], // Peshawar
      capacity: 1000,
      contact: '+92 91 1234567'
    }
  ];

  private markerLayers: L.LayerGroup[] = [];

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.initMap();
    this.addDisasterMarkers();
    this.addReliefResources();

    // Check for query params to center map
    this.route.queryParams.subscribe(params => {
      const lat = parseFloat(params['lat']);
      const lng = parseFloat(params['lng']);
      if (!isNaN(lat) && !isNaN(lng)) {
        setTimeout(() => {
          this.map.setView([lat, lng], 15);
          L.marker([lat, lng]).addTo(this.map).bindPopup('Destination').openPopup();
        }, 500); // Small delay to ensure map init
      }
    });
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap() {
    // Center on Pakistan
    this.map = L.map('map', {
      center: [30.3753, 69.3451], // Pakistan Center
      zoom: 6,
      zoomControl: false
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Add custom zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  private getDisasterColor(type: string): string {
    const colors: Record<string, string> = {
      flood: '#3b82f6',      // blue
      fire: '#ef4444',       // red
      earthquake: '#f97316', // orange
      landslide: '#92400e',  // brown
      cyclone: '#a855f7',    // purple
      accident: '#eab308'    // yellow
    };
    return colors[type] || '#6b7280';
  }

  private getMarkerSize(severity: string): number {
    const sizes: Record<string, number> = {
      low: 8,
      medium: 12,
      high: 16,
      critical: 20
    };
    return sizes[severity] || 12;
  }

  private addDisasterMarkers() {
    const layerGroup = L.layerGroup().addTo(this.map);
    this.markerLayers.push(layerGroup);

    this.disasters.forEach(disaster => {
      const icon = L.divIcon({
        className: 'custom-disaster-marker',
        html: `<div style="
          background-color: ${this.getDisasterColor(disaster.type)};
          width: ${this.getMarkerSize(disaster.severity)}px;
          height: ${this.getMarkerSize(disaster.severity)}px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [this.getMarkerSize(disaster.severity), this.getMarkerSize(disaster.severity)]
      });

      const marker = L.marker(disaster.location, { icon })
        .bindPopup(`
          <div class="disaster-popup">
            <h3 style="margin: 0 0 8px 0; color: ${this.getDisasterColor(disaster.type)}; text-transform: capitalize;">
              ${disaster.type} - ${disaster.severity.toUpperCase()}
            </h3>
            <p style="margin: 4px 0;"><strong>People Affected:</strong> ${disaster.peopleAffected}</p>
            <p style="margin: 4px 0;"><strong>Needs:</strong> ${disaster.needs.join(', ')}</p>
            <p style="margin: 4px 0;">${disaster.description}</p>
          </div>
        `)
        .addTo(layerGroup);

      // Hover tooltip
      marker.bindTooltip(`${disaster.type.toUpperCase()} - ${disaster.severity}`, {
        permanent: false,
        direction: 'top'
      });
    });
  }

  private addReliefResources() {
    const layerGroup = L.layerGroup().addTo(this.map);
    this.markerLayers.push(layerGroup);

    this.reliefResources.forEach(resource => {
      const iconHtml = this.getResourceIcon(resource.type);

      const icon = L.divIcon({
        className: 'custom-resource-marker',
        html: iconHtml,
        iconSize: [32, 32]
      });

      L.marker(resource.location, { icon })
        .bindPopup(`
          <div class="resource-popup">
            <h3 style="margin: 0 0 8px 0; color: #059669;">${resource.name}</h3>
            <p style="margin: 4px 0;"><strong>Type:</strong> ${resource.type.replace('_', ' ').toUpperCase()}</p>
            ${resource.capacity ? `<p style="margin: 4px 0;"><strong>Capacity:</strong> ${resource.capacity}</p>` : ''}
            ${resource.contact ? `<p style="margin: 4px 0;"><strong>Contact:</strong> ${resource.contact}</p>` : ''}
          </div>
        `)
        .addTo(layerGroup);
    });
  }

  private getResourceIcon(type: string): string {
    const icons: Record<string, string> = {
      hospital: '🏥',
      shelter: '⛺',
      aid_center: '🏢',
      rescue_team: '🚁'
    };
    const emoji = icons[type] || '📍';
    return `<div style="font-size: 24px; text-align: center;">${emoji}</div>`;
  }

  applyFilters() {
    // Clear existing markers
    this.markerLayers.forEach(layer => layer.clearLayers());
    this.markerLayers = [];

    // Filter disasters
    const filtered = this.disasters.filter(d => {
      const typeMatch = this.selectedDisasterType === 'all' || d.type === this.selectedDisasterType;
      const severityMatch = this.selectedSeverity === 'all' || d.severity === this.selectedSeverity;
      return typeMatch && severityMatch;
    });

    // Re-add filtered markers
    const layerGroup = L.layerGroup().addTo(this.map);
    this.markerLayers.push(layerGroup);

    filtered.forEach(disaster => {
      const icon = L.divIcon({
        className: 'custom-disaster-marker',
        html: `<div style="
          background-color: ${this.getDisasterColor(disaster.type)};
          width: ${this.getMarkerSize(disaster.severity)}px;
          height: ${this.getMarkerSize(disaster.severity)}px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [this.getMarkerSize(disaster.severity), this.getMarkerSize(disaster.severity)]
      });

      L.marker(disaster.location, { icon })
        .bindPopup(`
          <div class="disaster-popup">
            <h3 style="margin: 0 0 8px 0; color: ${this.getDisasterColor(disaster.type)}; text-transform: capitalize;">
              ${disaster.type} - ${disaster.severity.toUpperCase()}
            </h3>
            <p style="margin: 4px 0;"><strong>People Affected:</strong> ${disaster.peopleAffected}</p>
            <p style="margin: 4px 0;"><strong>Needs:</strong> ${disaster.needs.join(', ')}</p>
            <p style="margin: 4px 0;">${disaster.description}</p>
          </div>
        `)
        .addTo(layerGroup);
    });

    // Re-add relief resources
    this.addReliefResources();
  }

  locateMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.map.setView([lat, lng], 13);

          // Add user location marker
          L.marker([lat, lng])
            .bindPopup('You are here')
            .addTo(this.map);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }

  openReportDialog() {
    this.dialog.open(ReportDisasterDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'glass-dialog',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });
  }

  resetFilters() {
    this.selectedDisasterType = 'all';
    this.selectedSeverity = 'all';
    this.searchQuery = '';
    this.applyFilters();
  }
}
