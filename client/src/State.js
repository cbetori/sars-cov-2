import React, { useEffect, useState } from 'react'
import { initialCountryList } from './countries'
import moment from 'moment'
import App from './App'

const State = () => {
	let y = moment().subtract(1, 'days').format('YYYY-MM-DD')

	const [dateValue, dateValueSet] = useState(y)
	const dataDefault = '/api/default'
	const dataCustomeDate = '/api/default/data=' + dateValue

	const [countryList, countryListSet] = useState(initialCountryList)
	const [stateList, stateListSet] = useState([])

	const [countryValue, countryValueSet] = useState()
	const [stateValue, stateValueSet] = useState()

	const [tableData, tableDataSet] = useState([])
	const [totalsData, totalsDataSet] = useState({})
	const [totals, totalsSet] = useState({})

	function compare(a, b) {
		let aState = a.province
		let bState = b.province
		let comparison = 0
		if (aState > bState) {
			comparison = 1
		} else if (aState < bState) {
			comparison = -1
		}
		return comparison
	}

	let handleProvinceList = (d) => {
		try {
			let result = d.map((e) => {
				if (e.region.province === '') {
					return { country: e.region.name, province: e.region.name }
				} else {
					return { country: e.region.name, province: e.region.province }
				}
			})
			let p = result.sort(compare)
			return p
		} catch {}
	}

	let defaultData = () => {
		let local = localStorage.getItem('storage')
		local = JSON.parse(local)
		try {
			if (local.data[0].date === dateValue) {
				console.log('Local values used for query')
				handleLocalData(local)
			} else {
				if (dateValue === y) {
					console.log('Default data query fired')
					handleFetch(dataDefault)
				} else {
					console.log('Custome data query fired')
					handleFetch(dataCustomeDate)
				}
			}
		} catch {
			console.log('Error caught: Default data query fired')
			handleFetch(dataDefault)
		}
	}

	let handleFetch = (url) => {
		fetch(url, {
			method: 'GET',
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data)
				if (data.data.data !== null) {
					let c = data.countries
					let p = handleProvinceList(data.data.data)
					handleTotals(data.totals)

					countryListSet(c)
					stateListSet(p)
					totalsDataSet(data.totals)
					tableDataSet(data.data.data)

					let storage = {
						country: c,
						province: p,
						totalData: data.totals,
						data: data.data.data,
					}
					localStorage.setItem('storage', JSON.stringify(storage))
					return data
				}
			})
	}

	let handleLocalData = (local) => {
		console.log(local)
		countryListSet(local.country)
		stateListSet(local.province)
		totalsDataSet(local.totalData)
		handleTotals(local.totalData)
		tableDataSet(local.data)
	}

	//d is tableData
	//Key can be "province" or "country"
	//Filter is either stateValue or countryValue
	let handleTotals = (d, c, s) => {
		try {
			let confirmed = 0
			let deaths = 0
			let recovered = 0
			if (c === undefined) {
				confirmed = d['All'].confirmed
				deaths = d['All'].deaths
				recovered = d['All'].recovered
			} else if (c !== undefined && s === undefined) {
				confirmed = d[c].confirmed
				deaths = d[c].deaths
				recovered = d[c].recovered
			} else {
				confirmed = d[c][s].confirmed
				deaths = d[c][s].deaths
				recovered = d[c][s].recovered
			}
			let t = {
				totalCases: confirmed,
				totalDeaths: deaths,
				totalRecovered: recovered,
			}
			totalsSet(t)
			return t
		} catch {}
	}

	const state = {
		options: {
			countryValue: countryValue,
			countryValueSet: countryValueSet,
			stateValue: stateValue,
			stateValueSet: stateValueSet,
			dateValue: dateValue,
			dateValueSet: dateValueSet,
			countryList: countryList,
			stateList: stateList,
		},
		tables: {
			tableData: tableData,
			countryValue: countryValue,
			countryList: countryList,
			stateValue: stateValue,
			stateList: stateList,
		},
		totals: totals,
	}

	useEffect(() => {
		defaultData()
	}, [dateValue])

	useEffect(() => {
		if (countryValue === undefined) {
			handleTotals(totalsData)
		} else {
			handleTotals(totalsData, countryValue)
		}
	}, [countryValue])

	useEffect(() => {
		if (stateValue === undefined) {
			handleTotals(totalsData, countryValue)
		} else {
			handleTotals(totalsData, countryValue, stateValue)
		}
	}, [stateValue])

	return <App state={state} />
}

export default State
