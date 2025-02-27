import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth-service/auth.service';
import { UserService } from 'src/app/modules/user/services/user-service/user.service';

@Component({
    selector: 'app-sudo-nav',
    templateUrl: './sudo-nav.component.html',
    styleUrls: ['./sudo-nav.component.scss']
})
export class SudoNavComponent {
    protected uid: number | null;
    protected isAdmin: boolean = false;
    protected isUploader: boolean = false;

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {
        this.uid = this.userService.getLoggedUserId();
        if (!this.uid) {
            this.authService.logout();
        }
        this.isAdmin = this.userService.isAdminLogged();
        this.isUploader = this.userService.isUploaderLogged();
    }

    public logout() {
        this.authService.logout();
    }
}
