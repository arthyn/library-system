/*
  Function Signature:
  librarySystem(name, dependencies, callback)

  Callback Parameters:
  - dependency1...dependencyN

  Return Value:
  - Called with all three parameters returns nothing but stores library
  - Called with just name returns stored library with loaded dependencies
*/

(function() {
  var libraryStorage = {};
  
  var Library = function(dependencies, callback) {
    this.dependencies = dependencies;
    this.generator = callback;
    this.loadedLibrary = null;
  };

  function loadDependencies(dependencies) {
    return dependencies.reduce(function(loadedDependencies, dependency) {
      loadedDependencies.push(retreiveLibrary(dependency));
      return loadedDependencies;
    }, []);
  }

  function retreiveLibrary(libraryName) {
    var library = libraryStorage[libraryName];
    var dependencies;

    if(typeof library.loadedLibrary !== 'undefined' && library.loadedLibrary !== null) {
      return library.loadedLibrary;
    }

    if(library.dependencies.length === 0) {
      library.loadedLibrary = library.generator();
    } else {
      dependencies = loadDependencies(library.dependencies);
      library.loadedLibrary = library.generator.apply(null, dependencies);
    }

    return library.loadedLibrary;
  }

  function librarySystem(libraryName, dependencies, callback) {
    if(arguments.length > 2) {
      libraryStorage[libraryName] = new Library(dependencies, callback);
    } else {
      return retreiveLibrary(libraryName);
    }
  }
  
  window.librarySystem = librarySystem;
})();