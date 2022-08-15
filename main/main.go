package main

import (
	"fmt"
	"strconv"

	"github.com/gocolly/colly"
)

func main() {
	formedURL := "https://winelandnj.com/shop/?product-id=5eed2b443af7ef2855b52cdc"

	c := colly.NewCollector()

	var price float64
	var name string
	c.OnHTML("meta", func(e *colly.HTMLElement) {
		if e.Attr("property") == "product:price:amount" {
			priceStr := e.Attr("content")
			price, _ = strconv.ParseFloat(priceStr, 64)
			fmt.Printf("Price: %f\n", price)
		}
	})

	c.OnHTML("title", func(e *colly.HTMLElement) {
		name = e.Text
		fmt.Printf("Name: %s\n", name)
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	c.OnResponse(func(r *colly.Response) {
		r.Save("response.html")
	})

	c.Visit(formedURL)
}
