# 🌤️ Veather — A Modern Weather Intelligence Dashboard
*A fast, elegant, and feature-rich weather dashboard built with the latest React ecosystem.*

---

## ✨ Overview
**Veather** is a fully interactive weather dashboard that delivers real-time data with a clean UI and seamless user experience.  
It transforms raw weather information into meaningful visuals — from current conditions to hourly trends and 5-day forecasts.

Built as part of my internship project at **Zaalima Development Pvt. Ltd.**, this project demonstrates production-level frontend engineering with React, Tailwind, ShadCN, API integration, and responsive UI design.

---

## 🧠 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend Framework | **React (Vite)** |
| Styling | **Tailwind CSS** |
| UI Components | **ShadCN UI** |
| Data Fetching & Caching | **TanStack Query** |
| Charts | **Recharts** |
| APIs | **OpenWeatherMap API** |
| Deployment | **Vercel** |

---

## 🚀 Features

### 🔍 City Search + Smart Suggestions  
- Auto-suggestions via OpenWeatherMap Geo API  
- Recent search history  
- Favorite cities management  

### 📍 Current Location Weather  
- Detects user location (Geolocation API)  
- Reverse geocoding  
- Live weather + forecast for your location  

### 🌡️ Current Weather Overview  
- Real-time temperature & feels-like  
- Daily min/max (calculated from forecast)  
- Humidity & wind speed (km/h)  
- Weather icon with description  

### 📈 Hourly Temperature Chart  
- Next 24 hours (3-hour intervals)  
- “Feels like” vs Actual temperature  
- Clean, responsive line chart  

### 🗓️ 5-Day Weather Forecast  
- Min/max temperatures  
- Weather summary  
- Humidity + wind speed  
- Simple and clear layout  

### ❤️ Favorites Module  
- Add/remove favorite cities  
- Temperature preview  
- Horizontal scroll view  

### 🌫️ **NEW — Air Quality Index (AQI)**  
- AQI rating (1–5)  
- Color-coded severity  
- Integrated into Weather Details  

### ☔ **NEW — Rain Probability (POP)**  
- Rain chance (%)  
- Shown alongside other weather details  

### 🌗 Dark / Light Mode  
- Smooth theme switching  
- Uses ShadCN theme provider  

### 📱 Fully Responsive  
- Mobile, tablet, laptop friendly  
- Adaptive layout  

---

## 🗂️ Project Structure

```
src/
├─ api/ → Weather, Forecast & AQI API functions
├─ components/ → UI modules (cards, charts, etc.)
├─ hooks/ → Custom hooks (weather, geolocation, favorites)
├─ pages/ → Home & City weather pages
├─ assets/ → Logo, icons
├─ styles/ → Global and Tailwind styles
└─ App.jsx → Routing + Providers

```

---

## 🔗 Live Demo

**👉 https://veather-eco.vercel.app/**

---

## 🧑‍💻 Author

**Jeel Patel**  
Intern @ Zaalima Development Pvt. Ltd.  
Frontend Developer | React | MERN

---

## ⭐ Future Enhancements
- Severe weather alerts (storms, fog, heatwave)
- Interactive radar/weather maps
- Multi-language support
- Offline cached mode
- Widget mode (embed weather card)

---

