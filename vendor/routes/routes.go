package routes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	_ "github.com/joho/godotenv/autoload"
)

func Start(r *http.Request) string {
	return "API Running"
}

func CountriesDate(vars string) []byte {
	var url string
	if vars == "nil" {
		url = "https://covid-19-statistics.p.rapidapi.com/reports?"
	} else {
		url = "https://covid-19-statistics.p.rapidapi.com/reports?date=" + vars
	}

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-host", "covid-19-statistics.p.rapidapi.com")
	req.Header.Add("x-rapidapi-key", "a5d472178emsh3b481354394983cp1a211ejsn1ebcc753bbaf")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	return body
}

func HandleTotalsObj(d Collection) ([]byte, []string) {
	list := countryList(d)
	uniqueList := unique(list)
	result := totalsObject(d, uniqueList)
	return result, uniqueList
}

type Collection struct {
	Collection []Config `json:"data"`
}

type City struct {
	Confirmed      int    `json:"confirmed"`
	Confirmed_diff int    `json:"confirmed_diff"`
	Country        string `json:"country"`
	Date           string `json:"date"`
	Deaths         int    `json:"deaths"`
	Deaths_diff    int    `json:"deaths_diff"`
	Fips           int    `json:"fips"`
	Last_update    string `json:"last_update"`
	Name           string `json:"name"`
	Province       string `json:"province"`
}

type Config struct {
	Active         int    `json:"active"`
	Active_diff    int    `json:"active_diff"`
	Confirmed      int    `json:"confirmed"`
	Confirmed_diff int    `json:"confirmed_diff"`
	Date_          string `json:"date"`
	Deaths         int    `json:"deaths"`
	Deaths_diff    int    `json:"deaths_diff"`
	Fatality_rate  int    `json:"fatality_rate"`
	Last_update    string `json:"last_update"`
	Recovered      int    `json:"recovered"`
	Recovered_diff int    `json:"recovered_diff"`
	Country        string `json:"country"`
	Province       string `json:"province"`
	Region         struct {
		iso      string  `json:"recovered_diff"`
		Lat      float32 `json:"lat"`
		Long     float32 `json:"long"`
		Name     string  `json:"name"`
		Province string  `json:"province"`
		Cities   []City  `json:"cities"`
	} `json:"region"`
}

func CreateDataStruct(d []byte) Collection {
	var result Collection
	countries := []string{}
	json.Unmarshal(d, &result)
	for i, _ := range result.Collection {
		countries = append(countries, result.Collection[i].Region.Name)
		result.Collection[i].Country = result.Collection[i].Region.Name
		result.Collection[i].Province = result.Collection[i].Region.Province
		for x, _ := range result.Collection[i].Region.Cities {
			result.Collection[i].Region.Cities[x].Country = result.Collection[i].Region.Name
			result.Collection[i].Region.Cities[x].Province = result.Collection[i].Region.Province
		}
	}
	return result

}

func totalsObject(r Collection, strSlice []string) []byte {
	result := make(map[string]interface{})
	countries := unique(strSlice)
	totals := make(map[string]interface{})
	confGlobal := 0
	deathsGlobal := 0
	recGlobal := 0
	for _, c := range countries {
		temp := make(map[string]interface{})
		conf := 0
		deaths := 0
		rec := 0
		result[c] = temp
		for _, e := range r.Collection {
			if c == e.Country {
				confGlobal = confGlobal + e.Confirmed
				deathsGlobal = deathsGlobal + e.Deaths
				recGlobal = recGlobal + e.Recovered
				conf = conf + e.Confirmed
				deaths = deaths + e.Deaths
				rec = rec + e.Recovered
				if e.Province != "" {
					temp2 := make(map[string]int)
					temp2["confirmed"] = e.Confirmed
					temp2["deaths"] = e.Deaths
					temp2["recovered"] = e.Recovered
					temp[e.Province] = temp2
				}
			}

		}
		temp["confirmed"] = conf
		temp["deaths"] = deaths
		temp["recovered"] = rec

	}
	totals["confirmed"] = confGlobal
	totals["deaths"] = deathsGlobal
	totals["recovered"] = recGlobal
	result["All"] = totals
	final, _ := json.Marshal(result)
	return final
}

func countryList(result Collection) []string {
	countries := []string{}
	for i, _ := range result.Collection {
		countries = append(countries, result.Collection[i].Region.Name)
	}
	return countries
}

