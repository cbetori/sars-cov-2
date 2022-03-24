"use strict";
(self["webpackChunksars_cov_2"] = self["webpackChunksars_cov_2"] || []).push([["src_State_js-webpack_sharing_consume_default_react-dom_react-dom"],{

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Disclaimer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Disclaimer */ "./src/components/Disclaimer.js");
/* harmony import */ var _components_Options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Options */ "./src/components/Options.js");
/* harmony import */ var _components_Summary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Summary */ "./src/components/Summary.js");
/* harmony import */ var _components_Tables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Tables */ "./src/components/Tables.js");






const App = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Disclaimer__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Options__WEBPACK_IMPORTED_MODULE_2__["default"], {
    state: props.state.options
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Summary__WEBPACK_IMPORTED_MODULE_3__["default"], {
    totals: props.state.totals
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Tables__WEBPACK_IMPORTED_MODULE_4__["default"], {
    state: props.state.tables
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/State.js":
/*!**********************!*\
  !*** ./src/State.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var react_virtualized_styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized/styles.css */ "./node_modules/react-virtualized/styles.css");






const State = () => {
  //API with information from previous day. The newest information always exists for yesterday.
  let y = dayjs__WEBPACK_IMPORTED_MODULE_2___default()().subtract(1, 'days').format('YYYY-MM-DD');
  const [dateValue, dateValueSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(y);
  const dataDefault = '/api/default';
  const dataCustomeDate = '/api/default/data=' + dateValue;
  const [countryList, countryListSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [stateList, stateListSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [countryValue, countryValueSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [stateValue, stateValueSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [tableData, tableDataSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [totalsData, totalsDataSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [totals, totalsSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}); //Use to order an array of objects, in this case its by state/province value
  //Updates stateList

  let compare = (a, b) => {
    let aState = a.province;
    let bState = b.province;
    let comparison = 0;

    if (aState > bState) {
      comparison = 1;
    } else if (aState < bState) {
      comparison = -1;
    }

    return comparison;
  }; //Creates an array that holds unique values of both province and country


  let handleProvinceList = d => {
    try {
      let result = d.map(e => {
        if (e.region.province === '') {
          return {
            country: e.region.name,
            province: e.region.name
          };
        } else {
          return {
            country: e.region.name,
            province: e.region.province
          };
        }
      });
      let p = result.sort(compare);
      return p;
    } catch {}
  }; //Looks at localstorage. On error it does a fetch for the most current data
  //If localstoage has values and if dateValue === localStorage date then localStorage information is used
  //This fires only when the dateValue changes


  let defaultData = () => {
    let local = localStorage.getItem('storage');
    local = JSON.parse(local);

    try {
      if (local.data[0].date === dateValue) {
        handleLocalData(local);
      } else {
        if (dateValue === y) {
          handleFetch(dataDefault);
        } else {
          handleFetch(dataCustomeDate);
        }
      }
    } catch {
      handleFetch(dataDefault);
    }
  }; //Handles actual fetch request. If they date = yesterday it will pull the newest possible information.
  //If dataValue !== yesterday than custome fetch by date is performed.
  //Data is stored in localStorage to speed up load for repeat vistors.


  let handleFetch = url => {
    fetch(url, {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.data.data !== null) {
        let c = data.countries;
        let p = handleProvinceList(data.data.data);
        handleTotals(data.totals, countryValue, stateValue);
        countryListSet(c);
        stateListSet(p);
        totalsDataSet(data.totals);
        tableDataSet(data.data.data);
        let storage = {
          country: c,
          province: p,
          totalData: data.totals,
          data: data.data.data
        };
        localStorage.setItem('storage', JSON.stringify(storage));
        console.log(data);
        return data;
      }
    });
  }; //Add all fetch request data to local storage.


  let handleLocalData = local => {
    countryListSet(local.country);
    stateListSet(local.province);
    totalsDataSet(local.totalData);
    handleTotals(local.totalData, countryValue, stateValue);
    tableDataSet(local.data);
  }; //Handles all total values. Fired when dateValue, stateValue, or countryVaue changes


  let handleTotals = (d, c, s) => {
    try {
      let confirmed = 0;
      let deaths = 0;
      let recovered = 0;

      if (c === undefined) {
        confirmed = d['All'].confirmed;
        deaths = d['All'].deaths;
        recovered = d['All'].recovered;
      } else if (c !== undefined && s === undefined) {
        confirmed = d[c].confirmed;
        deaths = d[c].deaths;
        recovered = d[c].recovered;
      } else {
        confirmed = d[c][s].confirmed;
        deaths = d[c][s].deaths;
        recovered = d[c][s].recovered;
      }

      let t = {
        totalCases: confirmed,
        totalDeaths: deaths,
        totalRecovered: recovered
      };
      totalsSet(t);
      return t;
    } catch {}
  }; //Holds makeshift state and can be used to pass down to children


  const state = {
    options: {
      countryValue: countryValue,
      countryValueSet: countryValueSet,
      stateValue: stateValue,
      stateValueSet: stateValueSet,
      dateValue: dateValue,
      dateValueSet: dateValueSet,
      countryList: countryList,
      stateList: stateList
    },
    tables: {
      tableData: tableData,
      countryValue: countryValue,
      countryList: countryList,
      stateValue: stateValue,
      stateList: stateList
    },
    totals: totals
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    defaultData();
  }, [dateValue]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (countryValue === undefined) {
      handleTotals(totalsData);
    } else {
      handleTotals(totalsData, countryValue);
    }
  }, [countryValue]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stateValue === undefined) {
      handleTotals(totalsData, countryValue);
    } else {
      handleTotals(totalsData, countryValue, stateValue);
    }
  }, [stateValue]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_1__["default"], {
    state: state
  });
};

/* harmony default export */ __webpack_exports__["default"] = (State);

/***/ }),

/***/ "./src/components/Disclaimer.js":
/*!**************************************!*\
  !*** ./src/components/Disclaimer.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Disclaimer = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "disclaimer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "disclaimer-detail"
  }, "Disclaimer: I do not own nor do I maintain this data. To ensure you are getting the best information please look to authoritative sources."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "disclaimer-links"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "disclaimer-link-head"
  }, "Data source:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "disclaimer-links-address",
    href: "https://github.com/CSSEGISandData/COVID-19"
  }, "John Hopkins"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "disclaimer-link-head"
  }, "API Source:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "disclaimer-links-address",
    href: "https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/endpoints"
  }, "RapidAPI - Axisbits"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "disclaimer-authoritative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "disclaimer-link-head"
  }, "Additional Support on Sars-Cov-2:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "disclaimer-links-address",
    href: "                https://www.cdc.gov/coronavirus/2019-nCov/index.html"
  }, "CDC"), ",", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "disclaimer-links-address",
    href: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
  }, "WHO"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Disclaimer);

/***/ }),

/***/ "./src/components/Options.js":
/*!***********************************!*\
  !*** ./src/components/Options.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_es_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/es/select */ "./node_modules/antd/es/select/index.js");
/* harmony import */ var antd_es_switch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/es/switch */ "./node_modules/antd/es/switch/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DatePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DatePicker */ "./src/components/DatePicker.tsx");






const Options = props => {
  const defaultProvinceValue = 'Select a state/province';
  const [provinceText, provinceTextSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultProvinceValue);
  const defaultCountryValue = 'Select a Country';
  const [countryText, countryTextSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultCountryValue); //Used to handle theme. Simply changes href of link component in index.html
  //There should be a better way of handle apart from fully reloading css

  let changeTheme = () => {
    let curValue = document.getElementById('theme').href;
    curValue = curValue.split('/')[3];

    if (curValue === 'antd.css') {
      document.getElementById('theme').href = 'antd.dark.css';
      document.getElementsByTagName('body')[0].style.setProperty('--scrolltrack', '#141414');
      document.getElementsByTagName('body')[0].style.setProperty('--border-color', '#303030');
    } else {
      document.getElementById('theme').href = 'antd.css';
      document.getElementsByTagName('body')[0].style.setProperty('--scrolltrack', 'white');
      document.getElementsByTagName('body')[0].style.setProperty('--border-color', '#f0f0f0');
    }
  };

  function onSearch() {}

  let countries = props.state.countryList.map((e, i) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_select__WEBPACK_IMPORTED_MODULE_3__["default"].Option, {
      key: i,
      value: e
    }, e);
  });
  let states = props.state.stateList.map((e, i) => {
    let result = [];

    if (e.country === props.state.countryValue) {
      result.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_select__WEBPACK_IMPORTED_MODULE_3__["default"].Option, {
        key: i,
        value: e.province
      }, e.province));
    }

    return result;
  });

  let handleDateChange = (e, s) => {
    let y = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(s).format('YYYY-MM-DD');
    props.state.dateValueSet(y);
  };

  let changeCountryStateValue = (e, type) => {
    if (type === 'country') {
      if (e === 'All') {
        props.state.stateValueSet(undefined);
        props.state.countryValueSet(undefined);
        countryTextSet(defaultCountryValue);
        provinceTextSet(defaultProvinceValue);
      } else {
        props.state.countryValueSet(e);
        countryTextSet(e);
        props.state.stateValueSet(undefined);
        provinceTextSet(defaultProvinceValue);
      }
    } else {
      if (e === 'All') {
        props.state.stateValueSet(undefined);
        provinceTextSet(defaultProvinceValue);
      } else {
        props.state.stateValueSet(e);
        provinceTextSet(e);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "options"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "options-theme"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_switch__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onChange: () => changeTheme()
  }), "Light/Dark"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_DatePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    theme: "dark",
    picker: "date",
    defaultValue: dayjs__WEBPACK_IMPORTED_MODULE_1___default()(props.state.dateValue, 'YYYY-MM-DD'),
    onChange: (e, s) => handleDateChange(e, s),
    format: 'YYYY-MM-DD',
    className: "options-inputs"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
    showSearch: true,
    optionFilterProp: "children",
    onSearch: onSearch,
    value: countryText,
    className: "options-inputs",
    onChange: e => changeCountryStateValue(e, 'country')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_select__WEBPACK_IMPORTED_MODULE_3__["default"].Option, {
    value: 'All'
  }, "All"), countries), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_select__WEBPACK_IMPORTED_MODULE_3__["default"], {
    showSearch: true,
    optionFilterProp: "children",
    onSearch: onSearch,
    value: provinceText,
    className: "options-inputs",
    onChange: e => changeCountryStateValue(e, 'state')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_select__WEBPACK_IMPORTED_MODULE_3__["default"].Option, {
    value: 'All'
  }, "All"), states));
};

/* harmony default export */ __webpack_exports__["default"] = (Options);

/***/ }),

/***/ "./src/components/Summary.js":
/*!***********************************!*\
  !*** ./src/components/Summary.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/card/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/statistic/index.js");



const Summary = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "summary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: "summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Total Cases",
    value: props.totals.totalCases
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Total Recoverd",
    value: props.totals.totalRecovered
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Total Deaths",
    value: props.totals.totalDeaths
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Summary);

/***/ }),

/***/ "./src/components/Tables.js":
/*!**********************************!*\
  !*** ./src/components/Tables.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-virtualized */ "./node_modules/react-virtualized/dist/es/index.js");



