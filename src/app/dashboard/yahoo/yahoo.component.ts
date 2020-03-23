import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-yahoo',
  templateUrl: './yahoo.component.html',
  styleUrls: ['./yahoo.component.css']
})
export class YahooComponent implements OnInit {

  constructor() {
    console.log(echarts)
  }
 
  ngOnInit() {
    this.initCharts();
  }
 
  initCharts() {
    const ec = echarts as any;
    let lineChart = ec.init(document.getElementById('lineChart'));
    let lineChartOption ={
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false,
            },
            legend:{
                padding:0
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'New Contact',
                    type:'line',
                    smooth:true,
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#c8c8c8'
                            }
                        }
                    },
                    data:[10, 2, 5, 4, 6, 3, 7,2,2,3,6,7],
 
                },
                {
                    name:'Sales',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal : {
                            lineStyle:{
                                color:'#1ab394'
                            }
                        }
                    },
                    data:[3, 2, 4, 7, 0, 3, 1,3,4,1,2,3]
                },
                {
                    name:'Retained Profits',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal : {
                            lineStyle:{
                                color:'#ff713a'
                            }
                        }
                    },
                    data:[10, 2, 6, 3, 2, 9, 10,3,4,8,4,3]
                }
            ]
        };
        lineChart.setOption(lineChartOption);
    }

}
