package item

// Item represents an item at a specific store
type Item struct {
	ID    string  `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
	Link  string  `json:"link"`
}
