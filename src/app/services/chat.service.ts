import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from "../interfaces/mensaje.interface";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  public chats:Mensaje[] = []
  public usuario:any = {}
  private itemDoc: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe( user => {
      if(!user){
        return
      }

      this.usuario.nombre = user.displayName
      this.usuario.uid = user.uid

    })

  }

  login(proveedor:string) {
    if(proveedor == 'google')
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if(proveedor == 'twitter')
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  logout() {
    this.usuario = {}
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){
    this.itemDoc = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5));
    return this.itemDoc.valueChanges()
      .map(res => {
        this.chats = []
        for( let mensaje of res){
          this.chats.unshift(mensaje)
        }
        return this.chats
      })
  }

  agregarMensaje( texto:string ){
    let mensaje:Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemDoc.add(mensaje)
  }

}
