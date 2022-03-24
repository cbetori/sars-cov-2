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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX1N0YXRlX2pzLXdlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QtZG9tX3JlYWN0LWRvbS5zcmNfU3RhdGVfanMtd2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdC1kb21fcmVhY3QtZG9tLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1LLEdBQUcsR0FBSUMsS0FBRCxJQUFXO0FBQ3RCLHNCQUNDLHFGQUNDLDJEQUFDLDhEQUFELE9BREQsZUFFQywyREFBQywyREFBRDtBQUFTLFNBQUssRUFBRUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDO0FBQTVCLElBRkQsZUFHQywyREFBQywyREFBRDtBQUFTLFVBQU0sRUFBRUYsS0FBSyxDQUFDQyxLQUFOLENBQVlFO0FBQTdCLElBSEQsZUFJQywyREFBQywwREFBRDtBQUFRLFNBQUssRUFBRUgsS0FBSyxDQUFDQyxLQUFOLENBQVlHO0FBQTNCLElBSkQsQ0FERDtBQVFBLENBVEQ7O0FBV0EsK0RBQWVMLEdBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1TLEtBQUssR0FBRyxNQUFNO0FBQ2xCO0FBQ0EsTUFBSUMsQ0FBQyxHQUFHRiw0Q0FBSyxHQUFHRyxRQUFSLENBQWlCLENBQWpCLEVBQW9CLE1BQXBCLEVBQTRCQyxNQUE1QixDQUFtQyxZQUFuQyxDQUFSO0FBRUEsUUFBTSxDQUFDQyxTQUFELEVBQVlDLFlBQVosSUFBNEJQLCtDQUFRLENBQUNHLENBQUQsQ0FBMUM7QUFDQSxRQUFNSyxXQUFXLEdBQUcsY0FBcEI7QUFDQSxRQUFNQyxlQUFlLEdBQUcsdUJBQXVCSCxTQUEvQztBQUVBLFFBQU0sQ0FBQ0ksV0FBRCxFQUFjQyxjQUFkLElBQWdDWCwrQ0FBUSxDQUFDLEVBQUQsQ0FBOUM7QUFDQSxRQUFNLENBQUNZLFNBQUQsRUFBWUMsWUFBWixJQUE0QmIs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Q3hHLE1BQXVLO0FBQ3ZLO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsbUpBQU87Ozs7QUFJaUg7QUFDekksT0FBTywrREFBZSxtSkFBTyxJQUFJLDBKQUFjLEdBQUcsMEpBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQjdFLDJFQUEyRTtBQUdiO0FBQ0M7QUFDdkI7QUFFeEMsSUFBTSxVQUFVLEdBQUcsOEVBQWMsQ0FBUSxvRUFBbUIsQ0FBQztBQUU3RCwrREFBZSxVQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9TdGF0ZS5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvRGlzY2xhaW1lci5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvU3VtbWFyeS5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvVGFibGVzLmpzIiwid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvaW5kZXguY3NzP2E2NGYiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9jb21wb25lbnRzL0RhdGVQaWNrZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBEaXNjbGFpbWVyIGZyb20gJy4vY29tcG9uZW50cy9EaXNjbGFpbWVyJ1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9jb21wb25lbnRzL09wdGlvbnMnXG5pbXBvcnQgU3VtbWFyeSBmcm9tICcuL2NvbXBvbmVudHMvU3VtbWFyeSdcbmltcG9ydCBUYWJsZXMgZnJvbSAnLi9jb21wb25lbnRzL1RhYmxlcydcblxuY29uc3QgQXBwID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdDxEaXNjbGFpbWVyIC8+XG5cdFx0XHQ8T3B0aW9ucyBzdGF0ZT17cHJvcHMuc3RhdGUub3B0aW9uc30gLz5cblx0XHRcdDxTdW1tYXJ5IHRvdGFscz17cHJvcHMuc3RhdGUudG90YWxzfSAvPlxuXHRcdFx0PFRhYmxlcyBzdGF0ZT17cHJvcHMuc3RhdGUudGFibGVzfSAvPlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgJy4vaW5kZXguY3NzJ1xuaW1wb3J0ICdyZWFjdC12aXJ0dWFsaXplZC9zdHlsZXMuY3NzJ1xuXG5jb25zdCBTdGF0ZSA9ICgpID0+IHtcbiAgLy9BUEkgd2l0aCBpbmZvcm1hdGlvbiBmcm9tIHByZXZpb3VzIGRheS4gVGhlIG5ld2VzdCBpbmZvcm1hdGlvbiBhbHdheXMgZXhpc3RzIGZvciB5ZXN0ZXJkYXkuXG4gIGxldCB5ID0gZGF5anMoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpXG5cbiAgY29uc3QgW2RhdGVWYWx1ZSwgZGF0ZVZhbHVlU2V0XSA9IHVzZVN0YXRlKHkpXG4gIGNvbnN0IGRhdGFEZWZhdWx0ID0gJy9hcGkvZGVmYXVsdCdcbiAgY29uc3QgZGF0YUN1c3RvbWVEYXRlID0gJy9hcGkvZGVmYXVsdC9kYXRhPScgKyBkYXRlVmFsdWVcblxuICBjb25zdCBbY291bnRyeUxpc3QsIGNvdW50cnlMaXN0U2V0XSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbc3RhdGVMaXN0LCBzdGF0ZUxpc3RTZXRdID0gdXNlU3RhdGUoW10pXG5cbiAgY29uc3QgW2NvdW50cnlWYWx1ZSwgY291bnRyeVZhbHVlU2V0XSA9IHVzZVN0YXRlKClcbiAgY29uc3QgW3N0YXRlVmFsdWUsIHN0YXRlVmFsdWVTZXRdID0gdXNlU3RhdGUoKVxuXG4gIGNvbnN0IFt0YWJsZURhdGEsIHRhYmxlRGF0YVNldF0gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgW3RvdGFsc0RhdGEsIHRvdGFsc0RhdGFTZXRdID0gdXNlU3RhdGUoe30pXG4gIGNvbnN0IFt0b3RhbHMsIHRvdGFsc1NldF0gPSB1c2VTdGF0ZSh7fSlcblxuICAvL1VzZSB0byBvcmRlciBhbiBhcnJheSBvZiBvYmplY3RzLCBpbiB0aGlzIGNhc2UgaXRzIGJ5IHN0YXRlL3Byb3ZpbmNlIHZhbHVlXG4gIC8vVXBkYXRlcyBzdGF0ZUxpc3RcbiAgbGV0IGNvbXBhcmUgPSAoYSwgYikgPT4ge1xuICAgIGxldCBhU3RhdGUgPSBhLnByb3ZpbmNlXG4gICAgbGV0IGJTdGF0ZSA9IGIucHJvdmluY2VcbiAgICBsZXQgY29tcGFyaXNvbiA9IDBcbiAgICBpZiAoYVN0YXRlID4gYlN0YXRlKSB7XG4gICAgICBjb21wYXJpc29uID0gMVxuICAgIH0gZWxzZSBpZiAoYVN0YXRlIDwgYlN0YXRlKSB7XG4gICAgICBjb21wYXJpc29uID0gLTFcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBhcmlzb25cbiAgfVxuXG4gIC8vQ3JlYXRlcyBhbiBhcnJheSB0aGF0IGhvbGRzIHVuaXF1ZSB2YWx1ZXMgb2YgYm90aCBwcm92aW5jZSBhbmQgY291bnRyeVxuICBsZXQgaGFuZGxlUHJvdmluY2VMaXN0ID0gZCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXN1bHQgPSBkLm1hcChlID0+IHtcbiAgICAgICAgaWYgKGUucmVnaW9uLnByb3ZpbmNlID09PSAnJykge1xuICAgICAgICAgIHJldHVybiB7IGNvdW50cnk6IGUucmVnaW9uLm5hbWUsIHByb3ZpbmNlOiBlLnJlZ2lvbi5uYW1lIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBjb3VudHJ5OiBlLnJlZ2lvbi5uYW1lLCBwcm92aW5jZTogZS5yZWdpb24ucHJvdmluY2UgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgbGV0IHAgPSByZXN1bHQuc29ydChjb21wYXJlKVxuICAgICAgcmV0dXJuIHBcbiAgICB9IGNhdGNoIHt9XG4gIH1cblxuICAvL0xvb2tzIGF0IGxvY2Fsc3RvcmFnZS4gT24gZXJyb3IgaXQgZG9lcyBhIGZldGNoIGZvciB0aGUgbW9zdCBjdXJyZW50IGRhdGFcbiAgLy9JZiBsb2NhbHN0b2FnZSBoYXMgdmFsdWVzIGFuZCBpZiBkYXRlVmFsdWUgPT09IGxvY2FsU3RvcmFnZSBkYXRlIHRoZW4gbG9jYWxTdG9yYWdlIGluZm9ybWF0aW9uIGlzIHVzZWRcbiAgLy9UaGlzIGZpcmVzIG9ubHkgd2hlbiB0aGUgZGF0ZVZhbHVlIGNoYW5nZXNcbiAgbGV0IGRlZmF1bHREYXRhID0gKCkgPT4ge1xuICAgIGxldCBsb2NhbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdG9yYWdlJylcbiAgICBsb2NhbCA9IEpTT04ucGFyc2UobG9jYWwpXG4gICAgdHJ5IHtcbiAgICAgIGlmIChsb2NhbC5kYXRhWzBdLmRhdGUgPT09IGRhdGVWYWx1ZSkge1xuICAgICAgICBoYW5kbGVMb2NhbERhdGEobG9jYWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGF0ZVZhbHVlID09PSB5KSB7XG4gICAgICAgICAgaGFuZGxlRmV0Y2goZGF0YURlZmF1bHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlRmV0Y2goZGF0YUN1c3RvbWVEYXRlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICBoYW5kbGVGZXRjaChkYXRhRGVmYXVsdClcbiAgICB9XG4gIH1cblxuICAvL0hhbmRsZXMgYWN0dWFsIGZldGNoIHJlcXVlc3QuIElmIHRoZXkgZGF0ZSA9IHllc3RlcmRheSBpdCB3aWxsIHB1bGwgdGhlIG5ld2VzdCBwb3NzaWJsZSBpbmZvcm1hdGlvbi5cbiAgLy9JZiBkYXRhVmFsdWUgIT09IHllc3RlcmRheSB0aGFuIGN1c3RvbWUgZmV0Y2ggYnkgZGF0ZSBpcyBwZXJmb3JtZWQuXG4gIC8vRGF0YSBpcyBzdG9yZWQgaW4gbG9jYWxTdG9yYWdlIHRvIHNwZWVkIHVwIGxvYWQgZm9yIHJlcGVhdCB2aXN0b3JzLlxuICBsZXQgaGFuZGxlRmV0Y2ggPSB1cmwgPT4ge1xuICAgIGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmRhdGEuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgIGxldCBjID0gZGF0YS5jb3VudHJpZXNcbiAgICAgICAgICBsZXQgcCA9IGhhbmRsZVByb3ZpbmNlTGlzdChkYXRhLmRhdGEuZGF0YSlcbiAgICAgICAgICBoYW5kbGVUb3RhbHMoZGF0YS50b3RhbHMsIGNvdW50cnlWYWx1ZSwgc3RhdGVWYWx1ZSlcbiAgICAgICAgICBjb3VudHJ5TGlzdFNldChjKVxuICAgICAgICAgIHN0YXRlTGlzdFNldChwKVxuICAgICAgICAgIHRvdGFsc0RhdGFTZXQoZGF0YS50b3RhbHMpXG4gICAgICAgICAgdGFibGVEYXRhU2V0KGRhdGEuZGF0YS5kYXRhKVxuXG4gICAgICAgICAgbGV0IHN0b3JhZ2UgPSB7XG4gICAgICAgICAgICBjb3VudHJ5OiBjLFxuICAgICAgICAgICAgcHJvdmluY2U6IHAsXG4gICAgICAgICAgICB0b3RhbERhdGE6IGRhdGEudG90YWxzLFxuICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLmRhdGEsXG4gICAgICAgICAgfVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSkpXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG5cbiAgLy9BZGQgYWxsIGZldGNoIHJlcXVlc3QgZGF0YSB0byBsb2NhbCBzdG9yYWdlLlxuICBsZXQgaGFuZGxlTG9jYWxEYXRhID0gbG9jYWwgPT4ge1xuICAgIGNvdW50cnlMaXN0U2V0KGxvY2FsLmNvdW50cnkpXG4gICAgc3RhdGVMaXN0U2V0KGxvY2FsLnByb3ZpbmNlKVxuICAgIHRvdGFsc0RhdGFTZXQobG9jYWwudG90YWxEYXRhKVxuICAgIGhhbmRsZVRvdGFscyhsb2NhbC50b3RhbERhdGEsIGNvdW50cnlWYWx1ZSwgc3RhdGVWYWx1ZSlcbiAgICB0YWJsZURhdGFTZXQobG9jYWwuZGF0YSlcbiAgfVxuXG4gIC8vSGFuZGxlcyBhbGwgdG90YWwgdmFsdWVzLiBGaXJlZCB3aGVuIGRhdGVWYWx1ZSwgc3RhdGVWYWx1ZSwgb3IgY291bnRyeVZhdWUgY2hhbmdlc1xuICBsZXQgaGFuZGxlVG90YWxzID0gKGQsIGMsIHMpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGNvbmZpcm1lZCA9IDBcbiAgICAgIGxldCBkZWF0aHMgPSAwXG4gICAgICBsZXQgcmVjb3ZlcmVkID0gMFxuICAgICAgaWYgKGMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25maXJtZWQgPSBkWydBbGwnXS5jb25maXJtZWRcbiAgICAgICAgZGVhdGhzID0gZFsnQWxsJ10uZGVhdGhzXG4gICAgICAgIHJlY292ZXJlZCA9IGRbJ0FsbCddLnJlY292ZXJlZFxuICAgICAgfSBlbHNlIGlmIChjICE9PSB1bmRlZmluZWQgJiYgcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbmZpcm1lZCA9IGRbY10uY29uZmlybWVkXG4gICAgICAgIGRlYXRocyA9IGRbY10uZGVhdGhzXG4gICAgICAgIHJlY292ZXJlZCA9IGRbY10ucmVjb3ZlcmVkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25maXJtZWQgPSBkW2NdW3NdLmNvbmZpcm1lZFxuICAgICAgICBkZWF0aHMgPSBkW2NdW3NdLmRlYXRoc1xuICAgICAgICByZWNvdmVyZWQgPSBkW2NdW3NdLnJlY292ZXJlZFxuICAgICAgfVxuICAgICAgbGV0IHQgPSB7XG4gICAgICAgIHRvdGFsQ2FzZXM6IGNvbmZpcm1lZCxcbiAgICAgICAgdG90YWxEZWF0aHM6IGRlYXRocyxcbiAgICAgICAgdG90YWxSZWNvdmVyZWQ6IHJlY292ZXJlZCxcbiAgICAgIH1cbiAgICAgIHRvdGFsc1NldCh0KVxuICAgICAgcmV0dXJuIHRcbiAgICB9IGNhdGNoIHt9XG4gIH1cblxuICAvL0hvbGRzIG1ha2VzaGlmdCBzdGF0ZSBhbmQgY2FuIGJlIHVzZWQgdG8gcGFzcyBkb3duIHRvIGNoaWxkcmVuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNvdW50cnlWYWx1ZTogY291bnRyeVZhbHVlLFxuICAgICAgY291bnRyeVZhbHVlU2V0OiBjb3VudHJ5VmFsdWVTZXQsXG4gICAgICBzdGF0ZVZhbHVlOiBzdGF0ZVZhbHVlLFxuICAgICAgc3RhdGVWYWx1ZVNldDogc3RhdGVWYWx1ZVNldCxcbiAgICAgIGRhdGVWYWx1ZTogZGF0ZVZhbHVlLFxuICAgICAgZGF0ZVZhbHVlU2V0OiBkYXRlVmFsdWVTZXQsXG4gICAgICBjb3VudHJ5TGlzdDogY291bnRyeUxpc3QsXG4gICAgICBzdGF0ZUxpc3Q6IHN0YXRlTGlzdCxcbiAgICB9LFxuICAgIHRhYmxlczoge1xuICAgICAgdGFibGVEYXRhOiB0YWJsZURhdGEsXG4gICAgICBjb3VudHJ5VmFsdWU6IGNvdW50cnlWYWx1ZSxcbiAgICAgIGNvdW50cnlMaXN0OiBjb3VudHJ5TGlzdCxcbiAgICAgIHN0YXRlVmFsdWU6IHN0YXRlVmFsdWUsXG4gICAgICBzdGF0ZUxpc3Q6IHN0YXRlTGlzdCxcbiAgICB9LFxuICAgIHRvdGFsczogdG90YWxzLFxuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkZWZhdWx0RGF0YSgpXG4gIH0sIFtkYXRlVmFsdWVdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvdW50cnlWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVUb3RhbHModG90YWxzRGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlVG90YWxzKHRvdGFsc0RhdGEsIGNvdW50cnlWYWx1ZSlcbiAgICB9XG4gIH0sIFtjb3VudHJ5VmFsdWVdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHN0YXRlVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlVG90YWxzKHRvdGFsc0RhdGEsIGNvdW50cnlWYWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgaGFuZGxlVG90YWxzKHRvdGFsc0RhdGEsIGNvdW50cnlWYWx1ZSwgc3RhdGVWYWx1ZSlcbiAgICB9XG4gIH0sIFtzdGF0ZVZhbHVlXSlcblxuICByZXR1cm4gPEFwcCBzdGF0ZT17c3RhdGV9IC8+XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IERpc2NsYWltZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGlkPSdkaXNjbGFpbWVyJz5cblx0XHRcdDxkaXYgaWQ9J2Rpc2NsYWltZXItZGV0YWlsJz5cblx0XHRcdFx0RGlzY2xhaW1lcjogSSBkbyBub3Qgb3duIG5vciBkbyBJIG1haW50YWluIHRoaXMgZGF0YS4gVG8gZW5zdXJlIHlvdSBhcmVcblx0XHRcdFx0Z2V0dGluZyB0aGUgYmVzdCBpbmZvcm1hdGlvbiBwbGVhc2UgbG9vayB0byBhdXRob3JpdGF0aXZlIHNvdXJjZXMuXG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgaWQ9J2Rpc2NsYWltZXItbGlua3MnPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rLWhlYWQnPkRhdGEgc291cmNlOjwvZGl2PlxuXHRcdFx0XHQ8YVxuXHRcdFx0XHRcdGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rcy1hZGRyZXNzJ1xuXHRcdFx0XHRcdGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9DU1NFR0lTYW5kRGF0YS9DT1ZJRC0xOSdcblx0XHRcdFx0PlxuXHRcdFx0XHRcdEpvaG4gSG9wa2luc1xuXHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmstaGVhZCc+QVBJIFNvdXJjZTo8L2Rpdj5cblx0XHRcdFx0PGFcblx0XHRcdFx0XHRjbGFzc05hbWU9J2Rpc2NsYWltZXItbGlua3MtYWRkcmVzcydcblx0XHRcdFx0XHRocmVmPSdodHRwczovL3JhcGlkYXBpLmNvbS9heGlzYml0cy1heGlzYml0cy1kZWZhdWx0L2FwaS9jb3ZpZC0xOS1zdGF0aXN0aWNzL2VuZHBvaW50cydcblx0XHRcdFx0PlxuXHRcdFx0XHRcdFJhcGlkQVBJIC0gQXhpc2JpdHNcblx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8ZGl2IGlkPSdkaXNjbGFpbWVyLWF1dGhvcml0YXRpdmUnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmstaGVhZCc+XG5cdFx0XHRcdFx0XHRBZGRpdGlvbmFsIFN1cHBvcnQgb24gU2Fycy1Db3YtMjpcblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8YVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmtzLWFkZHJlc3MnXG5cdFx0XHRcdFx0XHRocmVmPScgICAgICAgICAgICAgICAgaHR0cHM6Ly93d3cuY2RjLmdvdi9jb3JvbmF2aXJ1cy8yMDE5LW5Db3YvaW5kZXguaHRtbCdcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRDRENcblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdDxhXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9J2Rpc2NsYWltZXItbGlua3MtYWRkcmVzcydcblx0XHRcdFx0XHRcdGhyZWY9J2h0dHBzOi8vd3d3Lndoby5pbnQvZW1lcmdlbmNpZXMvZGlzZWFzZXMvbm92ZWwtY29yb25hdmlydXMtMjAxOSdcblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRXSE9cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlzY2xhaW1lclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgU2VsZWN0IGZyb20gJ2FudGQvZXMvc2VsZWN0J1xuaW1wb3J0IFN3aXRjaCBmcm9tICdhbnRkL2VzL3N3aXRjaCdcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gJy4vRGF0ZVBpY2tlcidcblxuY29uc3QgT3B0aW9ucyA9IChwcm9wcykgPT4ge1xuXHRjb25zdCBkZWZhdWx0UHJvdmluY2VWYWx1ZSA9ICdTZWxlY3QgYSBzdGF0ZS9wcm92aW5jZSdcblx0Y29uc3QgW3Byb3ZpbmNlVGV4dCwgcHJvdmluY2VUZXh0U2V0XSA9IHVzZVN0YXRlKGRlZmF1bHRQcm92aW5jZVZhbHVlKVxuXHRjb25zdCBkZWZhdWx0Q291bnRyeVZhbHVlID0gJ1NlbGVjdCBhIENvdW50cnknXG5cdGNvbnN0IFtjb3VudHJ5VGV4dCwgY291bnRyeVRleHRTZXRdID0gdXNlU3RhdGUoZGVmYXVsdENvdW50cnlWYWx1ZSlcblxuXHQvL1VzZWQgdG8gaGFuZGxlIHRoZW1lLiBTaW1wbHkgY2hhbmdlcyBocmVmIG9mIGxpbmsgY29tcG9uZW50IGluIGluZGV4Lmh0bWxcblx0Ly9UaGVyZSBzaG91bGQgYmUgYSBiZXR0ZXIgd2F5IG9mIGhhbmRsZSBhcGFydCBmcm9tIGZ1bGx5IHJlbG9hZGluZyBjc3Ncblx0bGV0IGNoYW5nZVRoZW1lID0gKCkgPT4ge1xuXHRcdGxldCBjdXJWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZScpLmhyZWZcblx0XHRjdXJWYWx1ZSA9IGN1clZhbHVlLnNwbGl0KCcvJylbM11cblx0XHRpZiAoY3VyVmFsdWUgPT09ICdhbnRkLmNzcycpIHtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZScpLmhyZWYgPSAnYW50ZC5kYXJrLmNzcydcblx0XHRcdGRvY3VtZW50XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG5cdFx0XHRcdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zY3JvbGx0cmFjaycsICcjMTQxNDE0Jylcblx0XHRcdGRvY3VtZW50XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG5cdFx0XHRcdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1ib3JkZXItY29sb3InLCAnIzMwMzAzMCcpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZScpLmhyZWYgPSAnYW50ZC5jc3MnXG5cdFx0XHRkb2N1bWVudFxuXHRcdFx0XHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuXHRcdFx0XHQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Nyb2xsdHJhY2snLCAnd2hpdGUnKVxuXHRcdFx0ZG9jdW1lbnRcblx0XHRcdFx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cblx0XHRcdFx0LnN0eWxlLnNldFByb3BlcnR5KCctLWJvcmRlci1jb2xvcicsICcjZjBmMGYwJylcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBvblNlYXJjaCgpIHt9XG5cdGxldCBjb3VudHJpZXMgPSBwcm9wcy5zdGF0ZS5jb3VudHJ5TGlzdC5tYXAoKGUsIGkpID0+IHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFNlbGVjdC5PcHRpb24ga2V5PXtpfSB2YWx1ZT17ZX0+XG5cdFx0XHRcdHtlfVxuXHRcdFx0PC9TZWxlY3QuT3B0aW9uPlxuXHRcdClcblx0fSlcblxuXHRsZXQgc3RhdGVzID0gcHJvcHMuc3RhdGUuc3RhdGVMaXN0Lm1hcCgoZSwgaSkgPT4ge1xuXHRcdGxldCByZXN1bHQgPSBbXVxuXHRcdGlmIChlLmNvdW50cnkgPT09IHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZSkge1xuXHRcdFx0cmVzdWx0LnB1c2goXG5cdFx0XHRcdDxTZWxlY3QuT3B0aW9uIGtleT17aX0gdmFsdWU9e2UucHJvdmluY2V9PlxuXHRcdFx0XHRcdHtlLnByb3ZpbmNlfVxuXHRcdFx0XHQ8L1NlbGVjdC5PcHRpb24+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fSlcblxuXHRsZXQgaGFuZGxlRGF0ZUNoYW5nZSA9IChlLCBzKSA9PiB7XG5cdFx0bGV0IHkgPSBkYXlqcyhzKS5mb3JtYXQoJ1lZWVktTU0tREQnKVxuXHRcdHByb3BzLnN0YXRlLmRhdGVWYWx1ZVNldCh5KVxuXHR9XG5cblx0bGV0IGNoYW5nZUNvdW50cnlTdGF0ZVZhbHVlID0gKGUsIHR5cGUpID0+IHtcblx0XHRpZiAodHlwZSA9PT0gJ2NvdW50cnknKSB7XG5cdFx0XHRpZiAoZSA9PT0gJ0FsbCcpIHtcblx0XHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZVNldCh1bmRlZmluZWQpXG5cdFx0XHRcdHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZVNldCh1bmRlZmluZWQpXG5cdFx0XHRcdGNvdW50cnlUZXh0U2V0KGRlZmF1bHRDb3VudHJ5VmFsdWUpXG5cdFx0XHRcdHByb3ZpbmNlVGV4dFNldChkZWZhdWx0UHJvdmluY2VWYWx1ZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZVNldChlKVxuXHRcdFx0XHRjb3VudHJ5VGV4dFNldChlKVxuXHRcdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlU2V0KHVuZGVmaW5lZClcblx0XHRcdFx0cHJvdmluY2VUZXh0U2V0KGRlZmF1bHRQcm92aW5jZVZhbHVlKVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZSA9PT0gJ0FsbCcpIHtcblx0XHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZVNldCh1bmRlZmluZWQpXG5cdFx0XHRcdHByb3ZpbmNlVGV4dFNldChkZWZhdWx0UHJvdmluY2VWYWx1ZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWVTZXQoZSlcblx0XHRcdFx0cHJvdmluY2VUZXh0U2V0KGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGlkPSdvcHRpb25zJz5cblx0XHRcdDxkaXYgaWQ9J29wdGlvbnMtdGhlbWUnPlxuXHRcdFx0XHQ8U3dpdGNoIG9uQ2hhbmdlPXsoKSA9PiBjaGFuZ2VUaGVtZSgpfSAvPlxuXHRcdFx0XHRMaWdodC9EYXJrXG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxEYXRlUGlja2VyXG5cdFx0XHRcdHRoZW1lPSdkYXJrJ1xuXHRcdFx0XHRwaWNrZXI9J2RhdGUnXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZT17ZGF5anMocHJvcHMuc3RhdGUuZGF0ZVZhbHVlLCAnWVlZWS1NTS1ERCcpfVxuXHRcdFx0XHRvbkNoYW5nZT17KGUsIHMpID0+IGhhbmRsZURhdGVDaGFuZ2UoZSwgcyl9XG5cdFx0XHRcdGZvcm1hdD17J1lZWVktTU0tREQnfVxuXHRcdFx0XHRjbGFzc05hbWU9J29wdGlvbnMtaW5wdXRzJ1xuXHRcdFx0Lz5cblx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0c2hvd1NlYXJjaFxuXHRcdFx0XHRvcHRpb25GaWx0ZXJQcm9wPSdjaGlsZHJlbidcblx0XHRcdFx0b25TZWFyY2g9e29uU2VhcmNofVxuXHRcdFx0XHR2YWx1ZT17Y291bnRyeVRleHR9XG5cdFx0XHRcdGNsYXNzTmFtZT0nb3B0aW9ucy1pbnB1dHMnXG5cdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gY2hhbmdlQ291bnRyeVN0YXRlVmFsdWUoZSwgJ2NvdW50cnknKX1cblx0XHRcdD5cblx0XHRcdFx0PFNlbGVjdC5PcHRpb24gdmFsdWU9eydBbGwnfT5BbGw8L1NlbGVjdC5PcHRpb24+XG5cdFx0XHRcdHtjb3VudHJpZXN9XG5cdFx0XHQ8L1NlbGVjdD5cblx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0c2hvd1NlYXJjaFxuXHRcdFx0XHRvcHRpb25GaWx0ZXJQcm9wPSdjaGlsZHJlbidcblx0XHRcdFx0b25TZWFyY2g9e29uU2VhcmNofVxuXHRcdFx0XHR2YWx1ZT17cHJvdmluY2VUZXh0fVxuXHRcdFx0XHRjbGFzc05hbWU9J29wdGlvbnMtaW5wdXRzJ1xuXHRcdFx0XHRvbkNoYW5nZT17KGUpID0+IGNoYW5nZUNvdW50cnlTdGF0ZVZhbHVlKGUsICdzdGF0ZScpfVxuXHRcdFx0PlxuXHRcdFx0XHQ8U2VsZWN0Lk9wdGlvbiB2YWx1ZT17J0FsbCd9PkFsbDwvU2VsZWN0Lk9wdGlvbj5cblx0XHRcdFx0e3N0YXRlc31cblx0XHRcdDwvU2VsZWN0PlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9wdGlvbnNcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENhcmQsIFN0YXRpc3RpYyB9IGZyb20gJ2FudGQnXG5cbmNvbnN0IFN1bW1hcnkgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGlkPSdzdW1tYXJ5Jz5cblx0XHRcdDxDYXJkIGlkPSdzdW1tYXJ5LWNhcmQnPlxuXHRcdFx0XHQ8U3RhdGlzdGljIHRpdGxlPSdUb3RhbCBDYXNlcycgdmFsdWU9e3Byb3BzLnRvdGFscy50b3RhbENhc2VzfSAvPlxuXHRcdFx0XHQ8U3RhdGlzdGljIHRpdGxlPSdUb3RhbCBSZWNvdmVyZCcgdmFsdWU9e3Byb3BzLnRvdGFscy50b3RhbFJlY292ZXJlZH0gLz5cblx0XHRcdFx0PFN0YXRpc3RpYyB0aXRsZT0nVG90YWwgRGVhdGhzJyB2YWx1ZT17cHJvcHMudG90YWxzLnRvdGFsRGVhdGhzfSAvPlxuXHRcdFx0PC9DYXJkPlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1bW1hcnlcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDb2x1bW4sIFRhYmxlIH0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQnXG5cbmNvbnN0IFRhYmxlcyA9IChwcm9wcykgPT4ge1xuXHRjb25zdCBbdGFibGVBcnJheSwgdGFibGVBcnJheVNldF0gPSB1c2VTdGF0ZShbXSlcblx0Y29uc3QgW3RhYmxlV2lkdGgsIHRhYmxlV2lkdGhTZXRdID0gdXNlU3RhdGUod2luZG93LmlubmVyV2lkdGggKiAwLjc1KVxuXG5cdC8vVXNlZCB0byBvcmRlciB0YWJsZSBkYXRhIGJ5IGNvbmZpcm1hdGlvbnMgb2YgY2FzZXNcblx0ZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG5cdFx0bGV0IGFTdGF0ZSA9IGEuY29uZmlybWVkXG5cdFx0bGV0IGJTdGF0ZSA9IGIuY29uZmlybWVkXG5cdFx0bGV0IGNvbXBhcmlzb24gPSAwXG5cdFx0aWYgKGFTdGF0ZSA+IGJTdGF0ZSkge1xuXHRcdFx0Y29tcGFyaXNvbiA9IC0xXG5cdFx0fSBlbHNlIGlmIChhU3RhdGUgPCBiU3RhdGUpIHtcblx0XHRcdGNvbXBhcmlzb24gPSAxXG5cdFx0fVxuXHRcdHJldHVybiBjb21wYXJpc29uXG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvL0NyZWF0ZSBwcm9wZXIgYXJyYXlcblx0Ly9JRiBTVEFURSBBTkQgUFJPVklORU5DRSBBUkUgQ0hPU0VOXG5cdGNvbnN0IGhhbmRsZUNvdW50eVRhYmxlcyA9ICgpID0+IHtcblx0XHRsZXQgbmV3QXJyYXkgPSBbXVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc3RhdGUudGFibGVEYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgdGVtcEFycmF5ID0gW11cblx0XHRcdGlmIChcblx0XHRcdFx0cHJvcHMuc3RhdGUudGFibGVEYXRhW2ldLmNvdW50cnkgPT09IHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZSAmJlxuXHRcdFx0XHRwcm9wcy5zdGF0ZS50YWJsZURhdGFbaV0ucHJvdmluY2UgPT09IHByb3BzLnN0YXRlLnN0YXRlVmFsdWVcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAocHJvcHMuc3RhdGUudGFibGVEYXRhW2ldLnJlZ2lvbi5jaXRpZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGVtcEFycmF5LnB1c2gocHJvcHMuc3RhdGUudGFibGVEYXRhW2ldKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRlbXBBcnJheSA9IHByb3BzLnN0YXRlLnRhYmxlRGF0YVtpXS5yZWdpb24uY2l0aWVzXG5cdFx0XHRcdH1cblx0XHRcdFx0dGVtcEFycmF5LnNvcnQoY29tcGFyZSlcblx0XHRcdFx0bGV0IHJlc3VsdCA9IHRhYmxlRGl2Q291bnR5KHRlbXBBcnJheSwgaSlcblx0XHRcdFx0bmV3QXJyYXkucHVzaChyZXN1bHQpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBuZXdBcnJheVxuXHR9XG5cblx0Ly9JRiBKVVNUIFNUQVRFL1BST1ZJTkVOQ0UgSVMgQ0hPU0VOXG5cdGNvbnN0IGhhbmRsZVN0YXRlVGFibGVzID0gKCkgPT4ge1xuXHRcdGxldCBuZXdBcnJheSA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zdGF0ZS5zdGF0ZUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCB0ZW1wQXJyYXkgPSBbXVxuXHRcdFx0Zm9yIChsZXQgeCA9IDA7IHggPCBwcm9wcy5zdGF0ZS50YWJsZURhdGEubGVuZ3RoOyB4KyspIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3BzLnN0YXRlLnRhYmxlRGF0YVt4XS5wcm92aW5jZSA9PT1cblx0XHRcdFx0XHRcdHByb3BzLnN0YXRlLnN0YXRlTGlzdFtpXS5wcm92aW5jZSAmJlxuXHRcdFx0XHRcdHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZSA9PT0gcHJvcHMuc3RhdGUuc3RhdGVMaXN0W2ldLmNvdW50cnlcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0aWYgKHByb3BzLnN0YXRlLnRhYmxlRGF0YVt4XS5yZWdpb24uY2l0aWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0dGVtcEFycmF5LnB1c2gocHJvcHMuc3RhdGUudGFibGVEYXRhW3hdKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0ZW1wQXJyYXkgPSBwcm9wcy5zdGF0ZS50YWJsZURhdGFbeF0ucmVnaW9uLmNpdGllc1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0ZW1wQXJyYXkuc29ydChjb21wYXJlKVxuXHRcdFx0XHRcdGxldCByZXN1bHQgPSB0YWJsZURpdlN0YXRlKHRlbXBBcnJheSwgeClcblx0XHRcdFx0XHRuZXdBcnJheS5wdXNoKHJlc3VsdClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbmV3QXJyYXlcblx0fVxuXHQvL0lGIE5PIFNUQVRFIE9SIFBST1ZJTkVOQ0UgQVJFIENIT1NFTiAoR0xPQkFMIFZJRVcpXG5cdGNvbnN0IGhhbmRsZUNvdW50cnlUYWJsZXMgPSAoKSA9PiB7XG5cdFx0bGV0IG5ld0FycmF5ID0gW11cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnN0YXRlLmNvdW50cnlMaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgdGVtcEFycmF5ID0gW11cblx0XHRcdGZvciAobGV0IHggPSAwOyB4IDwgcHJvcHMuc3RhdGUudGFibGVEYXRhLmxlbmd0aDsgeCsrKSB7XG5cdFx0XHRcdGlmIChwcm9wcy5zdGF0ZS50YWJsZURhdGFbeF0uY291bnRyeSA9PT0gcHJvcHMuc3RhdGUuY291bnRyeUxpc3RbaV0pIHtcblx0XHRcdFx0XHR0ZW1wQXJyYXkucHVzaChwcm9wcy5zdGF0ZS50YWJsZURhdGFbeF0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRlbXBBcnJheS5zb3J0KGNvbXBhcmUpXG5cdFx0XHRsZXQgcmVzdWx0ID0gdGFibGVEaXZDb3VudHJ5KHRlbXBBcnJheSwgaSlcblx0XHRcdG5ld0FycmF5LnB1c2gocmVzdWx0KVxuXHRcdH1cblx0XHQvLyB0YWJsZUFycmF5U2V0KG5ld0FycmF5KVxuXHRcdHJldHVybiBuZXdBcnJheVxuXHRcdC8vIGNyZWF0ZVVuaXF1ZUFycmF5KCdjb3VudHJ5X3JlZ2lvbicpXG5cdH1cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly9EZXRlcm1pbmUgaG93IHRvIGZpbHRlciBkYXRhXG5cdGNvbnN0IGhhbmRsZVRhYmxlcyA9ICgpID0+IHtcblx0XHRpZiAoXG5cdFx0XHRwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gaGFuZGxlQ291bnR5VGFibGVzKClcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0cHJvcHMuc3RhdGUuY291bnRyeVZhbHVlICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWUgPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhbmRsZVN0YXRlVGFibGVzKClcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0cHJvcHMuc3RhdGUuY291bnRyeVZhbHVlID09PSB1bmRlZmluZWQgJiZcblx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWUgPT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGhhbmRsZUNvdW50cnlUYWJsZXMoKVxuXHRcdH1cblx0fVxuXG5cdC8vQ2xlYW5zIHVwIG51bWJlcnMgaW4gdGFibGUgdG8gYWRkIGNvbW1hc1xuXHRjb25zdCBmb3JtYXROdW1iZXIgPSAobnVtKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBudW0udG9TdHJpbmcoKS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyg/IVxcZCkpL2csICckMSwnKVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIG51bVxuXHRcdH1cblx0fVxuXG5cdC8vVGhlIHRhYmxlcyBoYXZlIGRpZmZlcmVudCBjb2x1bW5zIGJhc2VkIG9uIHdoYXQgZmlsdGVycyBhcmUgcGlja2VkLlxuXHRjb25zdCB0YWJsZURpdkNvdW50cnkgPSAoYXJyYXksIGtleSkgPT4ge1xuXHRcdGxldCByb3dIZWlnaHQgPSAzMFxuXHRcdGxldCB0YmxIZWlnaHRcblx0XHRpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0YmxIZWlnaHQgPSA4MFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YmxIZWlnaHQgPSAzMFxuXHRcdH1cblx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCA2MDApIHtcblx0XHRcdHRibEhlaWdodCA9IHRibEhlaWdodCAvIDEuNVxuXHRcdFx0cm93SGVpZ2h0ID0gcm93SGVpZ2h0IC8gMS41XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9J3RhYmxlcy1pbmRpdmlkdWFsJz5cblx0XHRcdFx0XHQ8VGFibGVcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ndGFibGVzLXZpcnR1YWxpemVkJ1xuXHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGh9XG5cdFx0XHRcdFx0XHRoZWFkZXI9eydDb3VudHJ5J31cblx0XHRcdFx0XHRcdGhlaWdodD17YXJyYXkubGVuZ3RoICogdGJsSGVpZ2h0fVxuXHRcdFx0XHRcdFx0aGVhZGVySGVpZ2h0PXs1MH1cblx0XHRcdFx0XHRcdHJvd0hlaWdodD17cm93SGVpZ2h0fVxuXHRcdFx0XHRcdFx0cm93Q291bnQ9e2FycmF5Lmxlbmd0aH1cblx0XHRcdFx0XHRcdHJvd0dldHRlcj17KHsgaW5kZXggfSkgPT4gYXJyYXlbaW5kZXhdfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxDb2x1bW4gd2lkdGg9e3RhYmxlV2lkdGggLyA1fSBsYWJlbD0nQ291bnRyeScgZGF0YUtleT0nY291bnRyeScgLz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nUHJvdmluY2UgLyBTdGF0ZSdcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0ncHJvdmluY2UnXG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdDb25maXJtZWQnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2NvbmZpcm1lZCdcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nQWN0aXZlJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdhY3RpdmUnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0RlYXRocydcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nZGVhdGhzJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH0gY2F0Y2gge31cblx0fVxuXG5cdGNvbnN0IHRhYmxlRGl2U3RhdGUgPSAoYXJyYXksIGtleSkgPT4ge1xuXHRcdGxldCByb3dIZWlnaHQgPSAzMFxuXHRcdGxldCB0YmxIZWlnaHRcblx0XHRpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0YmxIZWlnaHQgPSA4MFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YmxIZWlnaHQgPSAzMFxuXHRcdH1cblx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCA2MDApIHtcblx0XHRcdHRibEhlaWdodCA9IHRibEhlaWdodCAvIDEuNVxuXHRcdFx0cm93SGVpZ2h0ID0gcm93SGVpZ2h0IC8gMS41XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9J3RhYmxlcy1pbmRpdmlkdWFsJz5cblx0XHRcdFx0XHQ8VGFibGVcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ndGFibGVzLXZpcnR1YWxpemVkJ1xuXHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGh9XG5cdFx0XHRcdFx0XHRoZWFkZXI9eydDb3VudHJ5J31cblx0XHRcdFx0XHRcdGhlaWdodD17YXJyYXkubGVuZ3RoICogdGJsSGVpZ2h0fVxuXHRcdFx0XHRcdFx0aGVhZGVySGVpZ2h0PXs1MH1cblx0XHRcdFx0XHRcdHJvd0hlaWdodD17cm93SGVpZ2h0fVxuXHRcdFx0XHRcdFx0cm93Q291bnQ9e2FycmF5Lmxlbmd0aH1cblx0XHRcdFx0XHRcdHJvd0dldHRlcj17KHsgaW5kZXggfSkgPT4gYXJyYXlbaW5kZXhdfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nUHJvdmluY2UgLyBTdGF0ZSdcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0ncHJvdmluY2UnXG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PENvbHVtbiB3aWR0aD17dGFibGVXaWR0aCAvIDZ9IGxhYmVsPSdDb3VudHknIGRhdGFLZXk9J25hbWUnIC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0NvbmZpcm1lZCdcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nY29uZmlybWVkJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdEZWF0aHMnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2RlYXRocydcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8L1RhYmxlPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9IGNhdGNoIHt9XG5cdH1cblxuXHRjb25zdCB0YWJsZURpdkNvdW50eSA9IChhcnJheSwga2V5KSA9PiB7XG5cdFx0bGV0IHJvd0hlaWdodCA9IDMwXG5cdFx0bGV0IHRibEhlaWdodFxuXHRcdGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRibEhlaWdodCA9IDgwXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRibEhlaWdodCA9IDMwXG5cdFx0fVxuXG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjAwKSB7XG5cdFx0XHR0YmxIZWlnaHQgPSB0YmxIZWlnaHQgLyAxLjVcblx0XHRcdHJvd0hlaWdodCA9IHJvd0hlaWdodCAvIDEuNVxuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPSd0YWJsZXMtaW5kaXZpZHVhbCc+XG5cdFx0XHRcdFx0PFRhYmxlXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9J3RhYmxlcy12aXJ0dWFsaXplZCdcblx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aGVhZGVyPXsnQ291bnRyeSd9XG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2FycmF5Lmxlbmd0aCAqIHRibEhlaWdodH1cblx0XHRcdFx0XHRcdGhlYWRlckhlaWdodD17NTB9XG5cdFx0XHRcdFx0XHRyb3dIZWlnaHQ9e3Jvd0hlaWdodH1cblx0XHRcdFx0XHRcdHJvd0NvdW50PXthcnJheS5sZW5ndGh9XG5cdFx0XHRcdFx0XHRyb3dHZXR0ZXI9eyh7IGluZGV4IH0pID0+IGFycmF5W2luZGV4XX1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uIHdpZHRoPXt0YWJsZVdpZHRoIC8gNH0gbGFiZWw9J0NvdW50eScgZGF0YUtleT0nbmFtZScgLz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA0fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nQ29uZmlybWVkJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdjb25maXJtZWQnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNH1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0RlYXRocydcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nZGVhdGhzJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH0gY2F0Y2gge31cblx0fVxuXG5cdHVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0dGFibGVBcnJheVNldChoYW5kbGVUYWJsZXMoKSlcblx0fSwgW3Byb3BzXSlcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuXHRcdHRhYmxlV2lkdGhTZXQod2luZG93LmlubmVyV2lkdGggKiAwLjc1KVxuXHR9KVxuXG5cdHJldHVybiA8ZGl2IGlkPSd0YWJsZXMnPnt0YWJsZUFycmF5fTwvZGl2PlxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZXNcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiaHRtbCB7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsICdPeHlnZW4nLCAnVWJ1bnR1JywgJ0NhbnRhcmVsbCcsICdGaXJhIFNhbnMnLCAnRHJvaWQgU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAtLXNjcm9sbHRyYWNrOiB3aGl0ZTtcXG4gIC0tYm9yZGVyLWNvbG9yOiAjZjBmMGYwO1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5jb2RlIHtcXG4gIGZvbnQtZmFtaWx5OiBzb3VyY2UtY29kZS1wcm8sIE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAnQ291cmllciBOZXcnLCBtb25vc3BhY2U7XFxufVxcbiNkaXNjbGFpbWVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZGUzYztcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IDEuNXZtaW47XFxufVxcbiNkaXNjbGFpbWVyLWRldGFpbCB7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuI2Rpc2NsYWltZXItbGlua3Mge1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuI2Rpc2NsYWltZXItYXV0aG9yaXRhdGl2ZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4uZGlzY2xhaW1lci1saW5rLWhlYWQge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcbi5kaXNjbGFpbWVyLWxpbmtzLWFkZHJlc3Mge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcbiNvcHRpb25zIHtcXG4gIGZvbnQtc2l6ZTogMS4xdm1pbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgcG9zaXRpb246IHN0aWNreTtcXG4gIHRvcDogMDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHotaW5kZXg6IDEwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Nyb2xsdHJhY2spO1xcbn1cXG4jb3B0aW9ucy10aGVtZSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5vcHRpb25zLWlucHV0cyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuI3N1bW1hcnktY2FyZCB7XFxuICB3aWR0aDogNzUlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4vKiBBbnQtQ2FyZCBzdHlsaW5nIGZvciB0b3RhbHMgc3VtbWFyeSAqL1xcbi8qIC5hbnQtc3RhdGlzdGljLWNvbnRlbnQtdmFsdWUtaW50IHtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxufSAqL1xcbi5hbnQtc3RhdGlzdGljLXRpdGxlIHtcXG4gIC8qIGZvbnQtc2l6ZTogMS43dm1pbjsgKi9cXG59XFxuI3RhYmxlcyB7XFxuICB3aWR0aDogODUlO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcbi50YWJsZXMtaGVhZGVyIHtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxufVxcbi50YWJsZXMtaW5kaXZpZHVhbCB7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Nyb2xsdHJhY2spO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkOjotd2Via2l0LXNjcm9sbGJhcixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Ojotd2Via2l0LXNjcm9sbGJhciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY3JvbGx0cmFjayk7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkOjotd2Via2l0LXNjcm9sbGJhci10aHVtYixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3JvdyxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3JvdyB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkX19pbm5lclNjcm9sbENvbnRhaW5lcixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZCxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xcbiAgd2lkdGg6IGluaGVyaXQgIWltcG9ydGFudDtcXG4gIG1heC13aWR0aDogaW5oZXJpdCAhaW1wb3J0YW50O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclJvdyB7XFxuICBwYWRkaW5nLXJpZ2h0OiAyNXB4ICFpbXBvcnRhbnQ7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZSxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZCB7XFxuICBtYXgtaGVpZ2h0OiA1MDBweCAhaW1wb3J0YW50O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQge1xcbiAgbWF4LWhlaWdodDogNDQwcHggIWltcG9ydGFudDtcXG4gIG1pbi1oZWlnaHQ6IDMwcHggIWltcG9ydGFudDtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJDb2x1bW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBmb250LXNpemU6IDEuN3ZtaW47XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyUm93IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyVHJ1bmNhdGVkVGV4dCB7XFxuICBvdmVyZmxvdzogYXV0byAhaW1wb3J0YW50O1xcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZCAhaW1wb3J0YW50O1xcbiAgd29yZC13cmFwOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxuICB3aGl0ZS1zcGFjZTogcHJlLWxpbmUgIWltcG9ydGFudDtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3dDb2x1bW4ge1xcbiAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgZm9udC1zaXplOiAxLjd2bWluO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Msa0JBQUE7QUFDRDtBQUVBO0VBQ0MsU0FBQTtFQUNBLDhKQUFBO0VBR0EsbUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG9CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQUZEO0FBS0E7RUFDQywrRUFBQTtBQUhEO0FBT0E7RUFDQyxXQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBTEQ7QUFRQTtFQUNDLGlCQUFBO0FBTkQ7QUFTQTtFQUNDLGFBQUE7QUFQRDtBQVVBO0VBQ0MsYUFBQTtBQVJEO0FBV0E7RUFDQyxpQkFBQTtBQVREO0FBWUE7RUFDQyxnQkFBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtBQVZEO0FBYUE7RUFDQyxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLE1BQUE7RUFDQSw2QkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUVBLFdBQUE7RUFDQSxvQ0FBQTtBQVpEO0FBZUE7RUFDQyxvQkFBQTtFQUNBLHNCQUFBO0FBYkQ7QUFnQkE7RUFDQyxZQUFBO0FBZEQ7QUFpQkE7RUFDQyxhQUFBO0VBQ0EsdUJBQUE7QUFmRDtBQWtCQTtFQUNDLFVBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7QUFoQkQ7QUFDQSx3Q0FBd0M7QUFDeEM7O0dBRUc7QUFvQkg7RUFsQkUsd0JBQXdCO0FBQzFCO0FBcUJBO0VBQ0MsVUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFuQkQ7QUFzQkE7RUFDQyxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0FBcEJEO0FBdUJBO0VBQ0MsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxxQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQXJCRDtBQXdCQTs7O0VBR0Msb0NBQUE7QUF0QkQ7QUF5QkE7OztFQUdDLHNCQUFBO0FBdkJEO0FBMEJBOztFQUVDLHNCQUFBO0VBQ0EsNkJBQUE7QUF4QkQ7QUEwQkE7Ozs7RUFJQyx5QkFBQTtFQUNBLDZCQUFBO0FBeEJEO0FBMkJBO0VBQ0MsOEJBQUE7QUF6QkQ7QUE0QkE7O0VBRUMsNEJBQUE7QUExQkQ7QUE2QkE7RUFDQyw0QkFBQTtFQUNBLDJCQUFBO0FBM0JEO0FBOEJBO0VBQ0MsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBNUJEO0FBK0JBO0VBQ0MscUNBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNkJBQUE7QUE3QkQ7QUErQkE7RUFDQyx5QkFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQ0FBQTtBQTdCRDtBQWdDQTtFQUNDLGVBQUE7RUFDQSxrQkFBQTtBQTlCRFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJodG1sIHtcXG5cXHRvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcblxcbmJvZHkge1xcblxcdG1hcmdpbjogMDtcXG5cXHRmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCAnUm9ib3RvJywgJ094eWdlbicsXFxuXFx0XFx0J1VidW50dScsICdDYW50YXJlbGwnLCAnRmlyYSBTYW5zJywgJ0Ryb2lkIFNhbnMnLCAnSGVsdmV0aWNhIE5ldWUnLFxcblxcdFxcdHNhbnMtc2VyaWY7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG5cXHQtLXNjcm9sbHRyYWNrOiB3aGl0ZTtcXG5cXHQtLWJvcmRlci1jb2xvcjogI2YwZjBmMDtcXG5cXHRvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcblxcbmNvZGUge1xcblxcdGZvbnQtZmFtaWx5OiBzb3VyY2UtY29kZS1wcm8sIE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAnQ291cmllciBOZXcnLFxcblxcdFxcdG1vbm9zcGFjZTtcXG59XFxuXFxuI2Rpc2NsYWltZXIge1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsIDIyMiwgNjAsIDAuOSk7XFxuXFx0Zm9udC13ZWlnaHQ6IDYwMDtcXG5cXHRmb250LXNpemU6IDEuNXZtaW47XFxufVxcblxcbiNkaXNjbGFpbWVyLWRldGFpbCB7XFxuXFx0bWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcblxcbiNkaXNjbGFpbWVyLWxpbmtzIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4jZGlzY2xhaW1lci1hdXRob3JpdGF0aXZlIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZGlzY2xhaW1lci1saW5rLWhlYWQge1xcblxcdG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG5cXG4uZGlzY2xhaW1lci1saW5rcy1hZGRyZXNzIHtcXG5cXHRtYXJnaW4tbGVmdDogNXB4O1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4jb3B0aW9ucyB7XFxuXFx0Zm9udC1zaXplOiAxLjF2bWluO1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGhlaWdodDogMTAwcHg7XFxuXFx0ZGlzcGxheTogaW5saW5lLWZsZXg7XFxuXFx0cG9zaXRpb246IHN0aWNreTtcXG5cXHR0b3A6IDA7XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuXFx0ZmxleC13cmFwOiB3cmFwO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuXFx0ei1pbmRleDogMTA7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Nyb2xsdHJhY2spO1xcbn1cXG5cXG4jb3B0aW9ucy10aGVtZSB7XFxuXFx0ZGlzcGxheTogaW5saW5lLWZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLm9wdGlvbnMtaW5wdXRzIHtcXG5cXHR3aWR0aDogMjAwcHg7XFxufVxcblxcbiNzdW1tYXJ5IHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jc3VtbWFyeS1jYXJkIHtcXG5cXHR3aWR0aDogNzUlO1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi8qIEFudC1DYXJkIHN0eWxpbmcgZm9yIHRvdGFscyBzdW1tYXJ5ICovXFxuLyogLmFudC1zdGF0aXN0aWMtY29udGVudC12YWx1ZS1pbnQge1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG59ICovXFxuXFxuLmFudC1zdGF0aXN0aWMtdGl0bGUge1xcblxcdC8qIGZvbnQtc2l6ZTogMS43dm1pbjsgKi9cXG59XFxuXFxuI3RhYmxlcyB7XFxuXFx0d2lkdGg6IDg1JTtcXG5cXHRtYXJnaW4tbGVmdDogYXV0bztcXG5cXHRtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblxcbi50YWJsZXMtaGVhZGVyIHtcXG5cXHRmb250LXNpemU6IDIwcHg7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxuXFx0bWFyZ2luLWJvdHRvbTogMTBweDtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcbn1cXG5cXG4udGFibGVzLWluZGl2aWR1YWwge1xcblxcdGhlaWdodDogYXV0bztcXG5cXHRtYXJnaW4tdG9wOiAyMHB4O1xcblxcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNjcm9sbHRyYWNrKTtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcblxcdG1hcmdpbi1ib3R0b206IDIwcHg7XFxuXFx0bWFyZ2luLWxlZnQ6IGF1dG87XFxuXFx0bWFyZ2luLXJpZ2h0OiBhdXRvO1xcblxcdHBhZGRpbmc6IDEwcHg7XFxuXFx0Ym9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkOjotd2Via2l0LXNjcm9sbGJhcixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3Jvdzo6LXdlYmtpdC1zY3JvbGxiYXIge1xcblxcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNjcm9sbHRyYWNrKTtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3c6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3JvdyxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3JvdyB7XFxuXFx0d2lkdGg6IDEwMCUgIWltcG9ydGFudDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWRfX2lubmVyU2Nyb2xsQ29udGFpbmVyLFxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZCxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclJvdyB7XFxuXFx0d2lkdGg6IGluaGVyaXQgIWltcG9ydGFudDtcXG5cXHRtYXgtd2lkdGg6IGluaGVyaXQgIWltcG9ydGFudDtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xcblxcdHBhZGRpbmctcmlnaHQ6IDI1cHggIWltcG9ydGFudDtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlLFxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkIHtcXG5cXHRtYXgtaGVpZ2h0OiA1MDBweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQge1xcblxcdG1heC1oZWlnaHQ6IDQ0MHB4ICFpbXBvcnRhbnQ7XFxuXFx0bWluLWhlaWdodDogMzBweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlckNvbHVtbiB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGhlaWdodDogNDBweDtcXG5cXHRmb250LXNpemU6IDEuN3ZtaW47XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyUm93IHtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcblxcdG1hcmdpbi1ib3R0b206IDEwcHg7XFxuXFx0Ym9yZGVyLXJhZGl1czogM3B4O1xcblxcdGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclRydW5jYXRlZFRleHQge1xcblxcdG92ZXJmbG93OiBhdXRvICFpbXBvcnRhbnQ7XFxuXFx0b3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZCAhaW1wb3J0YW50O1xcblxcdHdvcmQtd3JhcDogYnJlYWstd29yZCAhaW1wb3J0YW50O1xcblxcdHdoaXRlLXNwYWNlOiBwcmUtbGluZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3Jvd0NvbHVtbiB7XFxuXFx0aGVpZ2h0OiBpbmhlcml0O1xcblxcdGZvbnQtc2l6ZTogMS43dm1pbjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzNdLnVzZVsyXSEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbMl0hLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCIvL1RoaXMgaXMgcmVxdWlyZWQgYnkgQW50ZCB0byBhdm9pZCBtb21lbnQgd2hpY2ggd2FzIGFkZGluZyB0byBidW5kbGUgc2l6ZS5cblxuaW1wb3J0IHsgRGF5anMgfSBmcm9tICdkYXlqcydcbmltcG9ydCBkYXlqc0dlbmVyYXRlQ29uZmlnIGZyb20gJ3JjLXBpY2tlci9saWIvZ2VuZXJhdGUvZGF5anMnXG5pbXBvcnQgZ2VuZXJhdGVQaWNrZXIgZnJvbSAnYW50ZC9lcy9kYXRlLXBpY2tlci9nZW5lcmF0ZVBpY2tlcidcbmltcG9ydCAnYW50ZC9lcy9kYXRlLXBpY2tlci9zdHlsZS9pbmRleCdcblxuY29uc3QgRGF0ZVBpY2tlciA9IGdlbmVyYXRlUGlja2VyPERheWpzPihkYXlqc0dlbmVyYXRlQ29uZmlnKVxuXG5leHBvcnQgZGVmYXVsdCBEYXRlUGlja2VyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJEaXNjbGFpbWVyIiwiT3B0aW9ucyIsIlN1bW1hcnkiLCJUYWJsZXMiLCJBcHAiLCJwcm9wcyIsInN0YXRlIiwib3B0aW9ucyIsInRvdGFscyIsInRhYmxlcyIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiZGF5anMiLCJTdGF0ZSIsInkiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImRhdGVWYWx1ZSIsImRhdGVWYWx1ZVNldCIsImRhdGFEZWZhdWx0IiwiZGF0YUN1c3RvbWVEYXRlIiwiY291bnRyeUxpc3QiLCJjb3VudHJ5TGlzdFNldCIsInN0YXRlTGlzdCIsInN0YXRlTGlzdFNldCIsImNvdW50cnlWYWx1ZSIsImNvdW50cnlWYWx1ZVNldCIsInN0YXRlVmFsdWUiLCJzdGF0ZVZhbHVlU2V0IiwidGFibGVEYXRhIiwidGFibGVEYXRhU2V0IiwidG90YWxzRGF0YSIsInRvdGFsc0RhdGFTZXQiLCJ0b3RhbHNTZXQiLCJjb21wYXJlIiwiYSIsImIiLCJhU3RhdGUiLCJwcm92aW5jZSIsImJTdGF0ZSIsImNvbXBhcmlzb24iLCJoYW5kbGVQcm92aW5jZUxpc3QiLCJkIiwicmVzdWx0IiwibWFwIiwiZSIsInJlZ2lvbiIsImNvdW50cnkiLCJuYW1lIiwicCIsInNvcnQiLCJkZWZhdWx0RGF0YSIsImxvY2FsIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJkYXRlIiwiaGFuZGxlTG9jYWxEYXRhIiwiaGFuZGxlRmV0Y2giLCJ1cmwiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjIiwiY291bnRyaWVzIiwiaGFuZGxlVG90YWxzIiwic3RvcmFnZSIsInRvdGFsRGF0YSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIiwicyIsImNvbmZpcm1lZCIsImRlYXRocyIsInJlY292ZXJlZCIsInVuZGVmaW5lZCIsInQiLCJ0b3RhbENhc2VzIiwidG90YWxEZWF0aHMiLCJ0b3RhbFJlY292ZXJlZCIsIlNlbGVjdCIsIlN3aXRjaCIsIkRhdGVQaWNrZXIiLCJkZWZhdWx0UHJvdmluY2VWYWx1ZSIsInByb3ZpbmNlVGV4dCIsInByb3ZpbmNlVGV4dFNldCIsImRlZmF1bHRDb3VudHJ5VmFsdWUiLCJjb3VudHJ5VGV4dCIsImNvdW50cnlUZXh0U2V0IiwiY2hhbmdlVGhlbWUiLCJjdXJWYWx1ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJocmVmIiwic3BsaXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJvblNlYXJjaCIsImkiLCJzdGF0ZXMiLCJwdXNoIiwiaGFuZGxlRGF0ZUNoYW5nZSIsImNoYW5nZUNvdW50cnlTdGF0ZVZhbHVlIiwidHlwZSIsIkNhcmQiLCJTdGF0aXN0aWMiLCJDb2x1bW4iLCJUYWJsZSIsInRhYmxlQXJyYXkiLCJ0YWJsZUFycmF5U2V0IiwidGFibGVXaWR0aCIsInRhYmxlV2lkdGhTZXQiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaGFuZGxlQ291bnR5VGFibGVzIiwibmV3QXJyYXkiLCJsZW5ndGgiLCJ0ZW1wQXJyYXkiLCJjaXRpZXMiLCJ0YWJsZURpdkNvdW50eSIsImhhbmRsZVN0YXRlVGFibGVzIiwieCIsInRhYmxlRGl2U3RhdGUiLCJoYW5kbGVDb3VudHJ5VGFibGVzIiwidGFibGVEaXZDb3VudHJ5IiwiaGFuZGxlVGFibGVzIiwiZm9ybWF0TnVtYmVyIiwibnVtIiwidG9TdHJpbmciLCJyZXBsYWNlIiwiYXJyYXkiLCJrZXkiLCJyb3dIZWlnaHQiLCJ0YmxIZWlnaHQiLCJpbmRleCIsInJvd0RhdGEiLCJkYXRhS2V5IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=