import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-azureb2c-demo';

  constructor(private oauthService: OAuthService) {
    this.configureAuth();
  }

  private configureAuth(): void {
    this.oauthService.configure({
      issuer:
        'https://yuriburgerb2c.b2clogin.com/11775757-1a8d-431d-8202-531250b9f960/v2.0/',
      loginUrl:
        'https://yuriburgerb2c.b2clogin.com/yuriburgerb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_localaccountsignin',
      logoutUrl:
        'https://yuriburgerb2c.b2clogin.com/yuriburgerb2c.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_localaccountsignin',
      redirectUri: window.location.origin + '/index.html',
      clientId: '54653945-60d4-45fa-a4e9-c992c87eb1c5',
      scope: 'openid',
      requestAccessToken: false
    });

    this.oauthService.setStorage(sessionStorage);

    this.oauthService.tryLogin();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }
}
