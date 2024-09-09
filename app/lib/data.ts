export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    status: string;
    release_date: string;
    revenue: number;
    homepage: string;
    imdb_id: string;
    overview: string;
    poster_path: string;
    genres: string;
    production_companies: string,
    original_language: string;
}


export async function fetchMovies(): Promise<Movie[]> {
    const url = 'https://moviedatabase8.p.rapidapi.com/Search/Pool';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b8e44a8c42msh5933482608bf9d9p1516b1jsn14a5843c0bb7',
            'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
        }
    };
    try {

        const response = await fetch(url, options);
        const data = await response.json();

        const movieData: Movie[] = data.map((movie: any) => ({
            id: movie.id,
            vote_average: movie.vote_average,
            status: movie.status,
            release_date: movie.release_date,
            revenue: movie.revenue,
            homepage: movie.homepage,
            imdb_id: movie.imdb_id,
            description: movie.overview,
            poster: movie.poster_path,
            genres: movie.genres,
            production_companies: movie.production_companies,
            original_language: movie.original_language,
            title: movie.title,
        }));

        return movieData;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}