import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import React from "react";

const CurrentWeather = ({ data, forecastData, locationName }) => {
  if (!data) return null;

  const {
    weather: [currentWeather],
    main: { temp, feels_like, humidity },
    wind: { speed },
    name: cityName,
  } = data;

  const formatTemp = (value) => `${Math.round(value)}°`;

  // --------------------------
  // ✅ Today's Min/Max
  // --------------------------
  let todayMin = null;
  let todayMax = null;

  if (forecastData?.list) {
    const today = new Date().getDate();

    const todayReadings = forecastData.list.filter((item) => {
      return new Date(item.dt * 1000).getDate() === today;
    });

    if (todayReadings.length > 0) {
      todayMin = Math.min(...todayReadings.map((item) => item.main.temp_min));
      todayMax = Math.max(...todayReadings.map((item) => item.main.temp_max));
    }
  }

  // Convert m/s → km/h
  const windKmph = (speed * 3.6).toFixed(1);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-8 lg:gap-10 md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Location */}
            <div className="space-y-1">
              <div className="flex items-center flex-wrap">
                <h2 className="text-3xl font-bold tracking-tight">
                  {locationName?.name || cityName}
                </h2>

                {locationName?.state && (
                  <span className="text-muted-foreground ml-2">
                    , {locationName.state}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            {/* Temperature */}
            <div className="flex items-center gap-4">
              <p className="text-7xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>

                <div className="flex gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="h-4 w-4" />
                    {todayMin !== null ? formatTemp(todayMin) : "--"}
                  </span>

                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-4 w-4" />
                    {todayMax !== null ? formatTemp(todayMax) : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Humidity & Wind */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div className="flex items-center gap-3">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Wind className="h-5 w-5 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">
                    {windKmph} km/h
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE - Weather Icon */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[220px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain drop-shadow-lg"
              />
              <div className="absolute bottom-0 text-center pb-2">
                <p className="text-sm font-medium capitalize text-muted-foreground">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
