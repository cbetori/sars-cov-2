package main

import (
	"controller"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
)

var number int

func main() {
	// Init Router
	r := mux.NewRouter()

	// Set port/company name from env file
	port := os.Getenv("PORT")
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	r.HandleFunc("/api/start", controller.Start).Methods("GET")

	r.HandleFunc("/api/default", controller.TimedQuery).Methods("GET")

	r.HandleFunc("/api/default/data={date}", controller.HandleDefaultQuery).Methods("GET")

	spa := spaHandler{staticPath: "client/dist", indexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)

	controller.HandleTimedData()
	go timer()

	//Start Server and Listen
	fmt.Println("Server Running!")
	fmt.Println(port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(originsOk, headersOk, methodsOk)(r)))

}

func timer() {
	t := time.NewTicker(1 * time.Hour)
	for {
		controller.HandleTimedData()
		<-t.C
	}
}

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

// r.HandleFunc("/api/data", controller.HandleDefaultQuery).Methods("GET")
// r.HandleFunc("/api/totals/date={date}", controller.TotalsDate).Methods("GET")
// r.HandleFunc("/api/countries/date={date}", controller.CountriesDate).Methods("GET")
// r.HandleFunc("/api/countries/totals", controller.HandleTotalsObj).Methods("GET")
// r.HandleFunc("/api/totals/latest", controller.TotalsLatest).Methods("GET")
// r.HandleFunc("/api/countries/latest", controller.CountriesLatest).Methods("GET")
