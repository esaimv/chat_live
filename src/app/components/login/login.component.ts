import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(private schat:ChatService) { }

  login(proveedor:string){
    this.schat.login(proveedor)
  }

}