const Tables = props => {
  const [tableArray, tableArraySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [tableWidth, tableWidthSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerWidth * 0.75); //Used to order table data by confirmations of cases

  function compare(a, b) {
    let aState = a.confirmed;
    let bState = b.confirmed;
    let comparison = 0;

    if (aState > bState) {
      comparison = -1;
    } else if (aState < bState) {
      comparison = 1;
    }

    return comparison;
  } /////////////////////////////////////////////////////////////////////////////////////////////////////
  //Create proper array
  //IF STATE AND PROVINENCE ARE CHOSEN


  const handleCountyTables = () => {
    let newArray = [];

    for (let i = 0; i < props.state.tableData.length; i++) {
      let tempArray = [];

      if (props.state.tableData[i].country === props.state.countryValue && props.state.tableData[i].province === props.state.stateValue) {
        if (props.state.tableData[i].region.cities.length === 0) {
          tempArray.push(props.state.tableData[i]);
        } else {
          tempArray = props.state.tableData[i].region.cities;
        }

        tempArray.sort(compare);
        let result = tableDivCounty(tempArray, i);
        newArray.push(result);
      }
    }

    return newArray;
  }; //IF JUST STATE/PROVINENCE IS CHOSEN


  const handleStateTables = () => {
    let newArray = [];

    for (let i = 0; i < props.state.stateList.length; i++) {
      let tempArray = [];

      for (let x = 0; x < props.state.tableData.length; x++) {
        if (props.state.tableData[x].province === props.state.stateList[i].province && props.state.countryValue === props.state.stateList[i].country) {
          if (props.state.tableData[x].region.cities.length === 0) {
            tempArray.push(props.state.tableData[x]);
          } else {
            tempArray = props.state.tableData[x].region.cities;
          }

          tempArray.sort(compare);
          let result = tableDivState(tempArray, x);
          newArray.push(result);
        }
      }
    }

    return newArray;
  }; //IF NO STATE OR PROVINENCE ARE CHOSEN (GLOBAL VIEW)


  const handleCountryTables = () => {
    let newArray = [];

    for (let i = 0; i < props.state.countryList.length; i++) {
      let tempArray = [];

      for (let x = 0; x < props.state.tableData.length; x++) {
        if (props.state.tableData[x].country === props.state.countryList[i]) {
          tempArray.push(props.state.tableData[x]);
        }
      }

      tempArray.sort(compare);
      let result = tableDivCountry(tempArray, i);
      newArray.push(result);
    } // tableArraySet(newArray)


    return newArray; // createUniqueArray('country_region')
  }; /////////////////////////////////////////////////////////////////////////////////////////////////////
  //Determine how to filter data


  const handleTables = () => {
    if (props.state.countryValue !== undefined && props.state.stateValue !== undefined) {
      return handleCountyTables();
    } else if (props.state.countryValue !== undefined && props.state.stateValue === undefined) {
      return handleStateTables();
    } else if (props.state.countryValue === undefined && props.state.stateValue === undefined) {
      return handleCountryTables();
    }
  }; //Cleans up numbers in table to add commas


  const formatNumber = num => {
    try {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } catch {
      return num;
    }
  }; //The tables have different columns based on what filters are picked.


  const tableDivCountry = (array, key) => {
    let rowHeight = 30;
    let tblHeight;

    if (array.length === 1) {
      tblHeight = 80;
    } else {
      tblHeight = 30;
    }

    if (window.innerWidth < 600) {
      tblHeight = tblHeight / 1.5;
      rowHeight = rowHeight / 1.5;
    }

    try {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: key,
        className: "tables-individual"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Table, {
        className: "tables-virtualized",
        width: tableWidth,
        header: 'Country',
        height: array.length * tblHeight,
        headerHeight: 50,
        rowHeight: rowHeight,
        rowCount: array.length,
        rowGetter: ({
          index
        }) => array[index]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Country",
        dataKey: "country"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Province / State",
        dataKey: "province"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Confirmed",
        dataKey: "confirmed",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Active",
        dataKey: "active",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Deaths",
        dataKey: "deaths",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      })));
    } catch {}
  };

  const tableDivState = (array, key) => {
    let rowHeight = 30;
    let tblHeight;

    if (array.length === 1) {
      tblHeight = 80;
    } else {
      tblHeight = 30;
    }

    if (window.innerWidth < 600) {
      tblHeight = tblHeight / 1.5;
      rowHeight = rowHeight / 1.5;
    }

    try {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: key,
        className: "tables-individual"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Table, {
        className: "tables-virtualized",
        width: tableWidth,
        header: 'Country',
        height: array.length * tblHeight,
        headerHeight: 50,
        rowHeight: rowHeight,
        rowCount: array.length,
        rowGetter: ({
          index
        }) => array[index]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Province / State",
        dataKey: "province"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 6,
        label: "County",
        dataKey: "name"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Confirmed",
        dataKey: "confirmed",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 5,
        label: "Deaths",
        dataKey: "deaths",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      })));
    } catch {}
  };

  const tableDivCounty = (array, key) => {
    let rowHeight = 30;
    let tblHeight;

    if (array.length === 1) {
      tblHeight = 80;
    } else {
      tblHeight = 30;
    }

    if (window.innerWidth < 600) {
      tblHeight = tblHeight / 1.5;
      rowHeight = rowHeight / 1.5;
    }

    try {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        key: key,
        className: "tables-individual"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Table, {
        className: "tables-virtualized",
        width: tableWidth,
        header: 'Country',
        height: array.length * tblHeight,
        headerHeight: 50,
        rowHeight: rowHeight,
        rowCount: array.length,
        rowGetter: ({
          index
        }) => array[index]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 4,
        label: "County",
        dataKey: "name"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 4,
        label: "Confirmed",
        dataKey: "confirmed",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_1__.Column, {
        width: tableWidth / 4,
        label: "Deaths",
        dataKey: "deaths",
        cellDataGetter: ({
          rowData,
          dataKey
        }) => formatNumber(rowData[dataKey])
      })));
    } catch {}
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    tableArraySet(handleTables());
  }, [props]);
  window.addEventListener('resize', () => {
    tableWidthSet(window.innerWidth * 0.75);
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "tables"
  }, tableArray);
};

/* harmony default export */ __webpack_exports__["default"] = (Tables);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./src/index.css":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./src/index.css ***!
  \********************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  overflow-x: hidden;\n}\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  --scrolltrack: white;\n  --border-color: #f0f0f0;\n  overflow-x: hidden;\n}\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;\n}\n#disclaimer {\n  width: 100%;\n  background-color: #fade3c;\n  font-weight: 600;\n  font-size: 1.5vmin;\n}\n#disclaimer-detail {\n  margin-left: 10px;\n}\n#disclaimer-links {\n  display: flex;\n}\n#disclaimer-authoritative {\n  display: flex;\n}\n.disclaimer-link-head {\n  margin-left: 10px;\n}\n.disclaimer-links-address {\n  margin-left: 5px;\n  color: inherit;\n  text-decoration: underline;\n}\n#options {\n  font-size: 1.1vmin;\n  width: 100%;\n  height: 100px;\n  display: inline-flex;\n  position: sticky;\n  top: 0;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  align-items: center;\n  z-index: 10;\n  background-color: var(--scrolltrack);\n}\n#options-theme {\n  display: inline-flex;\n  flex-direction: column;\n}\n.options-inputs {\n  width: 200px;\n}\n#summary {\n  display: flex;\n  justify-content: center;\n}\n#summary-card {\n  width: 75%;\n  display: flex;\n  justify-content: center;\n}\n/* Ant-Card styling for totals summary */\n/* .ant-statistic-content-value-int {\n\tfont-size: 100%;\n} */\n.ant-statistic-title {\n  /* font-size: 1.7vmin; */\n}\n#tables {\n  width: 85%;\n  margin-left: auto;\n  margin-right: auto;\n}\n.tables-header {\n  font-size: 20px;\n  font-weight: bold;\n  margin-bottom: 10px;\n  border: 1px solid var(--border-color);\n}\n.tables-individual {\n  height: auto;\n  margin-top: 20px;\n  background-color: var(--scrolltrack);\n  border: 1px solid var(--border-color);\n  margin-bottom: 20px;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 10px;\n  border-radius: 3px;\n}\n.ReactVirtualized__Grid::-webkit-scrollbar,\n.ReactVirtualized__Table__Grid::-webkit-scrollbar,\n.ReactVirtualized__Table__row::-webkit-scrollbar {\n  background-color: var(--scrolltrack);\n}\n.ReactVirtualized__Grid::-webkit-scrollbar-thumb,\n.ReactVirtualized__Table__Grid::-webkit-scrollbar-thumb,\n.ReactVirtualized__Table__row::-webkit-scrollbar-thumb {\n  background-color: grey;\n}\n.ReactVirtualized__Table__row,\n.ReactVirtualized__Table__row {\n  width: 100% !important;\n  justify-content: space-evenly;\n}\n.ReactVirtualized__Grid__innerScrollContainer,\n.ReactVirtualized__Grid,\n.ReactVirtualized__Table__Grid,\n.ReactVirtualized__Table__headerRow {\n  width: inherit !important;\n  max-width: inherit !important;\n}\n.ReactVirtualized__Table__headerRow {\n  padding-right: 25px !important;\n}\n.ReactVirtualized__Table,\n.ReactVirtualized__Grid {\n  max-height: 500px !important;\n}\n.ReactVirtualized__Table__Grid {\n  max-height: 440px !important;\n  min-height: 30px !important;\n}\n.ReactVirtualized__Table__headerColumn {\n  display: flex;\n  align-items: center;\n  height: 40px;\n  font-size: 1.7vmin;\n}\n.ReactVirtualized__Table__headerRow {\n  border: 1px solid var(--border-color);\n  margin-bottom: 10px;\n  border-radius: 3px;\n  justify-content: space-evenly;\n}\n.ReactVirtualized__Table__headerTruncatedText {\n  overflow: auto !important;\n  overflow-wrap: break-word !important;\n  word-wrap: break-word !important;\n  white-space: pre-line !important;\n}\n.ReactVirtualized__Table__rowColumn {\n  height: inherit;\n  font-size: 1.7vmin;\n}\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;EACC,kBAAA;AACD;AAEA;EACC,SAAA;EACA,8JAAA;EAGA,mCAAA;EACA,kCAAA;EACA,oBAAA;EACA,uBAAA;EACA,kBAAA;AAFD;AAKA;EACC,+EAAA;AAHD;AAOA;EACC,WAAA;EACA,yBAAA;EACA,gBAAA;EACA,kBAAA;AALD;AAQA;EACC,iBAAA;AAND;AASA;EACC,aAAA;AAPD;AAUA;EACC,aAAA;AARD;AAWA;EACC,iBAAA;AATD;AAYA;EACC,gBAAA;EACA,cAAA;EACA,0BAAA;AAVD;AAaA;EACC,kBAAA;EACA,WAAA;EACA,aAAA;EACA,oBAAA;EACA,gBAAA;EACA,MAAA;EACA,6BAAA;EACA,eAAA;EACA,mBAAA;EAEA,WAAA;EACA,oCAAA;AAZD;AAeA;EACC,oBAAA;EACA,sBAAA;AAbD;AAgBA;EACC,YAAA;AAdD;AAiBA;EACC,aAAA;EACA,uBAAA;AAfD;AAkBA;EACC,UAAA;EACA,aAAA;EACA,uBAAA;AAhBD;AACA,wCAAwC;AACxC;;GAEG;AAoBH;EAlBE,wBAAwB;AAC1B;AAqBA;EACC,UAAA;EACA,iBAAA;EACA,kBAAA;AAnBD;AAsBA;EACC,eAAA;EACA,iBAAA;EACA,mBAAA;EACA,qCAAA;AApBD;AAuBA;EACC,YAAA;EACA,gBAAA;EACA,oCAAA;EACA,qCAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,aAAA;EACA,kBAAA;AArBD;AAwBA;;;EAGC,oCAAA;AAtBD;AAyBA;;;EAGC,sBAAA;AAvBD;AA0BA;;EAEC,sBAAA;EACA,6BAAA;AAxBD;AA0BA;;;;EAIC,yBAAA;EACA,6BAAA;AAxBD;AA2BA;EACC,8BAAA;AAzBD;AA4BA;;EAEC,4BAAA;AA1BD;AA6BA;EACC,4BAAA;EACA,2BAAA;AA3BD;AA8BA;EACC,aAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;AA5BD;AA+BA;EACC,qCAAA;EACA,mBAAA;EACA,kBAAA;EACA,6BAAA;AA7BD;AA+BA;EACC,yBAAA;EACA,oCAAA;EACA,gCAAA;EACA,gCAAA;AA7BD;AAgCA;EACC,eAAA;EACA,kBAAA;AA9BD","sourcesContent":["html {\n\toverflow-x: hidden;\n}\n\nbody {\n\tmargin: 0;\n\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n\t\t'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n\t\tsans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\t--scrolltrack: white;\n\t--border-color: #f0f0f0;\n\toverflow-x: hidden;\n}\n\ncode {\n\tfont-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n\t\tmonospace;\n}\n\n#disclaimer {\n\twidth: 100%;\n\tbackground-color: rgb(250, 222, 60, 0.9);\n\tfont-weight: 600;\n\tfont-size: 1.5vmin;\n}\n\n#disclaimer-detail {\n\tmargin-left: 10px;\n}\n\n#disclaimer-links {\n\tdisplay: flex;\n}\n\n#disclaimer-authoritative {\n\tdisplay: flex;\n}\n\n.disclaimer-link-head {\n\tmargin-left: 10px;\n}\n\n.disclaimer-links-address {\n\tmargin-left: 5px;\n\tcolor: inherit;\n\ttext-decoration: underline;\n}\n\n#options {\n\tfont-size: 1.1vmin;\n\twidth: 100%;\n\theight: 100px;\n\tdisplay: inline-flex;\n\tposition: sticky;\n\ttop: 0;\n\tjustify-content: space-around;\n\tflex-wrap: wrap;\n\talign-items: center;\n\n\tz-index: 10;\n\tbackground-color: var(--scrolltrack);\n}\n\n#options-theme {\n\tdisplay: inline-flex;\n\tflex-direction: column;\n}\n\n.options-inputs {\n\twidth: 200px;\n}\n\n#summary {\n\tdisplay: flex;\n\tjustify-content: center;\n}\n\n#summary-card {\n\twidth: 75%;\n\tdisplay: flex;\n\tjustify-content: center;\n}\n\n/* Ant-Card styling for totals summary */\n/* .ant-statistic-content-value-int {\n\tfont-size: 100%;\n} */\n\n.ant-statistic-title {\n\t/* font-size: 1.7vmin; */\n}\n\n#tables {\n\twidth: 85%;\n\tmargin-left: auto;\n\tmargin-right: auto;\n}\n\n.tables-header {\n\tfont-size: 20px;\n\tfont-weight: bold;\n\tmargin-bottom: 10px;\n\tborder: 1px solid var(--border-color);\n}\n\n.tables-individual {\n\theight: auto;\n\tmargin-top: 20px;\n\tbackground-color: var(--scrolltrack);\n\tborder: 1px solid var(--border-color);\n\tmargin-bottom: 20px;\n\tmargin-left: auto;\n\tmargin-right: auto;\n\tpadding: 10px;\n\tborder-radius: 3px;\n}\n\n.ReactVirtualized__Grid::-webkit-scrollbar,\n.ReactVirtualized__Table__Grid::-webkit-scrollbar,\n.ReactVirtualized__Table__row::-webkit-scrollbar {\n\tbackground-color: var(--scrolltrack);\n}\n\n.ReactVirtualized__Grid::-webkit-scrollbar-thumb,\n.ReactVirtualized__Table__Grid::-webkit-scrollbar-thumb,\n.ReactVirtualized__Table__row::-webkit-scrollbar-thumb {\n\tbackground-color: grey;\n}\n\n.ReactVirtualized__Table__row,\n.ReactVirtualized__Table__row {\n\twidth: 100% !important;\n\tjustify-content: space-evenly;\n}\n.ReactVirtualized__Grid__innerScrollContainer,\n.ReactVirtualized__Grid,\n.ReactVirtualized__Table__Grid,\n.ReactVirtualized__Table__headerRow {\n\twidth: inherit !important;\n\tmax-width: inherit !important;\n}\n\n.ReactVirtualized__Table__headerRow {\n\tpadding-right: 25px !important;\n}\n\n.ReactVirtualized__Table,\n.ReactVirtualized__Grid {\n\tmax-height: 500px !important;\n}\n\n.ReactVirtualized__Table__Grid {\n\tmax-height: 440px !important;\n\tmin-height: 30px !important;\n}\n\n.ReactVirtualized__Table__headerColumn {\n\tdisplay: flex;\n\talign-items: center;\n\theight: 40px;\n\tfont-size: 1.7vmin;\n}\n\n.ReactVirtualized__Table__headerRow {\n\tborder: 1px solid var(--border-color);\n\tmargin-bottom: 10px;\n\tborder-radius: 3px;\n\tjustify-content: space-evenly;\n}\n.ReactVirtualized__Table__headerTruncatedText {\n\toverflow: auto !important;\n\toverflow-wrap: break-word !important;\n\tword-wrap: break-word !important;\n\twhite-space: pre-line !important;\n}\n\n.ReactVirtualized__Table__rowColumn {\n\theight: inherit;\n\tfont-size: 1.7vmin;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ruleSet_1_rules_3_use_2_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/DatePicker.tsx":
