import { Component, OnInit } from '@angular/core';
import { SensoresService } from '../../services/sensores.service';
import { ActuadoresService } from '../../services/actuadores.service';
import { Sensores } from '../../models/sensores';
import { Actuadores } from '../../models/actuadores';

@Component({
  selector: 'app-data-sensores',
  templateUrl: './data-sensores.component.html',
  styleUrls: ['./data-sensores.component.css']
})
export class DataSensoresComponent implements OnInit {

  dataSensores: Sensores[] = [];
  dataActuadores: Actuadores[] = [];

  constructor(private sensorService:SensoresService,private actuadorService:ActuadoresService) { }

  ngOnInit() {
    const dataSensores=this.sensorService.getSensoresData();
    dataSensores.subscribe((sData: Sensores[]) => {
      this.dataSensores = sData;
    });

    const dataActuadores=this.actuadorService.getActudoresData();
    dataActuadores.subscribe((sData: Actuadores[]) => {
      this.dataActuadores = sData;
    });
  }

}
