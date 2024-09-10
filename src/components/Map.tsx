import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface CountryData {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

interface MapProps {
  countries: CountryData[];
}

const Map: React.FC<MapProps> = ({ countries }) => {
  const position: LatLngExpression = [20, 0];

  return (
    <MapContainer center={position} zoom={2} style={{ height: "500px", width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries.map((country) => {
        const { lat, long } = country.countryInfo;

        return (
          <Marker key={country.country} position={[lat, long]}>
            <Popup>
              <strong>{country.country}</strong><br />
              Active: {country.active.toLocaleString()}<br />
              Recovered: {country.recovered.toLocaleString()}<br />
              Deaths: {country.deaths.toLocaleString()}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
