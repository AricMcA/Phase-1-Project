// Node getters (allows to get updated element)
const takesDiv = () => document.getElementById('hottakes');
const form = () => document.getElementById('form');
const userInput = () => document.getElementById('user')
const playerInput = () => document.getElementById('player')
const contentInput = () => document.getElementById('content')

// Adds the event listener in order to submit Hot Take
const attachSubmitTakeEvent = event => {
    form().addEventListener('submit' , submitTake)
}

// Allows the content of the Hot Takes to be transferred into the db.json file
const submitTake = event => {
    event.preventDefault();

    let take = {
        user: userInput().value ,
        player: playerInput().value ,
        content: contentInput().value
    }

    fetch('http://localhost:3000/takes', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( take )
    })
        .then(resp => resp.json())
        .then(take => displayTake(take))
}

// Fetches the array of 'takes' and loads the content on the page
const loadHotTakes = () => {
    fetch('http://localhost:3000/takes')
        .then(resp => resp.json())
        .then(takes => takes.forEach(take => displayTake(take)))
}

// Creates the elements that are required to display the content in the array
// and appends the elements to the div
const displayTake = take => {
    //    <div>
    //     <h3>user</h3>
    //     <p>player</p>
    //     <p>content</p>
    //    </div>
    //    <hr>
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const pPlayer = document.createElement('p');
    const pContent = document.createElement('p');
    const hr = document.createElement('hr');
    const deleteBtn = document.createElement('button')

    h3.innerText = take.user;
    pPlayer.innerText = take.player;
    pContent.innerText = take.content;
    deleteBtn.innerText = 'delete'

    div.appendChild(h3);
    div.appendChild(pPlayer);
    div.appendChild(pContent);
    div.appendChild(deleteBtn)

    takesDiv().appendChild(div);
    takesDiv().appendChild(hr);
    
    deleteBtn.addEventListener('click' , (event) => {div.remove()})
}


// DOMContentLoaded tells the webpage to wait until the content of the DOM is loaded 
// before initializing the functions that are inside the function
document.addEventListener('DOMContentLoaded' , event => {
    attachSubmitTakeEvent();
    loadHotTakes();
})

// Allows for when clicked increase 
function voteCounter(id) {
   let click = document.getElementById(id).innerHTML
   console.log(click)
   document.getElementById(id).innerHTML = ++click
}

