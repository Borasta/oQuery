/**
 * Created by Orlando Bohorquez on 15/11/2015.
 */

(function() {

    /*
     * Este metodo busca los elementos html igual que
     * querySelector y querySelectorAll
     *
     * Ej:
     *   $("html > body");
     *
     *   div.$("ul > li");
     */
    o$ = function(selector) {
        // Si la funcion es llamada con window, entonces usar document
        // si no entonces usar el elemento
        var self = this === window ? document : this;

        // Obtenemos todas las coincidencias
        var elemento = self.querySelectorAll( selector );

        // Si existe mas de una retornar como arreglo,
        // si no entonces solo retornar la encontrada

        elemento = elemento.length > 1 ? elemento: elemento[0];

        return elemento;
    };

    HTMLElement.prototype.o$ = o$;

    NodeList.prototype.o$ = function( selector ) {
        var list = this;
        var aLen = list.length;
        var result = [];
        for( var i = 0; i < aLen; i++ )
            result.push(list[i].o$(selector));
        return result;
    };

    o$.ajax = function() {
        alert("hola");
    };


    /*
     * Esta metodo añade una nueva clase al elemento html
     * desde el que se esta invocando el metodo.
     *
     * Si es un arreglo añade la nueva clase a todos
     * los elementos del arreglo
     *
     * Ej:
     *   Element.addClass("nuevaClase");
     */
    HTMLElement.prototype.addClass = function( newClass ) {
        var len = this.length;
        if( len !== undefined )
            for( var i = 0; i < len; i++ )
                this[i].addClass(newClass);
        else
        if( this.className === "" )
            this.className = newClass;
        else
            this.className += " " + newClass;
    };

    /*
     * Esta metodo remueve una nueva clase del elemento html
     * desde el que se esta invocando el metodo.
     *
     * Si no existe no hace nada
     *
     * Si es un arreglo remueve la clase de todos
     * los elementos del arreglo
     *
     * Ej:
     *   Element.removeClass("claseAQuitar");
     */
    HTMLElement.prototype.removeClass = function( classToRemove ) {
        var len = this.length;
        if( len !== undefined )
            for( var i = 0; i < len; i++ )
                this[i].removeClass( classToRemove );
        else {
            var classes = this.className.split(" ");
            var classesLen = classes.length;
            var newClass = "";
            for( var j = 0; j < classesLen; j++ )
                if( classes[j] !== classToRemove )
                    newClass += classes[j] + ( j + 1 != classesLen ? " " : "" );

            this.className = newClass;
        }
    };

    /*
     * Esta metodo añade un nuevo evento al elemento
     * desde el que se esta invocando.
     *
     * Si la variable es un arreglo, añade el evento
     * a todos los elementos del arreglo
     *
     * Ej:
     *   Element.addEvent("click", function() { alert("hola") }, true);
     */
    HTMLElement.prototype.addEvent = function( type, listener, useCapture ) {
        var len = this.length;
        if( len !== undefined && this !== window )
            for( var i = 0; i < len; i++ )
                this[i].addEventListener(type, listener, useCapture);
        else
            this.addEventListener(type, listener, useCapture);
    };

    /*
     * Esta metodo permite buscar los hermanos del elemento
     * desde el que se esta invocando.
     *
     * Ej:
     *   Element.siblings();
     */
    HTMLElement.prototype.siblings = function() {
        var result = [];
        var node = this.parentNode.first();

        while( node ) {
            if( node !== this )
                result.push( node );
            node = node.nextSibling;
        }
        return result;
    };

    NodeList.prototype.first = function() {
        console.log(this.length)
    };

    HTMLElement.prototype.first = function () {
        var firts = this.firstChild;
        while( firts && firts.nodeType === 3 )
            firts = firts.nextSibling;

        return firts;
    };

    HTMLElement.prototype.last = function () {
        var last = this.firstChild;
        var next = last.nextSibling;

        while( next && last.nodeType === 3 ) {
            next = last.nextSibling;

        }

        return last;
    }

})();











