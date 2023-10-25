package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/etcd-io/bbolt"
	"github.com/veluvignesh027/Attendence_System/BackEnd/database"
	"github.com/veluvignesh027/Attendence_System/BackEnd/email"
)

func SaveHandler(db *bbolt.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Incoming POST Request to save the data from", r.URL.Host)

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

		err = json.Unmarshal(nByte, &tempStudents)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = database.AddData(db, tempStudents)
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if r.Header.Get("email") == "1" {
			email.SendMailToDest("mailid", "data-we-want-to-send")
			w.Header().Set("Email", "Sent")
		} else {
			log.Println("Mailing Option Disabled From the Header. Not Sending the Email ")
			w.Header().Set("Email", "Not Sent")
		}

		w.Header().Set("Content-Type", "application/json")
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
		err = json.NewEncoder(w).Encode(allStudents)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}
