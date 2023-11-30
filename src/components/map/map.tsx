import { memo, useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { useMap } from '../../hooks/map';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { ServerOffer } from '../../types-ts/offer';
import { City } from '../../types-ts/city';
import { useAppSelector } from '../../hooks/store';
import { getActivePoint } from '../../store/slice/offers/selectors';
import classNames from 'classnames';

type MapProps = {
  className: string;
  city: City;
  points: ServerOffer[];
  itOfferPage?: boolean;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function MapComponent({ className, city, points, itOfferPage }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const activePoint = useAppSelector(getActivePoint);


  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      const activeOffer = points.find((point) => point.id === activePoint);
      points.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.location.latitude,
              lng: point.location.longitude,
            },
            {
              icon:
                point.id === activePoint
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });

      if (activeOffer && !itOfferPage) {
        map.setView([activeOffer.location.latitude, activeOffer.location.longitude], activeOffer.city.location.zoom);
      }
    }
  }, [map, points, activePoint, itOfferPage]);
  return <section className={classNames(className, 'map')} ref={mapRef}></section>;
}

export const Map = memo(MapComponent);
