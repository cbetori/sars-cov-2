import React from 'react'
import { Card, Statistic } from 'antd'

const Summary = (props) => {
	return (
		<div id='summary'>
			<Card id='summary-card'>
				<Statistic title='Total Cases' value={props.totals.totalCases} />
				<Statistic title='Total Recoverd' value={props.totals.totalRecovered} />
				<Statistic title='Total Deaths' value={props.totals.totalDeaths} />
			</Card>
		</div>
	)
}

export default Summary
