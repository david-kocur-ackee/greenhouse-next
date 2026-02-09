const API_BASE = typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_BASE_URL  // server: direct API URL
    : '/api';  

export const fetchCurrentTemperature = () =>
    fetch(`${API_BASE}/measurements/temperature?current=true`).then(res => res.json());

export const fetchCurrentCo2 = () =>
    fetch(`${API_BASE}/measurements/co2?current=true`).then(res => res.json());

export const fetchCurrentHumidity = () =>
    fetch(`${API_BASE}/measurements/humidity?current=true`).then(res => res.json());

export const fetchCo2Measurements = () =>
    fetch(`${API_BASE}/measurements/co2`).then(res => res.json());

export const fetchTemperatureMeasurements = () =>
    fetch(`${API_BASE}/measurements/temperature`).then(res => res.json());

export const fetchHumidityMeasurements = () =>
    fetch(`${API_BASE}/measurements/humidity`).then(res => res.json());

export const fetchPreset = () =>
    fetch(`${API_BASE}/current-preset`).then(res => res.json());

export const fetchToggle = () =>
    fetch(`${API_BASE}/watering-system/toggle`).then(res => res.json());