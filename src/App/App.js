import config from '../../app.config';
import { OpenWeatherService } from "./Service/OpenWeatherService";
import { LocalStorageService } from "./Service/LocalStorageService";
import { IconCollection } from "./IconCollection";
import { WeatherUtils } from "./WeaterUtils";

const STORAGE_KEY = 'lidem-weather';

class App {
    weatherStorage = null;
    weatherService = null;

    icons = null;

    currentGeoLocation = {
        lat: 0,
        lon: 0
    };

    domCurrentWeather = null;

    constructor() {
        this.icons = new IconCollection();
        this.weatherStorage = new LocalStorageService( STORAGE_KEY );
        this.weatherService = new OpenWeatherService( config.openweather.appid, config.openweather.units, config.openweather.lang );
    }

    /**
     * Démarre l'application
     */
    start() {
        console.info( 'Starting App...' );
    }

    /**
     * Interroge le service des conditions météos actuelles pour les coordonnées enregistrées au préalable
     */
    getCurrentConditionsForDefault() {
        const storedData = this.weatherStorage.getJSON();
        let refreshData = storedData === null || storedData.current === undefined;

        // Si les data sont bonnes, on effectue la comparaisons des dates
        if( !refreshData ) {
            let todayUnix = Math.round( Date.now() / 1000 );

            refreshData = todayUnix > ( storedData.current.dt + config.openweather.cacheTime );

            // Si les data ne sont pas périmées, on effectue la comparaison de la localisation
            if( !refreshData ) {
                // Algèbre de Boole
                // !(A ET B) => !A OU !B
                refreshData = this.currentGeoLocation.lat !== storedData.lat || this.currentGeoLocation.lon !== storedData.lon;
            }
        }

        // Si actualisation des données nécéssaire
        if( refreshData ) {
            console.info( 'Acquiring data from service...' );
            this.weatherService
                .getCurrentConditions( this.currentGeoLocation.lat, this.currentGeoLocation.lon )
                .then( this.handlerCurrentConditions.bind(this) );

            return;
        }

        // Sinon
        console.info( 'Acquiring data from cache...' );
        this.render( storedData );
    }

    render( data ) {
        const
            current = data.current,
            weather = current.weather[0];
        /*
        "current": {
            "dt": 1655468313,
            "sunrise": 1655438752,
            "sunset": 1655494577,
            "temp": 30.62,
            "feels_like": 29.27,
            "pressure": 1023,
            "humidity": 29,
            "dew_point": 10.57,
            "uvi": 9.62,
            "clouds": 35,
            "visibility": 10000,
            "wind_speed": 1.54,
            "wind_deg": 0,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ]
        }
         */

    }

    /**
     * Gestionnaire de réponse de la Promise du service de conditions météos actuelles
     *
     * @param data {Object} Données de météo obtenues
     */
    handlerCurrentConditions( data ) {
        this.weatherStorage.setJSON( data );
        this.render( data );
    }

    /**
     * Gestionnaire de réponse réussi de l'API GeoLocation du navigateur
     *
     * @param position {GeolocationPosition} Informations de la géolocalisation obtenue
     */
    handlerGeoSuccess( position ) {
        this.currentGeoLocation.lat = parseFloat( position.coords.latitude.toFixed(5).slice(0,-1) );
        this.currentGeoLocation.lon = parseFloat( position.coords.longitude.toFixed(5).slice(0,-1) );

        this.getCurrentConditionsForDefault();
    }

    /**
     * Gestionnaire de réponse eéchouée de l'API GeoLocation du navigateur
     *
     * @param error {GeolocationPositionError} Informations de l'erreur d'obtention de géolocalisation
     */
    handlerGeoError( error ) {
        this.currentGeoLocation.lat = 46.866290;
        this.currentGeoLocation.lon = 2.389138;

        this.getCurrentConditionsForDefault();
    }
}

const instance = new App();

export default instance;