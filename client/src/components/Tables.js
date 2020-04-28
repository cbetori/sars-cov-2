import React, { useEffect, useState } from 'react'
import { Column, Table } from 'react-virtualized'

const Tables = (props) => {
	const [tableArray, tableArraySet] = useState([])
	const [tableWidth, tableWidthSet] = useState(window.innerWidth * 0.75)

	//Used to order table data by confirmations of cases
	function compare(a, b) {
		let aState = a.confirmed
		let bState = b.confirmed
		let comparison = 0
		if (aState > bState) {
			comparison = -1
		} else if (aState < bState) {
			comparison = 1
		}
		return comparison
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Create proper array
	//IF STATE AND PROVINENCE ARE CHOSEN
	const handleCountyTables = () => {
		let newArray = []
		for (let i = 0; i < props.state.tableData.length; i++) {
			let tempArray = []
			if (
				props.state.tableData[i].country === props.state.countryValue &&
				props.state.tableData[i].province === props.state.stateValue
			) {
				if (props.state.tableData[i].region.cities.length === 0) {
					tempArray.push(props.state.tableData[i])
				} else {
					tempArray = props.state.tableData[i].region.cities
				}
				tempArray.sort(compare)
				let result = tableDivCounty(tempArray, i)
				newArray.push(result)
			}
		}
		return newArray
	}

	//IF JUST STATE/PROVINENCE IS CHOSEN
	const handleStateTables = () => {
		let newArray = []
		for (let i = 0; i < props.state.stateList.length; i++) {
			let tempArray = []
			for (let x = 0; x < props.state.tableData.length; x++) {
				if (
					props.state.tableData[x].province ===
						props.state.stateList[i].province &&
					props.state.countryValue === props.state.stateList[i].country
				) {
					if (props.state.tableData[x].region.cities.length === 0) {
						tempArray.push(props.state.tableData[x])
					} else {
						tempArray = props.state.tableData[x].region.cities
					}
					tempArray.sort(compare)
					let result = tableDivState(tempArray, x)
					newArray.push(result)
				}
			}
		}
		return newArray
	}
	//IF NO STATE OR PROVINENCE ARE CHOSEN (GLOBAL VIEW)
	const handleCountryTables = () => {
		let newArray = []
		for (let i = 0; i < props.state.countryList.length; i++) {
			let tempArray = []
			for (let x = 0; x < props.state.tableData.length; x++) {
				if (props.state.tableData[x].country === props.state.countryList[i]) {
					tempArray.push(props.state.tableData[x])
				}
			}
			tempArray.sort(compare)
			let result = tableDivCountry(tempArray, i)
			newArray.push(result)
		}
		// tableArraySet(newArray)
		return newArray
		// createUniqueArray('country_region')
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Determine how to filter data
	const handleTables = () => {
		if (
			props.state.countryValue !== undefined &&
			props.state.stateValue !== undefined
		) {
			return handleCountyTables()
		} else if (
			props.state.countryValue !== undefined &&
			props.state.stateValue === undefined
		) {
			return handleStateTables()
		} else if (
			props.state.countryValue === undefined &&
			props.state.stateValue === undefined
		) {
			return handleCountryTables()
		}
	}

	//Cleans up numbers in table to add commas
	const formatNumber = (num) => {
		try {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		} catch {
			return num
		}
	}

	//The tables have different columns based on what filters are picked.
	const tableDivCountry = (array, key) => {
		let rowHeight = 30
		let tblHeight
		if (array.length === 1) {
			tblHeight = 80
		} else {
			tblHeight = 30
		}
		if (window.innerWidth < 600) {
			tblHeight = tblHeight / 1.5
			rowHeight = rowHeight / 1.5
		}
		try {
			return (
				<div key={key} className='tables-individual'>
					<Table
						className='tables-virtualized'
						width={tableWidth}
						header={'Country'}
						height={array.length * tblHeight}
						headerHeight={50}
						rowHeight={rowHeight}
						rowCount={array.length}
						rowGetter={({ index }) => array[index]}
					>
						<Column width={tableWidth / 5} label='Country' dataKey='country' />
						<Column
							width={tableWidth / 5}
							label='Province / State'
							dataKey='province'
						/>
						<Column
							width={tableWidth / 5}
							label='Confirmed'
							dataKey='confirmed'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
						<Column
							width={tableWidth / 5}
							label='Active'
							dataKey='active'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
						<Column
							width={tableWidth / 5}
							label='Deaths'
							dataKey='deaths'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
					</Table>
				</div>
			)
		} catch {}
	}

	const tableDivState = (array, key) => {
		let rowHeight = 30
		let tblHeight
		if (array.length === 1) {
			tblHeight = 80
		} else {
			tblHeight = 30
		}
		if (window.innerWidth < 600) {
			tblHeight = tblHeight / 1.5
			rowHeight = rowHeight / 1.5
		}
		try {
			return (
				<div key={key} className='tables-individual'>
					<Table
						className='tables-virtualized'
						width={tableWidth}
						header={'Country'}
						height={array.length * tblHeight}
						headerHeight={50}
						rowHeight={rowHeight}
						rowCount={array.length}
						rowGetter={({ index }) => array[index]}
					>
						<Column
							width={tableWidth / 5}
							label='Province / State'
							dataKey='province'
						/>
						<Column width={tableWidth / 6} label='County' dataKey='name' />
						<Column
							width={tableWidth / 5}
							label='Confirmed'
							dataKey='confirmed'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
						<Column
							width={tableWidth / 5}
							label='Deaths'
							dataKey='deaths'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
					</Table>
				</div>
			)
		} catch {}
	}

	const tableDivCounty = (array, key) => {
		let rowHeight = 30
		let tblHeight
		if (array.length === 1) {
			tblHeight = 80
		} else {
			tblHeight = 30
		}

		if (window.innerWidth < 600) {
			tblHeight = tblHeight / 1.5
			rowHeight = rowHeight / 1.5
		}
		try {
			return (
				<div key={key} className='tables-individual'>
					<Table
						className='tables-virtualized'
						width={tableWidth}
						header={'Country'}
						height={array.length * tblHeight}
						headerHeight={50}
						rowHeight={rowHeight}
						rowCount={array.length}
						rowGetter={({ index }) => array[index]}
					>
						<Column width={tableWidth / 4} label='County' dataKey='name' />
						<Column
							width={tableWidth / 4}
							label='Confirmed'
							dataKey='confirmed'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
						<Column
							width={tableWidth / 4}
							label='Deaths'
							dataKey='deaths'
							cellDataGetter={({ rowData, dataKey }) =>
								formatNumber(rowData[dataKey])
							}
						/>
					</Table>
				</div>
			)
		} catch {}
	}

	useEffect(() => {
		tableArraySet(handleTables())
	}, [props])

	window.addEventListener('resize', () => {
		tableWidthSet(window.innerWidth * 0.75)
	})

	return <div id='tables'>{tableArray}</div>
}

export default Tables
