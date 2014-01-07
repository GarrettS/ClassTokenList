README.md
Adapter for HTMLElement.classList

See also:
https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList

    var foo = document.getElementById('foo');

    ClassTokenList.add(foo, "crap");      // void.
    ClassTokenList.add(foo, "blah");      // void.
    ClassTokenList.contains(foo, "blah"); // boolean.
    ClassTokenList.remove(foo, "blah");   // void.
    ClassTokenList.toggle(foo, "crap");   // void.
    
Unlike the standard classList, the toggle function does not take the boolean force parameter.

    // container is optional.
    ClassTokenList.findAncestorWithClass(foo, "bargle", document.body); 
    ClassTokenList.getElementsByClassName(foo, "bargle"); // Array.
    

