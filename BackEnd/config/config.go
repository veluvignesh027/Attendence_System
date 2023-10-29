package config

var CurrentConfigDetails Configs

type Configs struct {
	Port          string
	Ip            string
	DataFilePath  string
	SmtpPort      string
	SmtpHost      string
	FromEmail     string
	FromEmailPass string
	ToEmail       string
}

func InitConfig() error {
	CurrentConfigDetails.SmtpHost = "smtp.gmail.com"
	CurrentConfigDetails.SmtpPort = "587"
	CurrentConfigDetails.DataFilePath = "./../database/data.db"
	CurrentConfigDetails.Ip = "127.0.0.1"
	CurrentConfigDetails.Port = "3030"

	//email
	CurrentConfigDetails.FromEmail = ""
	CurrentConfigDetails.ToEmail = ""
	CurrentConfigDetails.FromEmailPass = ""

	return nil
}
