import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';

interface IUserInfo {
  firstName: string;
  lastName?: string;
  middleName?: string;
  positionDescription?: string;
  brigade?: { id: number, number: string }
}

@Component({
  selector: 'evj-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  data: IUserInfo;
  isShowScreens: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }


  async loadData() {
    const data: any[] = await this.authService.getUserAuth();
    if (data[0]) {
      this.data = data[0];
    }
  }

  async logOut() {
    await this.authService.logOut();
    this.router.navigate(['login']);
  }

  isLeaveScreen(e) {
    this.isShowScreens = false;

  }
  isOverScreen(e) {
    this.isShowScreens = true;
  }

  private ScreenActive(e) {
    this.isShowScreens = true;
  }

  private ScreenDisable(e) {
    this.isShowScreens = false;

  }

}
