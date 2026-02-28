const nameData = {
    // ---- ESTILO NÓRDICO PURO ----
    nordicMale: {
        prefixes: ['Thor', 'Bjor', 'Gunn', 'Hald', 'Sven', 'Ragn', 'Sig', 'Leif', 'Har', 'As', 'Eir', 'Frod', 'Hroth', 'Ivar', 'Knut', 'Ulf', 'Vid', 'Yng', 'Ar', 'Eil', 'Hakon', 'Olaf', 'Magn', 'Balder', 'Erling', 'Bjorn', 'Brand', 'Gar', 'Stein', 'Vald', 'Hild'],
        suffixes: ['ald', 'ar', 'bjorn', 'brand', 'dan', 'ell', 'fast', 'fred', 'gar', 'grim', 'hall', 'kjell', 'mund', 'olv', 'rad', 'rik', 'stein', 'thor', 'ulf', 'valr', 'vid', 'ward']
    },
    nordicFemale: {
        prefixes: ['A', 'As', 'Berg', 'Bryn', 'Eir', 'Freyd', 'Gunn', 'Gud', 'Hild', 'Ing', 'Id', 'Liv', 'Ragn', 'Sig', 'Thor', 'Svan', 'Thrud', 'Val', 'Al', 'Eyd', 'Sif', 'Grid', 'Nanna', 'Idun', 'Ulf', 'Bjorn', 'Stein'],
        suffixes: ['dis', 'frid', 'gerd', 'hild', 'gunn', 'laug', 'leif', 'lin', 'ny', 'rid', 'run', 'thrud', 'unn', 'veig', 'vor', 'wyn', 'sif']
    },
    nordicRealm: {
        prefixes: ['Alf', 'As', 'Jotun', 'Mid', 'Muspel', 'Nifl', 'Svartalf', 'Vana', 'Hel', 'Ginnunga', 'Fens', 'Val', 'Nida', 'Thrud', 'Folkv', 'Glit', 'Himin', 'Aegir', 'Hund', 'Myrk'],
        suffixes: ['gard', 'heim', 'vang', 'borg', 'fell', 'dal', 'holm', 'land', 'mark', 'vellir', 'wood', 'dor', 'run', 'thun', 'stad', 'fjord']
    },
    nordicCity: {
        prefixes: ['Bir', 'Hed', 'Kapp', 'Kaup', 'Upps', 'Ros', 'Sig', 'Tuns', 'Volt', 'Aros', 'Ribe', 'Jor', 'Trelle', 'Sigt', 'Skir', 'Haf', 'Kald', 'Vest', 'Aust', 'Nord', 'Sud', 'Stein', 'Bjorn', 'Thor', 'Brand'],
        suffixes: ['by', 'vik', 'stad', 'borg', 'hus', 'hof', 'lund', 'tun', 'nes', 'os', 'anger', 'fjord', 'dal', 'berg', 'strond', 'vatn', 'havn', 'heim', 'gard']
    },

    // ---- ESTILO ENANO (Khuzdul + Nórdico) ----
    dwarfMale: {
        rootMin: ['khaz', 'bar', 'dur', 'mor', 'az', 'grom', 'kar', 'thram', 'bor', 'grum', 'bal', 'dwal'],
        rootForce: ['grim', 'thur', 'gar', 'dorn', 'karn', 'brak', 'vorg', 'zorn'],
        suffixes: ['in', 'ar', 'ur', 'orn', 'grim', 'dur', 'rak']
    },
    dwarfFemale: {
        rootMin: ['khaz', 'bar', 'dur', 'mor', 'az', 'grom', 'kar', 'thram', 'bor', 'grum', 'dis'],
        rootForce: ['grim', 'thur', 'gar', 'dorn', 'karn', 'brak', 'vorg', 'zorn'],
        suffixes: ['a', 'ira', 'eth', 'una', 'ryn']
    },
    dwarfCity: {
        rootMin: ['khaz', 'bar', 'dur', 'mor', 'az', 'grom', 'kar', 'thram', 'bor', 'grum', 'iron', 'ere', 'thraz'],
        descriptors: ['dum', 'gar', 'bar', 'dur', 'khaz', 'heim', 'fort', 'hold', 'fang', 'drak']
    }
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function generateSingleName(type) {
    let generatedName = "";

    if (type.startsWith('nordic')) {
        const data = nameData[type];
        const prefix = getRandomElement(data.prefixes);
        let suffix = getRandomElement(data.suffixes);

        if (type === 'nordicMale' || type === 'nordicFemale') {
            let baseName = prefix.toLowerCase() + suffix.toLowerCase();

            // Estilo puro: 25% de que termine con "r" (si es hombre y no termina en r)
            if (type === 'nordicMale' && Math.random() < 0.25 && !baseName.endsWith('r')) {
                baseName += 'r';
            }

            // Limpieza nórdica
            baseName = baseName.replace(/rr/g, 'r');
            baseName = baseName.replace(/hh/g, 'h');
            baseName = baseName.replace(/uu/g, 'u');
            baseName = capitalizeWords(baseName);

            // 30% de probabilidad de tener patronímico
            if (Math.random() < 0.3) {
                const fatherPrefix = getRandomElement(nameData.nordicMale.prefixes);
                const patronymicSuffix = type === 'nordicMale' ? 'son' : 'sdottir';
                const patronymic = capitalizeWords(fatherPrefix.toLowerCase() + patronymicSuffix);
                generatedName = baseName + " " + patronymic;
            } else {
                generatedName = baseName;
            }
        } else {
            generatedName = prefix.toLowerCase() + suffix.toLowerCase();
            generatedName = capitalizeWords(generatedName);
        }

    } else if (type.startsWith('dwarf')) {
        const data = nameData[type];
        const root1 = getRandomElement(data.rootMin);

        if (type === 'dwarfCity') {
            // [raíz] + "-" opcional + [descriptor]
            const useDash = Math.random() < 0.35;
            const useSpace = Math.random() < 0.25 && !useDash;
            const desc = getRandomElement(data.descriptors);

            // Si usamos espacio, usamos Hold o Fort con mayúscula separada. Si no, junto o con guión.
            if (useSpace && (desc === 'hold' || desc === 'fort')) {
                generatedName = capitalizeWords(root1) + " " + capitalizeWords(desc);
            } else if (useDash) {
                generatedName = capitalizeWords(root1) + "-" + capitalizeWords(desc);
            } else {
                generatedName = capitalizeWords(root1 + desc);
            }
            return generatedName; // Early return para saltar el procesado general de abajo
        } else {
            // Personaje: [raíz mineral] + [raíz fuerza opcional] + [sufijo]
            const useForce = Math.random() < 0.4;
            let suffix = getRandomElement(data.suffixes);

            if (useForce) {
                const root2 = getRandomElement(data.rootForce);
                // Evitar repeticiones obvias ("grimgrim")
                if (root2 === suffix) suffix = getRandomElement(data.suffixes);
                generatedName = root1 + root2 + suffix;
            } else {
                generatedName = root1 + suffix;
            }
        }

        // Capitalización inteligente para enanos
        generatedName = capitalizeWords(generatedName.toLowerCase());
    }

    return generatedName;
}

function generateNames() {
    const typeSelect = document.getElementById('name-type');
    const selectedType = typeSelect.value;
    const resultsContainer = document.getElementById('results-container');

    // Animar la salida de los nombres anteriores
    const oldCards = resultsContainer.querySelectorAll('.name-card');
    oldCards.forEach(card => {
        card.style.animation = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(-10px) rotateX(10deg)';
    });

    // Pequeño retraso para que los anteriores desaparezcan antes de añadir los nuevos
    setTimeout(() => {
        // Limpiar el contenedor
        resultsContainer.innerHTML = '';

        // Usaremos un Set para garantizar nombres únicos en la tirada
        const uniqueNames = new Set();
        let attempts = 0;

        while (uniqueNames.size < 9 && attempts < 50) {
            const newName = generateSingleName(selectedType);
            if (newName) uniqueNames.add(newName);
            attempts++;
        }

        // Crear elementos y añadirlos al DOM con un delay escalonado para un efecto en cascada
        Array.from(uniqueNames).forEach((name, index) => {
            const card = document.createElement('div');
            card.className = 'name-card';
            card.textContent = name;

            // Si el nombre es largo (ej. apellido patronímico o ciudad compuesta), escalar fuente
            if (name.length > 15) {
                card.style.fontSize = '1.05rem';
            } else if (name.length > 12) {
                card.style.fontSize = '1.15rem';
            }

            // Efecto escalonado (stagger) para la animación
            card.style.animationDelay = `${index * 0.05}s`;

            resultsContainer.appendChild(card);
        });
    }, 150);
}

// Generar un conjunto inicial de nombres al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generateNames();
});
