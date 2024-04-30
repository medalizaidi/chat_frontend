import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChatsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nickname = '';

  constructor(private navController: NavController, private userService :ChatsService) { }

  joinChat() {
    sessionStorage.setItem('nickname', this.nickname); 
    this.userService.CreateCompte(this.nickname).subscribe((resp)=>{
      this.navController.navigateRoot(`select-room`); 

    });
  }
}
