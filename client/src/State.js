import React, { useEffect, useState } from 'react'
import App from './App'
import dayjs from 'dayjs'
import './index.css'
import 'react-virtualized/styles.css'

console.log(API_URL)

const State = () => {
  //API with information from previous day. The newest information always exists for yesterday.
  let y = dayjs().subtract(1, 'days').format('YYYY-MM-DD')

  const [dateValue, dateValueSet] = useState(y)
  const dataDefault = API_URL + '/api/default'
  const dataCustomeDate = API_URL + '/api/default/data=' + dateValue

  const [countryList, countryListSet] = useState([])
  const [stateList, stateListSet] = useState([])

  const [countryValue, countryValueSet] = useState()
  const [stateValue, stateValueSet] = useState()

  const [tableData, tableDataSet] = useState([])
  const [totalsData, totalsDataSet] = useState({})
  const [totals, totalsSet] = useState({})

  //Use to order an array of objects, in this case its by state/province value
  //Updates stateList
  let compare = (a, b) => {
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

  //Creates an array that holds unique values of both province and country
  let handleProvinceList = d => {
    try {
      let result = d.map(e => {
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

  //Looks at localstorage. On error it does a fetch for the most current data
  //If localstoage has values and if dateValue === localStorage date then localStorage information is used
  //This fires only when the dateValue changes
  let defaultData = () => {
    let local = localStorage.getItem('storage')
    local = JSON.parse(local)
    try {
      if (local.data[0].date === dateValue) {
        handleLocalData(local)
      } else {
        if (dateValue === y) {
          handleFetch(dataDefault)
        } else {
          handleFetch(dataCustomeDate)
        }
      }
    } catch {
      handleFetch(dataDefault)
    }
  }

  //Handles actual fetch request. If they date = yesterday it will pull the newest possible information.
  //If dataValue !== yesterday than custome fetch by date is performed.
  //Data is stored in localStorage to speed up load for repeat vistors.
  let handleFetch = url => {
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.data.data !== null) {
          let c = data.countries
          let p = handleProvinceList(data.data.data)
          handleTotals(data.totals, countryValue, stateValue)
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
          console.log(data)
          return data
        }
      })
  }

  //Add all fetch request data to local storage.
  let handleLocalData = local => {
    countryListSet(local.country)
    stateListSet(local.province)
    totalsDataSet(local.totalData)
    handleTotals(local.totalData, countryValue, stateValue)
    tableDataSet(local.data)
  }

  //Handles all total values. Fired when dateValue, stateValue, or countryVaue changes
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

  //Holds makeshift state and can be used to pass down to children
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
