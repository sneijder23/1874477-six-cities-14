import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import useMap from '../hooks/map';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../const';
import { ServerOffer } from '../types/offer';
import { City } from '../types/city';

type MapProps = {
  city: City;
  points: ServerOffer[];
  activePoint: string | null;
}

function Map({city, points, activePoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point.id === activePoint)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, activePoint, currentCustomIcon, defaultCustomIcon]);
  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
