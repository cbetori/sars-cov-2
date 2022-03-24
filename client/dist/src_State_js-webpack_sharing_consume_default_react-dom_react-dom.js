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