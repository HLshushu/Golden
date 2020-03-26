import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-yahoo',
  templateUrl: './yahoo.component.html',
  styleUrls: ['./yahoo.component.css']
})
export class YahooComponent implements OnInit {

  constructor(private router : Router) {
    console.log(echarts)
  }
 
  ngOnInit() {
    this.initCharts();
    this.initBarCharts();
  }

  getInbox() {
    this.router.navigate(['/dashboard/inbox']);
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
                    data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
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

    initBarCharts() {
        const ec = echarts as any;
        let barChart = ec.init(document.getElementById('barChart'));
        let barChartOption ={
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
                        data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Volume',
                        type:'bar',
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
            barChart.setOption(barChartOption);    
    }

}
