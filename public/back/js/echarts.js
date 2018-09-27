$(function(){
    //初始化echarts(第一个)
    var echarts1 = document.querySelector('.echarts1');    
    var myChart = echarts.init(echarts1);

    // 指定图表的配置项和数据
    var option = {
        //标题
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        //图例
        legend: {
            data:['人数']
        },
        //X轴item名称
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        //y轴,最好别动,根据数据自适应
        yAxis: {},

        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 1800, 2300, 1500, 2500]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //初始化echarts(第二个)
    var echarts2 = document.querySelector('.echarts2');    
    var myChart = echarts.init(echarts2);

    // 指定图表的配置项和数据
    var option = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '品牌数据',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:500, name:'耐克'},
                    {value:300, name:'阿迪'},
                    {value:800, name:'新百伦'},
                    {value:150, name:'李宁'},
                    {value:1200, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 50,
                        shadowOffsetX: 0,
                        shadowColor: '#abcdef'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});