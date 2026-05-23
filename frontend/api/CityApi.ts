// src/api/CityApi.tsx
interface CountryData {
  name: string;
  alpha2Code: string;
  capital: string;
  // Ajoutez d'autres propriétés si nécessaire
}

interface CountryApiResponse {
  [key: string]: CountryData;
}

export const fetchCountries = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://countryapi.io/api/all?apikey=BsWPkVDYAVX3L7DXazckzjGrpsGS8tcktTX9iOE2', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des pays: ${response.status} ${response.statusText}`);
    }

    const data: CountryApiResponse = await response.json();
    const countries = Object.values(data).map((country) => country.name).sort();
    console.log('Pays renvoyés par l\'API:', countries);
    return countries;
  } catch (error) {
    console.error('Erreur dans fetchCountries:', error);
    throw error;
  }
};

export const fetchCities = async (country: string): Promise<string[]> => {
  try {
    console.log('Pays reçu dans fetchCities:', country);

    // Étape 1 : Récupérer le code ISO du pays
    const countryResponse = await fetch(
      `https://countryapi.io/api/name/${encodeURIComponent(country)}?apikey=BsWPkVDYAVX3L7DXazckzjGrpsGS8tcktTX9iOE2`
    );
    if (!countryResponse.ok) {
      throw new Error(`Erreur lors de la récupération du code pays: ${countryResponse.status} ${countryResponse.statusText}`);
    }
    const countryData: CountryApiResponse = await countryResponse.json();
    const countryInfo = Object.values(countryData)[0];
    console.log('Données du pays:', countryData); // Journal pour vérifier la réponse
    if (!countryInfo) {
      throw new Error(`Aucune information trouvée pour le pays: ${country}`);
    }
    const countryCode = countryInfo.alpha2Code;
    console.log('Code pays pour', country, ':', countryCode);
    if (!countryCode) {
      throw new Error(`Code pays non trouvé pour ${country}`);
    }

    // Étape 2 : Récupérer les villes avec GeoDB Cities
    const response = await fetch(
      `https://countryapi.io/api/name/${encodeURIComponent(country)}?apikey=BsWPkVDYAVX3L7DXazckzjGrpsGS8tcktTX9iOE2`
    );

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des villes: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Réponse API villes:', data);
    const cities = data.data.map((city: { name: string }) => city.name).sort();
    return cities.length > 0 ? cities : ['Aucune ville disponible'];
  } catch (error) {
    console.error('Erreur dans fetchCities:', error);
    throw error;
  }
};