import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";


const options = {
    legend: {
        display: false,
    },
    elements: {
        point:{
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tootipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    
}

function LineGraph() {
    const [data, setData] = useState({});

    const buildChartData = (data, casesType = "cases") =>{
        const chartData = [];
        let lastDataPoint;
         for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        };
        return chartData;
    };

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            const chartData = buildChartData(data);
            setData(chartData);
        })
    }, [])



    return (
        <div>
            
            
        </div>
    )
}

export default LineGraph
