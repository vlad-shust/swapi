import { Person } from '@/types/Person';

interface SWAPIResponse {
  results: Person[];
  next: string | null;
}

export async function* fetchCharacters() {
  const baseUrl = 'https://swapi.dev/api/people/';

  let nextUrl: string | null = baseUrl;
  let totalFetched = 0;

  while (nextUrl && totalFetched < 180) {
    try {
      const response: Response = await fetch(nextUrl);
      const data: SWAPIResponse = await response.json();

      const { results, next } = data;

      const filteredPeople = results
        .filter(({ name }) => !['L', 'N', 'C'].includes(name[0]))
        .map(({ name, eye_color, gender, birth_year }) => ({ name, eye_color, gender, birth_year }));

      totalFetched += filteredPeople.length;
      nextUrl = next;

      yield filteredPeople;
    } catch (error) {
      console.error('Failed to fetch people:', error);
      
      break;
    }
  }
}
