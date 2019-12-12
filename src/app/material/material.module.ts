import { NgModule } from '@angular/core';
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
  MatTooltipModule } from '@angular/material';

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
  MatTooltipModule
];

@NgModule({
  imports: [materialCompoent],
  exports: [materialCompoent]
})
export class MaterialModule { }
