package implementation

import (
	"testing"

	"github.com/aidanglickman/packie/store"
	"go.viam.com/test"
)

// TODO Fix this test. It's currently dependent on a certain store existing on the internet, we need a dummy instance.
func TestCityHiveGetItem(t *testing.T) {
	cthv := &CityHive{
		Metadata: store.Metadata{
			Name:      "Wineland NJ",
			StoreType: store.StoreTypeCityHive,
		},
		BaseURL: "https://winelandnj.com",
	}
	item, err := cthv.GetItem("5eed2b443af7ef2855b52cdc")
	test.That(t, err, test.ShouldBeNil)
	test.That(t, item.ID, test.ShouldEqual, "5eed2b443af7ef2855b52cdc")
	test.That(t, item.Name, test.ShouldEqual, "The Macallan Double Cask 15 Years Old Single Malt Scotch Whisky")
	test.That(t, item.Price, test.ShouldAlmostEqual, 169.99)
}