/*!***************************************!*\
  !*** ./src/components/DatePicker.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rc_picker_lib_generate_dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rc-picker/lib/generate/dayjs */ "./node_modules/rc-picker/lib/generate/dayjs.js");
/* harmony import */ var antd_es_date_picker_generatePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/es/date-picker/generatePicker */ "./node_modules/antd/es/date-picker/generatePicker/index.js");
/* harmony import */ var antd_es_date_picker_style_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/es/date-picker/style/index */ "./node_modules/antd/es/date-picker/style/index.js");
//This is required by Antd to avoid moment which was adding to bundle size.



var DatePicker = (0,antd_es_date_picker_generatePicker__WEBPACK_IMPORTED_MODULE_2__["default"])(rc_picker_lib_generate_dayjs__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (DatePicker);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX1N0YXRlX2pzLXdlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QtZG9tX3JlYWN0LWRvbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNSyxHQUFHLEdBQUlDLEtBQUQsSUFBVztBQUN0QixzQkFDQyxxRkFDQywyREFBQyw4REFBRCxPQURELGVBRUMsMkRBQUMsMkRBQUQ7QUFBUyxTQUFLLEVBQUVBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQztBQUE1QixJQUZELGVBR0MsMkRBQUMsMkRBQUQ7QUFBUyxVQUFNLEVBQUVGLEtBQUssQ0FBQ0MsS0FBTixDQUFZRTtBQUE3QixJQUhELGVBSUMsMkRBQUMsMERBQUQ7QUFBUSxTQUFLLEVBQUVILEtBQUssQ0FBQ0MsS0FBTixDQUFZRztBQUEzQixJQUpELENBREQ7QUFRQSxDQVREOztBQVdBLCtEQUFlTCxHQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNUyxLQUFLLEdBQUcsTUFBTTtBQUNsQjtBQUNBLE1BQUlDLENBQUMsR0FBR0YsNENBQUssR0FBR0csUUFBUixDQUFpQixDQUFqQixFQUFvQixNQUFwQixFQUE0QkMsTUFBNUIsQ0FBbUMsWUFBbkMsQ0FBUjtBQUVBLFFBQU0sQ0FBQ0MsU0FBRCxFQUFZQyxZQUFaLElBQTRCUCwrQ0FBUSxDQUFDRyxDQUFELENBQTFDO0FBQ0EsUUFBTUssV0FBVyxHQUFHLGNBQXBCO0FBQ0EsUUFBTUMsZUFBZSxHQUFHLHVCQUF1QkgsU0FBL0M7QUFFQSxRQUFNLENBQUNJLFdBQUQsRUFBY0MsY0FBZCxJQUFnQ1gsK0NBQVEsQ0FBQyxFQUFELENBQTlDO0FBQ0EsUUFBTSxDQUFDWSxTQUFELEVBQVlDLFlBQVosSUFBNEJiLCtDQUFRLENBQUMsRUFBRCxDQUExQztBQUVBLFFBQU0sQ0FBQ2MsWUFBRCxFQUFlQyxlQUFmLElBQWtDZiwrQ0FB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OztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLG1KQUFPOzs7O0FBSWlIO0FBQ3pJLE9BQU8sK0RBQWUsbUpBQU8sSUFBSSwwSkFBYyxHQUFHLDBKQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUI3RSwyRUFBMkU7QUFHYjtBQUNDO0FBQ3ZCO0FBRXhDLElBQU0sVUFBVSxHQUFHLDhFQUFjLENBQVEsb0VBQW1CLENBQUM7QUFFN0QsK0RBQWUsVUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvQXBwLmpzIiwid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvU3RhdGUuanMiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9jb21wb25lbnRzL0Rpc2NsYWltZXIuanMiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9jb21wb25lbnRzL09wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9jb21wb25lbnRzL1N1bW1hcnkuanMiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9jb21wb25lbnRzL1RhYmxlcy5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2luZGV4LmNzcz9hNjRmIiwid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvY29tcG9uZW50cy9EYXRlUGlja2VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgRGlzY2xhaW1lciBmcm9tICcuL2NvbXBvbmVudHMvRGlzY2xhaW1lcidcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vY29tcG9uZW50cy9PcHRpb25zJ1xuaW1wb3J0IFN1bW1hcnkgZnJvbSAnLi9jb21wb25lbnRzL1N1bW1hcnknXG5pbXBvcnQgVGFibGVzIGZyb20gJy4vY29tcG9uZW50cy9UYWJsZXMnXG5cbmNvbnN0IEFwcCA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8RGlzY2xhaW1lciAvPlxuXHRcdFx0PE9wdGlvbnMgc3RhdGU9e3Byb3BzLnN0YXRlLm9wdGlvbnN9IC8+XG5cdFx0XHQ8U3VtbWFyeSB0b3RhbHM9e3Byb3BzLnN0YXRlLnRvdGFsc30gLz5cblx0XHRcdDxUYWJsZXMgc3RhdGU9e3Byb3BzLnN0YXRlLnRhYmxlc30gLz5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0ICcuL2luZGV4LmNzcydcbmltcG9ydCAncmVhY3QtdmlydHVhbGl6ZWQvc3R5bGVzLmNzcydcblxuY29uc3QgU3RhdGUgPSAoKSA9PiB7XG4gIC8vQVBJIHdpdGggaW5mb3JtYXRpb24gZnJvbSBwcmV2aW91cyBkYXkuIFRoZSBuZXdlc3QgaW5mb3JtYXRpb24gYWx3YXlzIGV4aXN0cyBmb3IgeWVzdGVyZGF5LlxuICBsZXQgeSA9IGRheWpzKCkuc3VidHJhY3QoMSwgJ2RheXMnKS5mb3JtYXQoJ1lZWVktTU0tREQnKVxuXG4gIGNvbnN0IFtkYXRlVmFsdWUsIGRhdGVWYWx1ZVNldF0gPSB1c2VTdGF0ZSh5KVxuICBjb25zdCBkYXRhRGVmYXVsdCA9ICcvYXBpL2RlZmF1bHQnXG4gIGNvbnN0IGRhdGFDdXN0b21lRGF0ZSA9ICcvYXBpL2RlZmF1bHQvZGF0YT0nICsgZGF0ZVZhbHVlXG5cbiAgY29uc3QgW2NvdW50cnlMaXN0LCBjb3VudHJ5TGlzdFNldF0gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgW3N0YXRlTGlzdCwgc3RhdGVMaXN0U2V0XSA9IHVzZVN0YXRlKFtdKVxuXG4gIGNvbnN0IFtjb3VudHJ5VmFsdWUsIGNvdW50cnlWYWx1ZVNldF0gPSB1c2VTdGF0ZSgpXG4gIGNvbnN0IFtzdGF0ZVZhbHVlLCBzdGF0ZVZhbHVlU2V0XSA9IHVzZVN0YXRlKClcblxuICBjb25zdCBbdGFibGVEYXRhLCB0YWJsZURhdGFTZXRdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFt0b3RhbHNEYXRhLCB0b3RhbHNEYXRhU2V0XSA9IHVzZVN0YXRlKHt9KVxuICBjb25zdCBbdG90YWxzLCB0b3RhbHNTZXRdID0gdXNlU3RhdGUoe30pXG5cbiAgLy9Vc2UgdG8gb3JkZXIgYW4gYXJyYXkgb2Ygb2JqZWN0cywgaW4gdGhpcyBjYXNlIGl0cyBieSBzdGF0ZS9wcm92aW5jZSB2YWx1ZVxuICAvL1VwZGF0ZXMgc3RhdGVMaXN0XG4gIGxldCBjb21wYXJlID0gKGEsIGIpID0+IHtcbiAgICBsZXQgYVN0YXRlID0gYS5wcm92aW5jZVxuICAgIGxldCBiU3RhdGUgPSBiLnByb3ZpbmNlXG4gICAgbGV0IGNvbXBhcmlzb24gPSAwXG4gICAgaWYgKGFTdGF0ZSA+IGJTdGF0ZSkge1xuICAgICAgY29tcGFyaXNvbiA9IDFcbiAgICB9IGVsc2UgaWYgKGFTdGF0ZSA8IGJTdGF0ZSkge1xuICAgICAgY29tcGFyaXNvbiA9IC0xXG4gICAgfVxuICAgIHJldHVybiBjb21wYXJpc29uXG4gIH1cblxuICAvL0NyZWF0ZXMgYW4gYXJyYXkgdGhhdCBob2xkcyB1bmlxdWUgdmFsdWVzIG9mIGJvdGggcHJvdmluY2UgYW5kIGNvdW50cnlcbiAgbGV0IGhhbmRsZVByb3ZpbmNlTGlzdCA9IGQgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVzdWx0ID0gZC5tYXAoZSA9PiB7XG4gICAgICAgIGlmIChlLnJlZ2lvbi5wcm92aW5jZSA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm4geyBjb3VudHJ5OiBlLnJlZ2lvbi5uYW1lLCBwcm92aW5jZTogZS5yZWdpb24ubmFtZSB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgY291bnRyeTogZS5yZWdpb24ubmFtZSwgcHJvdmluY2U6IGUucmVnaW9uLnByb3ZpbmNlIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGxldCBwID0gcmVzdWx0LnNvcnQoY29tcGFyZSlcbiAgICAgIHJldHVybiBwXG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgLy9Mb29rcyBhdCBsb2NhbHN0b3JhZ2UuIE9uIGVycm9yIGl0IGRvZXMgYSBmZXRjaCBmb3IgdGhlIG1vc3QgY3VycmVudCBkYXRhXG4gIC8vSWYgbG9jYWxzdG9hZ2UgaGFzIHZhbHVlcyBhbmQgaWYgZGF0ZVZhbHVlID09PSBsb2NhbFN0b3JhZ2UgZGF0ZSB0aGVuIGxvY2FsU3RvcmFnZSBpbmZvcm1hdGlvbiBpcyB1c2VkXG4gIC8vVGhpcyBmaXJlcyBvbmx5IHdoZW4gdGhlIGRhdGVWYWx1ZSBjaGFuZ2VzXG4gIGxldCBkZWZhdWx0RGF0YSA9ICgpID0+IHtcbiAgICBsZXQgbG9jYWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RvcmFnZScpXG4gICAgbG9jYWwgPSBKU09OLnBhcnNlKGxvY2FsKVxuICAgIHRyeSB7XG4gICAgICBpZiAobG9jYWwuZGF0YVswXS5kYXRlID09PSBkYXRlVmFsdWUpIHtcbiAgICAgICAgaGFuZGxlTG9jYWxEYXRhKGxvY2FsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRhdGVWYWx1ZSA9PT0geSkge1xuICAgICAgICAgIGhhbmRsZUZldGNoKGRhdGFEZWZhdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhbmRsZUZldGNoKGRhdGFDdXN0b21lRGF0ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgaGFuZGxlRmV0Y2goZGF0YURlZmF1bHQpXG4gICAgfVxuICB9XG5cbiAgLy9IYW5kbGVzIGFjdHVhbCBmZXRjaCByZXF1ZXN0LiBJZiB0aGV5IGRhdGUgPSB5ZXN0ZXJkYXkgaXQgd2lsbCBwdWxsIHRoZSBuZXdlc3QgcG9zc2libGUgaW5mb3JtYXRpb24uXG4gIC8vSWYgZGF0YVZhbHVlICE9PSB5ZXN0ZXJkYXkgdGhhbiBjdXN0b21lIGZldGNoIGJ5IGRhdGUgaXMgcGVyZm9ybWVkLlxuICAvL0RhdGEgaXMgc3RvcmVkIGluIGxvY2FsU3RvcmFnZSB0byBzcGVlZCB1cCBsb2FkIGZvciByZXBlYXQgdmlzdG9ycy5cbiAgbGV0IGhhbmRsZUZldGNoID0gdXJsID0+IHtcbiAgICBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5kYXRhLmRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICBsZXQgYyA9IGRhdGEuY291bnRyaWVzXG4gICAgICAgICAgbGV0IHAgPSBoYW5kbGVQcm92aW5jZUxpc3QoZGF0YS5kYXRhLmRhdGEpXG4gICAgICAgICAgaGFuZGxlVG90YWxzKGRhdGEudG90YWxzLCBjb3VudHJ5VmFsdWUsIHN0YXRlVmFsdWUpXG4gICAgICAgICAgY291bnRyeUxpc3RTZXQoYylcbiAgICAgICAgICBzdGF0ZUxpc3RTZXQocClcbiAgICAgICAgICB0b3RhbHNEYXRhU2V0KGRhdGEudG90YWxzKVxuICAgICAgICAgIHRhYmxlRGF0YVNldChkYXRhLmRhdGEuZGF0YSlcblxuICAgICAgICAgIGxldCBzdG9yYWdlID0ge1xuICAgICAgICAgICAgY291bnRyeTogYyxcbiAgICAgICAgICAgIHByb3ZpbmNlOiBwLFxuICAgICAgICAgICAgdG90YWxEYXRhOiBkYXRhLnRvdGFscyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YS5kYXRhLFxuICAgICAgICAgIH1cbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2UpKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxuXG4gIC8vQWRkIGFsbCBmZXRjaCByZXF1ZXN0IGRhdGEgdG8gbG9jYWwgc3RvcmFnZS5cbiAgbGV0IGhhbmRsZUxvY2FsRGF0YSA9IGxvY2FsID0+IHtcbiAgICBjb3VudHJ5TGlzdFNldChsb2NhbC5jb3VudHJ5KVxuICAgIHN0YXRlTGlzdFNldChsb2NhbC5wcm92aW5jZSlcbiAgICB0b3RhbHNEYXRhU2V0KGxvY2FsLnRvdGFsRGF0YSlcbiAgICBoYW5kbGVUb3RhbHMobG9jYWwudG90YWxEYXRhLCBjb3VudHJ5VmFsdWUsIHN0YXRlVmFsdWUpXG4gICAgdGFibGVEYXRhU2V0KGxvY2FsLmRhdGEpXG4gIH1cblxuICAvL0hhbmRsZXMgYWxsIHRvdGFsIHZhbHVlcy4gRmlyZWQgd2hlbiBkYXRlVmFsdWUsIHN0YXRlVmFsdWUsIG9yIGNvdW50cnlWYXVlIGNoYW5nZXNcbiAgbGV0IGhhbmRsZVRvdGFscyA9IChkLCBjLCBzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBjb25maXJtZWQgPSAwXG4gICAgICBsZXQgZGVhdGhzID0gMFxuICAgICAgbGV0IHJlY292ZXJlZCA9IDBcbiAgICAgIGlmIChjID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uZmlybWVkID0gZFsnQWxsJ10uY29uZmlybWVkXG4gICAgICAgIGRlYXRocyA9IGRbJ0FsbCddLmRlYXRoc1xuICAgICAgICByZWNvdmVyZWQgPSBkWydBbGwnXS5yZWNvdmVyZWRcbiAgICAgIH0gZWxzZSBpZiAoYyAhPT0gdW5kZWZpbmVkICYmIHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25maXJtZWQgPSBkW2NdLmNvbmZpcm1lZFxuICAgICAgICBkZWF0aHMgPSBkW2NdLmRlYXRoc1xuICAgICAgICByZWNvdmVyZWQgPSBkW2NdLnJlY292ZXJlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uZmlybWVkID0gZFtjXVtzXS5jb25maXJtZWRcbiAgICAgICAgZGVhdGhzID0gZFtjXVtzXS5kZWF0aHNcbiAgICAgICAgcmVjb3ZlcmVkID0gZFtjXVtzXS5yZWNvdmVyZWRcbiAgICAgIH1cbiAgICAgIGxldCB0ID0ge1xuICAgICAgICB0b3RhbENhc2VzOiBjb25maXJtZWQsXG4gICAgICAgIHRvdGFsRGVhdGhzOiBkZWF0aHMsXG4gICAgICAgIHRvdGFsUmVjb3ZlcmVkOiByZWNvdmVyZWQsXG4gICAgICB9XG4gICAgICB0b3RhbHNTZXQodClcbiAgICAgIHJldHVybiB0XG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgLy9Ib2xkcyBtYWtlc2hpZnQgc3RhdGUgYW5kIGNhbiBiZSB1c2VkIHRvIHBhc3MgZG93biB0byBjaGlsZHJlblxuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBvcHRpb25zOiB7XG4gICAgICBjb3VudHJ5VmFsdWU6IGNvdW50cnlWYWx1ZSxcbiAgICAgIGNvdW50cnlWYWx1ZVNldDogY291bnRyeVZhbHVlU2V0LFxuICAgICAgc3RhdGVWYWx1ZTogc3RhdGVWYWx1ZSxcbiAgICAgIHN0YXRlVmFsdWVTZXQ6IHN0YXRlVmFsdWVTZXQsXG4gICAgICBkYXRlVmFsdWU6IGRhdGVWYWx1ZSxcbiAgICAgIGRhdGVWYWx1ZVNldDogZGF0ZVZhbHVlU2V0LFxuICAgICAgY291bnRyeUxpc3Q6IGNvdW50cnlMaXN0LFxuICAgICAgc3RhdGVMaXN0OiBzdGF0ZUxpc3QsXG4gICAgfSxcbiAgICB0YWJsZXM6IHtcbiAgICAgIHRhYmxlRGF0YTogdGFibGVEYXRhLFxuICAgICAgY291bnRyeVZhbHVlOiBjb3VudHJ5VmFsdWUsXG4gICAgICBjb3VudHJ5TGlzdDogY291bnRyeUxpc3QsXG4gICAgICBzdGF0ZVZhbHVlOiBzdGF0ZVZhbHVlLFxuICAgICAgc3RhdGVMaXN0OiBzdGF0ZUxpc3QsXG4gICAgfSxcbiAgICB0b3RhbHM6IHRvdGFscyxcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZGVmYXVsdERhdGEoKVxuICB9LCBbZGF0ZVZhbHVlXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjb3VudHJ5VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlVG90YWxzKHRvdGFsc0RhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZVRvdGFscyh0b3RhbHNEYXRhLCBjb3VudHJ5VmFsdWUpXG4gICAgfVxuICB9LCBbY291bnRyeVZhbHVlXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzdGF0ZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZVRvdGFscyh0b3RhbHNEYXRhLCBjb3VudHJ5VmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZVRvdGFscyh0b3RhbHNEYXRhLCBjb3VudHJ5VmFsdWUsIHN0YXRlVmFsdWUpXG4gICAgfVxuICB9LCBbc3RhdGVWYWx1ZV0pXG5cbiAgcmV0dXJuIDxBcHAgc3RhdGU9e3N0YXRlfSAvPlxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBEaXNjbGFpbWVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBpZD0nZGlzY2xhaW1lcic+XG5cdFx0XHQ8ZGl2IGlkPSdkaXNjbGFpbWVyLWRldGFpbCc+XG5cdFx0XHRcdERpc2NsYWltZXI6IEkgZG8gbm90IG93biBub3IgZG8gSSBtYWludGFpbiB0aGlzIGRhdGEuIFRvIGVuc3VyZSB5b3UgYXJlXG5cdFx0XHRcdGdldHRpbmcgdGhlIGJlc3QgaW5mb3JtYXRpb24gcGxlYXNlIGxvb2sgdG8gYXV0aG9yaXRhdGl2ZSBzb3VyY2VzLlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGlkPSdkaXNjbGFpbWVyLWxpbmtzJz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Rpc2NsYWltZXItbGluay1oZWFkJz5EYXRhIHNvdXJjZTo8L2Rpdj5cblx0XHRcdFx0PGFcblx0XHRcdFx0XHRjbGFzc05hbWU9J2Rpc2NsYWltZXItbGlua3MtYWRkcmVzcydcblx0XHRcdFx0XHRocmVmPSdodHRwczovL2dpdGh1Yi5jb20vQ1NTRUdJU2FuZERhdGEvQ09WSUQtMTknXG5cdFx0XHRcdD5cblx0XHRcdFx0XHRKb2huIEhvcGtpbnNcblx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rLWhlYWQnPkFQSSBTb3VyY2U6PC9kaXY+XG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmtzLWFkZHJlc3MnXG5cdFx0XHRcdFx0aHJlZj0naHR0cHM6Ly9yYXBpZGFwaS5jb20vYXhpc2JpdHMtYXhpc2JpdHMtZGVmYXVsdC9hcGkvY292aWQtMTktc3RhdGlzdGljcy9lbmRwb2ludHMnXG5cdFx0XHRcdD5cblx0XHRcdFx0XHRSYXBpZEFQSSAtIEF4aXNiaXRzXG5cdFx0XHRcdDwvYT5cblx0XHRcdFx0PGRpdiBpZD0nZGlzY2xhaW1lci1hdXRob3JpdGF0aXZlJz5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rLWhlYWQnPlxuXHRcdFx0XHRcdFx0QWRkaXRpb25hbCBTdXBwb3J0IG9uIFNhcnMtQ292LTI6XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGFcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rcy1hZGRyZXNzJ1xuXHRcdFx0XHRcdFx0aHJlZj0nICAgICAgICAgICAgICAgIGh0dHBzOi8vd3d3LmNkYy5nb3YvY29yb25hdmlydXMvMjAxOS1uQ292L2luZGV4Lmh0bWwnXG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0Q0RDXG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHQ8YVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmtzLWFkZHJlc3MnXG5cdFx0XHRcdFx0XHRocmVmPSdodHRwczovL3d3dy53aG8uaW50L2VtZXJnZW5jaWVzL2Rpc2Vhc2VzL25vdmVsLWNvcm9uYXZpcnVzLTIwMTknXG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0V0hPXG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc2NsYWltZXJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFNlbGVjdCBmcm9tICdhbnRkL2VzL3NlbGVjdCdcbmltcG9ydCBTd2l0Y2ggZnJvbSAnYW50ZC9lcy9zd2l0Y2gnXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICcuL0RhdGVQaWNrZXInXG5cbmNvbnN0IE9wdGlvbnMgPSAocHJvcHMpID0+IHtcblx0Y29uc3QgZGVmYXVsdFByb3ZpbmNlVmFsdWUgPSAnU2VsZWN0IGEgc3RhdGUvcHJvdmluY2UnXG5cdGNvbnN0IFtwcm92aW5jZVRleHQsIHByb3ZpbmNlVGV4dFNldF0gPSB1c2VTdGF0ZShkZWZhdWx0UHJvdmluY2VWYWx1ZSlcblx0Y29uc3QgZGVmYXVsdENvdW50cnlWYWx1ZSA9ICdTZWxlY3QgYSBDb3VudHJ5J1xuXHRjb25zdCBbY291bnRyeVRleHQsIGNvdW50cnlUZXh0U2V0XSA9IHVzZVN0YXRlKGRlZmF1bHRDb3VudHJ5VmFsdWUpXG5cblx0Ly9Vc2VkIHRvIGhhbmRsZSB0aGVtZS4gU2ltcGx5IGNoYW5nZXMgaHJlZiBvZiBsaW5rIGNvbXBvbmVudCBpbiBpbmRleC5odG1sXG5cdC8vVGhlcmUgc2hvdWxkIGJlIGEgYmV0dGVyIHdheSBvZiBoYW5kbGUgYXBhcnQgZnJvbSBmdWxseSByZWxvYWRpbmcgY3NzXG5cdGxldCBjaGFuZ2VUaGVtZSA9ICgpID0+IHtcblx0XHRsZXQgY3VyVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUnKS5ocmVmXG5cdFx0Y3VyVmFsdWUgPSBjdXJWYWx1ZS5zcGxpdCgnLycpWzNdXG5cdFx0aWYgKGN1clZhbHVlID09PSAnYW50ZC5jc3MnKSB7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUnKS5ocmVmID0gJ2FudGQuZGFyay5jc3MnXG5cdFx0XHRkb2N1bWVudFxuXHRcdFx0XHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuXHRcdFx0XHQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Nyb2xsdHJhY2snLCAnIzE0MTQxNCcpXG5cdFx0XHRkb2N1bWVudFxuXHRcdFx0XHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuXHRcdFx0XHQuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm9yZGVyLWNvbG9yJywgJyMzMDMwMzAnKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUnKS5ocmVmID0gJ2FudGQuY3NzJ1xuXHRcdFx0ZG9jdW1lbnRcblx0XHRcdFx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cblx0XHRcdFx0LnN0eWxlLnNldFByb3BlcnR5KCctLXNjcm9sbHRyYWNrJywgJ3doaXRlJylcblx0XHRcdGRvY3VtZW50XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG5cdFx0XHRcdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1ib3JkZXItY29sb3InLCAnI2YwZjBmMCcpXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gb25TZWFyY2goKSB7fVxuXHRsZXQgY291bnRyaWVzID0gcHJvcHMuc3RhdGUuY291bnRyeUxpc3QubWFwKChlLCBpKSA9PiB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxTZWxlY3QuT3B0aW9uIGtleT17aX0gdmFsdWU9e2V9PlxuXHRcdFx0XHR7ZX1cblx0XHRcdDwvU2VsZWN0Lk9wdGlvbj5cblx0XHQpXG5cdH0pXG5cblx0bGV0IHN0YXRlcyA9IHByb3BzLnN0YXRlLnN0YXRlTGlzdC5tYXAoKGUsIGkpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gW11cblx0XHRpZiAoZS5jb3VudHJ5ID09PSBwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWUpIHtcblx0XHRcdHJlc3VsdC5wdXNoKFxuXHRcdFx0XHQ8U2VsZWN0Lk9wdGlvbiBrZXk9e2l9IHZhbHVlPXtlLnByb3ZpbmNlfT5cblx0XHRcdFx0XHR7ZS5wcm92aW5jZX1cblx0XHRcdFx0PC9TZWxlY3QuT3B0aW9uPlxuXHRcdFx0KVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0XG5cdH0pXG5cblx0bGV0IGhhbmRsZURhdGVDaGFuZ2UgPSAoZSwgcykgPT4ge1xuXHRcdGxldCB5ID0gZGF5anMocykuZm9ybWF0KCdZWVlZLU1NLUREJylcblx0XHRwcm9wcy5zdGF0ZS5kYXRlVmFsdWVTZXQoeSlcblx0fVxuXG5cdGxldCBjaGFuZ2VDb3VudHJ5U3RhdGVWYWx1ZSA9IChlLCB0eXBlKSA9PiB7XG5cdFx0aWYgKHR5cGUgPT09ICdjb3VudHJ5Jykge1xuXHRcdFx0aWYgKGUgPT09ICdBbGwnKSB7XG5cdFx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWVTZXQodW5kZWZpbmVkKVxuXHRcdFx0XHRwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWVTZXQodW5kZWZpbmVkKVxuXHRcdFx0XHRjb3VudHJ5VGV4dFNldChkZWZhdWx0Q291bnRyeVZhbHVlKVxuXHRcdFx0XHRwcm92aW5jZVRleHRTZXQoZGVmYXVsdFByb3ZpbmNlVmFsdWUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWVTZXQoZSlcblx0XHRcdFx0Y291bnRyeVRleHRTZXQoZSlcblx0XHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZVNldCh1bmRlZmluZWQpXG5cdFx0XHRcdHByb3ZpbmNlVGV4dFNldChkZWZhdWx0UHJvdmluY2VWYWx1ZSlcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGUgPT09ICdBbGwnKSB7XG5cdFx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWVTZXQodW5kZWZpbmVkKVxuXHRcdFx0XHRwcm92aW5jZVRleHRTZXQoZGVmYXVsdFByb3ZpbmNlVmFsdWUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlU2V0KGUpXG5cdFx0XHRcdHByb3ZpbmNlVGV4dFNldChlKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiAoXG5cdFx0PGRpdiBpZD0nb3B0aW9ucyc+XG5cdFx0XHQ8ZGl2IGlkPSdvcHRpb25zLXRoZW1lJz5cblx0XHRcdFx0PFN3aXRjaCBvbkNoYW5nZT17KCkgPT4gY2hhbmdlVGhlbWUoKX0gLz5cblx0XHRcdFx0TGlnaHQvRGFya1xuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8RGF0ZVBpY2tlclxuXHRcdFx0XHR0aGVtZT0nZGFyaydcblx0XHRcdFx0cGlja2VyPSdkYXRlJ1xuXHRcdFx0XHRkZWZhdWx0VmFsdWU9e2RheWpzKHByb3BzLnN0YXRlLmRhdGVWYWx1ZSwgJ1lZWVktTU0tREQnKX1cblx0XHRcdFx0b25DaGFuZ2U9eyhlLCBzKSA9PiBoYW5kbGVEYXRlQ2hhbmdlKGUsIHMpfVxuXHRcdFx0XHRmb3JtYXQ9eydZWVlZLU1NLUREJ31cblx0XHRcdFx0Y2xhc3NOYW1lPSdvcHRpb25zLWlucHV0cydcblx0XHRcdC8+XG5cdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdHNob3dTZWFyY2hcblx0XHRcdFx0b3B0aW9uRmlsdGVyUHJvcD0nY2hpbGRyZW4nXG5cdFx0XHRcdG9uU2VhcmNoPXtvblNlYXJjaH1cblx0XHRcdFx0dmFsdWU9e2NvdW50cnlUZXh0fVxuXHRcdFx0XHRjbGFzc05hbWU9J29wdGlvbnMtaW5wdXRzJ1xuXHRcdFx0XHRvbkNoYW5nZT17KGUpID0+IGNoYW5nZUNvdW50cnlTdGF0ZVZhbHVlKGUsICdjb3VudHJ5Jyl9XG5cdFx0XHQ+XG5cdFx0XHRcdDxTZWxlY3QuT3B0aW9uIHZhbHVlPXsnQWxsJ30+QWxsPC9TZWxlY3QuT3B0aW9uPlxuXHRcdFx0XHR7Y291bnRyaWVzfVxuXHRcdFx0PC9TZWxlY3Q+XG5cdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdHNob3dTZWFyY2hcblx0XHRcdFx0b3B0aW9uRmlsdGVyUHJvcD0nY2hpbGRyZW4nXG5cdFx0XHRcdG9uU2VhcmNoPXtvblNlYXJjaH1cblx0XHRcdFx0dmFsdWU9e3Byb3ZpbmNlVGV4dH1cblx0XHRcdFx0Y2xhc3NOYW1lPSdvcHRpb25zLWlucHV0cydcblx0XHRcdFx0b25DaGFuZ2U9eyhlKSA9PiBjaGFuZ2VDb3VudHJ5U3RhdGVWYWx1ZShlLCAnc3RhdGUnKX1cblx0XHRcdD5cblx0XHRcdFx0PFNlbGVjdC5PcHRpb24gdmFsdWU9eydBbGwnfT5BbGw8L1NlbGVjdC5PcHRpb24+XG5cdFx0XHRcdHtzdGF0ZXN9XG5cdFx0XHQ8L1NlbGVjdD5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBPcHRpb25zXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDYXJkLCBTdGF0aXN0aWMgfSBmcm9tICdhbnRkJ1xuXG5jb25zdCBTdW1tYXJ5ID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBpZD0nc3VtbWFyeSc+XG5cdFx0XHQ8Q2FyZCBpZD0nc3VtbWFyeS1jYXJkJz5cblx0XHRcdFx0PFN0YXRpc3RpYyB0aXRsZT0nVG90YWwgQ2FzZXMnIHZhbHVlPXtwcm9wcy50b3RhbHMudG90YWxDYXNlc30gLz5cblx0XHRcdFx0PFN0YXRpc3RpYyB0aXRsZT0nVG90YWwgUmVjb3ZlcmQnIHZhbHVlPXtwcm9wcy50b3RhbHMudG90YWxSZWNvdmVyZWR9IC8+XG5cdFx0XHRcdDxTdGF0aXN0aWMgdGl0bGU9J1RvdGFsIERlYXRocycgdmFsdWU9e3Byb3BzLnRvdGFscy50b3RhbERlYXRoc30gLz5cblx0XHRcdDwvQ2FyZD5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdW1tYXJ5XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQ29sdW1uLCBUYWJsZSB9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkJ1xuXG5jb25zdCBUYWJsZXMgPSAocHJvcHMpID0+IHtcblx0Y29uc3QgW3RhYmxlQXJyYXksIHRhYmxlQXJyYXlTZXRdID0gdXNlU3RhdGUoW10pXG5cdGNvbnN0IFt0YWJsZVdpZHRoLCB0YWJsZVdpZHRoU2V0XSA9IHVzZVN0YXRlKHdpbmRvdy5pbm5lcldpZHRoICogMC43NSlcblxuXHQvL1VzZWQgdG8gb3JkZXIgdGFibGUgZGF0YSBieSBjb25maXJtYXRpb25zIG9mIGNhc2VzXG5cdGZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuXHRcdGxldCBhU3RhdGUgPSBhLmNvbmZpcm1lZFxuXHRcdGxldCBiU3RhdGUgPSBiLmNvbmZpcm1lZFxuXHRcdGxldCBjb21wYXJpc29uID0gMFxuXHRcdGlmIChhU3RhdGUgPiBiU3RhdGUpIHtcblx0XHRcdGNvbXBhcmlzb24gPSAtMVxuXHRcdH0gZWxzZSBpZiAoYVN0YXRlIDwgYlN0YXRlKSB7XG5cdFx0XHRjb21wYXJpc29uID0gMVxuXHRcdH1cblx0XHRyZXR1cm4gY29tcGFyaXNvblxuXHR9XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly9DcmVhdGUgcHJvcGVyIGFycmF5XG5cdC8vSUYgU1RBVEUgQU5EIFBST1ZJTkVOQ0UgQVJFIENIT1NFTlxuXHRjb25zdCBoYW5kbGVDb3VudHlUYWJsZXMgPSAoKSA9PiB7XG5cdFx0bGV0IG5ld0FycmF5ID0gW11cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnN0YXRlLnRhYmxlRGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHRlbXBBcnJheSA9IFtdXG5cdFx0XHRpZiAoXG5cdFx0XHRcdHByb3BzLnN0YXRlLnRhYmxlRGF0YVtpXS5jb3VudHJ5ID09PSBwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWUgJiZcblx0XHRcdFx0cHJvcHMuc3RhdGUudGFibGVEYXRhW2ldLnByb3ZpbmNlID09PSBwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHByb3BzLnN0YXRlLnRhYmxlRGF0YVtpXS5yZWdpb24uY2l0aWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKHByb3BzLnN0YXRlLnRhYmxlRGF0YVtpXSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0ZW1wQXJyYXkgPSBwcm9wcy5zdGF0ZS50YWJsZURhdGFbaV0ucmVnaW9uLmNpdGllc1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRlbXBBcnJheS5zb3J0KGNvbXBhcmUpXG5cdFx0XHRcdGxldCByZXN1bHQgPSB0YWJsZURpdkNvdW50eSh0ZW1wQXJyYXksIGkpXG5cdFx0XHRcdG5ld0FycmF5LnB1c2gocmVzdWx0KVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbmV3QXJyYXlcblx0fVxuXG5cdC8vSUYgSlVTVCBTVEFURS9QUk9WSU5FTkNFIElTIENIT1NFTlxuXHRjb25zdCBoYW5kbGVTdGF0ZVRhYmxlcyA9ICgpID0+IHtcblx0XHRsZXQgbmV3QXJyYXkgPSBbXVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc3RhdGUuc3RhdGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgdGVtcEFycmF5ID0gW11cblx0XHRcdGZvciAobGV0IHggPSAwOyB4IDwgcHJvcHMuc3RhdGUudGFibGVEYXRhLmxlbmd0aDsgeCsrKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwcm9wcy5zdGF0ZS50YWJsZURhdGFbeF0ucHJvdmluY2UgPT09XG5cdFx0XHRcdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZUxpc3RbaV0ucHJvdmluY2UgJiZcblx0XHRcdFx0XHRwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWUgPT09IHByb3BzLnN0YXRlLnN0YXRlTGlzdFtpXS5jb3VudHJ5XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGlmIChwcm9wcy5zdGF0ZS50YWJsZURhdGFbeF0ucmVnaW9uLmNpdGllcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKHByb3BzLnN0YXRlLnRhYmxlRGF0YVt4XSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGVtcEFycmF5ID0gcHJvcHMuc3RhdGUudGFibGVEYXRhW3hdLnJlZ2lvbi5jaXRpZXNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGVtcEFycmF5LnNvcnQoY29tcGFyZSlcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gdGFibGVEaXZTdGF0ZSh0ZW1wQXJyYXksIHgpXG5cdFx0XHRcdFx0bmV3QXJyYXkucHVzaChyZXN1bHQpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG5ld0FycmF5XG5cdH1cblx0Ly9JRiBOTyBTVEFURSBPUiBQUk9WSU5FTkNFIEFSRSBDSE9TRU4gKEdMT0JBTCBWSUVXKVxuXHRjb25zdCBoYW5kbGVDb3VudHJ5VGFibGVzID0gKCkgPT4ge1xuXHRcdGxldCBuZXdBcnJheSA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zdGF0ZS5jb3VudHJ5TGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHRlbXBBcnJheSA9IFtdXG5cdFx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IHByb3BzLnN0YXRlLnRhYmxlRGF0YS5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHRpZiAocHJvcHMuc3RhdGUudGFibGVEYXRhW3hdLmNvdW50cnkgPT09IHByb3BzLnN0YXRlLmNvdW50cnlMaXN0W2ldKSB7XG5cdFx0XHRcdFx0dGVtcEFycmF5LnB1c2gocHJvcHMuc3RhdGUudGFibGVEYXRhW3hdKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0ZW1wQXJyYXkuc29ydChjb21wYXJlKVxuXHRcdFx0bGV0IHJlc3VsdCA9IHRhYmxlRGl2Q291bnRyeSh0ZW1wQXJyYXksIGkpXG5cdFx0XHRuZXdBcnJheS5wdXNoKHJlc3VsdClcblx0XHR9XG5cdFx0Ly8gdGFibGVBcnJheVNldChuZXdBcnJheSlcblx0XHRyZXR1cm4gbmV3QXJyYXlcblx0XHQvLyBjcmVhdGVVbmlxdWVBcnJheSgnY291bnRyeV9yZWdpb24nKVxuXHR9XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vRGV0ZXJtaW5lIGhvdyB0byBmaWx0ZXIgZGF0YVxuXHRjb25zdCBoYW5kbGVUYWJsZXMgPSAoKSA9PiB7XG5cdFx0aWYgKFxuXHRcdFx0cHJvcHMuc3RhdGUuY291bnRyeVZhbHVlICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWUgIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhbmRsZUNvdW50eVRhYmxlcygpXG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlID09PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHJldHVybiBoYW5kbGVTdGF0ZVRhYmxlcygpXG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZSA9PT0gdW5kZWZpbmVkICYmXG5cdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlID09PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHJldHVybiBoYW5kbGVDb3VudHJ5VGFibGVzKClcblx0XHR9XG5cdH1cblxuXHQvL0NsZWFucyB1cCBudW1iZXJzIGluIHRhYmxlIHRvIGFkZCBjb21tYXNcblx0Y29uc3QgZm9ybWF0TnVtYmVyID0gKG51bSkgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gbnVtLnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnJDEsJylcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiBudW1cblx0XHR9XG5cdH1cblxuXHQvL1RoZSB0YWJsZXMgaGF2ZSBkaWZmZXJlbnQgY29sdW1ucyBiYXNlZCBvbiB3aGF0IGZpbHRlcnMgYXJlIHBpY2tlZC5cblx0Y29uc3QgdGFibGVEaXZDb3VudHJ5ID0gKGFycmF5LCBrZXkpID0+IHtcblx0XHRsZXQgcm93SGVpZ2h0ID0gMzBcblx0XHRsZXQgdGJsSGVpZ2h0XG5cdFx0aWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGJsSGVpZ2h0ID0gODBcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGJsSGVpZ2h0ID0gMzBcblx0XHR9XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjAwKSB7XG5cdFx0XHR0YmxIZWlnaHQgPSB0YmxIZWlnaHQgLyAxLjVcblx0XHRcdHJvd0hlaWdodCA9IHJvd0hlaWdodCAvIDEuNVxuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPSd0YWJsZXMtaW5kaXZpZHVhbCc+XG5cdFx0XHRcdFx0PFRhYmxlXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9J3RhYmxlcy12aXJ0dWFsaXplZCdcblx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aGVhZGVyPXsnQ291bnRyeSd9XG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2FycmF5Lmxlbmd0aCAqIHRibEhlaWdodH1cblx0XHRcdFx0XHRcdGhlYWRlckhlaWdodD17NTB9XG5cdFx0XHRcdFx0XHRyb3dIZWlnaHQ9e3Jvd0hlaWdodH1cblx0XHRcdFx0XHRcdHJvd0NvdW50PXthcnJheS5sZW5ndGh9XG5cdFx0XHRcdFx0XHRyb3dHZXR0ZXI9eyh7IGluZGV4IH0pID0+IGFycmF5W2luZGV4XX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uIHdpZHRoPXt0YWJsZVdpZHRoIC8gNX0gbGFiZWw9J0NvdW50cnknIGRhdGFLZXk9J2NvdW50cnknIC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J1Byb3ZpbmNlIC8gU3RhdGUnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J3Byb3ZpbmNlJ1xuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nQ29uZmlybWVkJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdjb25maXJtZWQnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0FjdGl2ZSdcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nYWN0aXZlJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdEZWF0aHMnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2RlYXRocydcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1RhYmxlPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9IGNhdGNoIHt9XG5cdH1cblxuXHRjb25zdCB0YWJsZURpdlN0YXRlID0gKGFycmF5LCBrZXkpID0+IHtcblx0XHRsZXQgcm93SGVpZ2h0ID0gMzBcblx0XHRsZXQgdGJsSGVpZ2h0XG5cdFx0aWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGJsSGVpZ2h0ID0gODBcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGJsSGVpZ2h0ID0gMzBcblx0XHR9XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjAwKSB7XG5cdFx0XHR0YmxIZWlnaHQgPSB0YmxIZWlnaHQgLyAxLjVcblx0XHRcdHJvd0hlaWdodCA9IHJvd0hlaWdodCAvIDEuNVxuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPSd0YWJsZXMtaW5kaXZpZHVhbCc+XG5cdFx0XHRcdFx0PFRhYmxlXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9J3RhYmxlcy12aXJ0dWFsaXplZCdcblx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aGVhZGVyPXsnQ291bnRyeSd9XG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2FycmF5Lmxlbmd0aCAqIHRibEhlaWdodH1cblx0XHRcdFx0XHRcdGhlYWRlckhlaWdodD17NTB9XG5cdFx0XHRcdFx0XHRyb3dIZWlnaHQ9e3Jvd0hlaWdodH1cblx0XHRcdFx0XHRcdHJvd0NvdW50PXthcnJheS5sZW5ndGh9XG5cdFx0XHRcdFx0XHRyb3dHZXR0ZXI9eyh7IGluZGV4IH0pID0+IGFycmF5W2luZGV4XX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J1Byb3ZpbmNlIC8gU3RhdGUnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J3Byb3ZpbmNlJ1xuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxDb2x1bW4gd2lkdGg9e3RhYmxlV2lkdGggLyA2fSBsYWJlbD0nQ291bnR5JyBkYXRhS2V5PSduYW1lJyAvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdDb25maXJtZWQnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2NvbmZpcm1lZCdcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nRGVhdGhzJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdkZWF0aHMnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9UYWJsZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fSBjYXRjaCB7fVxuXHR9XG5cblx0Y29uc3QgdGFibGVEaXZDb3VudHkgPSAoYXJyYXksIGtleSkgPT4ge1xuXHRcdGxldCByb3dIZWlnaHQgPSAzMFxuXHRcdGxldCB0YmxIZWlnaHRcblx0XHRpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0YmxIZWlnaHQgPSA4MFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YmxIZWlnaHQgPSAzMFxuXHRcdH1cblxuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDYwMCkge1xuXHRcdFx0dGJsSGVpZ2h0ID0gdGJsSGVpZ2h0IC8gMS41XG5cdFx0XHRyb3dIZWlnaHQgPSByb3dIZWlnaHQgLyAxLjVcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT0ndGFibGVzLWluZGl2aWR1YWwnPlxuXHRcdFx0XHRcdDxUYWJsZVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSd0YWJsZXMtdmlydHVhbGl6ZWQnXG5cdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGhlYWRlcj17J0NvdW50cnknfVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXthcnJheS5sZW5ndGggKiB0YmxIZWlnaHR9XG5cdFx0XHRcdFx0XHRoZWFkZXJIZWlnaHQ9ezUwfVxuXHRcdFx0XHRcdFx0cm93SGVpZ2h0PXtyb3dIZWlnaHR9XG5cdFx0XHRcdFx0XHRyb3dDb3VudD17YXJyYXkubGVuZ3RofVxuXHRcdFx0XHRcdFx0cm93R2V0dGVyPXsoeyBpbmRleCB9KSA9PiBhcnJheVtpbmRleF19XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PENvbHVtbiB3aWR0aD17dGFibGVXaWR0aCAvIDR9IGxhYmVsPSdDb3VudHknIGRhdGFLZXk9J25hbWUnIC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNH1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0NvbmZpcm1lZCdcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nY29uZmlybWVkJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDR9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdEZWF0aHMnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2RlYXRocydcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1RhYmxlPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9IGNhdGNoIHt9XG5cdH1cblxuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdHRhYmxlQXJyYXlTZXQoaGFuZGxlVGFibGVzKCkpXG5cdH0sIFtwcm9wc10pXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcblx0XHR0YWJsZVdpZHRoU2V0KHdpbmRvdy5pbm5lcldpZHRoICogMC43NSlcblx0fSlcblxuXHRyZXR1cm4gPGRpdiBpZD0ndGFibGVzJz57dGFibGVBcnJheX08L2Rpdj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVzXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImh0bWwge1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsICdSb2JvdG8nLCAnT3h5Z2VuJywgJ1VidW50dScsICdDYW50YXJlbGwnLCAnRmlyYSBTYW5zJywgJ0Ryb2lkIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgLS1zY3JvbGx0cmFjazogd2hpdGU7XFxuICAtLWJvcmRlci1jb2xvcjogI2YwZjBmMDtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuY29kZSB7XFxuICBmb250LWZhbWlseTogc291cmNlLWNvZGUtcHJvLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlO1xcbn1cXG4jZGlzY2xhaW1lciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWRlM2M7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zaXplOiAxLjV2bWluO1xcbn1cXG4jZGlzY2xhaW1lci1kZXRhaWwge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcbiNkaXNjbGFpbWVyLWxpbmtzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbiNkaXNjbGFpbWVyLWF1dGhvcml0YXRpdmUge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLmRpc2NsYWltZXItbGluay1oZWFkIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4uZGlzY2xhaW1lci1saW5rcy1hZGRyZXNzIHtcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG4jb3B0aW9ucyB7XFxuICBmb250LXNpemU6IDEuMXZtaW47XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwcHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIHBvc2l0aW9uOiBzdGlja3k7XFxuICB0b3A6IDA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNjcm9sbHRyYWNrKTtcXG59XFxuI29wdGlvbnMtdGhlbWUge1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4ub3B0aW9ucy1pbnB1dHMge1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbiNzdW1tYXJ5LWNhcmQge1xcbiAgd2lkdGg6IDc1JTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLyogQW50LUNhcmQgc3R5bGluZyBmb3IgdG90YWxzIHN1bW1hcnkgKi9cXG4vKiAuYW50LXN0YXRpc3RpYy1jb250ZW50LXZhbHVlLWludCB7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcbn0gKi9cXG4uYW50LXN0YXRpc3RpYy10aXRsZSB7XFxuICAvKiBmb250LXNpemU6IDEuN3ZtaW47ICovXFxufVxcbiN0YWJsZXMge1xcbiAgd2lkdGg6IDg1JTtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG4udGFibGVzLWhlYWRlciB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcbn1cXG4udGFibGVzLWluZGl2aWR1YWwge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNjcm9sbHRyYWNrKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkOjotd2Via2l0LXNjcm9sbGJhcixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3Jvdzo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Nyb2xsdHJhY2spO1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkOjotd2Via2l0LXNjcm9sbGJhci10aHVtYixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3Jvdzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3csXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3cge1xcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZF9faW5uZXJTY3JvbGxDb250YWluZXIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyUm93IHtcXG4gIHdpZHRoOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuICBtYXgtd2lkdGg6IGluaGVyaXQgIWltcG9ydGFudDtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xcbiAgcGFkZGluZy1yaWdodDogMjVweCAhaW1wb3J0YW50O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGUsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQge1xcbiAgbWF4LWhlaWdodDogNTAwcHggIWltcG9ydGFudDtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkIHtcXG4gIG1heC1oZWlnaHQ6IDQ0MHB4ICFpbXBvcnRhbnQ7XFxuICBtaW4taGVpZ2h0OiAzMHB4ICFpbXBvcnRhbnQ7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyQ29sdW1uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgZm9udC1zaXplOiAxLjd2bWluO1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclJvdyB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclRydW5jYXRlZFRleHQge1xcbiAgb3ZlcmZsb3c6IGF1dG8gIWltcG9ydGFudDtcXG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcXG4gIHdvcmQtd3JhcDogYnJlYWstd29yZCAhaW1wb3J0YW50O1xcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lICFpbXBvcnRhbnQ7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Q29sdW1uIHtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogMS43dm1pbjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNDLGtCQUFBO0FBQ0Q7QUFFQTtFQUNDLFNBQUE7RUFDQSw4SkFBQTtFQUdBLG1DQUFBO0VBQ0Esa0NBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFGRDtBQUtBO0VBQ0MsK0VBQUE7QUFIRDtBQU9BO0VBQ0MsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUxEO0FBUUE7RUFDQyxpQkFBQTtBQU5EO0FBU0E7RUFDQyxhQUFBO0FBUEQ7QUFVQTtFQUNDLGFBQUE7QUFSRDtBQVdBO0VBQ0MsaUJBQUE7QUFURDtBQVlBO0VBQ0MsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsMEJBQUE7QUFWRDtBQWFBO0VBQ0Msa0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxNQUFBO0VBQ0EsNkJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFFQSxXQUFBO0VBQ0Esb0NBQUE7QUFaRDtBQWVBO0VBQ0Msb0JBQUE7RUFDQSxzQkFBQTtBQWJEO0FBZ0JBO0VBQ0MsWUFBQTtBQWREO0FBaUJBO0VBQ0MsYUFBQTtFQUNBLHVCQUFBO0FBZkQ7QUFrQkE7RUFDQyxVQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBaEJEO0FBQ0Esd0NBQXdDO0FBQ3hDOztHQUVHO0FBb0JIO0VBbEJFLHdCQUF3QjtBQUMxQjtBQXFCQTtFQUNDLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBbkJEO0FBc0JBO0VBQ0MsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQ0FBQTtBQXBCRDtBQXVCQTtFQUNDLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG9DQUFBO0VBQ0EscUNBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUFyQkQ7QUF3QkE7OztFQUdDLG9DQUFBO0FBdEJEO0FBeUJBOzs7RUFHQyxzQkFBQTtBQXZCRDtBQTBCQTs7RUFFQyxzQkFBQTtFQUNBLDZCQUFBO0FBeEJEO0FBMEJBOzs7O0VBSUMseUJBQUE7RUFDQSw2QkFBQTtBQXhCRDtBQTJCQTtFQUNDLDhCQUFBO0FBekJEO0FBNEJBOztFQUVDLDRCQUFBO0FBMUJEO0FBNkJBO0VBQ0MsNEJBQUE7RUFDQSwyQkFBQTtBQTNCRDtBQThCQTtFQUNDLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQTVCRDtBQStCQTtFQUNDLHFDQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLDZCQUFBO0FBN0JEO0FBK0JBO0VBQ0MseUJBQUE7RUFDQSxvQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0NBQUE7QUE3QkQ7QUFnQ0E7RUFDQyxlQUFBO0VBQ0Esa0JBQUE7QUE5QkRcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaHRtbCB7XFxuXFx0b3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5cXG5ib2R5IHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0Zm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsICdPeHlnZW4nLFxcblxcdFxcdCdVYnVudHUnLCAnQ2FudGFyZWxsJywgJ0ZpcmEgU2FucycsICdEcm9pZCBTYW5zJywgJ0hlbHZldGljYSBOZXVlJyxcXG5cXHRcXHRzYW5zLXNlcmlmO1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcblxcdC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuXFx0LS1zY3JvbGx0cmFjazogd2hpdGU7XFxuXFx0LS1ib3JkZXItY29sb3I6ICNmMGYwZjA7XFxuXFx0b3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5cXG5jb2RlIHtcXG5cXHRmb250LWZhbWlseTogc291cmNlLWNvZGUtcHJvLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgJ0NvdXJpZXIgTmV3JyxcXG5cXHRcXHRtb25vc3BhY2U7XFxufVxcblxcbiNkaXNjbGFpbWVyIHtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUwLCAyMjIsIDYwLCAwLjkpO1xcblxcdGZvbnQtd2VpZ2h0OiA2MDA7XFxuXFx0Zm9udC1zaXplOiAxLjV2bWluO1xcbn1cXG5cXG4jZGlzY2xhaW1lci1kZXRhaWwge1xcblxcdG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG5cXG4jZGlzY2xhaW1lci1saW5rcyB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG59XFxuXFxuI2Rpc2NsYWltZXItYXV0aG9yaXRhdGl2ZSB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG59XFxuXFxuLmRpc2NsYWltZXItbGluay1oZWFkIHtcXG5cXHRtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuXFxuLmRpc2NsYWltZXItbGlua3MtYWRkcmVzcyB7XFxuXFx0bWFyZ2luLWxlZnQ6IDVweDtcXG5cXHRjb2xvcjogaW5oZXJpdDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuI29wdGlvbnMge1xcblxcdGZvbnQtc2l6ZTogMS4xdm1pbjtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRoZWlnaHQ6IDEwMHB4O1xcblxcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xcblxcdHBvc2l0aW9uOiBzdGlja3k7XFxuXFx0dG9wOiAwO1xcblxcdGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcblxcdGZsZXgtd3JhcDogd3JhcDtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcblxcdHotaW5kZXg6IDEwO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNjcm9sbHRyYWNrKTtcXG59XFxuXFxuI29wdGlvbnMtdGhlbWUge1xcblxcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5vcHRpb25zLWlucHV0cyB7XFxuXFx0d2lkdGg6IDIwMHB4O1xcbn1cXG5cXG4jc3VtbWFyeSB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuI3N1bW1hcnktY2FyZCB7XFxuXFx0d2lkdGg6IDc1JTtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4vKiBBbnQtQ2FyZCBzdHlsaW5nIGZvciB0b3RhbHMgc3VtbWFyeSAqL1xcbi8qIC5hbnQtc3RhdGlzdGljLWNvbnRlbnQtdmFsdWUtaW50IHtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxufSAqL1xcblxcbi5hbnQtc3RhdGlzdGljLXRpdGxlIHtcXG5cXHQvKiBmb250LXNpemU6IDEuN3ZtaW47ICovXFxufVxcblxcbiN0YWJsZXMge1xcblxcdHdpZHRoOiA4NSU7XFxuXFx0bWFyZ2luLWxlZnQ6IGF1dG87XFxuXFx0bWFyZ2luLXJpZ2h0OiBhdXRvO1xcbn1cXG5cXG4udGFibGVzLWhlYWRlciB7XFxuXFx0Zm9udC1zaXplOiAyMHB4O1xcblxcdGZvbnQtd2VpZ2h0OiBib2xkO1xcblxcdG1hcmdpbi1ib3R0b206IDEwcHg7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG59XFxuXFxuLnRhYmxlcy1pbmRpdmlkdWFsIHtcXG5cXHRoZWlnaHQ6IGF1dG87XFxuXFx0bWFyZ2luLXRvcDogMjBweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY3JvbGx0cmFjayk7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG5cXHRtYXJnaW4tYm90dG9tOiAyMHB4O1xcblxcdG1hcmdpbi1sZWZ0OiBhdXRvO1xcblxcdG1hcmdpbi1yaWdodDogYXV0bztcXG5cXHRwYWRkaW5nOiAxMHB4O1xcblxcdGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3c6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY3JvbGx0cmFjayk7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkOjotd2Via2l0LXNjcm9sbGJhci10aHVtYixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3csXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3cge1xcblxcdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkX19pbm5lclNjcm9sbENvbnRhaW5lcixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZCxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xcblxcdHdpZHRoOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxuXFx0bWF4LXdpZHRoOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyUm93IHtcXG5cXHRwYWRkaW5nLXJpZ2h0OiAyNXB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZSxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZCB7XFxuXFx0bWF4LWhlaWdodDogNTAwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkIHtcXG5cXHRtYXgtaGVpZ2h0OiA0NDBweCAhaW1wb3J0YW50O1xcblxcdG1pbi1oZWlnaHQ6IDMwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJDb2x1bW4ge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRoZWlnaHQ6IDQwcHg7XFxuXFx0Zm9udC1zaXplOiAxLjd2bWluO1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclJvdyB7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG5cXHRtYXJnaW4tYm90dG9tOiAxMHB4O1xcblxcdGJvcmRlci1yYWRpdXM6IDNweDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJUcnVuY2F0ZWRUZXh0IHtcXG5cXHRvdmVyZmxvdzogYXV0byAhaW1wb3J0YW50O1xcblxcdG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcXG5cXHR3b3JkLXdyYXA6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcXG5cXHR3aGl0ZS1zcGFjZTogcHJlLWxpbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3dDb2x1bW4ge1xcblxcdGhlaWdodDogaW5oZXJpdDtcXG5cXHRmb250LXNpemU6IDEuN3ZtaW47XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbMl0hLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbM10udXNlWzJdIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiLy9UaGlzIGlzIHJlcXVpcmVkIGJ5IEFudGQgdG8gYXZvaWQgbW9tZW50IHdoaWNoIHdhcyBhZGRpbmcgdG8gYnVuZGxlIHNpemUuXG5cbmltcG9ydCB7IERheWpzIH0gZnJvbSAnZGF5anMnXG5pbXBvcnQgZGF5anNHZW5lcmF0ZUNvbmZpZyBmcm9tICdyYy1waWNrZXIvbGliL2dlbmVyYXRlL2RheWpzJ1xuaW1wb3J0IGdlbmVyYXRlUGlja2VyIGZyb20gJ2FudGQvZXMvZGF0ZS1waWNrZXIvZ2VuZXJhdGVQaWNrZXInXG5pbXBvcnQgJ2FudGQvZXMvZGF0ZS1waWNrZXIvc3R5bGUvaW5kZXgnXG5cbmNvbnN0IERhdGVQaWNrZXIgPSBnZW5lcmF0ZVBpY2tlcjxEYXlqcz4oZGF5anNHZW5lcmF0ZUNvbmZpZylcblxuZXhwb3J0IGRlZmF1bHQgRGF0ZVBpY2tlclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiRGlzY2xhaW1lciIsIk9wdGlvbnMiLCJTdW1tYXJ5IiwiVGFibGVzIiwiQXBwIiwicHJvcHMiLCJzdGF0ZSIsIm9wdGlvbnMiLCJ0b3RhbHMiLCJ0YWJsZXMiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImRheWpzIiwiU3RhdGUiLCJ5Iiwic3VidHJhY3QiLCJmb3JtYXQiLCJkYXRlVmFsdWUiLCJkYXRlVmFsdWVTZXQiLCJkYXRhRGVmYXVsdCIsImRhdGFDdXN0b21lRGF0ZSIsImNvdW50cnlMaXN0IiwiY291bnRyeUxpc3RTZXQiLCJzdGF0ZUxpc3QiLCJzdGF0ZUxpc3RTZXQiLCJjb3VudHJ5VmFsdWUiLCJjb3VudHJ5VmFsdWVTZXQiLCJzdGF0ZVZhbHVlIiwic3RhdGVWYWx1ZVNldCIsInRhYmxlRGF0YSIsInRhYmxlRGF0YVNldCIsInRvdGFsc0RhdGEiLCJ0b3RhbHNEYXRhU2V0IiwidG90YWxzU2V0IiwiY29tcGFyZSIsImEiLCJiIiwiYVN0YXRlIiwicHJvdmluY2UiLCJiU3RhdGUiLCJjb21wYXJpc29uIiwiaGFuZGxlUHJvdmluY2VMaXN0IiwiZCIsInJlc3VsdCIsIm1hcCIsImUiLCJyZWdpb24iLCJjb3VudHJ5IiwibmFtZSIsInAiLCJzb3J0IiwiZGVmYXVsdERhdGEiLCJsb2NhbCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiZGF0ZSIsImhhbmRsZUxvY2FsRGF0YSIsImhhbmRsZUZldGNoIiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiYyIsImNvdW50cmllcyIsImhhbmRsZVRvdGFscyIsInN0b3JhZ2UiLCJ0b3RhbERhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsInMiLCJjb25maXJtZWQiLCJkZWF0aHMiLCJyZWNvdmVyZWQiLCJ1bmRlZmluZWQiLCJ0IiwidG90YWxDYXNlcyIsInRvdGFsRGVhdGhzIiwidG90YWxSZWNvdmVyZWQiLCJTZWxlY3QiLCJTd2l0Y2giLCJEYXRlUGlja2VyIiwiZGVmYXVsdFByb3ZpbmNlVmFsdWUiLCJwcm92aW5jZVRleHQiLCJwcm92aW5jZVRleHRTZXQiLCJkZWZhdWx0Q291bnRyeVZhbHVlIiwiY291bnRyeVRleHQiLCJjb3VudHJ5VGV4dFNldCIsImNoYW5nZVRoZW1lIiwiY3VyVmFsdWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaHJlZiIsInNwbGl0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZSIsInNldFByb3BlcnR5Iiwib25TZWFyY2giLCJpIiwic3RhdGVzIiwicHVzaCIsImhhbmRsZURhdGVDaGFuZ2UiLCJjaGFuZ2VDb3VudHJ5U3RhdGVWYWx1ZSIsInR5cGUiLCJDYXJkIiwiU3RhdGlzdGljIiwiQ29sdW1uIiwiVGFibGUiLCJ0YWJsZUFycmF5IiwidGFibGVBcnJheVNldCIsInRhYmxlV2lkdGgiLCJ0YWJsZVdpZHRoU2V0Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsImhhbmRsZUNvdW50eVRhYmxlcyIsIm5ld0FycmF5IiwibGVuZ3RoIiwidGVtcEFycmF5IiwiY2l0aWVzIiwidGFibGVEaXZDb3VudHkiLCJoYW5kbGVTdGF0ZVRhYmxlcyIsIngiLCJ0YWJsZURpdlN0YXRlIiwiaGFuZGxlQ291bnRyeVRhYmxlcyIsInRhYmxlRGl2Q291bnRyeSIsImhhbmRsZVRhYmxlcyIsImZvcm1hdE51bWJlciIsIm51bSIsInRvU3RyaW5nIiwicmVwbGFjZSIsImFycmF5Iiwia2V5Iiwicm93SGVpZ2h0IiwidGJsSGVpZ2h0IiwiaW5kZXgiLCJyb3dEYXRhIiwiZGF0YUtleSIsImFkZEV2ZW50TGlzdGVuZXIiXSwic291cmNlUm9vdCI6IiJ9