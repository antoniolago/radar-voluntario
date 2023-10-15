import { useEffect } from 'react';
import * as GeoSearch from 'leaflet-geosearch';
export const SearchBar = (props: any) => {
    const provider = new GeoSearch.OpenStreetMapProvider({
      params: {
        'accept-language': 'pt-BR', // render results in Dutch
        countrycodes: 'br', // limit search results to the Netherlands
        addressdetails: 1, // include additional address detail parts
      },
    });
  const search: any = GeoSearch.GeoSearchControl({
    provider: provider,
    searchLabel: 'Pesquisar...',
    notFoundMessage: 'Não encontramos nenhum resultado, tente ser mais específico.',
    style: 'bar',
    updateMap: true,
  } as any) as any;

  useEffect((): any => {
    props?.map?.addControl(search);
    return () => props?.map?.removeControl(search);
  }, []);

  return null;
};