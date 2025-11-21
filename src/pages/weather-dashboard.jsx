import CurrentWeather from '@/components/current-weather'
import { FavoriteCities } from '@/components/favorite-cities'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/weather-details'
import WeatherForecast from '@/components/weather-forecast'
import { useGeolocation } from '@/hooks/use-geolocation'
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
  useAirQualityQuery,
} from '@/hooks/use-weather'
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react'
import React from 'react'

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation()

  // API calls
  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)
  const airQualityQuery = useAirQualityQuery(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
      airQualityQuery.refetch()
    }
  }

  // Loading geolocation
  if (locationLoading) {
    return <WeatherSkeleton />
  }

  // Geolocation error
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0]

  // Weather / Forecast error
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // Still loading API
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">

      {/* Favorites */}
      <FavoriteCities />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>

        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? 'animate-spin' : ''
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">

        <div className="flex flex-col lg:flex-row gap-6">
          <CurrentWeather
            data={weatherQuery.data}
            forecastData={forecastQuery.data}
            locationName={locationName}
          />

          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails
            data={weatherQuery.data}
            air={airQualityQuery.data}
            forecast={forecastQuery.data}
          />

          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard
