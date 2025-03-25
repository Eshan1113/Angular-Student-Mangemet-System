import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }