import * as model from "./model.js";
import * as view from "./view.js";

// TODO: Export functions used by the view
export { addNewBall, insertCannonBallAfter };

window.addEventListener("load", init);

function init() {
    console.log("Controller init");
    model.init();
    view.init();

    createInitialChain();
    model.loadCannon();
    view.updateDisplay(model);
    // show debug info on the model
    model.dump();

    // store "shortcuts" to model and view in window
    window.model = model;
    window.view = view;
}

function createInitialChain() {
    for (let i = 0; i < 5; i++) {
        model.addRandomBall();
    }
}

// Controller funktions for thing happening in view
function addNewBall() {
    // Add a new ball to the chain
    const newBallNode = model.addRandomBall();

    // Update the display
    view.updateDisplay(model);

    // Animate the new ball
    return newBallNode;
}

function insertCannonBallAfter(ballNode) {
    // Insert the cannonball after the given node
    const cannonBallColor = model.getCannonBall(); // Farve, f.eks. "🔴"
    const newCannonBallNode = model.insertBallAfter(ballNode, cannonBallColor); // Ny node

    // Check for matches around the newly inserted cannonball
    const matches = model.checkMatches(newCannonBallNode); // Send den faktiske node til checkMatches
    console.log(matches);

    // If there are 3 or more matches, remove them
    if (matches.length >= 3) {
        model.removeMatches(matches);
    }

    // Load a new cannonball for future shots
    model.loadCannon();

    // Update the display
    view.updateDisplay(model);

    return newCannonBallNode;
}

// **** ANIMATIONS ****

// TODO: Add controller functions to be called when animations have completed
