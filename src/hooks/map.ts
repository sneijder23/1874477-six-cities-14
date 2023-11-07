import { useState, useRef, useEffect, MutableRefObject } from 'react';
import { Map as LeafletMap, TileLayer } from 'leaflet';
import { City } from '../types-ts/city';
import { OPEN_STREET_MAP, TITLE_LAYER_URL } from '../const';

export function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    const {
      location: { latitude, longitude, zoom },
    } = city;
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new LeafletMap(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      const layer = new TileLayer(TITLE_LAYER_URL, {
        attribution: OPEN_STREET_MAP,
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
