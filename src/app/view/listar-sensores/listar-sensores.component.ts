import { Component, OnInit } from '@angular/core';
import { SensoresService } from '../../services/sensores.service';
import { Dth } from '../../models/dth';
import { Subject } from 'rxjs';

import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'app-listar-sensores',
  templateUrl: './listar-sensores.component.html',
  styleUrls: ['./listar-sensores.component.css']
})
export class ListarSensoresComponent implements OnInit {
 
  dhtList: Dth[];
  total: number;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  excelList: Dth[];

  constructor(private sensorService:SensoresService, private excelService:ExcelService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true,
      retrieve: true
    };

    this.sensorService.getDht()
    .snapshotChanges().subscribe(item=>{
      this.dhtList=[];
      this.total=item.length;
      item.forEach(element=>{
        let x=element.payload.toJSON();
        x["$key"]=element.key;
          this.dhtList.push(x as Dth);
      });
      this.dtTrigger.next();
    });

    this.getSensoresTotal();
  }

  borrarTodo(){
    this.sensorService.delSensoresAll();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getSensoresTotal(){
    this.sensorService.getDht()
    .snapshotChanges().subscribe(item=>{
      this.total=item.length;
      this.excelList=[];
      item.forEach(element=>{
        let x=element.payload.toJSON();
        x["$key"]=element.key;
          this.excelList.push(x as Dth);
      });
    });
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excelList,'Registro Sensores (@AngelDX)');
  }
  
}
