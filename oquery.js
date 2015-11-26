/**
 * Created by Orlando Bohorquez on 15/11/2015.
 */

(function() {

    /*
     * Este metodo busca los elementos html igual que
     * querySelector y querySelectorAll
     *
     * Ej:
     *   o$("html > body");
     *
     *   div.o$("ul > li");
     *
     *   o$("<input type=''>")
     */
    o$ = function(selector) {
        // Si la funcion es llamada con window, entonces usar document
        // si no entonces usar el elemento
        var self = this === window ? document : this;

        var elemento;

        if( (selector[0] === "<") && (selector[selector.length - 1] === ">") ) {
            var tag = selector.replace("<", "").replace(">", "");
            var split = tag.split(" ");
            var len = split.length;
            elemento = split[0];
            var attrs = [];
            for( var i = 1; i < len; i++ ) {
                var attr = split.pop();
                if( attr !== elemento )
                    attrs.push( attr );
            }

            elemento = document.createElement(elemento);

            len = attrs.length;

            for( i = 0; i < len; i ++ ) {
                var atr = attrs[i].split("=");
                elemento.attr( atr[0], atr[1].split(/["|']/)[1] );
            }

            if( self !== document )
                this.appendChild(elemento);
        }
        else {
            // Obtenemos todas las coincidencias
            elemento = self.querySelectorAll( selector );

            // Si existe mas de una retornar como arreglo,
            // si no entonces solo retornar la encontrada

            elemento = elemento.length > 1 ? elemento: elemento[0];
        }

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

    HTMLElement.prototype.attr = function( attribute, value ) {
        if( typeof attribute == "object" ) {
            for( var key in attribute ) {
                this.setAttribute(key, attribute[key]);
            }
        }
        else {
            this.setAttribute(attribute, value);
        }
    };

    NodeList.prototype.attr = function( attribute, value ) {
        var list = this;
        var aLen = list.length;
        for( var i = 0; i < aLen; i++ )
            list[i].attribute( attribute, value );
    };

    HTMLElement.prototype.css = function( style, value ) {
        if( typeof style == "object" ) {
            for( var key in style ) {
                this.style[key] = style[key];
            }
        }
        else {
            this.style[style] = value;
        }
    };

    NodeList.prototype.css = function( style, value ) {
        var list = this;
        var aLen = list.length;
        for( var i = 0; i < aLen; i++ )
            list[i].css( style, value );
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
        this.classList.add(newClass);
    };

    NodeList.prototype.addClass = function( newClass ) {
        var len = this.length;
        for( var i = 0; i < len; i++ )
            this[i].addClass(newClass);
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
        this.classList.remove( classToRemove );
    };

    NodeList.prototype.removeClass = function( classToRemove ) {
        var len = this.length;
        for( var i = 0; i < len; i++ )
            this[i].removeClass( classToRemove );
    };

    HTMLElement.prototype.haveClass = function( haveit ) {
        return this.classList.contains( haveit );
    };

    NodeList.prototype.haveClass = function( haveit ) {
        var len = this.length;
        var result = [];
        for( var i = 0; i < len; i++ )
            result.push( this[i].haveClass( haveit ) );
        return result;
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
        this.addEventListener(type, listener, useCapture);
    };

    NodeList.prototype.addEvent = function( type, listener, useCapture ) {
        var len = this.length;
        for( var i = 0; i < len; i++ )
            this[i].addEventListener(type, listener, useCapture);
    };

    /*
     * Esta metodo permite buscar los hermanos del elemento
     * desde el que se esta invocando.
     *
     * Ej:
     *   Element.siblings();
     */
    HTMLElement.prototype.siblings = function() {
        var brothers = [];
        var parent = this.parentNode;
        var node = parent.first();

        while( node ) {
            if( node !== this && node.nodeType != 3 ) {
                node.addClass("oQueryTempClass");
                brothers.push( node );
            }
            node = node.nextSibling;
        }

        brothers = parent.o$(".oQueryTempClass");
        if( brothers )
            brothers.removeClass("oQueryTempClass");
        return brothers;
    };

    NodeList.prototype.siblings = function() {
        var len = this.length;
        var result = [];
        for( var i = 0; i < len; i++ )
            result.push( this[i].siblings() );
        return result;
    };

    HTMLElement.prototype.first = function () {
        var firts = this.firstChild;
        while( firts && firts.nodeType === 3 )
            firts = firts.nextSibling;

        return firts;
    };

    NodeList.prototype.first = function() {
        var list = this;
        var aLen = list.length;
        var result = [];
        for( var i = 0; i < aLen; i++ )
            result.push( list[i].first() );
        return result;
    };


    HTMLElement.prototype.last = function () {
        var first = this.first();
        var siblings = first.siblings();
        var siblingsLen = siblings.length;
        return siblingsLen >= 1 ? siblings[siblingsLen] : first;
    };

    // this.valueOf(); <- Obtiene el valor del objeto

    /*
     ################################################
     #				  Validaciones				   #
     ################################################
     */

    /*
     Description:
     Esta funcion verifica si la variable contiene solamente numeros

     Syntax:
     variable.isDigit();

     retorna  1 si contiene solo numeros
     retorna  0 si no tiene solo numeros
     retorna -1 si no se puede evaluar
     */
    String.prototype.isDigit = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            if( value === "" )
                return 0;

            var numbers = "0123456789";

            for( var i = value.length - 1; i >= 0; i-- ) {
                if ( numbers.indexOf( value.charAt( i ) ) == -1 )
                    return 0;
            }
            return 1;
        }
        else if( typeof value === "number" )
            return 1;
        else
            return -1;
    };

    /*
     Description:
     Esta funcion verifica si la variable contiene solamente letras

     Syntax:
     variable.isAlpha();

     retorna  1 si contiene solo letras
     retorna  0 si no tiene solo letras
     retorna -1 si no se puede evaluar
     */
    String.prototype.isAlpha = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            value = value.toLowerCase();
            if( value === "" )
                return 0;

            var chars = "abcdefghiyjklmnñopqrstuvwxyz";

            for( var i = value.length - 1; i >= 0; i-- ) {
                if ( chars.indexOf( value.charAt( i ) ) == -1 )
                    return 0;
            }
            return 1;
        }
        else
            return -1;
    };

    /*
     Description:
     Esta funcion verifica si la variable contiene solamente minusculas

     Syntax:
     variable.isLower();

     retorna  1 si contiene solo minusculas
     retorna  0 si no tiene solo minusculas
     retorna -1 si no se puede evaluar
     */
    String.prototype.isLower = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            if( value === "" )
                return 0;

            var chars = "abcdefghiyjklmnñopqrstuvwxyz ";

            for( var i = value.length - 1; i >= 0; i-- ) {
                if ( chars.indexOf( value.charAt( i ) ) == -1 )
                    return 0;
            }
            return 1;
        }
        else
            return -1;
    };

    /*
     Description:
     Esta funcion verifica si la variable contiene solamente mayusculas

     Syntax:
     variable.isUpper();

     retorna  1 si contiene solo mayusculas
     retorna  0 si no tiene solo mayusculas
     retorna -1 si no se puede evaluar
     */
    String.prototype.isUpper = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            if( value === "" )
                return 0;

            var chars = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ ";

            for( var i = value.length - 1; i >= 0; i-- ) {
                if ( chars.indexOf( value.charAt( i ) ) == -1 )
                    return 0;
            }
            return 1;
        }
        else
            return -1;
    };

    /*
     Description:
     Esta funcion verifica si la variable contiene solamente espacios

     Syntax:
     variable.isSpace();

     retorna  1 si contiene solo espacios
     retorna  0 si no tiene solo espacios
     retorna -1 si no se puede evaluar
     */
    String.prototype.isSpace = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            if( value === "" )
                return 0;

            var space = " ";

            for( var i = value.length - 1; i >= 0; i-- ) {
                if ( space.indexOf( value.charAt( i ) ) == -1 )
                    return 0;
            }
            return 1;
        }
        else
            return -1;
    };

    /*
     Description:
     Esta funcion verifica si la variable tiene formato de titulo

     Syntax:
     variable.isTitle();

     retorna  1 si tiene formato de titulo
     retorna  0 si no tiene formato de titulo
     retorna -1 si no se puede evaluar
     */
    String.prototype.isTitle = function() {
        var value = this.valueOf();
        if( typeof value[0] === "string" ) {
            value = value.split(" ");
            if( value[0] === "" )
                return 0;

            var chars = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

            for ( var i = value.length - 1; i >= 0; i--) {
                if( chars.indexOf( value[i].charAt( 0 ) ) == -1 )
                    return 0;
            }
            return 1;
        }
        else
            return -1;
    };

    /*
     Description:
     Esta funcion verifica si la variable es Alfanumerica

     Syntax:
     variable.isAlNum();

     retorna  1 si es alfanumerica
     retorna  0 si no es alfanumerica
     retorna -1 si no se puede evaluar
     */
    String.prototype.isAlnum = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            value = value.toLowerCase();
            if( value === "" )
                return 0;

            var numbers = "0123456789";
            var chars = "abcdefghiyjklmnñopqrstuvwxyz";

            var isChar;
            var isNumber;

            for ( var i = value.length - 1; i >= 0; i--) {
                isChar = (chars.indexOf( value[i].charAt( 0 ) ) == -1);
                isNumber = (numbers.indexOf( value[i].charAt( 0 ) ) == -1);

                if( isChar && isNumber )
                    return 0;
            }
            return 1;
        }
        else
            return -1;
    };

    /*
     Description:
     Cuenta cuantas veces aparece el texto que le pasamos

     Syntax:
     variable.countChar( char );

     retorna  n si el caracte se repitio n veces
     retorna  0 si no esta el caracte
     retorna -1 si no se pudo evaluar
     */
    String.prototype.countChar = function( char ) {
        var value = this.valueOf();
    };

    /*
     ################################################
     #				   Conversion				   #
     ################################################
     */

    /*
     Description:
     Esta funcion convierte la primera letra a mayuscula

     Syntax:
     variable.toCapitalize();
     */
    String.prototype.toCapitalize = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            return value[0].toUpperCase() + value.slice( 1 );
        }
    };

    /*
     Description:
     Esta funcion convierte las minusculas a mayusculas y viceversa

     Syntax:
     variable.toSwapcase();
     */
    String.prototype.toSwapcase = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            for (var i = value.length - 1; i >= 0; i--) {
                if( value[i].isLower() === 1 )
                    value[i] = value[i].toUpperCase();
                else if( value[i].isUpper() === 1 )
                    value[i] = value[i].toLowerCase();
            }
        }
    };

    /*
     Description:
     Esta funcion convierte la cadena a formato de titulo

     Syntax:
     variable.toTitle();
     */
    String.prototype.toTitle = function() {
        var value = this.valueOf();
        if( typeof value === "string" ) {
            value = value.split(" ");
            for (var i = value.length - 1; i >= 0; i--) {
                value[i] = value[i][0].toUpperCase() + value[i].slice( 1 );
            }
            return value.join(" ");
        }
    };


})();











