const baseURI = 'https://api.openweathermap.org/data/2.5/';

/**
 * Connecteur de service pour OpenWeatherMaps
 */
export class OpenWeatherService {
    appid;
    units;
    lang;

    constructor( appid, units, lang ) {
        this.appid = appid;
        this.units = units;
        this.lang = lang;
    }

    /**
     * Obtient les conditions météo actuelles pour la position géographique donnée.
     *
     * @param lat {number} Latitude
     * @param lon {number} Longitude
     *
     * @returns {Promise<Response>}
     */
    getCurrentConditions( lat, lon ) {
        let url = this.getUrl( 'onecall', ['daily', 'minutely' , 'hourly', 'alerts'] );

        url += `&lat=${lat}&lon=${lon}`;

        // Version longue
        // fetch effectue une requête HTTP et construit un objet Promise (puis renvoie cet objet)
        // Une Promise permet d'attendre une réponse plus tard et de lancer une fonction seulement à ce moment là
        // const promiseResult = fetch( url ); // On obtient un objet Promise dans lequel on pourra récuper une réponse

        // De la fonction anonyme vers la fonction fléchée
        // promiseResult.then( function( r ) { return r.json() } );
        // promiseResult.then( ( r ) => { return r.json() } );
        // promiseResult.then( r => { return r.json() } );

        // Promise.then() contient la fonction à exécuter
        // La promise de fetch reçoit une réponse HTTP qui contient les données demandées
        // Il reste encore à extraire ses données dans un format donné
        // Response.json() convertit ces données au format JSON
        // La conversion pouvant être d'une durée variable, Response.json() renvoie une Promise
        // qui contiendra les données finales
        // promiseResult.then( r => r.json() );

        // C'est cette dernière promise qui doit être transmise à App (car c'est App qui exploite ces données
        // return promiseResult;

        return fetch( url ).then( response => response.json() );
    }

    /**
     * Construction d'une URL vers le service selon les paramètres donnés
     *
     * @param APIType {string} Nom du service
     * @param excludes {Array} Détails à exclure du résultat
     *
     * @returns {string}
     */
    getUrl( APIType, excludes = [] ) {
        let url = `${baseURI + APIType}?appid=${this.appid}&units=${this.units}&lang=${this.lang}`;

        if( excludes.length > 0 ) {
            url += `&exclude=${excludes.join( ',' )}`;
        }

        return url;
    }

}