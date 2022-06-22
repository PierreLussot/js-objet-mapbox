const CARDINALS = [ 'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO' ];

export class WeatherUtils {
    static msToKmh( ms ) {
        return ms * 3600 / 1000;
    }

    static directionToCardinal( deg ) {
        // https://www.campbellsci.fr/blog/convert-wind-directions
        let idx = Math.round( (deg % 360) / 22.5 );

        return CARDINALS[idx];
    }
}