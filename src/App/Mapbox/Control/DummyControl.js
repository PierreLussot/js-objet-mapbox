export class DummyControl {
    map;
    container ;


    onAdd(map) {
        this.map = map;

        this.container = document.createElement('div');
        this.container.classList.add( 'mapboxgl-ctrl','mapboxgl-ctrl-group');
        this.container.innerHTML = '<button type="button"><span class="mapboxgl-ctrl-clown">🤡</span></button>';
        this.container.addEventListener('click',this.handlerDummyClick.bind(this));

        return this.container;
    }

    onRemove() {
        this.container.removeEventListener(this.handlerDummyClick)//suppression des écouteurs
        this.container.remove();//suppression de l'element de l'arbre DOM
        this.container =  undefined;//suppression  de la reference (pour que  gabage collector vide la memoire)
        this.map = undefined;//suppression  la  reference
    }

    handlerDummyClick() {
        console.log(this.container.textContent)
    }
}