func unique(strSlice []string) []string {
	keys := make(map[string]bool)
	list := []string{}
	for _, entry := range strSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

// func HandleCountries(d []map[string]interface{}) []string {
// 	var list []string
// 	for _, e := range d {
// 		str := fmt.Sprintf("%v", e["country_region"])
// 		if len(list) == 0 {
// 			list = append(list, str)
// 		}
// 	out:
// 		for i := range list {
// 			if str == list[i] {
// 				break out
// 			}
// 			if i+1 == len(list) {
// 				list = append(list, str)
// 			}
// 		}
// 	}
// 	return list
// }

// func HandleProvince(d []map[string]interface{}, c []string) []map[string]interface{} {
// 	var templist []map[string]interface{}
// 	for i := range c {
// 		for _, e := range d {
// 			country := fmt.Sprintf("%v", e["country_region"])
// 			province := fmt.Sprintf("%v", e["province_state"])
// 			if country == c[i] && province != "<nil>" {
// 				temp := make(map[string]interface{})
// 				temp["country_region"] = country
// 				temp["province_state"] = province
// 				templist = append(templist, temp)
// 			}
// 		}
// 	}
// 	var list []map[string]interface{}
// 	for l := range templist {
// 		if len(list) == 0 {
// 			list = append(list, templist[l])
// 		}
// 	out:
// 		for i := range list {
// 			if reflect.DeepEqual(list[i], templist[l]) {
// 				break out
// 			}
// 			if i+1 == len(list) {
// 				list = append(list, templist[l])
// 			}
// 		}
// 	}
// 	return list
// }

// type Totals struct{
// 	Country		String
// }

// type Provinces struct{

// }

// type Countries struct{
// 	Confirmed		int			`json:"confirmed"`
// 	Deaths			int			`json:"deaths"`
// 	Recovered 		int			`json:"Recovered"`
// 	Province		[]Provinces `json:"Province"`

// }

// func TotalsLatest() string {
// 	url := "https://covid-19-data.p.rapidapi.com/totals?format=json"

// 	req, _ := http.NewRequest("GET", url, nil)

// 	req.Header.Add("x-rapidapi-host", "covid-19-data.p.rapidapi.com")
// 	req.Header.Add("x-rapidapi-key", "a5d472178emsh3b481354394983cp1a211ejsn1ebcc753bbaf")

// 	res, _ := http.DefaultClient.Do(req)

// 	defer res.Body.Close()
// 	body, _ := ioutil.ReadAll(res.Body)

// 	return string(body)
// }

// func CountriesLatest() string {
// 	url := "https://covid-19-data.p.rapidapi.com/country/all?format=json"

// 	req, _ := http.NewRequest("GET", url, nil)

// 	req.Header.Add("x-rapidapi-host", "covid-19-data.p.rapidapi.com")
// 	req.Header.Add("x-rapidapi-key", "a5d472178emsh3b481354394983cp1a211ejsn1ebcc753bbaf")

// 	res, _ := http.DefaultClient.Do(req)

// 	defer res.Body.Close()
// 	body, _ := ioutil.ReadAll(res.Body)

// 	return string(body)
// }

// func TotalsDate(r *http.Request) []byte {
// 	vars := mux.Vars(r)
// 	url := "https://covid-19-statistics.p.rapidapi.com/reports/total?date=" + vars["date"]

// 	req, _ := http.NewRequest("GET", url, nil)

// 	req.Header.Add("x-rapidapi-host", "covid-19-statistics.p.rapidapi.com")
// 	req.Header.Add("x-rapidapi-key", "a5d472178emsh3b481354394983cp1a211ejsn1ebcc753bbaf")

// 	res, _ := http.DefaultClient.Do(req)

// 	defer res.Body.Close()
// 	body, _ := ioutil.ReadAll(res.Body)

// 	return body
// }

// func HandleLatestDate() []string {
// 	var largestDate []string
// 	err := Db.Select(&largestDate, `SELECT MAX(report_date) FROM data`)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	return largestDate
// }

// func HandleData(d []string) []map[string]interface{} {
// 	rows, err := Db.Queryx(`SELECT * FROM data WHERE report_date = $1`, d[0])
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	var list []map[string]interface{}
// 	for rows.Next() {
// 		row := make(map[string]interface{})
// 		err = rows.MapScan(row)
// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 		list = append(list, row)
// 	}
// 	return list
// }
