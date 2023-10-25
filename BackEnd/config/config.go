package config

import (
	"encoding/json"
	"log"
	"os"
)

var CurrentConfigDetails Configs

type Configs struct {
	Port          string
	Ip            string
	DataFilePath  string
	SmtpPort      string
	SmtpHost      string
	FromEmail     string
	FromEmailPass string
}

func InitConfig() error {
	nByte, err := os.ReadFile("./config.json")
	if err != nil {
		log.Println(err)
		err = initWithDefaults()
		return err
	}

	err = json.Unmarshal(nByte, &CurrentConfigDetails)
	if err != nil {
		log.Println(err)
	}

	return err
}
func initWithDefaults() error {

	CurrentConfigDetails.SmtpHost = "smtp.gmail.com"
	CurrentConfigDetails.SmtpPort = "587"
	CurrentConfigDetails.DataFilePath = "./../database/data.db"
	CurrentConfigDetails.Ip = "127.0.0.1"
	CurrentConfigDetails.Port = "3030"

	return nil
}
func WriteConfigFile(conf Configs) error {

	out, err := json.Marshal(conf)
	if err != nil {
		log.Println(err)
	}

	err = os.WriteFile("config.json", out, 0666)
	if err != nil {
		log.Println(err)
	}

	return err

}
