package database

import (
	"encoding/json"
	"errors"
	"log"
	"time"

	"github.com/etcd-io/bbolt"
)

// Define a struct
type StudentInfo struct {
	RollNo       string   `json:"roll-no"`
	FirstName    string   `json:"first-name"`
	SecondName   string   `json:"second-name"`
	DOB          string   `json:"dob"`
	Remark       []string `json:"remarks"`
	FatherName   string   `json:"father-name"`
	Email        string   `json:"email"`
	MobileNumber string   `json:"mobile-no"`
	Performance  int      `json:"performance-score"`
	Presence     bool     `json:"presence"`
	Date         string   `json:"date"`
}

var dbFile = "\\CACHE_BASEDIR\\selvaProject\\Attendence_System\\BackEnd\\dbFile\\data.db"
var bucketName = []byte("student")

func NewDataBase() (*bbolt.DB, error) {
	// Open or create the database
	db, err := bbolt.Open(dbFile, 0600, &bbolt.Options{Timeout: 1 * time.Second})
	if err != nil {
		log.Fatal(err)
		return db, err
	}
	log.Println("Data Base Opened Successfully!")

	// Create a bucket if it doesn't exist
	err = db.Update(func(tx *bbolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists(bucketName)
		return err
	})
	if err != nil {
		log.Fatal(err)
		return db, err
	}

	return db, err
}

// Function to add data to the database
func AddData(db *bbolt.DB, students []StudentInfo) error {
	return db.Update(func(tx *bbolt.Tx) error {
		b := tx.Bucket(bucketName)

		for _, student := range students {

			if len(student.RollNo) == 0 {
				log.Println("KEY Not valid for student : ", student)
				return errors.New("invalid Key Found")
			}
			// Serialize struct to JSON
			data, err := json.Marshal(student)
			if err != nil {
				log.Println(err, string(data))
				return err
			}

			// Store data in the database
			if err := b.Put([]byte(student.RollNo), data); err != nil {
				log.Println(err)
				return err
			}
		}

		return nil
	})
}

// Function to retrieve all data from the database
func GetAllData(db *bbolt.DB) ([]StudentInfo, error) {
	var people []StudentInfo

	err := db.View(func(tx *bbolt.Tx) error {
		b := tx.Bucket(bucketName)

		// Iterate over all items in the bucket
		return b.ForEach(func(k, v []byte) error {
			var person StudentInfo

			// Deserialize JSON to struct
			err := json.Unmarshal(v, &person)
			if err != nil {
				return err
			}

			people = append(people, person)
			return nil
		})
	})
	return people, err
}
