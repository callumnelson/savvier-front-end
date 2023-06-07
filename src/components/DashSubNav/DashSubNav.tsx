// npm modules
import { useState } from 'react'

// css
import styles from './DashSubNav.module.css'

// service

// types
import { Chart } from '../../types/data'
interface DashSubNavProps {
  selectedChart: Chart;
  handleChartClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

// data
import { charts } from '../../data/charts'

const DashSubNav = (props: DashSubNavProps) => {
  const { selectedChart, handleChartClick } = props

  return (
    <div className={styles.container}>
      <div>
        <h3>Views</h3>
      </div>
      {charts.map( chart => (
        <div 
          key={chart.id}
          id={chart.id.toString()}
          className={selectedChart.name === chart.name ? styles.selected : styles.unselected}
          onClick={handleChartClick}
        >
          <h4>{chart.name}</h4>
          <p>{chart.type}</p>
        </div>
      ))}
    </div>
  )
}
 
export default DashSubNav