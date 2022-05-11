import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsync, selectData,} from './chartSlice';
import { Chart } from "react-google-charts";
import moment from 'moment'

export function ChartData() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    dispatch(fetchDataAsync(new Date(), new Date()))
  }, [dispatch])

  const chartData = data?.map((item) => (
    [moment(item.date).format('MMMM DD'), 
    item.totalPredictedJobsViews, 
    item.totalViews, 
    item.totalJobs]));

  const dataArray =   [
    ["Date", "Predicated job views", "Job views", "Active jobs" ],
    ...chartData
  ];
  
   const options = {
    title: "Cumulative job views vs. prediction",
    curveType: "function",
    seriesType: "bars",
    series: {
      0: { color: '#00BFFF' , type: "line", pointShape: "square" , pointSize: 15, lineDashStyle: [3,3,3,3]},
      1: { color: '#9ACD32' , type: "line" },
      2: { color: '#DCDCDC' },
    },
    legend: { position: "bottom" },
    pointsVisible: true,
    pointSize: 10,
  };

  return (
    <div>
      <Chart
      chartType="ComboChart"
      width="100%%"
      height="500px"
      data={dataArray}
      options={options} />
    </div>
  );
}
