import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PersonalData, User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private userService: UserService
  ) {}

  public personal_data: PersonalData | undefined = undefined;

  ngOnInit() {
    this.userService.find_me().subscribe(res => {
      this.userService.setCurrentUser(res)
    });

    this.userService.current_user$.subscribe(user => {
      this.getPersonalData()
    })
  }

  getPersonalData(){
    this.userService.getPersonalData().subscribe((data: any) => {
      this.personal_data = data;
    })
  }

  getFirstName() {
    const first_name = this.personal_data?.name.split(' ')[0];
    return first_name
  }

}
