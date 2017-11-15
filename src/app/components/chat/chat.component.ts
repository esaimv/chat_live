import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit{

  mensaje:string = ''
  bandenv:boolean = false
  elemento:any

  constructor(private schat:ChatService) {
    this.schat.cargarMensajes()
      .subscribe( () => {
        setTimeout(()=>{
          this.elemento.scrollTop = this.elemento.scrollHeight
        }, 200)
      })
  }

  enviar(){
    if( this.mensaje.length == 0){
      return
    }else{
      this.bandenv = true
      this.schat.agregarMensaje(this.mensaje)
        .then(()=>{
          this.mensaje = ''
          this.bandenv = false
        })
        .catch((error)=>{
          console.log('Error ' + error)
        })
    }
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes')
  }

}
