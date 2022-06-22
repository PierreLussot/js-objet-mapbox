export class IconCollection {
    icons = [];

    constructor() {
        const context = require.context( '../../assets/weather-icons', true, /\.(png)$/im );

        for( let filename of context.keys() ) {
            this.icons[ filename ] = context( filename );
        }
    }

    getUrl( code ) {
        return this.icons[ './' + code + '.png' ];
    }

    getImg( code, alt = '' ) {
        return `<img src="${this.getUrl( code )}" alt="${alt}">`;
    }
}