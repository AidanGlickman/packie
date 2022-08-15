package store

import "github.com/aidanglickman/packie/item"

type StoreType string

const (
	StoreTypeCityHive StoreType = "cityhive"
	StoreTypeCustom   StoreType = "custom"
	StoreTypeNull     StoreType = ""
)

type Metadata struct {
	Name      string
	StoreType StoreType
}

type Store interface {
	Metadata() Metadata

	NewStore()

	// GetItem returns an item from the store
	GetItem(itemID string) (item.Item, error)

	// SearchItems returns a list of items from the store matching the search query
	SearchItems(query string) ([]item.Item, error)
}
