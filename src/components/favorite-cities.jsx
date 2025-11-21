import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";

// Single Favorite Card
function FavoriteCityTablet({ id, name, lat, lon, onRemove }) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        relative flex min-w-[230px] sm:min-w-[260px] 
        cursor-pointer items-center gap-3 rounded-lg border
        bg-card p-4 pr-10 shadow-sm 
        transition-all hover:shadow-md hover:bg-accent
      "
      role="button"
      tabIndex={0}
    >
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="
          absolute right-2 top-2 h-6 w-6 rounded-full p-0
          hover:text-destructive-foreground
        "
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Weather Loading */}
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          {/* Weather Icon + City */}
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-10 w-10 object-contain"
            />
            <div className="leading-tight">
              <p className="font-medium text-sm sm:text-base">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>

          {/* Temperature + Condition */}
          <div className="ml-auto text-right">
            <p className="text-xl font-bold leading-tight">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

// Full List of Favorites
export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight mb-2">Favorites</h1>

      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 pr-2">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}
