import React from 'react'

const Disclaimer = (props) => {
	return (
		<div id='disclaimer'>
			<div id='disclaimer-detail'>
				Disclaimer: I do not own nor do I maintain this data. To ensure you are
				getting the best information please look to authoritative sources.
			</div>
			<div id='disclaimer-links'>
				<div className='disclaimer-link-head'>Data source:</div>
				<a
					className='disclaimer-links-address'
					href='https://github.com/CSSEGISandData/COVID-19'
				>
					John Hopkins
				</a>
				<div className='disclaimer-link-head'>API Source:</div>
				<a
					className='disclaimer-links-address'
					href='https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/endpoints'
				>
					RapidAPI - Axisbits
				</a>
				<div id='disclaimer-authoritative'>
					<div className='disclaimer-link-head'>
						Additional Support on Sars-Cov-2:
					</div>
					<a
						className='disclaimer-links-address'
						href='                https://www.cdc.gov/coronavirus/2019-nCov/index.html'
					>
						CDC
					</a>
					,
					<a
						className='disclaimer-links-address'
						href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019'
					>
						WHO
					</a>
				</div>
			</div>
		</div>
	)
}

export default Disclaimer
