const monsterSelectField = document.getElementById('monsterField')
const addButton = document.getElementById('addButton')
let url = `https://www.dnd5eapi.co/api/monsters/`

// API Fetch to get monster data
const getMonsters = () => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        generateMonsters(data)
    })
    .catch(error => console.log(error, 'error'))
}

//Generates select field of all monsters available
let generateMonsters = (data) => {
    let options = data.results
    for(let i = 0; i < options.length; i++){
        let newOption = document.createElement("option");
        newOption.value = options[i].name;
        newOption.text = options[i].name;
        monsterSelectField.appendChild(newOption);
    }
};

//Event Listener for "Add Monster"
addButton.addEventListener("click", displayMonster)

//Function to create monster card
function displayMonster() {
    let monsterSelected = monsterSelectField.value.replace(/[\s]+/g, "-").toLowerCase()
    //Second API call to get specific monster
    fetch(url += monsterSelected)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        //Resets url variable so += doesn't keep concatenating
        url = `https://www.dnd5eapi.co/api/monsters/`
    })

}

//Function call to generate monster select field
getMonsters();

