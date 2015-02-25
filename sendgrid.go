package main

import (
    "os"
    "fmt"
    "github.com/sendgrid/sendgrid-go"
)

func main() {
    sg := sendgrid.NewSendGridClient(os.Getenv("SGU"), os.Getenv("SGP"))
    message := sendgrid.NewMail()
    message.AddTo("luyege+go@gmail.com")
    message.AddToName("Yamil env Asusta")
    message.SetSubject("SendGrid env Testing")
    message.SetText("WIN env")
    message.SetFrom("luyege+fromgo@gmail.com")
    if r := sg.Send(message); r == nil {
        fmt.Println("Email sent!")
    } else {
        fmt.Println(r)
    }
}