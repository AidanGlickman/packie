package implementation

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/aidanglickman/packie/item"
	"github.com/aidanglickman/packie/store"
	"github.com/gocolly/colly"
)

type CityHive struct {
	Metadata store.Metadata
	BaseURL  string
}

func (cthv *CityHive) GetItem(itemID string) (item.Item, error) {
	formedURL := fmt.Sprintf("%s/shop/?product-id=%s", cthv.BaseURL, itemID)

	currItem := item.Item{
		ID: itemID,
	}

	c := colly.NewCollector()

	c.OnHTML("meta", func(e *colly.HTMLElement) {
		if e.Attr("property") == "product:price:amount" {
			priceStr := e.Attr("content")
			currItem.Price, _ = strconv.ParseFloat(priceStr, 64)
		}
	})

	c.OnHTML("title", func(e *colly.HTMLElement) {
		nameStr := e.Text
		currItem.Name = strings.Split(nameStr, " - ")[0]
	})

	err := c.Visit(formedURL)

	if err != nil {
		return item.Item{}, err
	}
	return currItem, nil
}
