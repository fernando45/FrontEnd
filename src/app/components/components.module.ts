import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule, DxToolbarModule } from 'devextreme-angular';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AvatarComponent } from './avatar/avatar.component';



@NgModule({
  declarations: [ToolbarComponent, AvatarComponent],
  exports: [
    ToolbarComponent,
    
],
  imports: [
    CommonModule,
    DxDataGridModule,
    BrowserModule,
    DxToolbarModule,
  ]
})
export class ComponentsModule { }
