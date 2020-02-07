import { Component, OnInit } from '@angular/core';
import { SensoresService } from '../../services/sensores.service';
import { Sensores } from '../../models/sensores';
import { Dth } from '../../models/dth';
import { Subject } from 'rxjs';
import { ActuadoresService } from 'src/app/services/actuadores.service';


@Component({
  selector: 'app-gestion-sensores',
  templateUrl: './gestion-sensores.component.html',
  styleUrls: ['./gestion-sensores.component.css']
})
export class GestionSensoresComponent implements OnInit {

  constructor(private sensorService:SensoresService,private actuadorService:ActuadoresService) { }
  
  ngOnInit() {

  }

  actualizarAlarma(e) {
    if(e.target.checked){
      this.actuadorService.setDataActuadores("alarma","on");
    }else{
      this.actuadorService.setDataActuadores("alarma","off");
    }
  }

  actualizarLuzDormitorio(e) {
    if(e.target.checked){
      this.actuadorService.setDataActuadores("lampara_dormitorio","on");
    }else{
      this.actuadorService.setDataActuadores("lampara_dormitorio","off");
    }
  }

  actualizarLuzSala(e) {
    if(e.target.checked){
      this.actuadorService.setDataActuadores("lampara_sala","on");
    }else{
      this.actuadorService.setDataActuadores("lampara_sala","off");
    }
  }

  actualizarLuzCocina(e) {
    if(e.target.checked){
      this.actuadorService.setDataActuadores("lampara_cocina","on");
    }else{
      this.actuadorService.setDataActuadores("lampara_cocina","off");
    }
  }

  actualizarLuzBanio(e) {
    if(e.target.checked){
      this.actuadorService.setDataActuadores("lampara_banio","on");
    }else{
      this.actuadorService.setDataActuadores("lampara_banio","off");
    }
  }


}
