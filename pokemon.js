document.addEventListener("DOMContentLoaded", function() {
    // Función para buscar Pokémon por nombre
    function buscarPorNombre(nombre) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta de la API
                mostrarPokemon(data);
            })
            .catch(error => {
                // Manejar errores
                console.error("Error al buscar por nombre:", error);
            });
    }

    // Función para buscar Pokémon por tipo
    function buscarPorTipo(tipo) {
        fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
            .then(response => response.json())
            .then(data => {
                // Filtrar los Pokémon por tipo
                const pokemons = data.pokemon.map(pokemon => pokemon.pokemon);
                const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

                // Obtener información del Pokémon aleatorio
                return fetch(randomPokemon.url);
            })
            .then(response => response.json())
            .then(data => {
                // Manejar la respuesta de la API
                mostrarPokemon(data);
            })
            .catch(error => {
                // Manejar errores
                console.error("Error al buscar por tipo:", error);
            });
    }

    // Función para obtener 50 nombres de Pokémon aleatorios
    function obtenerNombresAleatorios() {
        const nombres = [];
        for (let i = 0; i < 5; i++) {
            const fila = [];
            for (let j = 0; j < 10; j++) {
                const id = Math.floor(Math.random() * 898) + 1; // Obtener un ID de Pokémon aleatorio (del 1 al 898)
                fila.push(fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                    .then(response => response.json())
                    .then(data => data.name)
                );
            }
            nombres.push(fila);
        }
        Promise.all(nombres.flat()) // Aplanar la matriz de nombres
            .then(names => {
                mostrarNombresEnAlerta(names);
            })
            .catch(error => {
                console.error("Error al obtener nombres de Pokémon aleatorios:", error);
            });
    }

    // Función para mostrar la información del Pokémon
    function mostrarPokemon(pokemon) {
        // Obtener la información del Pokémon
        var nombrePokemon = pokemon.name;
        var tipoPokemon = pokemon.types[0].type.name;
        var imagenPokemon = pokemon.sprites.front_default;
        var habilidadesPokemon = pokemon.abilities.map(ability => ability.ability.name).join(", ");

        // Crear elementos para mostrar la información
        var infoElement = document.getElementById("resultado");
        infoElement.innerHTML = `
            <img src="${imagenPokemon}" alt="${nombrePokemon}">
            <p>Nombre: ${nombrePokemon}</p>
            <p>Tipo: ${tipoPokemon}</p>
            <p>Habilidades: ${habilidadesPokemon}</p>
        `;
    }

    // Función para mostrar los nombres de Pokémon en una alerta con formato HTML
    function mostrarNombresEnAlerta(nombres) {
        let alertMessage = "<div class='fila'>";
        for (let i = 0; i < nombres.length; i++) {
            alertMessage += `<div class='nombre'>${nombres[i]}</div>`;
            if ((i + 1) % 10 === 0 && i !== nombres.length - 1) {
                alertMessage += "</div><div class='fila'>";
            }
        }
        alertMessage += "</div>";
        alert(`<div class='contenedor'>${alertMessage}</div>`);
    }

    // Event listener para el botón de buscar por nombre
    document.getElementById("buscarPorNombre").addEventListener("click", function() {
        var nombrePokemon = prompt("Ingrese el nombre del Pokémon:");
        if (nombrePokemon) {
            buscarPorNombre(nombrePokemon.toLowerCase());
        }
    });

    // Event listener para el botón de buscar por tipo
    document.getElementById("buscarPorTipo").addEventListener("click", function() {
        var tipoPokemon = prompt("Ingrese el tipo del Pokémon:");
        if (tipoPokemon) {
            buscarPorTipo(tipoPokemon.toLowerCase());
        }
    });

    // Event listener para el botón de obtener 50 nombres de Pokémon
    document.getElementById("nombresAleatorios").addEventListener("click", function() {
        obtenerNombresAleatorios();
    });
});


