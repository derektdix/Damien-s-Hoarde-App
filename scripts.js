const monsterSelectField = document.getElementById('monsterField')
const addButton = document.getElementById('addButton')
let url = `https://www.dnd5eapi.co/api/monsters/`
const dataCardDiv = document.getElementById('dataCardContainer')
let counter = 2

// API Fetch to get monster data
const getMonsters = () => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        //Generates select field of all monsters available
        let options = data.results
        for(let i = 0; i < options.length; i++){
            let newOption = document.createElement("option");
            newOption.value = options[i].index;
            newOption.text = options[i].name;
            monsterSelectField.appendChild(newOption);
        }
        //Event Listener for "Add Monster"
        addButton.addEventListener("click", displayMonster = () => {
            //Second API call to get specific monster
            
            fetch(url += monsterSelectField.value)
            .then((response) => response.json())
            .then((data) => {
                let elementExists = document.getElementById(`${data.index}`)
                //check to see if monster card already exists. If yes increments by 1 if not creates new card.
                if(elementExists){ 
                    if(counter <= 2){
                        elementExists.innerText = `${data.name} x 2`
                        counter += 1
                    }else {
                        let counterSet = elementExists.innerText 
                        console.log(counterSet)
                        counter = Number(counterSet.replace(/\D/g,''))
                        counter += 1
                        elementExists.innerText = `${data.name} x ${counter}`
                    }
                }else{
                    //creates the monster card
                    let newCard = document.createElement("div")
                    newCard.className = 'monsterCard'
                    newCard.innerHTML = `
                    <h3 id="${data.index}">${data.name} </h3>
                    <div class="monsterStats">
                        <p>HP: ${data.hit_points} </p>
                        <p>AC: ${data.armor_class[0].value}</p>
                        <p>CR: ${data.challenge_rating}</p>
                    </div>
                    `
                    dataCardDiv.appendChild(newCard)
                    counter = 2
                }
                //Resets url variable so += doesn't keep concatenating
                url = `https://www.dnd5eapi.co/api/monsters/`
            })
            .catch(error => console.log(error, 'error'))
        })
       
    })
    .catch(error => console.log(error, 'error'))
}

//Function call to generate monster select field
getMonsters();

