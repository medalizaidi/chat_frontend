import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatRoomPage } from './chat-room.page';

const routes: Routes = [
  {
    path: ':roomId',
    component: ChatRoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatRoomPage]
})
export class ChatRoomPageModule {}
