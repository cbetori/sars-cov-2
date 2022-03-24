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





console.log("https://sars-cov-2-cb.herokuapp.com/api");

const State = () => {
  //API with information from previous day. The newest information always exists for yesterday.
  let y = dayjs__WEBPACK_IMPORTED_MODULE_2___default()().subtract(1, 'days').format('YYYY-MM-DD');
  const [dateValue, dateValueSet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(y);
  const dataDefault = "https://sars-cov-2-cb.herokuapp.com/api" + '/api/default';
  const dataCustomeDate = "https://sars-cov-2-cb.herokuapp.com/api" + '/api/default/data=' + dateValue;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX1N0YXRlX2pzLXdlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QtZG9tX3JlYWN0LWRvbS5zcmNfU3RhdGVfanMtd2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdC1kb21fcmVhY3QtZG9tLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1LLEdBQUcsR0FBSUMsS0FBRCxJQUFXO0FBQ3RCLHNCQUNDLHFGQUNDLDJEQUFDLDhEQUFELE9BREQsZUFFQywyREFBQywyREFBRDtBQUFTLFNBQUssRUFBRUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDO0FBQTVCLElBRkQsZUFHQywyREFBQywyREFBRDtBQUFTLFVBQU0sRUFBRUYsS0FBSyxDQUFDQyxLQUFOLENBQVlFO0FBQTdCLElBSEQsZUFJQywyREFBQywwREFBRDtBQUFRLFNBQUssRUFBRUgsS0FBSyxDQUFDQyxLQUFOLENBQVlHO0FBQTNCLElBSkQsQ0FERDtBQVFBLENBVEQ7O0FBV0EsK0RBQWVMLEdBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFTLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyx5Q0FBWjs7QUFFQSxNQUFNQyxLQUFLLEdBQUcsTUFBTTtBQUNsQjtBQUNBLE1BQUlDLENBQUMsR0FBR0wsNENBQUssR0FBR00sUUFBUixDQUFpQixDQUFqQixFQUFvQixNQUFwQixFQUE0QkMsTUFBNUIsQ0FBbUMsWUFBbkMsQ0FBUjtBQUVBLFFBQU0sQ0FBQ0MsU0FBRCxFQUFZQyxZQUFaLElBQTRCViwrQ0FBUSxDQUFDTSxDQUFELENBQTFDO0FBQ0EsUUFBTUssV0FBVyxHQUFHUCx5Q0FBTyxHQUFHLGNBQTlCO0FBQ0EsUUFBTVEsZUFBZSxHQUFHUix5Q0FBTyxHQUFHLG9CQUFWLEdBQWlDSyxTQUF6RDtBQUVBLFFBQU0sQ0FBQ0ksV0FBRCxFQUFjQyxjQUFkLElBQWdD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O0FDTnZDLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQXVLO0FBQ3ZLO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsbUpBQU87Ozs7QUFJaUg7QUFDekksT0FBTywrREFBZSxtSkFBTyxJQUFJLDBKQUFjLEdBQUcsMEpBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQjdFLDJFQUEyRTtBQUdiO0FBQ0M7QUFDdkI7QUFFeEMsSUFBTSxVQUFVLEdBQUcsOEVBQWMsQ0FBUSxvRUFBbUIsQ0FBQztBQUU3RCwrREFBZSxVQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9TdGF0ZS5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvRGlzY2xhaW1lci5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvU3VtbWFyeS5qcyIsIndlYnBhY2s6Ly9zYXJzLWNvdi0yLy4vc3JjL2NvbXBvbmVudHMvVGFibGVzLmpzIiwid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL3NhcnMtY292LTIvLi9zcmMvaW5kZXguY3NzP2E2NGYiLCJ3ZWJwYWNrOi8vc2Fycy1jb3YtMi8uL3NyYy9jb21wb25lbnRzL0RhdGVQaWNrZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBEaXNjbGFpbWVyIGZyb20gJy4vY29tcG9uZW50cy9EaXNjbGFpbWVyJ1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9jb21wb25lbnRzL09wdGlvbnMnXG5pbXBvcnQgU3VtbWFyeSBmcm9tICcuL2NvbXBvbmVudHMvU3VtbWFyeSdcbmltcG9ydCBUYWJsZXMgZnJvbSAnLi9jb21wb25lbnRzL1RhYmxlcydcblxuY29uc3QgQXBwID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdDxEaXNjbGFpbWVyIC8+XG5cdFx0XHQ8T3B0aW9ucyBzdGF0ZT17cHJvcHMuc3RhdGUub3B0aW9uc30gLz5cblx0XHRcdDxTdW1tYXJ5IHRvdGFscz17cHJvcHMuc3RhdGUudG90YWxzfSAvPlxuXHRcdFx0PFRhYmxlcyBzdGF0ZT17cHJvcHMuc3RhdGUudGFibGVzfSAvPlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgJy4vaW5kZXguY3NzJ1xuaW1wb3J0ICdyZWFjdC12aXJ0dWFsaXplZC9zdHlsZXMuY3NzJ1xuXG5jb25zb2xlLmxvZyhBUElfVVJMKVxuXG5jb25zdCBTdGF0ZSA9ICgpID0+IHtcbiAgLy9BUEkgd2l0aCBpbmZvcm1hdGlvbiBmcm9tIHByZXZpb3VzIGRheS4gVGhlIG5ld2VzdCBpbmZvcm1hdGlvbiBhbHdheXMgZXhpc3RzIGZvciB5ZXN0ZXJkYXkuXG4gIGxldCB5ID0gZGF5anMoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpXG5cbiAgY29uc3QgW2RhdGVWYWx1ZSwgZGF0ZVZhbHVlU2V0XSA9IHVzZVN0YXRlKHkpXG4gIGNvbnN0IGRhdGFEZWZhdWx0ID0gQVBJX1VSTCArICcvYXBpL2RlZmF1bHQnXG4gIGNvbnN0IGRhdGFDdXN0b21lRGF0ZSA9IEFQSV9VUkwgKyAnL2FwaS9kZWZhdWx0L2RhdGE9JyArIGRhdGVWYWx1ZVxuXG4gIGNvbnN0IFtjb3VudHJ5TGlzdCwgY291bnRyeUxpc3RTZXRdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtzdGF0ZUxpc3QsIHN0YXRlTGlzdFNldF0gPSB1c2VTdGF0ZShbXSlcblxuICBjb25zdCBbY291bnRyeVZhbHVlLCBjb3VudHJ5VmFsdWVTZXRdID0gdXNlU3RhdGUoKVxuICBjb25zdCBbc3RhdGVWYWx1ZSwgc3RhdGVWYWx1ZVNldF0gPSB1c2VTdGF0ZSgpXG5cbiAgY29uc3QgW3RhYmxlRGF0YSwgdGFibGVEYXRhU2V0XSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbdG90YWxzRGF0YSwgdG90YWxzRGF0YVNldF0gPSB1c2VTdGF0ZSh7fSlcbiAgY29uc3QgW3RvdGFscywgdG90YWxzU2V0XSA9IHVzZVN0YXRlKHt9KVxuXG4gIC8vVXNlIHRvIG9yZGVyIGFuIGFycmF5IG9mIG9iamVjdHMsIGluIHRoaXMgY2FzZSBpdHMgYnkgc3RhdGUvcHJvdmluY2UgdmFsdWVcbiAgLy9VcGRhdGVzIHN0YXRlTGlzdFxuICBsZXQgY29tcGFyZSA9IChhLCBiKSA9PiB7XG4gICAgbGV0IGFTdGF0ZSA9IGEucHJvdmluY2VcbiAgICBsZXQgYlN0YXRlID0gYi5wcm92aW5jZVxuICAgIGxldCBjb21wYXJpc29uID0gMFxuICAgIGlmIChhU3RhdGUgPiBiU3RhdGUpIHtcbiAgICAgIGNvbXBhcmlzb24gPSAxXG4gICAgfSBlbHNlIGlmIChhU3RhdGUgPCBiU3RhdGUpIHtcbiAgICAgIGNvbXBhcmlzb24gPSAtMVxuICAgIH1cbiAgICByZXR1cm4gY29tcGFyaXNvblxuICB9XG5cbiAgLy9DcmVhdGVzIGFuIGFycmF5IHRoYXQgaG9sZHMgdW5pcXVlIHZhbHVlcyBvZiBib3RoIHByb3ZpbmNlIGFuZCBjb3VudHJ5XG4gIGxldCBoYW5kbGVQcm92aW5jZUxpc3QgPSBkID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlc3VsdCA9IGQubWFwKGUgPT4ge1xuICAgICAgICBpZiAoZS5yZWdpb24ucHJvdmluY2UgPT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuIHsgY291bnRyeTogZS5yZWdpb24ubmFtZSwgcHJvdmluY2U6IGUucmVnaW9uLm5hbWUgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGNvdW50cnk6IGUucmVnaW9uLm5hbWUsIHByb3ZpbmNlOiBlLnJlZ2lvbi5wcm92aW5jZSB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBsZXQgcCA9IHJlc3VsdC5zb3J0KGNvbXBhcmUpXG4gICAgICByZXR1cm4gcFxuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8vTG9va3MgYXQgbG9jYWxzdG9yYWdlLiBPbiBlcnJvciBpdCBkb2VzIGEgZmV0Y2ggZm9yIHRoZSBtb3N0IGN1cnJlbnQgZGF0YVxuICAvL0lmIGxvY2Fsc3RvYWdlIGhhcyB2YWx1ZXMgYW5kIGlmIGRhdGVWYWx1ZSA9PT0gbG9jYWxTdG9yYWdlIGRhdGUgdGhlbiBsb2NhbFN0b3JhZ2UgaW5mb3JtYXRpb24gaXMgdXNlZFxuICAvL1RoaXMgZmlyZXMgb25seSB3aGVuIHRoZSBkYXRlVmFsdWUgY2hhbmdlc1xuICBsZXQgZGVmYXVsdERhdGEgPSAoKSA9PiB7XG4gICAgbGV0IGxvY2FsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0b3JhZ2UnKVxuICAgIGxvY2FsID0gSlNPTi5wYXJzZShsb2NhbClcbiAgICB0cnkge1xuICAgICAgaWYgKGxvY2FsLmRhdGFbMF0uZGF0ZSA9PT0gZGF0ZVZhbHVlKSB7XG4gICAgICAgIGhhbmRsZUxvY2FsRGF0YShsb2NhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkYXRlVmFsdWUgPT09IHkpIHtcbiAgICAgICAgICBoYW5kbGVGZXRjaChkYXRhRGVmYXVsdClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVGZXRjaChkYXRhQ3VzdG9tZURhdGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIGhhbmRsZUZldGNoKGRhdGFEZWZhdWx0KVxuICAgIH1cbiAgfVxuXG4gIC8vSGFuZGxlcyBhY3R1YWwgZmV0Y2ggcmVxdWVzdC4gSWYgdGhleSBkYXRlID0geWVzdGVyZGF5IGl0IHdpbGwgcHVsbCB0aGUgbmV3ZXN0IHBvc3NpYmxlIGluZm9ybWF0aW9uLlxuICAvL0lmIGRhdGFWYWx1ZSAhPT0geWVzdGVyZGF5IHRoYW4gY3VzdG9tZSBmZXRjaCBieSBkYXRlIGlzIHBlcmZvcm1lZC5cbiAgLy9EYXRhIGlzIHN0b3JlZCBpbiBsb2NhbFN0b3JhZ2UgdG8gc3BlZWQgdXAgbG9hZCBmb3IgcmVwZWF0IHZpc3RvcnMuXG4gIGxldCBoYW5kbGVGZXRjaCA9IHVybCA9PiB7XG4gICAgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgIH0pXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEuZGF0YS5kYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IGMgPSBkYXRhLmNvdW50cmllc1xuICAgICAgICAgIGxldCBwID0gaGFuZGxlUHJvdmluY2VMaXN0KGRhdGEuZGF0YS5kYXRhKVxuICAgICAgICAgIGhhbmRsZVRvdGFscyhkYXRhLnRvdGFscywgY291bnRyeVZhbHVlLCBzdGF0ZVZhbHVlKVxuICAgICAgICAgIGNvdW50cnlMaXN0U2V0KGMpXG4gICAgICAgICAgc3RhdGVMaXN0U2V0KHApXG4gICAgICAgICAgdG90YWxzRGF0YVNldChkYXRhLnRvdGFscylcbiAgICAgICAgICB0YWJsZURhdGFTZXQoZGF0YS5kYXRhLmRhdGEpXG5cbiAgICAgICAgICBsZXQgc3RvcmFnZSA9IHtcbiAgICAgICAgICAgIGNvdW50cnk6IGMsXG4gICAgICAgICAgICBwcm92aW5jZTogcCxcbiAgICAgICAgICAgIHRvdGFsRGF0YTogZGF0YS50b3RhbHMsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEuZGF0YSxcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeShzdG9yYWdlKSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cblxuICAvL0FkZCBhbGwgZmV0Y2ggcmVxdWVzdCBkYXRhIHRvIGxvY2FsIHN0b3JhZ2UuXG4gIGxldCBoYW5kbGVMb2NhbERhdGEgPSBsb2NhbCA9PiB7XG4gICAgY291bnRyeUxpc3RTZXQobG9jYWwuY291bnRyeSlcbiAgICBzdGF0ZUxpc3RTZXQobG9jYWwucHJvdmluY2UpXG4gICAgdG90YWxzRGF0YVNldChsb2NhbC50b3RhbERhdGEpXG4gICAgaGFuZGxlVG90YWxzKGxvY2FsLnRvdGFsRGF0YSwgY291bnRyeVZhbHVlLCBzdGF0ZVZhbHVlKVxuICAgIHRhYmxlRGF0YVNldChsb2NhbC5kYXRhKVxuICB9XG5cbiAgLy9IYW5kbGVzIGFsbCB0b3RhbCB2YWx1ZXMuIEZpcmVkIHdoZW4gZGF0ZVZhbHVlLCBzdGF0ZVZhbHVlLCBvciBjb3VudHJ5VmF1ZSBjaGFuZ2VzXG4gIGxldCBoYW5kbGVUb3RhbHMgPSAoZCwgYywgcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgY29uZmlybWVkID0gMFxuICAgICAgbGV0IGRlYXRocyA9IDBcbiAgICAgIGxldCByZWNvdmVyZWQgPSAwXG4gICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbmZpcm1lZCA9IGRbJ0FsbCddLmNvbmZpcm1lZFxuICAgICAgICBkZWF0aHMgPSBkWydBbGwnXS5kZWF0aHNcbiAgICAgICAgcmVjb3ZlcmVkID0gZFsnQWxsJ10ucmVjb3ZlcmVkXG4gICAgICB9IGVsc2UgaWYgKGMgIT09IHVuZGVmaW5lZCAmJiBzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uZmlybWVkID0gZFtjXS5jb25maXJtZWRcbiAgICAgICAgZGVhdGhzID0gZFtjXS5kZWF0aHNcbiAgICAgICAgcmVjb3ZlcmVkID0gZFtjXS5yZWNvdmVyZWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZpcm1lZCA9IGRbY11bc10uY29uZmlybWVkXG4gICAgICAgIGRlYXRocyA9IGRbY11bc10uZGVhdGhzXG4gICAgICAgIHJlY292ZXJlZCA9IGRbY11bc10ucmVjb3ZlcmVkXG4gICAgICB9XG4gICAgICBsZXQgdCA9IHtcbiAgICAgICAgdG90YWxDYXNlczogY29uZmlybWVkLFxuICAgICAgICB0b3RhbERlYXRoczogZGVhdGhzLFxuICAgICAgICB0b3RhbFJlY292ZXJlZDogcmVjb3ZlcmVkLFxuICAgICAgfVxuICAgICAgdG90YWxzU2V0KHQpXG4gICAgICByZXR1cm4gdFxuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8vSG9sZHMgbWFrZXNoaWZ0IHN0YXRlIGFuZCBjYW4gYmUgdXNlZCB0byBwYXNzIGRvd24gdG8gY2hpbGRyZW5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgb3B0aW9uczoge1xuICAgICAgY291bnRyeVZhbHVlOiBjb3VudHJ5VmFsdWUsXG4gICAgICBjb3VudHJ5VmFsdWVTZXQ6IGNvdW50cnlWYWx1ZVNldCxcbiAgICAgIHN0YXRlVmFsdWU6IHN0YXRlVmFsdWUsXG4gICAgICBzdGF0ZVZhbHVlU2V0OiBzdGF0ZVZhbHVlU2V0LFxuICAgICAgZGF0ZVZhbHVlOiBkYXRlVmFsdWUsXG4gICAgICBkYXRlVmFsdWVTZXQ6IGRhdGVWYWx1ZVNldCxcbiAgICAgIGNvdW50cnlMaXN0OiBjb3VudHJ5TGlzdCxcbiAgICAgIHN0YXRlTGlzdDogc3RhdGVMaXN0LFxuICAgIH0sXG4gICAgdGFibGVzOiB7XG4gICAgICB0YWJsZURhdGE6IHRhYmxlRGF0YSxcbiAgICAgIGNvdW50cnlWYWx1ZTogY291bnRyeVZhbHVlLFxuICAgICAgY291bnRyeUxpc3Q6IGNvdW50cnlMaXN0LFxuICAgICAgc3RhdGVWYWx1ZTogc3RhdGVWYWx1ZSxcbiAgICAgIHN0YXRlTGlzdDogc3RhdGVMaXN0LFxuICAgIH0sXG4gICAgdG90YWxzOiB0b3RhbHMsXG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRlZmF1bHREYXRhKClcbiAgfSwgW2RhdGVWYWx1ZV0pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY291bnRyeVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZVRvdGFscyh0b3RhbHNEYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVUb3RhbHModG90YWxzRGF0YSwgY291bnRyeVZhbHVlKVxuICAgIH1cbiAgfSwgW2NvdW50cnlWYWx1ZV0pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc3RhdGVWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVUb3RhbHModG90YWxzRGF0YSwgY291bnRyeVZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVUb3RhbHModG90YWxzRGF0YSwgY291bnRyeVZhbHVlLCBzdGF0ZVZhbHVlKVxuICAgIH1cbiAgfSwgW3N0YXRlVmFsdWVdKVxuXG4gIHJldHVybiA8QXBwIHN0YXRlPXtzdGF0ZX0gLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGVcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRGlzY2xhaW1lciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXYgaWQ9J2Rpc2NsYWltZXInPlxuXHRcdFx0PGRpdiBpZD0nZGlzY2xhaW1lci1kZXRhaWwnPlxuXHRcdFx0XHREaXNjbGFpbWVyOiBJIGRvIG5vdCBvd24gbm9yIGRvIEkgbWFpbnRhaW4gdGhpcyBkYXRhLiBUbyBlbnN1cmUgeW91IGFyZVxuXHRcdFx0XHRnZXR0aW5nIHRoZSBiZXN0IGluZm9ybWF0aW9uIHBsZWFzZSBsb29rIHRvIGF1dGhvcml0YXRpdmUgc291cmNlcy5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBpZD0nZGlzY2xhaW1lci1saW5rcyc+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmstaGVhZCc+RGF0YSBzb3VyY2U6PC9kaXY+XG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPSdkaXNjbGFpbWVyLWxpbmtzLWFkZHJlc3MnXG5cdFx0XHRcdFx0aHJlZj0naHR0cHM6Ly9naXRodWIuY29tL0NTU0VHSVNhbmREYXRhL0NPVklELTE5J1xuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0Sm9obiBIb3BraW5zXG5cdFx0XHRcdDwvYT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Rpc2NsYWltZXItbGluay1oZWFkJz5BUEkgU291cmNlOjwvZGl2PlxuXHRcdFx0XHQ8YVxuXHRcdFx0XHRcdGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rcy1hZGRyZXNzJ1xuXHRcdFx0XHRcdGhyZWY9J2h0dHBzOi8vcmFwaWRhcGkuY29tL2F4aXNiaXRzLWF4aXNiaXRzLWRlZmF1bHQvYXBpL2NvdmlkLTE5LXN0YXRpc3RpY3MvZW5kcG9pbnRzJ1xuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0UmFwaWRBUEkgLSBBeGlzYml0c1xuXHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDxkaXYgaWQ9J2Rpc2NsYWltZXItYXV0aG9yaXRhdGl2ZSc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Rpc2NsYWltZXItbGluay1oZWFkJz5cblx0XHRcdFx0XHRcdEFkZGl0aW9uYWwgU3VwcG9ydCBvbiBTYXJzLUNvdi0yOlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxhXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9J2Rpc2NsYWltZXItbGlua3MtYWRkcmVzcydcblx0XHRcdFx0XHRcdGhyZWY9JyAgICAgICAgICAgICAgICBodHRwczovL3d3dy5jZGMuZ292L2Nvcm9uYXZpcnVzLzIwMTktbkNvdi9pbmRleC5odG1sJ1xuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdENEQ1xuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0PGFcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT0nZGlzY2xhaW1lci1saW5rcy1hZGRyZXNzJ1xuXHRcdFx0XHRcdFx0aHJlZj0naHR0cHM6Ly93d3cud2hvLmludC9lbWVyZ2VuY2llcy9kaXNlYXNlcy9ub3ZlbC1jb3JvbmF2aXJ1cy0yMDE5J1xuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFdIT1xuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNjbGFpbWVyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBTZWxlY3QgZnJvbSAnYW50ZC9lcy9zZWxlY3QnXG5pbXBvcnQgU3dpdGNoIGZyb20gJ2FudGQvZXMvc3dpdGNoJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAnLi9EYXRlUGlja2VyJ1xuXG5jb25zdCBPcHRpb25zID0gKHByb3BzKSA9PiB7XG5cdGNvbnN0IGRlZmF1bHRQcm92aW5jZVZhbHVlID0gJ1NlbGVjdCBhIHN0YXRlL3Byb3ZpbmNlJ1xuXHRjb25zdCBbcHJvdmluY2VUZXh0LCBwcm92aW5jZVRleHRTZXRdID0gdXNlU3RhdGUoZGVmYXVsdFByb3ZpbmNlVmFsdWUpXG5cdGNvbnN0IGRlZmF1bHRDb3VudHJ5VmFsdWUgPSAnU2VsZWN0IGEgQ291bnRyeSdcblx0Y29uc3QgW2NvdW50cnlUZXh0LCBjb3VudHJ5VGV4dFNldF0gPSB1c2VTdGF0ZShkZWZhdWx0Q291bnRyeVZhbHVlKVxuXG5cdC8vVXNlZCB0byBoYW5kbGUgdGhlbWUuIFNpbXBseSBjaGFuZ2VzIGhyZWYgb2YgbGluayBjb21wb25lbnQgaW4gaW5kZXguaHRtbFxuXHQvL1RoZXJlIHNob3VsZCBiZSBhIGJldHRlciB3YXkgb2YgaGFuZGxlIGFwYXJ0IGZyb20gZnVsbHkgcmVsb2FkaW5nIGNzc1xuXHRsZXQgY2hhbmdlVGhlbWUgPSAoKSA9PiB7XG5cdFx0bGV0IGN1clZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lJykuaHJlZlxuXHRcdGN1clZhbHVlID0gY3VyVmFsdWUuc3BsaXQoJy8nKVszXVxuXHRcdGlmIChjdXJWYWx1ZSA9PT0gJ2FudGQuY3NzJykge1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lJykuaHJlZiA9ICdhbnRkLmRhcmsuY3NzJ1xuXHRcdFx0ZG9jdW1lbnRcblx0XHRcdFx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cblx0XHRcdFx0LnN0eWxlLnNldFByb3BlcnR5KCctLXNjcm9sbHRyYWNrJywgJyMxNDE0MTQnKVxuXHRcdFx0ZG9jdW1lbnRcblx0XHRcdFx0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cblx0XHRcdFx0LnN0eWxlLnNldFByb3BlcnR5KCctLWJvcmRlci1jb2xvcicsICcjMzAzMDMwJylcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lJykuaHJlZiA9ICdhbnRkLmNzcydcblx0XHRcdGRvY3VtZW50XG5cdFx0XHRcdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG5cdFx0XHRcdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zY3JvbGx0cmFjaycsICd3aGl0ZScpXG5cdFx0XHRkb2N1bWVudFxuXHRcdFx0XHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuXHRcdFx0XHQuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm9yZGVyLWNvbG9yJywgJyNmMGYwZjAnKVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIG9uU2VhcmNoKCkge31cblx0bGV0IGNvdW50cmllcyA9IHByb3BzLnN0YXRlLmNvdW50cnlMaXN0Lm1hcCgoZSwgaSkgPT4ge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8U2VsZWN0Lk9wdGlvbiBrZXk9e2l9IHZhbHVlPXtlfT5cblx0XHRcdFx0e2V9XG5cdFx0XHQ8L1NlbGVjdC5PcHRpb24+XG5cdFx0KVxuXHR9KVxuXG5cdGxldCBzdGF0ZXMgPSBwcm9wcy5zdGF0ZS5zdGF0ZUxpc3QubWFwKChlLCBpKSA9PiB7XG5cdFx0bGV0IHJlc3VsdCA9IFtdXG5cdFx0aWYgKGUuY291bnRyeSA9PT0gcHJvcHMuc3RhdGUuY291bnRyeVZhbHVlKSB7XG5cdFx0XHRyZXN1bHQucHVzaChcblx0XHRcdFx0PFNlbGVjdC5PcHRpb24ga2V5PXtpfSB2YWx1ZT17ZS5wcm92aW5jZX0+XG5cdFx0XHRcdFx0e2UucHJvdmluY2V9XG5cdFx0XHRcdDwvU2VsZWN0Lk9wdGlvbj5cblx0XHRcdClcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9KVxuXG5cdGxldCBoYW5kbGVEYXRlQ2hhbmdlID0gKGUsIHMpID0+IHtcblx0XHRsZXQgeSA9IGRheWpzKHMpLmZvcm1hdCgnWVlZWS1NTS1ERCcpXG5cdFx0cHJvcHMuc3RhdGUuZGF0ZVZhbHVlU2V0KHkpXG5cdH1cblxuXHRsZXQgY2hhbmdlQ291bnRyeVN0YXRlVmFsdWUgPSAoZSwgdHlwZSkgPT4ge1xuXHRcdGlmICh0eXBlID09PSAnY291bnRyeScpIHtcblx0XHRcdGlmIChlID09PSAnQWxsJykge1xuXHRcdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlU2V0KHVuZGVmaW5lZClcblx0XHRcdFx0cHJvcHMuc3RhdGUuY291bnRyeVZhbHVlU2V0KHVuZGVmaW5lZClcblx0XHRcdFx0Y291bnRyeVRleHRTZXQoZGVmYXVsdENvdW50cnlWYWx1ZSlcblx0XHRcdFx0cHJvdmluY2VUZXh0U2V0KGRlZmF1bHRQcm92aW5jZVZhbHVlKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJvcHMuc3RhdGUuY291bnRyeVZhbHVlU2V0KGUpXG5cdFx0XHRcdGNvdW50cnlUZXh0U2V0KGUpXG5cdFx0XHRcdHByb3BzLnN0YXRlLnN0YXRlVmFsdWVTZXQodW5kZWZpbmVkKVxuXHRcdFx0XHRwcm92aW5jZVRleHRTZXQoZGVmYXVsdFByb3ZpbmNlVmFsdWUpXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChlID09PSAnQWxsJykge1xuXHRcdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlU2V0KHVuZGVmaW5lZClcblx0XHRcdFx0cHJvdmluY2VUZXh0U2V0KGRlZmF1bHRQcm92aW5jZVZhbHVlKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZVNldChlKVxuXHRcdFx0XHRwcm92aW5jZVRleHRTZXQoZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgaWQ9J29wdGlvbnMnPlxuXHRcdFx0PGRpdiBpZD0nb3B0aW9ucy10aGVtZSc+XG5cdFx0XHRcdDxTd2l0Y2ggb25DaGFuZ2U9eygpID0+IGNoYW5nZVRoZW1lKCl9IC8+XG5cdFx0XHRcdExpZ2h0L0Rhcmtcblx0XHRcdDwvZGl2PlxuXHRcdFx0PERhdGVQaWNrZXJcblx0XHRcdFx0dGhlbWU9J2RhcmsnXG5cdFx0XHRcdHBpY2tlcj0nZGF0ZSdcblx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtkYXlqcyhwcm9wcy5zdGF0ZS5kYXRlVmFsdWUsICdZWVlZLU1NLUREJyl9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoZSwgcykgPT4gaGFuZGxlRGF0ZUNoYW5nZShlLCBzKX1cblx0XHRcdFx0Zm9ybWF0PXsnWVlZWS1NTS1ERCd9XG5cdFx0XHRcdGNsYXNzTmFtZT0nb3B0aW9ucy1pbnB1dHMnXG5cdFx0XHQvPlxuXHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRzaG93U2VhcmNoXG5cdFx0XHRcdG9wdGlvbkZpbHRlclByb3A9J2NoaWxkcmVuJ1xuXHRcdFx0XHRvblNlYXJjaD17b25TZWFyY2h9XG5cdFx0XHRcdHZhbHVlPXtjb3VudHJ5VGV4dH1cblx0XHRcdFx0Y2xhc3NOYW1lPSdvcHRpb25zLWlucHV0cydcblx0XHRcdFx0b25DaGFuZ2U9eyhlKSA9PiBjaGFuZ2VDb3VudHJ5U3RhdGVWYWx1ZShlLCAnY291bnRyeScpfVxuXHRcdFx0PlxuXHRcdFx0XHQ8U2VsZWN0Lk9wdGlvbiB2YWx1ZT17J0FsbCd9PkFsbDwvU2VsZWN0Lk9wdGlvbj5cblx0XHRcdFx0e2NvdW50cmllc31cblx0XHRcdDwvU2VsZWN0PlxuXHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRzaG93U2VhcmNoXG5cdFx0XHRcdG9wdGlvbkZpbHRlclByb3A9J2NoaWxkcmVuJ1xuXHRcdFx0XHRvblNlYXJjaD17b25TZWFyY2h9XG5cdFx0XHRcdHZhbHVlPXtwcm92aW5jZVRleHR9XG5cdFx0XHRcdGNsYXNzTmFtZT0nb3B0aW9ucy1pbnB1dHMnXG5cdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gY2hhbmdlQ291bnRyeVN0YXRlVmFsdWUoZSwgJ3N0YXRlJyl9XG5cdFx0XHQ+XG5cdFx0XHRcdDxTZWxlY3QuT3B0aW9uIHZhbHVlPXsnQWxsJ30+QWxsPC9TZWxlY3QuT3B0aW9uPlxuXHRcdFx0XHR7c3RhdGVzfVxuXHRcdFx0PC9TZWxlY3Q+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uc1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQ2FyZCwgU3RhdGlzdGljIH0gZnJvbSAnYW50ZCdcblxuY29uc3QgU3VtbWFyeSA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXYgaWQ9J3N1bW1hcnknPlxuXHRcdFx0PENhcmQgaWQ9J3N1bW1hcnktY2FyZCc+XG5cdFx0XHRcdDxTdGF0aXN0aWMgdGl0bGU9J1RvdGFsIENhc2VzJyB2YWx1ZT17cHJvcHMudG90YWxzLnRvdGFsQ2FzZXN9IC8+XG5cdFx0XHRcdDxTdGF0aXN0aWMgdGl0bGU9J1RvdGFsIFJlY292ZXJkJyB2YWx1ZT17cHJvcHMudG90YWxzLnRvdGFsUmVjb3ZlcmVkfSAvPlxuXHRcdFx0XHQ8U3RhdGlzdGljIHRpdGxlPSdUb3RhbCBEZWF0aHMnIHZhbHVlPXtwcm9wcy50b3RhbHMudG90YWxEZWF0aHN9IC8+XG5cdFx0XHQ8L0NhcmQ+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VtbWFyeVxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENvbHVtbiwgVGFibGUgfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZCdcblxuY29uc3QgVGFibGVzID0gKHByb3BzKSA9PiB7XG5cdGNvbnN0IFt0YWJsZUFycmF5LCB0YWJsZUFycmF5U2V0XSA9IHVzZVN0YXRlKFtdKVxuXHRjb25zdCBbdGFibGVXaWR0aCwgdGFibGVXaWR0aFNldF0gPSB1c2VTdGF0ZSh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNzUpXG5cblx0Ly9Vc2VkIHRvIG9yZGVyIHRhYmxlIGRhdGEgYnkgY29uZmlybWF0aW9ucyBvZiBjYXNlc1xuXHRmdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcblx0XHRsZXQgYVN0YXRlID0gYS5jb25maXJtZWRcblx0XHRsZXQgYlN0YXRlID0gYi5jb25maXJtZWRcblx0XHRsZXQgY29tcGFyaXNvbiA9IDBcblx0XHRpZiAoYVN0YXRlID4gYlN0YXRlKSB7XG5cdFx0XHRjb21wYXJpc29uID0gLTFcblx0XHR9IGVsc2UgaWYgKGFTdGF0ZSA8IGJTdGF0ZSkge1xuXHRcdFx0Y29tcGFyaXNvbiA9IDFcblx0XHR9XG5cdFx0cmV0dXJuIGNvbXBhcmlzb25cblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vQ3JlYXRlIHByb3BlciBhcnJheVxuXHQvL0lGIFNUQVRFIEFORCBQUk9WSU5FTkNFIEFSRSBDSE9TRU5cblx0Y29uc3QgaGFuZGxlQ291bnR5VGFibGVzID0gKCkgPT4ge1xuXHRcdGxldCBuZXdBcnJheSA9IFtdXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zdGF0ZS50YWJsZURhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCB0ZW1wQXJyYXkgPSBbXVxuXHRcdFx0aWYgKFxuXHRcdFx0XHRwcm9wcy5zdGF0ZS50YWJsZURhdGFbaV0uY291bnRyeSA9PT0gcHJvcHMuc3RhdGUuY291bnRyeVZhbHVlICYmXG5cdFx0XHRcdHByb3BzLnN0YXRlLnRhYmxlRGF0YVtpXS5wcm92aW5jZSA9PT0gcHJvcHMuc3RhdGUuc3RhdGVWYWx1ZVxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChwcm9wcy5zdGF0ZS50YWJsZURhdGFbaV0ucmVnaW9uLmNpdGllcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0ZW1wQXJyYXkucHVzaChwcm9wcy5zdGF0ZS50YWJsZURhdGFbaV0pXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGVtcEFycmF5ID0gcHJvcHMuc3RhdGUudGFibGVEYXRhW2ldLnJlZ2lvbi5jaXRpZXNcblx0XHRcdFx0fVxuXHRcdFx0XHR0ZW1wQXJyYXkuc29ydChjb21wYXJlKVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gdGFibGVEaXZDb3VudHkodGVtcEFycmF5LCBpKVxuXHRcdFx0XHRuZXdBcnJheS5wdXNoKHJlc3VsdClcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG5ld0FycmF5XG5cdH1cblxuXHQvL0lGIEpVU1QgU1RBVEUvUFJPVklORU5DRSBJUyBDSE9TRU5cblx0Y29uc3QgaGFuZGxlU3RhdGVUYWJsZXMgPSAoKSA9PiB7XG5cdFx0bGV0IG5ld0FycmF5ID0gW11cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnN0YXRlLnN0YXRlTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHRlbXBBcnJheSA9IFtdXG5cdFx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IHByb3BzLnN0YXRlLnRhYmxlRGF0YS5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cHJvcHMuc3RhdGUudGFibGVEYXRhW3hdLnByb3ZpbmNlID09PVxuXHRcdFx0XHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVMaXN0W2ldLnByb3ZpbmNlICYmXG5cdFx0XHRcdFx0cHJvcHMuc3RhdGUuY291bnRyeVZhbHVlID09PSBwcm9wcy5zdGF0ZS5zdGF0ZUxpc3RbaV0uY291bnRyeVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRpZiAocHJvcHMuc3RhdGUudGFibGVEYXRhW3hdLnJlZ2lvbi5jaXRpZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHR0ZW1wQXJyYXkucHVzaChwcm9wcy5zdGF0ZS50YWJsZURhdGFbeF0pXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRlbXBBcnJheSA9IHByb3BzLnN0YXRlLnRhYmxlRGF0YVt4XS5yZWdpb24uY2l0aWVzXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRlbXBBcnJheS5zb3J0KGNvbXBhcmUpXG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IHRhYmxlRGl2U3RhdGUodGVtcEFycmF5LCB4KVxuXHRcdFx0XHRcdG5ld0FycmF5LnB1c2gocmVzdWx0KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBuZXdBcnJheVxuXHR9XG5cdC8vSUYgTk8gU1RBVEUgT1IgUFJPVklORU5DRSBBUkUgQ0hPU0VOIChHTE9CQUwgVklFVylcblx0Y29uc3QgaGFuZGxlQ291bnRyeVRhYmxlcyA9ICgpID0+IHtcblx0XHRsZXQgbmV3QXJyYXkgPSBbXVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc3RhdGUuY291bnRyeUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCB0ZW1wQXJyYXkgPSBbXVxuXHRcdFx0Zm9yIChsZXQgeCA9IDA7IHggPCBwcm9wcy5zdGF0ZS50YWJsZURhdGEubGVuZ3RoOyB4KyspIHtcblx0XHRcdFx0aWYgKHByb3BzLnN0YXRlLnRhYmxlRGF0YVt4XS5jb3VudHJ5ID09PSBwcm9wcy5zdGF0ZS5jb3VudHJ5TGlzdFtpXSkge1xuXHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKHByb3BzLnN0YXRlLnRhYmxlRGF0YVt4XSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGVtcEFycmF5LnNvcnQoY29tcGFyZSlcblx0XHRcdGxldCByZXN1bHQgPSB0YWJsZURpdkNvdW50cnkodGVtcEFycmF5LCBpKVxuXHRcdFx0bmV3QXJyYXkucHVzaChyZXN1bHQpXG5cdFx0fVxuXHRcdC8vIHRhYmxlQXJyYXlTZXQobmV3QXJyYXkpXG5cdFx0cmV0dXJuIG5ld0FycmF5XG5cdFx0Ly8gY3JlYXRlVW5pcXVlQXJyYXkoJ2NvdW50cnlfcmVnaW9uJylcblx0fVxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvL0RldGVybWluZSBob3cgdG8gZmlsdGVyIGRhdGFcblx0Y29uc3QgaGFuZGxlVGFibGVzID0gKCkgPT4ge1xuXHRcdGlmIChcblx0XHRcdHByb3BzLnN0YXRlLmNvdW50cnlWYWx1ZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRwcm9wcy5zdGF0ZS5zdGF0ZVZhbHVlICE9PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHJldHVybiBoYW5kbGVDb3VudHlUYWJsZXMoKVxuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZSA9PT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gaGFuZGxlU3RhdGVUYWJsZXMoKVxuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRwcm9wcy5zdGF0ZS5jb3VudHJ5VmFsdWUgPT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0cHJvcHMuc3RhdGUuc3RhdGVWYWx1ZSA9PT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gaGFuZGxlQ291bnRyeVRhYmxlcygpXG5cdFx0fVxuXHR9XG5cblx0Ly9DbGVhbnMgdXAgbnVtYmVycyBpbiB0YWJsZSB0byBhZGQgY29tbWFzXG5cdGNvbnN0IGZvcm1hdE51bWJlciA9IChudW0pID0+IHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIG51bS50b1N0cmluZygpLnJlcGxhY2UoLyhcXGQpKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJyQxLCcpXG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRyZXR1cm4gbnVtXG5cdFx0fVxuXHR9XG5cblx0Ly9UaGUgdGFibGVzIGhhdmUgZGlmZmVyZW50IGNvbHVtbnMgYmFzZWQgb24gd2hhdCBmaWx0ZXJzIGFyZSBwaWNrZWQuXG5cdGNvbnN0IHRhYmxlRGl2Q291bnRyeSA9IChhcnJheSwga2V5KSA9PiB7XG5cdFx0bGV0IHJvd0hlaWdodCA9IDMwXG5cdFx0bGV0IHRibEhlaWdodFxuXHRcdGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRibEhlaWdodCA9IDgwXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRibEhlaWdodCA9IDMwXG5cdFx0fVxuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDYwMCkge1xuXHRcdFx0dGJsSGVpZ2h0ID0gdGJsSGVpZ2h0IC8gMS41XG5cdFx0XHRyb3dIZWlnaHQgPSByb3dIZWlnaHQgLyAxLjVcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT0ndGFibGVzLWluZGl2aWR1YWwnPlxuXHRcdFx0XHRcdDxUYWJsZVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSd0YWJsZXMtdmlydHVhbGl6ZWQnXG5cdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGhlYWRlcj17J0NvdW50cnknfVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXthcnJheS5sZW5ndGggKiB0YmxIZWlnaHR9XG5cdFx0XHRcdFx0XHRoZWFkZXJIZWlnaHQ9ezUwfVxuXHRcdFx0XHRcdFx0cm93SGVpZ2h0PXtyb3dIZWlnaHR9XG5cdFx0XHRcdFx0XHRyb3dDb3VudD17YXJyYXkubGVuZ3RofVxuXHRcdFx0XHRcdFx0cm93R2V0dGVyPXsoeyBpbmRleCB9KSA9PiBhcnJheVtpbmRleF19XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PENvbHVtbiB3aWR0aD17dGFibGVXaWR0aCAvIDV9IGxhYmVsPSdDb3VudHJ5JyBkYXRhS2V5PSdjb3VudHJ5JyAvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdQcm92aW5jZSAvIFN0YXRlJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdwcm92aW5jZSdcblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0NvbmZpcm1lZCdcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nY29uZmlybWVkJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdBY3RpdmUnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2FjdGl2ZSdcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nRGVhdGhzJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdkZWF0aHMnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9UYWJsZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fSBjYXRjaCB7fVxuXHR9XG5cblx0Y29uc3QgdGFibGVEaXZTdGF0ZSA9IChhcnJheSwga2V5KSA9PiB7XG5cdFx0bGV0IHJvd0hlaWdodCA9IDMwXG5cdFx0bGV0IHRibEhlaWdodFxuXHRcdGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRibEhlaWdodCA9IDgwXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRibEhlaWdodCA9IDMwXG5cdFx0fVxuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDYwMCkge1xuXHRcdFx0dGJsSGVpZ2h0ID0gdGJsSGVpZ2h0IC8gMS41XG5cdFx0XHRyb3dIZWlnaHQgPSByb3dIZWlnaHQgLyAxLjVcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT0ndGFibGVzLWluZGl2aWR1YWwnPlxuXHRcdFx0XHRcdDxUYWJsZVxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lPSd0YWJsZXMtdmlydHVhbGl6ZWQnXG5cdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGhlYWRlcj17J0NvdW50cnknfVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXthcnJheS5sZW5ndGggKiB0YmxIZWlnaHR9XG5cdFx0XHRcdFx0XHRoZWFkZXJIZWlnaHQ9ezUwfVxuXHRcdFx0XHRcdFx0cm93SGVpZ2h0PXtyb3dIZWlnaHR9XG5cdFx0XHRcdFx0XHRyb3dDb3VudD17YXJyYXkubGVuZ3RofVxuXHRcdFx0XHRcdFx0cm93R2V0dGVyPXsoeyBpbmRleCB9KSA9PiBhcnJheVtpbmRleF19XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDV9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdQcm92aW5jZSAvIFN0YXRlJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdwcm92aW5jZSdcblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uIHdpZHRoPXt0YWJsZVdpZHRoIC8gNn0gbGFiZWw9J0NvdW50eScgZGF0YUtleT0nbmFtZScgLz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA1fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nQ29uZmlybWVkJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdjb25maXJtZWQnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8Q29sdW1uXG5cdFx0XHRcdFx0XHRcdHdpZHRoPXt0YWJsZVdpZHRoIC8gNX1cblx0XHRcdFx0XHRcdFx0bGFiZWw9J0RlYXRocydcblx0XHRcdFx0XHRcdFx0ZGF0YUtleT0nZGVhdGhzJ1xuXHRcdFx0XHRcdFx0XHRjZWxsRGF0YUdldHRlcj17KHsgcm93RGF0YSwgZGF0YUtleSB9KSA9PlxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdE51bWJlcihyb3dEYXRhW2RhdGFLZXldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvVGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH0gY2F0Y2gge31cblx0fVxuXG5cdGNvbnN0IHRhYmxlRGl2Q291bnR5ID0gKGFycmF5LCBrZXkpID0+IHtcblx0XHRsZXQgcm93SGVpZ2h0ID0gMzBcblx0XHRsZXQgdGJsSGVpZ2h0XG5cdFx0aWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGJsSGVpZ2h0ID0gODBcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGJsSGVpZ2h0ID0gMzBcblx0XHR9XG5cblx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCA2MDApIHtcblx0XHRcdHRibEhlaWdodCA9IHRibEhlaWdodCAvIDEuNVxuXHRcdFx0cm93SGVpZ2h0ID0gcm93SGVpZ2h0IC8gMS41XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9J3RhYmxlcy1pbmRpdmlkdWFsJz5cblx0XHRcdFx0XHQ8VGFibGVcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT0ndGFibGVzLXZpcnR1YWxpemVkJ1xuXHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGh9XG5cdFx0XHRcdFx0XHRoZWFkZXI9eydDb3VudHJ5J31cblx0XHRcdFx0XHRcdGhlaWdodD17YXJyYXkubGVuZ3RoICogdGJsSGVpZ2h0fVxuXHRcdFx0XHRcdFx0aGVhZGVySGVpZ2h0PXs1MH1cblx0XHRcdFx0XHRcdHJvd0hlaWdodD17cm93SGVpZ2h0fVxuXHRcdFx0XHRcdFx0cm93Q291bnQ9e2FycmF5Lmxlbmd0aH1cblx0XHRcdFx0XHRcdHJvd0dldHRlcj17KHsgaW5kZXggfSkgPT4gYXJyYXlbaW5kZXhdfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxDb2x1bW4gd2lkdGg9e3RhYmxlV2lkdGggLyA0fSBsYWJlbD0nQ291bnR5JyBkYXRhS2V5PSduYW1lJyAvPlxuXHRcdFx0XHRcdFx0PENvbHVtblxuXHRcdFx0XHRcdFx0XHR3aWR0aD17dGFibGVXaWR0aCAvIDR9XG5cdFx0XHRcdFx0XHRcdGxhYmVsPSdDb25maXJtZWQnXG5cdFx0XHRcdFx0XHRcdGRhdGFLZXk9J2NvbmZpcm1lZCdcblx0XHRcdFx0XHRcdFx0Y2VsbERhdGFHZXR0ZXI9eyh7IHJvd0RhdGEsIGRhdGFLZXkgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRmb3JtYXROdW1iZXIocm93RGF0YVtkYXRhS2V5XSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDxDb2x1bW5cblx0XHRcdFx0XHRcdFx0d2lkdGg9e3RhYmxlV2lkdGggLyA0fVxuXHRcdFx0XHRcdFx0XHRsYWJlbD0nRGVhdGhzJ1xuXHRcdFx0XHRcdFx0XHRkYXRhS2V5PSdkZWF0aHMnXG5cdFx0XHRcdFx0XHRcdGNlbGxEYXRhR2V0dGVyPXsoeyByb3dEYXRhLCBkYXRhS2V5IH0pID0+XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0TnVtYmVyKHJvd0RhdGFbZGF0YUtleV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PC9UYWJsZT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fSBjYXRjaCB7fVxuXHR9XG5cblx0dXNlRWZmZWN0KCgpID0+IHtcblx0XHR0YWJsZUFycmF5U2V0KGhhbmRsZVRhYmxlcygpKVxuXHR9LCBbcHJvcHNdKVxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG5cdFx0dGFibGVXaWR0aFNldCh3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNzUpXG5cdH0pXG5cblx0cmV0dXJuIDxkaXYgaWQ9J3RhYmxlcyc+e3RhYmxlQXJyYXl9PC9kaXY+XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlc1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJodG1sIHtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCAnUm9ib3RvJywgJ094eWdlbicsICdVYnVudHUnLCAnQ2FudGFyZWxsJywgJ0ZpcmEgU2FucycsICdEcm9pZCBTYW5zJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIC0tc2Nyb2xsdHJhY2s6IHdoaXRlO1xcbiAgLS1ib3JkZXItY29sb3I6ICNmMGYwZjA7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxufVxcbmNvZGUge1xcbiAgZm9udC1mYW1pbHk6IHNvdXJjZS1jb2RlLXBybywgTWVubG8sIE1vbmFjbywgQ29uc29sYXMsICdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcXG59XFxuI2Rpc2NsYWltZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFkZTNjO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogMS41dm1pbjtcXG59XFxuI2Rpc2NsYWltZXItZGV0YWlsIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG4jZGlzY2xhaW1lci1saW5rcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG4jZGlzY2xhaW1lci1hdXRob3JpdGF0aXZlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcbi5kaXNjbGFpbWVyLWxpbmstaGVhZCB7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuLmRpc2NsYWltZXItbGlua3MtYWRkcmVzcyB7XFxuICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuI29wdGlvbnMge1xcbiAgZm9udC1zaXplOiAxLjF2bWluO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBwb3NpdGlvbjogc3RpY2t5O1xcbiAgdG9wOiAwO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgei1pbmRleDogMTA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY3JvbGx0cmFjayk7XFxufVxcbiNvcHRpb25zLXRoZW1lIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLm9wdGlvbnMtaW5wdXRzIHtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI3N1bW1hcnkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4jc3VtbWFyeS1jYXJkIHtcXG4gIHdpZHRoOiA3NSU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi8qIEFudC1DYXJkIHN0eWxpbmcgZm9yIHRvdGFscyBzdW1tYXJ5ICovXFxuLyogLmFudC1zdGF0aXN0aWMtY29udGVudC12YWx1ZS1pbnQge1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG59ICovXFxuLmFudC1zdGF0aXN0aWMtdGl0bGUge1xcbiAgLyogZm9udC1zaXplOiAxLjd2bWluOyAqL1xcbn1cXG4jdGFibGVzIHtcXG4gIHdpZHRoOiA4NSU7XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuLnRhYmxlcy1oZWFkZXIge1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG59XFxuLnRhYmxlcy1pbmRpdmlkdWFsIHtcXG4gIGhlaWdodDogYXV0bztcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY3JvbGx0cmFjayk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3c6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNjcm9sbHRyYWNrKTtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3c6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93LFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93IHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWRfX2lubmVyU2Nyb2xsQ29udGFpbmVyLFxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZCxcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclJvdyB7XFxuICB3aWR0aDogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgbWF4LXdpZHRoOiBpbmhlcml0ICFpbXBvcnRhbnQ7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyUm93IHtcXG4gIHBhZGRpbmctcmlnaHQ6IDI1cHggIWltcG9ydGFudDtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlLFxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkIHtcXG4gIG1heC1oZWlnaHQ6IDUwMHB4ICFpbXBvcnRhbnQ7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZCB7XFxuICBtYXgtaGVpZ2h0OiA0NDBweCAhaW1wb3J0YW50O1xcbiAgbWluLWhlaWdodDogMzBweCAhaW1wb3J0YW50O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlckNvbHVtbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogNDBweDtcXG4gIGZvbnQtc2l6ZTogMS43dm1pbjtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG59XFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJUcnVuY2F0ZWRUZXh0IHtcXG4gIG92ZXJmbG93OiBhdXRvICFpbXBvcnRhbnQ7XFxuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQgIWltcG9ydGFudDtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZSAhaW1wb3J0YW50O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3Jvd0NvbHVtbiB7XFxuICBoZWlnaHQ6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IDEuN3ZtaW47XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDQyxrQkFBQTtBQUNEO0FBRUE7RUFDQyxTQUFBO0VBQ0EsOEpBQUE7RUFHQSxtQ0FBQTtFQUNBLGtDQUFBO0VBQ0Esb0JBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBRkQ7QUFLQTtFQUNDLCtFQUFBO0FBSEQ7QUFPQTtFQUNDLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFMRDtBQVFBO0VBQ0MsaUJBQUE7QUFORDtBQVNBO0VBQ0MsYUFBQTtBQVBEO0FBVUE7RUFDQyxhQUFBO0FBUkQ7QUFXQTtFQUNDLGlCQUFBO0FBVEQ7QUFZQTtFQUNDLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLDBCQUFBO0FBVkQ7QUFhQTtFQUNDLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsTUFBQTtFQUNBLDZCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBRUEsV0FBQTtFQUNBLG9DQUFBO0FBWkQ7QUFlQTtFQUNDLG9CQUFBO0VBQ0Esc0JBQUE7QUFiRDtBQWdCQTtFQUNDLFlBQUE7QUFkRDtBQWlCQTtFQUNDLGFBQUE7RUFDQSx1QkFBQTtBQWZEO0FBa0JBO0VBQ0MsVUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQWhCRDtBQUNBLHdDQUF3QztBQUN4Qzs7R0FFRztBQW9CSDtFQWxCRSx3QkFBd0I7QUFDMUI7QUFxQkE7RUFDQyxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQW5CRDtBQXNCQTtFQUNDLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUNBQUE7QUFwQkQ7QUF1QkE7RUFDQyxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBckJEO0FBd0JBOzs7RUFHQyxvQ0FBQTtBQXRCRDtBQXlCQTs7O0VBR0Msc0JBQUE7QUF2QkQ7QUEwQkE7O0VBRUMsc0JBQUE7RUFDQSw2QkFBQTtBQXhCRDtBQTBCQTs7OztFQUlDLHlCQUFBO0VBQ0EsNkJBQUE7QUF4QkQ7QUEyQkE7RUFDQyw4QkFBQTtBQXpCRDtBQTRCQTs7RUFFQyw0QkFBQTtBQTFCRDtBQTZCQTtFQUNDLDRCQUFBO0VBQ0EsMkJBQUE7QUEzQkQ7QUE4QkE7RUFDQyxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUE1QkQ7QUErQkE7RUFDQyxxQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtBQTdCRDtBQStCQTtFQUNDLHlCQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQ0FBQTtFQUNBLGdDQUFBO0FBN0JEO0FBZ0NBO0VBQ0MsZUFBQTtFQUNBLGtCQUFBO0FBOUJEXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImh0bWwge1xcblxcdG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuYm9keSB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsICdSb2JvdG8nLCAnT3h5Z2VuJyxcXG5cXHRcXHQnVWJ1bnR1JywgJ0NhbnRhcmVsbCcsICdGaXJhIFNhbnMnLCAnRHJvaWQgU2FucycsICdIZWx2ZXRpY2EgTmV1ZScsXFxuXFx0XFx0c2Fucy1zZXJpZjtcXG5cXHQtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG5cXHQtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcblxcdC0tc2Nyb2xsdHJhY2s6IHdoaXRlO1xcblxcdC0tYm9yZGVyLWNvbG9yOiAjZjBmMGYwO1xcblxcdG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuY29kZSB7XFxuXFx0Zm9udC1mYW1pbHk6IHNvdXJjZS1jb2RlLXBybywgTWVubG8sIE1vbmFjbywgQ29uc29sYXMsICdDb3VyaWVyIE5ldycsXFxuXFx0XFx0bW9ub3NwYWNlO1xcbn1cXG5cXG4jZGlzY2xhaW1lciB7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDI1MCwgMjIyLCA2MCwgMC45KTtcXG5cXHRmb250LXdlaWdodDogNjAwO1xcblxcdGZvbnQtc2l6ZTogMS41dm1pbjtcXG59XFxuXFxuI2Rpc2NsYWltZXItZGV0YWlsIHtcXG5cXHRtYXJnaW4tbGVmdDogMTBweDtcXG59XFxuXFxuI2Rpc2NsYWltZXItbGlua3Mge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbiNkaXNjbGFpbWVyLWF1dGhvcml0YXRpdmUge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5kaXNjbGFpbWVyLWxpbmstaGVhZCB7XFxuXFx0bWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcblxcbi5kaXNjbGFpbWVyLWxpbmtzLWFkZHJlc3Mge1xcblxcdG1hcmdpbi1sZWZ0OiA1cHg7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbiNvcHRpb25zIHtcXG5cXHRmb250LXNpemU6IDEuMXZtaW47XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0aGVpZ2h0OiAxMDBweDtcXG5cXHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG5cXHRwb3NpdGlvbjogc3RpY2t5O1xcblxcdHRvcDogMDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG5cXHRmbGV4LXdyYXA6IHdyYXA7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG5cXHR6LWluZGV4OiAxMDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zY3JvbGx0cmFjayk7XFxufVxcblxcbiNvcHRpb25zLXRoZW1lIHtcXG5cXHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ub3B0aW9ucy1pbnB1dHMge1xcblxcdHdpZHRoOiAyMDBweDtcXG59XFxuXFxuI3N1bW1hcnkge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiNzdW1tYXJ5LWNhcmQge1xcblxcdHdpZHRoOiA3NSU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLyogQW50LUNhcmQgc3R5bGluZyBmb3IgdG90YWxzIHN1bW1hcnkgKi9cXG4vKiAuYW50LXN0YXRpc3RpYy1jb250ZW50LXZhbHVlLWludCB7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcbn0gKi9cXG5cXG4uYW50LXN0YXRpc3RpYy10aXRsZSB7XFxuXFx0LyogZm9udC1zaXplOiAxLjd2bWluOyAqL1xcbn1cXG5cXG4jdGFibGVzIHtcXG5cXHR3aWR0aDogODUlO1xcblxcdG1hcmdpbi1sZWZ0OiBhdXRvO1xcblxcdG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXFxuLnRhYmxlcy1oZWFkZXIge1xcblxcdGZvbnQtc2l6ZTogMjBweDtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRtYXJnaW4tYm90dG9tOiAxMHB4O1xcblxcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxufVxcblxcbi50YWJsZXMtaW5kaXZpZHVhbCB7XFxuXFx0aGVpZ2h0OiBhdXRvO1xcblxcdG1hcmdpbi10b3A6IDIwcHg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Nyb2xsdHJhY2spO1xcblxcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxuXFx0bWFyZ2luLWJvdHRvbTogMjBweDtcXG5cXHRtYXJnaW4tbGVmdDogYXV0bztcXG5cXHRtYXJnaW4tcmlnaHQ6IGF1dG87XFxuXFx0cGFkZGluZzogMTBweDtcXG5cXHRib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkOjotd2Via2l0LXNjcm9sbGJhcixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX0dyaWQ6Oi13ZWJraXQtc2Nyb2xsYmFyLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Ojotd2Via2l0LXNjcm9sbGJhciB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2Nyb2xsdHJhY2spO1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkOjotd2Via2l0LXNjcm9sbGJhci10aHVtYixcXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX3Jvdzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xcblxcdGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93LFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93IHtcXG5cXHR3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcblxcdGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbn1cXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZF9faW5uZXJTY3JvbGxDb250YWluZXIsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkLFxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyUm93IHtcXG5cXHR3aWR0aDogaW5oZXJpdCAhaW1wb3J0YW50O1xcblxcdG1heC13aWR0aDogaW5oZXJpdCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclJvdyB7XFxuXFx0cGFkZGluZy1yaWdodDogMjVweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGUsXFxuLlJlYWN0VmlydHVhbGl6ZWRfX0dyaWQge1xcblxcdG1heC1oZWlnaHQ6IDUwMHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fR3JpZCB7XFxuXFx0bWF4LWhlaWdodDogNDQwcHggIWltcG9ydGFudDtcXG5cXHRtaW4taGVpZ2h0OiAzMHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyQ29sdW1uIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0aGVpZ2h0OiA0MHB4O1xcblxcdGZvbnQtc2l6ZTogMS43dm1pbjtcXG59XFxuXFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xcblxcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxuXFx0bWFyZ2luLWJvdHRvbTogMTBweDtcXG5cXHRib3JkZXItcmFkaXVzOiAzcHg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxufVxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyVHJ1bmNhdGVkVGV4dCB7XFxuXFx0b3ZlcmZsb3c6IGF1dG8gIWltcG9ydGFudDtcXG5cXHRvdmVyZmxvdy13cmFwOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxuXFx0d29yZC13cmFwOiBicmVhay13b3JkICFpbXBvcnRhbnQ7XFxuXFx0d2hpdGUtc3BhY2U6IHByZS1saW5lICFpbXBvcnRhbnQ7XFxufVxcblxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Q29sdW1uIHtcXG5cXHRoZWlnaHQ6IGluaGVyaXQ7XFxuXFx0Zm9udC1zaXplOiAxLjd2bWluO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbM10udXNlWzJdIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzNdLnVzZVsyXSEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vVGhpcyBpcyByZXF1aXJlZCBieSBBbnRkIHRvIGF2b2lkIG1vbWVudCB3aGljaCB3YXMgYWRkaW5nIHRvIGJ1bmRsZSBzaXplLlxuXG5pbXBvcnQgeyBEYXlqcyB9IGZyb20gJ2RheWpzJ1xuaW1wb3J0IGRheWpzR2VuZXJhdGVDb25maWcgZnJvbSAncmMtcGlja2VyL2xpYi9nZW5lcmF0ZS9kYXlqcydcbmltcG9ydCBnZW5lcmF0ZVBpY2tlciBmcm9tICdhbnRkL2VzL2RhdGUtcGlja2VyL2dlbmVyYXRlUGlja2VyJ1xuaW1wb3J0ICdhbnRkL2VzL2RhdGUtcGlja2VyL3N0eWxlL2luZGV4J1xuXG5jb25zdCBEYXRlUGlja2VyID0gZ2VuZXJhdGVQaWNrZXI8RGF5anM+KGRheWpzR2VuZXJhdGVDb25maWcpXG5cbmV4cG9ydCBkZWZhdWx0IERhdGVQaWNrZXJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkRpc2NsYWltZXIiLCJPcHRpb25zIiwiU3VtbWFyeSIsIlRhYmxlcyIsIkFwcCIsInByb3BzIiwic3RhdGUiLCJvcHRpb25zIiwidG90YWxzIiwidGFibGVzIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJkYXlqcyIsImNvbnNvbGUiLCJsb2ciLCJBUElfVVJMIiwiU3RhdGUiLCJ5Iiwic3VidHJhY3QiLCJmb3JtYXQiLCJkYXRlVmFsdWUiLCJkYXRlVmFsdWVTZXQiLCJkYXRhRGVmYXVsdCIsImRhdGFDdXN0b21lRGF0ZSIsImNvdW50cnlMaXN0IiwiY291bnRyeUxpc3RTZXQiLCJzdGF0ZUxpc3QiLCJzdGF0ZUxpc3RTZXQiLCJjb3VudHJ5VmFsdWUiLCJjb3VudHJ5VmFsdWVTZXQiLCJzdGF0ZVZhbHVlIiwic3RhdGVWYWx1ZVNldCIsInRhYmxlRGF0YSIsInRhYmxlRGF0YVNldCIsInRvdGFsc0RhdGEiLCJ0b3RhbHNEYXRhU2V0IiwidG90YWxzU2V0IiwiY29tcGFyZSIsImEiLCJiIiwiYVN0YXRlIiwicHJvdmluY2UiLCJiU3RhdGUiLCJjb21wYXJpc29uIiwiaGFuZGxlUHJvdmluY2VMaXN0IiwiZCIsInJlc3VsdCIsIm1hcCIsImUiLCJyZWdpb24iLCJjb3VudHJ5IiwibmFtZSIsInAiLCJzb3J0IiwiZGVmYXVsdERhdGEiLCJsb2NhbCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiZGF0ZSIsImhhbmRsZUxvY2FsRGF0YSIsImhhbmRsZUZldGNoIiwidXJsIiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiYyIsImNvdW50cmllcyIsImhhbmRsZVRvdGFscyIsInN0b3JhZ2UiLCJ0b3RhbERhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwicyIsImNvbmZpcm1lZCIsImRlYXRocyIsInJlY292ZXJlZCIsInVuZGVmaW5lZCIsInQiLCJ0b3RhbENhc2VzIiwidG90YWxEZWF0aHMiLCJ0b3RhbFJlY292ZXJlZCIsIlNlbGVjdCIsIlN3aXRjaCIsIkRhdGVQaWNrZXIiLCJkZWZhdWx0UHJvdmluY2VWYWx1ZSIsInByb3ZpbmNlVGV4dCIsInByb3ZpbmNlVGV4dFNldCIsImRlZmF1bHRDb3VudHJ5VmFsdWUiLCJjb3VudHJ5VGV4dCIsImNvdW50cnlUZXh0U2V0IiwiY2hhbmdlVGhlbWUiLCJjdXJWYWx1ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJocmVmIiwic3BsaXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJvblNlYXJjaCIsImkiLCJzdGF0ZXMiLCJwdXNoIiwiaGFuZGxlRGF0ZUNoYW5nZSIsImNoYW5nZUNvdW50cnlTdGF0ZVZhbHVlIiwidHlwZSIsIkNhcmQiLCJTdGF0aXN0aWMiLCJDb2x1bW4iLCJUYWJsZSIsInRhYmxlQXJyYXkiLCJ0YWJsZUFycmF5U2V0IiwidGFibGVXaWR0aCIsInRhYmxlV2lkdGhTZXQiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaGFuZGxlQ291bnR5VGFibGVzIiwibmV3QXJyYXkiLCJsZW5ndGgiLCJ0ZW1wQXJyYXkiLCJjaXRpZXMiLCJ0YWJsZURpdkNvdW50eSIsImhhbmRsZVN0YXRlVGFibGVzIiwieCIsInRhYmxlRGl2U3RhdGUiLCJoYW5kbGVDb3VudHJ5VGFibGVzIiwidGFibGVEaXZDb3VudHJ5IiwiaGFuZGxlVGFibGVzIiwiZm9ybWF0TnVtYmVyIiwibnVtIiwidG9TdHJpbmciLCJyZXBsYWNlIiwiYXJyYXkiLCJrZXkiLCJyb3dIZWlnaHQiLCJ0YmxIZWlnaHQiLCJpbmRleCIsInJvd0RhdGEiLCJkYXRhS2V5IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=