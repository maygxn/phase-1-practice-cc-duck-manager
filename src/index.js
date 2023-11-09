const url = "http://localhost:3000/ducks"
const duckNav = document.getElementById("duck-nav")
// When the page loads, 
// fetch the ducks and display each duck image in the #duck-nav. 
// fetch
fetch(url)
.then(resp => resp.json())
.then((duckData) => {
    duckData.forEach(renderDucks)
})
// display each duck image in the #duck-nav
function renderDucks(duck) {
    let duckImage = document.createElement("img")
    duckImage.src = duck.img_url
    duckImage.alt = duck.name
duckNav.append(duckImage)
// You may need to do something to make sure your script tag is working in the HTML first... (defer)

// C2: when user CLICKS on duck images
// need eventListener (click)
duckImage.addEventListener("click", (e) => {
    duckDetails(duck)
    
})
}

// shows duck's name, image, and a like button with number of likes in the #duck-display
// if another image is clicked in #duck-nav, it replaces previous content.
function duckDetails(duck) {
    const duckDisplay = document.getElementById("duck-display")
    duckDisplay.innerHTML = ''

    const duckName = document.createElement("h3")
    duckName.innerText = duck.name

    const duckImg = document.createElement("img");
    duckImg.src = duck.img_url
    duckImg.alt = duck.name

    // When the likes button is clicked,
    const likeButton = document.createElement("button")
    likeButton.innerText = `${duck.likes} likes`
    likeButton.addEventListener("click", (e) => {
        //  it increments the number of likes displayed for that duck.
        duck.likes += 1;
        //  Be sure that the button continues to read "X likes".
        likeButton.innerText = `${duck.likes} likes`
    })
// append
duckDisplay.append(
    duckName,
    duckImg,
    likeButton
)
}
// When the #new-duck-form is submitted,
const newDuckForm = document.getElementById("new-duck-form")
// need submit event listener (DONT FORGET PREVENTDEFAULT!)
newDuckForm.addEventListener("submit", (e) => {
    e.preventDefault()
    //  it generates a new duck image in the #duck-nav. 
    const newDuckName = newDuckForm.querySelector('input[name="duck-name-input"]').value
    const newDuckImg = newDuckForm.querySelector('input[name="duck-image-input"]').value
    // When clicked, it acts like the other images in the #duck-nav and
    //  shows a name, image, and like button in the #duck-display.
    const newDuck = {
        name: newDuckName,
        img_url: newDuckImg,
        likes: 0
    }
    renderDucks(newDuck)
    newDuckForm.reset()
})

//  No persistence is needed. A duck starts with 0 likes.
