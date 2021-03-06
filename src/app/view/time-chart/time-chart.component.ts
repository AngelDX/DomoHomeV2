import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { SensoresService } from '../../services/sensores.service';
import { Dth } from '../../models/dth';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {
  sensorList: Dth[];
  title = 'Grafico de Temperatura (°C)';
 
    private margin = {top: 10, right: 10, bottom: 30, left: 30};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;

  constructor(private sensorService:SensoresService) { 
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.getDatos();
  }

  getDatos(){
    this.sensorService.getDht().snapshotChanges().subscribe(item=>{
      this.sensorList=[];
      item.forEach(element=>{
        let x=element.payload.toJSON();
        x["$key"]=element.key;
        this.sensorList.push(x as Dth);
      });
      this.initSvg();
      this.initAxis(this.sensorList);
      this.drawAxis();
      this.drawLine(this.sensorList);
    });
	}
	
	private initSvg() {
    d3.select('#svg2').remove();
    this.svg = d3.select("#grafico2").append("svg").attr("id","svg2").style("width","100%").style("height","400px")
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis(data) {
      this.x = d3Scale.scaleTime().range([0, this.width]);
      this.y = d3Scale.scaleLinear().range([this.height, 0]);
      this.x.domain(d3Array.extent(data, (d:any) => d.timestamp ));
      this.y.domain(d3Array.extent(data, (d:any) => d.temperature ));
  }

  private drawAxis() {
    
      this.svg.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));

      this.svg.append('g')
          .attr('class', 'axis axis--y')
          .call(d3Axis.axisLeft(this.y))
          .append('text')
          .attr('class', 'axis-title')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Temperatura °C');
  }

  private drawLine(data) {
      this.line = d3Shape.line()
          .x( (d: any) => this.x(d.timestamp))
          .y( (d: any) => this.y(d.temperature));

      this.svg.append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', this.line);
  }
}
