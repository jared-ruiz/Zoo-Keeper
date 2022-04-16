const fs = require('fs');
const path = require('path');


//take in req.query and filter through the animals accordingly, returning the new filtered array
function filterByQuery (query, animalsArray) {
    let personalityTraitsArray = [];
    //save animalsArray as filteredResults here
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //If personalityTraits is a string, place it into a new array and save it
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }
        else {
            personalityTraitsArray = query.personalityTraits;
        }
    }
    console.log(personalityTraitsArray);
    //loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
        //check the trait against each animal in the filteredResults array.
        //rememeber, it is initially a copy of the animalsArray, but here we're updating it for each trait in the .forEach() loop.
        //for each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals taht have every one of the traits when the .forEach() loop is finished
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        )
    })
    
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if( query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    //return filtered results
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    const animal = body;

    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)

    );

    //return finished code to post route for response
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }

    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }

    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }

    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }

    return true;
}

//export functions
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}