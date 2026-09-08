

const sampleListings = [

  {
    title: "Beachfront Villa in Malibu",
    description:
      "Enjoy stunning ocean views from this luxurious villa in Malibu. Perfect for a relaxing getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    },
    price: 2500,
    location: "Malibu",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.6919, 34.0368],
    },
  },

  {
    title: "Modern Apartment in New York City",
    description:
      "A stylish apartment located in the heart of New York City with easy access to everything.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
    price: 1800,
    location: "New York City",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-74.0060, 40.7128],
    },
  },

  {
    title: "Mountain Cabin in Aspen",
    description:
      "Cozy cabin surrounded by beautiful mountains. Perfect for skiing and winter adventures.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    },
    price: 2200,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911],
    },
  },

  {
    title: "Historic Home in Florence",
    description:
      "Stay in a beautiful historic home located near the heart of Florence.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    },
    price: 1600,
    location: "Florence",
    country: "Italy",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696],
    },
  },

  {
    title: "Cozy House in Portland",
    description:
      "A peaceful and comfortable house in Portland, perfect for a relaxing vacation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    },
    price: 1200,
    location: "Portland",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-122.6784, 45.5152],
    },
  },

  {
    title: "Luxury Resort in Cancun",
    description:
      "Relax at this beautiful beachfront resort in Cancun with amazing ocean views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: {
      type: "Point",
      coordinates: [-86.8515, 21.1619],
    },
  },

  {
    title: "Lake House in Lake Tahoe",
    description:
      "Beautiful lake house with breathtaking views of Lake Tahoe.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    },
    price: 1900,
    location: "Lake Tahoe",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-120.0324, 39.0968],
    },
  },

  {
    title: "Luxury Apartment in Los Angeles",
    description:
      "Modern apartment in Los Angeles close to beaches, restaurants and entertainment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 1700,
    location: "Los Angeles",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.2437, 34.0522],
    },
  },

  {
    title: "Mountain Chalet in Verbier",
    description:
      "Beautiful Swiss chalet surrounded by the Alps. Perfect for a winter holiday.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    },
    price: 2800,
    location: "Verbier",
    country: "Switzerland",
    geometry: {
      type: "Point",
      coordinates: [7.2287, 46.0963],
    },
  },

  {
    title: "Safari Lodge in Serengeti",
    description:
      "Experience an unforgettable African safari from this beautiful lodge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    },
    price: 2400,
    location: "Serengeti National Park",
    country: "Tanzania",
    geometry: {
      type: "Point",
      coordinates: [34.8333, -2.3333],
    },
  },

  {
    title: "Canal House in Amsterdam",
    description:
      "Stay in a charming canal-side home in the heart of Amsterdam.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
    },
    price: 1500,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676],
    },
  },

  {
    title: "Beach Villa in Fiji",
    description:
      "A tropical paradise with a private beach and crystal-clear water.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 3000,
    location: "Fiji",
    country: "Fiji",
    geometry: {
      type: "Point",
      coordinates: [178.0650, -17.7134],
    },
  },

  {
    title: "Countryside Cottage in Cotswolds",
    description:
      "A peaceful English countryside cottage surrounded by beautiful landscapes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    },
    price: 1300,
    location: "Cotswolds",
    country: "United Kingdom",
    geometry: {
      type: "Point",
      coordinates: [-1.8433, 51.8330],
    },
  },

  {
    title: "Historic Apartment in Boston",
    description:
      "Comfortable apartment close to historic landmarks and downtown Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 1400,
    location: "Boston",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-71.0589, 42.3601],
    },
  },

  {
    title: "Luxury Villa in Bali",
    description:
      "Relax in a private luxury villa surrounded by tropical nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
    price: 2100,
    location: "Bali",
    country: "Indonesia",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095],
    },
  },

  {
    title: "Mountain Lodge in Banff",
    description:
      "A cozy mountain lodge surrounded by the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    },
    price: 2300,
    location: "Banff",
    country: "Canada",
    geometry: {
      type: "Point",
      coordinates: [-115.5708, 51.1784],
    },
  },

  {
    title: "Beachfront Condo in Miami",
    description:
      "Modern beachfront condo with amazing views of Miami Beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    price: 1900,
    location: "Miami",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-80.1918, 25.7617],
    },
  },

  {
    title: "Tropical Villa in Phuket",
    description:
      "Beautiful tropical villa with a private pool near Phuket beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    },
    price: 1800,
    location: "Phuket",
    country: "Thailand",
    geometry: {
      type: "Point",
      coordinates: [98.3923, 7.8804],
    },
  },

  {
    title: "Highland Cottage in Scotland",
    description:
      "A peaceful cottage surrounded by the stunning Scottish Highlands.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    },
    price: 1400,
    location: "Scottish Highlands",
    country: "United Kingdom",
    geometry: {
      type: "Point",
      coordinates: [-4.2026, 57.1200],
    },
  },

  {
    title: "Luxury Apartment in Dubai",
    description:
      "Modern luxury apartment with stunning views of Dubai.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    price: 2200,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048],
    },
  },

  {
    title: "Mountain Cabin in Montana",
    description:
      "A quiet cabin surrounded by nature and beautiful mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    },
    price: 1600,
    location: "Montana",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-110.3626, 46.8797],
    },
  },

  {
    title: "Island Villa in Mykonos",
    description:
      "Beautiful Greek island villa with amazing sea views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    },
    price: 2700,
    location: "Mykonos",
    country: "Greece",
    geometry: {
      type: "Point",
      coordinates: [25.3289, 37.4467],
    },
  },

  {
    title: "Jungle Retreat in Costa Rica",
    description:
      "A peaceful jungle retreat surrounded by tropical nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    },
    price: 1700,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: {
      type: "Point",
      coordinates: [-84.0907, 9.7489],
    },
  },

  {
    title: "Historic Home in Charleston",
    description:
      "Beautiful historic home in the charming city of Charleston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    },
    price: 1500,
    location: "Charleston",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-79.9311, 32.7765],
    },
  },

  {
    title: "Modern Apartment in Tokyo",
    description:
      "Stylish apartment in the heart of Tokyo close to restaurants and attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    },
    price: 1600,
    location: "Tokyo",
    country: "Japan",
    geometry: {
      type: "Point",
      coordinates: [139.6917, 35.6895],
    },
  },

  {
    title: "Lake House in New Hampshire",
    description:
      "Relaxing lake house surrounded by forests and mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    },
    price: 1400,
    location: "New Hampshire",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-71.5724, 43.1939],
    },
  },

  {
    title: "Private Island Villa in Maldives",
    description:
      "Enjoy crystal-clear water and white sandy beaches from this luxury villa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    price: 3500,
    location: "Maldives",
    country: "Maldives",
    geometry: {
      type: "Point",
      coordinates: [73.2207, 3.2028],
    },
  },

  {
    title: "Luxury Mountain Retreat in Aspen",
    description:
      "A premium mountain retreat with spectacular views of the Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    },
    price: 3000,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911],
    },
  },

  {
    title: "Rainforest Villa in Costa Rica",
    description:
      "Beautiful villa surrounded by lush rainforest and tropical wildlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
    },
    price: 1900,
    location: "Costa Rica",
    country: "Costa Rica",
    geometry: {
      type: "Point",
      coordinates: [-84.0907, 9.7489],
    },
  },

];

module.exports = { data: sampleListings };