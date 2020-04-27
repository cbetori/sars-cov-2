package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"routes"
	"time"

	"github.com/gorilla/mux"
)

func Start(w http.ResponseWriter, r *http.Request) {
	x := routes.Start(r)
	fmt.Println(x)
}

func HandleDefaultQuery(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	vars := mux.Vars(r)
	data := routes.CountriesDate(vars["date"])
	dataStruct := routes.CreateDataStruct(data)
	totals, countries := routes.HandleTotalsObj(dataStruct)
	jsonCountries, _ := json.Marshal(countries)
	jsonData, err := json.Marshal(dataStruct)
	if err != nil {
		fmt.Println("Controller-HandleDefaulQuery: Unable to convert dataStruct into json")
	}

	x := `{"totals":` + string(totals) + `,"data":` + string(jsonData) + `,"countries":` + string(jsonCountries) + `}`
	fmt.Fprintf(w, x)
	duration := time.Since(start)
	fmt.Println(duration)
}

var TimedData string

func HandleTimedData() string {
	data := routes.CountriesDate("nil")
	dataStruct := routes.CreateDataStruct(data)
	totals, countries := routes.HandleTotalsObj(dataStruct)
	jsonCountries, _ := json.Marshal(countries)
	jsonData, err := json.Marshal(dataStruct)
	if err != nil {
		fmt.Println("Controller-HandleDefaulQuery: Unable to convert dataStruct into json")
	}
	TimedData = `{"totals":` + string(totals) + `,"data":` + string(jsonData) + `,"countries":` + string(jsonCountries) + `}`
	return TimedData
}

func TimedQuery(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, TimedData)
}

// func CountriesDate(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	x := routes.CountriesDate(vars["date"])
// 	fmt.Fprintf(w, string(x))
// }

// func TotalsDate(w http.ResponseWriter, r *http.Request) {
// 	x := routes.TotalsDate(r)
// 	fmt.Fprintf(w, string(x))
// }

// func HandleTotalsObj(w http.ResponseWriter, r *http.Request) {
// 	x := routes.HandleTotalsObj()
// 	fmt.Fprintf(w, string(x))
// }

// func TotalsLatest(w http.ResponseWriter, r *http.Request) {
// 	x := routes.TotalsLatest()
// 	fmt.Fprintf(w, x)
// }
// func CountriesLatest(w http.ResponseWriter, r *http.Request) {
// 	x := routes.CountriesLatest()
// 	fmt.Fprintf(w, x)
// }

// func HandleDefaultQuery(w http.ResponseWriter, r *http.Request) {
// 	date := routes.HandleLatestDate()
// 	data := routes.HandleData(date)
// 	countries := routes.HandleCountries(data)
// 	province := routes.HandleProvince(data, countries)

// 	dataString := structJSON(data)
// 	countryString := sliceJSON(countries)
// 	provinceString := structJSON(province)

// 	x := `{"data":` + dataString + `,"countries":` + countryString + `,"provinces":` + provinceString + `}`
// 	fmt.Fprintf(w, x)
// }

// func structJSON(data []map[string]interface{}) string {
// 	result, err := json.Marshal(data)
// 	if err != nil {
// 		fmt.Println("handleGetReq: Unable to handle GET request")
// 	}
// 	return string(result)
// }
// func sliceJSON(data []string) string {
// 	result, err := json.Marshal(data)
// 	if err != nil {
// 		fmt.Println("handleGetReq: Unable to handle GET request")
// 	}
// 	return string(result)
// }
