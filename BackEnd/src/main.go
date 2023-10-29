package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/mux"
	"github.com/veluvignesh027/Attendence_System/BackEnd/config"
	"github.com/veluvignesh027/Attendence_System/BackEnd/database"
	"github.com/veluvignesh027/Attendence_System/BackEnd/handlers"
)

func init() {
	log.SetFlags(log.Ldate | log.Lshortfile)
	log.Println("Setting log flags..")
	log.Println("Initializing  configurations...")
	err := config.InitConfig()
	if err != nil {
		log.Println("Config Error!")
		os.Exit(-1)
	}
	log.Println("Configuration read sucessfully")
}

func main() {
	log.Println("Main Starts()")
	log.Println("Turning DataBase Up...")
	db, err := database.NewDataBase()
	if err != nil {
		log.Println(err)
		os.Exit(0)
	}
	time.Sleep(time.Second * 2)

	defer func() {
		log.Println("Shuting Down the Database.")
		db.Close()
		time.Sleep(time.Second * 2)
		log.Println("DataBase was closed gracesfully!")
		log.Println("Main Exits..")
	}()

	log.Println("Data Base was Up & Running ", db)

	router := mux.NewRouter()
	router.HandleFunc("/save", handlers.SaveHandler(db)).Methods(http.MethodPost)
	router.HandleFunc("/getall", handlers.GetAllHandler(db)).Methods(http.MethodGet)

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)

	log.Println("Server is Listening on port 3030...")
	go func() {
		err := http.ListenAndServe(":3030", router)
		if err != nil {
			log.Println(err)
		}
	}()
	<-stop
}
func usage() {
	log.Println(`
	Config File Requirements :
	Port          port which the server listens.
	Ip            Ip Addr Which the server run
	DataFilePath  DataBase file location
	SmtpPort      SMTP Port Number (Default : 550)
	SmtpHost      SMTP Host (Default : smtp@gmail.com )
	FromEmail     Email Addr from which mails can be sent
	FromEmailPass The Mail Id's Password
	
	`)
}
