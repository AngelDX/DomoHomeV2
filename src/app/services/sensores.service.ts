import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Dth } from '../models/dth';
import { Sensores } from '../models/sensores';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SensoresService {
  sensorList: AngularFireList<any>;
  dhtList: AngularFireList<Dth>;
  dataSensores: Observable<any[]>;


  constructor(private firebase:AngularFireDatabase) { }

  getSensores(){
    return this.sensorList=this.firebase.list('sensores');
  }

  getDht(){
    return this.dhtList=this.firebase.list('datasensor/dht');
  }

  getListaPag(numberItems, startKey?){
    
    if(startKey===undefined){
      //console.log(numberItems);
      this.dhtList=this.firebase.list('datasensor/dht',ref=>ref.limitToFirst(numberItems+1));
    }else{
      this.dhtList=this.firebase.list('datasensor/dht',ref=>ref
      .orderByKey()
      .startAt(startKey)
      .limitToFirst(numberItems+1));
    }
    return this.dhtList;
  }
  
  getSensoresData(){
    return this.dataSensores=this.firebase.list('sensores').valueChanges();
  }

  delSensoresAll(){
    const itemsRef = this.firebase.list('datasensor/dht');
    return itemsRef.remove();
  }
}
