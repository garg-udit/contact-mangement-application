import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import LineChart from "../components/LineChart";
import Map from "../components/Map";


const LoadingSpinner = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    <span className="text-gray-600">Loading...</span>
  </div>
);

const LoadingPlaceholder = () => (
  <div className="p-4 border border-gray-200 rounded-lg shadow-md flex flex-col items-center space-y-4">
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
    <div className="w-full h-8 bg-gray-200 animate-pulse rounded-lg"></div>
  </div>
);


const App: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [countriesData, setCountriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };
    fetchHistoricalData();
  }, []);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };
    fetchCountriesData();
  }, []);

  return (
    <div>
      <h1>COVID-19 Dashboard</h1>
      <div className="space-y-6">
      {historicalData ? (
        <LineChart historicalData={historicalData} />
      ) : (
        <LoadingPlaceholder />
      )}

      {countriesData.length > 0 ? (
        <Map countries={countriesData} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
    </div>
  );
};

export default App;
