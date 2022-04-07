import React, { useEffect, useState } from 'react'
import { Column, Table } from 'react-virtualized'

const COUNTRY_WITH_STATES = [
  'US',
  'Australia',
  'Austria',
  'Brazil',
  'Germany',
  'India',
  'Malaysia',
  'Mexico',
  'Micronesia',
  'Myanmar',
  'New Zealand',
  'Nigeria',
  'Palau',
  'South Sudan',
]

const Tables = props => {
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

  //IF JUST COUNTRY IS CHOSEN
  const handleStateTables = () => {
    let newArray = []
    let country = props.state.countryValue

    for (let x = 0; x < props.state.tableData.length; x++) {
      if (country === props.state.tableData[x].country) {
        newArray.push(props.state.tableData[x])
      }
    }

    newArray.sort(compare)
    let result = tableDivState(newArray, 1)
    newArray.push(result)
    return [result]
  }

  //IF JUST COUNTRY IS CHOSEN
  const handleUSStateTables = () => {
    let newArray = []
    for (let i = 0; i < props.state.stateList.length; i++) {
      let tempArray = []
      if (props.state.countryValue !== props.state.stateList[i].country)
        continue
      for (let x = 0; x < props.state.tableData.length; x++) {
        if (
          props.state.tableData[x].province ===
          props.state.stateList[i].province
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
      if (tempArray.length > 0) {
        let result = tableDivCountry(tempArray, i)
        newArray.push(result)
      }
    }
    // tableArraySet(newArray)
    return newArray
    // createUniqueArray('country_region')
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //Determine how to filter data
  const handleTables = () => {
    let country = props.state.countryValue
    let state = props.state.stateValue
    if (country !== undefined && state !== undefined) {
      return handleCountyTables()
    } else if (country !== undefined && state === undefined) {
      if (country === 'US') {
        return handleUSStateTables()
      }
      return handleStateTables()
    } else if (country === undefined && state === undefined) {
      return handleCountryTables()
    }
  }

  //Cleans up numbers in table to add commas
  const formatNumber = num => {
    try {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } catch {
      return num
    }
  }

  //The tables have different columns based on what filters are picked.
  const tableDivCountry = (array, key) => {
    let country = array[0].country
    let hasStates = COUNTRY_WITH_STATES.includes(country)
    let label = hasStates ? 'State' : 'Province'
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
        <div key={key} className='tables-individual-covid'>
          <Table
            className='tables-virtualized-covid'
            width={tableWidth}
            header={'Country'}
            height={array.length * tblHeight}
            headerHeight={50}
            rowHeight={rowHeight}
            rowCount={array.length}
            rowGetter={({ index }) => array[index]}>
            <Column width={tableWidth / 5} label='Country' dataKey='country' />
            <Column width={tableWidth / 5} label={label} dataKey='province' />
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
    let country = array[0].country
    let hasStates = COUNTRY_WITH_STATES.includes(country)
    let label = hasStates ? 'State' : 'Province'
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
        <div key={key} className='tables-individual-covid'>
          <Table
            className='tables-virtualized-covid'
            width={tableWidth}
            header={'Country'}
            height={array.length * tblHeight}
            headerHeight={50}
            rowHeight={rowHeight}
            rowCount={array.length}
            rowGetter={({ index }) => array[index]}>
            <Column width={tableWidth / 5} label={label} dataKey='province' />
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
        <div key={key} className='tables-individual-covid'>
          <Table
            className='tables-virtualized-covid'
            width={tableWidth}
            header={'Country'}
            height={array.length * tblHeight}
            headerHeight={50}
            rowHeight={rowHeight}
            rowCount={array.length}
            rowGetter={({ index }) => array[index]}>
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
    if (props.state.tableData.length > 0) {
      tableArraySet(handleTables())
    }
  }, [props.state.countryValue, props.state.stateValue, props.state.tableData])

  window.addEventListener('resize', () => {
    tableWidthSet(window.innerWidth * 0.75)
  })

  return <div id='tables-covid'>{tableArray}</div>
}

export default Tables
