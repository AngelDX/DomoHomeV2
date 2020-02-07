import { Component, OnInit } from '@angular/core';
import { SensoresService } from '../../services/sensores.service';
import { Sensores } from '../../models/sensores';
import { Actuadores } from '../../models/actuadores';
import { Dth } from '../../models/dth';
import { ActuadoresService } from 'src/app/services/actuadores.service';

@Component({
  selector: 'app-main-sensores',
  templateUrl: './main-sensores.component.html',
  styleUrls: ['./main-sensores.component.css']
})
export class MainSensoresComponent implements OnInit {
  sensorList: Sensores[];
  dhtList: Dth[];
  cont: number;

  dataSensores: Sensores[] = [];
  dataActuadores: Actuadores[] = [];

  constructor(private sensorService:SensoresService,private actuadoresService:ActuadoresService) {  
    const dataSensores=sensorService.getSensoresData();
    dataSensores.subscribe((sData: Sensores[]) => {
      this.dataSensores = sData;
    });

    const dataActuadores=actuadoresService.getActudoresData();
    dataActuadores.subscribe((sData: Actuadores[]) => {
      this.dataActuadores = sData;
    });
  }
  
  ngOnInit() {
    this.sensorService.getDht()
    .snapshotChanges().subscribe(item=>{
      this.dhtList=[];
      this.cont=0;
      item.forEach(element=>{
        let x=element.payload.toJSON();
        x["$key"]=element.key;
          this.dhtList.push(x as Dth);
          this.cont=this.cont + 1;
      });
    });
  }

}
