const geocode = async (location, country) => {

    const address = `${location}, ${country}`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Vibely/1.0"
        }
    });

    if (!response.ok) {
        throw new Error("Geocoding service failed");
    }

    const data = await response.json();

    if (data.length === 0) {
        return null;
    }

    return {
        latitude: Number(data[0].lat),
        longitude: Number(data[0].lon)
    };
};

module.exports = geocode;