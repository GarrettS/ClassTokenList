/** License: MPL 2.0  (c) Garrett Smith */
var ClassTokenList = function() {
    var Exps = {},
        normalizeString,
        contains, 
        add,
        remove,
        toggle,
        supportsClassList = document.documentElement.classList != undefined; 

    // Needed also for getElementsByClassName.
    function getTokenizedExp(token, flag){
        var p = token + "$" + flag;
        return Exps[p] || (Exps[p] = RegExp("(?:^|\\s)"+token+"(?:$|\\s)", flag));
    }

    if(!supportsClassList) {
        contains = function(el, klass) {
            return getTokenizedExp(klass, "").test(el.className);
        };
        
        add = function(el, klass) {
            if(!el.className) el.className = klass;
            else if(!getTokenizedExp(klass).test(el.className)) {
                el.className += " " + klass;
            }  
        };
        
        remove = function(el, klass) { 
            var cn = el.className;
            if(cn) {
                el.className = cn === klass ? "" :
                    normalizeString(cn.replace(getTokenizedExp(klass, "g")," "));
            }
        };

        toggle = function(el, klass) {
            (contains(el, klass) ? remove : add)(el, klass);
        };

        normalizeString = function(s) { 
            return s.replace(/^\s+|\s+$/g,"").replace(/\s\s+/g, " "); 
        };
    } else {

        contains = function(el, klass) {
            return el.classList.contains(klass);
        };
    
        add = function(el, klass) {
            return el.classList.add(klass);
        };

        remove = function(el, klass) {
            return el.classList.remove(klass);
        };

        toggle = function(el, klass) {
            el.classList.toggle(klass);
        };
    }
    
    /** @param {HTMLElement} el
     * @param {String} tagName tagName to be searched. Use "*" for any tag.
     * @param {String} klass className token(s) to be added.
     * @return {Array|NodeList} Elements with the specified tagName and className.
     * Searches will generally be faster with a smaller HTMLCollection
     * and shorter tree.
     */
    function getElementsByClassName(el, tagName, klass) {
        if(!klass) return [];
        tagName = tagName||"*";
        if(el.getElementsByClassName && (tagName === "*")) {
            return el.getElementsByClassName(klass);
        }
        var exp = getTokenizedExp(klass,""),
            collection = el.getElementsByTagName(tagName),
            ret = [],
            len = ret.length = collection.length,
            counter = 0,
            i;
        
        for(i = 0; i < len; i++){
            if(exp.test(collection[i].className))
                ret[counter++] = collection[i];
        }
        ret.length = counter; // trim array.
        return ret;
    }

   /** Finds an ancestor with specified className
    * @param {Element|Document} [container] where to stop traversing up (optional).
    */
    function findAncestorWithClass(el, klass, container) {
        if(el == null || el === container)
            return null;
        for(var parent = el.parentNode;parent && parent != container && typeof parent.className == "string";){
            if(contains(parent, klass)) {
                return parent;
            }
            parent = parent.parentNode;
        }
        return null;
    }
    
    return{
        contains : contains,
        add : add,
        remove : remove,
        toggle : toggle,
        getElementsByClassName : getElementsByClassName,
        findAncestorWithClass : findAncestorWithClass
    };
}();