import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Actuadores } from '../models/actuadores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActuadoresService {

  dataActuadores: Observable<any[]>;
  selectActuadores: Actuadores=new Actuadores();

  constructor(private firebase:AngularFireDatabase) { }

  getActudoresData(){
    return this.dataActuadores=this.firebase.list('actuadores').valueChanges();
  }

  setDataActuadores(actuador:string, estado:string){
    const itemRef = this.firebase.object('actuadores');
    if(actuador=="alarma"){
      return itemRef.update({ alarma : estado });
    }
    if(actuador=="lampara_dormitorio"){
      return itemRef.update({ lampara_dormitorio : estado });
    }
    if(actuador=="lampara_sala"){
      return itemRef.update({ lampara_sala : estado });
    }
    if(actuador=="lampara_cocina"){
      return itemRef.update({ lampara_cocina : estado });
    }
    if(actuador=="lampara_banio"){
      return itemRef.update({ lampara_banio : estado });
    }
  } 
}
