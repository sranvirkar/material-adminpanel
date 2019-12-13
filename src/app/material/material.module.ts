import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay'
import { MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSnackBarModule } from '@angular/material';

const materialCompoent = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  OverlayModule,
  MatSnackBarModule
];

@NgModule({
  imports: [materialCompoent],
  exports: [materialCompoent]
})
export class MaterialModule { }
