package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/etcd-io/bbolt"
	"github.com/veluvignesh027/Attendence_System/BackEnd/config"
	"github.com/veluvignesh027/Attendence_System/BackEnd/database"
	"github.com/veluvignesh027/Attendence_System/BackEnd/email"
)

func SaveHandler(db *bbolt.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Incoming POST Request to save the data from", r.URL.Host)
		log.Println("Headers :", r.Header)

		var tempStudents []database.StudentInfo

		nByte, err := io.ReadAll(r.Body)
		if len(nByte) == 0 {
			log.Println("Bytes read from request:", nByte)
			http.Error(w, "Empty request body", http.StatusBadRequest)
			return
		}
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		log.Println("Body :=>", string(nByte))

		err = json.Unmarshal(nByte, &tempStudents)
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = database.AddData(db, tempStudents)
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = email.SendMailToDest(config.CurrentConfigDetails.ToEmail, "hello")
		if err != nil {
			log.Println("Error Sending Email", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.WriteHeader(http.StatusOK)
	}

}

func GetAllHandler(db *bbolt.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Incoming GET ALL Request to get all the data to", r.Host)

		allStudents, err := database.GetAllData(db)
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if len(allStudents) == 0 {
			log.Println("No data retrieved")
			http.Error(w, "No data available", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		err = json.NewEncoder(w).Encode(allStudents)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
