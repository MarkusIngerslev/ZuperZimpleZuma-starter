import * as model from "./model.js";
import * as view from "./view.js";

// TODO: Export functions used by the view
export { addNewBall, insertCannonBallAfter, ballInserted };

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

    // Animate the cannonball
    view.animateCannonBall(window.model, newCannonBallNode);

    // Load a new cannonball for future shots
    model.loadCannon();
}

// **** ANIMATIONS ****

function ballInserted(newBallNode) {
    const matches = model.checkMatches(newBallNode);
    console.log(matches);

    if (matches.length >= 3) {
        view.animateRemoveBalls(model, matches);
        //model.removeMatches(matches);
    } else {
        view.updateDisplay(model);
    }
}
