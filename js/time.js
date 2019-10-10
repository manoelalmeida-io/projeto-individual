function selecionar(e) {
    
    if (selectedPokemons.childElementCount < 6) {
        
        var clone = e.cloneNode(true);
        selectedPokemons.appendChild(clone);
    }
}