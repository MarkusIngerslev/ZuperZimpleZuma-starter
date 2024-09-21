import * as view from "./view.js";
import * as controller from "./controller.js";

export { animateNewBall, animateCannonBall, animateRemoveBalls };

// *********************************
// *                               *
// *         ANIMATIONS            *
// *                               *
// *********************************

function animateNewBall(model, newBall) {
    // update entire model
    view.updateDisplay(model);

    // Find the visualBall for this newBall
    const visualBall = view.getVisualBallForModelNode(newBall);

    // We only want to animate the image - not the entire div with the button
    const onlyImg = visualBall.firstElementChild;

    // First: - position to start from - somewhere just outside the screen
    const chain = document.querySelector("#chain");
    const chainRect = chain.getBoundingClientRect();
    const startX = chainRect.right;

    // Last: - position to end - the current position of the visualBall
    const ballRect = visualBall.getBoundingClientRect();
    const endX = ballRect.x;

    // Invert - calculate difference
    const deltaX = startX - endX;

    // Play animation
    onlyImg.style.setProperty("--delta-x", `${deltaX}px`);
    onlyImg.classList.add("animate-add");

    onlyImg.addEventListener("animationend", doneAnimateNewBall);

    function doneAnimateNewBall(event) {
        onlyImg.removeEventListener("animationend", doneAnimateNewBall);
        onlyImg.classList.remove("animate-add");
    }
}

/**
 * Use simple animation to expand the space already occupied by a visualball
 */
function animateExpandSpaceForBall(visualBall) {
    visualBall.classList.add("animate-expand");
    visualBall.addEventListener("animationend", doneExpanding);

    function doneExpanding() {
        visualBall.removeEventListener("animationend", doneExpanding);
        visualBall.classList.remove("animate-expand");
    }
}

/**
 * Use FLIP animation to animate a ball from the position of the canonball
 */
function animateCannonBall(model, newBall) {
    // Start med at opdatere hele visningen
    view.updateDisplay(model);

    // Find visualBall for newBall i visningen
    const visualBall = view.getVisualBallForModelNode(newBall);
    const ballImage = visualBall.querySelector("img"); // kun img-elementet

    // Find visualCannonBall (kanonkuglen)
    const visualCannonball = document.querySelector("#cannon .ball img");

    // FIRST: Find startpositionen af kanonkuglen
    const cannonRect = visualCannonball.getBoundingClientRect();
    const startX = cannonRect.x;
    const startY = cannonRect.y;

    // LAST: Find slutpositionen af den nyindsatte bold
    const ballRect = ballImage.getBoundingClientRect();
    const endX = ballRect.x;
    const endY = ballRect.y;

    // INVERT: Beregn forskellen mellem start og slut
    const deltaX = startX - endX;
    const deltaY = startY - endY;

    // PLAY: Sæt --delta-x og --delta-y og start animationen
    ballImage.style.setProperty("--delta-x", `${deltaX}px`);
    ballImage.style.setProperty("--delta-y", `${deltaY}px`);
    ballImage.classList.add("animate-fromcannon");

    // Gør kanonkuglen usynlig under animationen
    visualCannonball.classList.add("hide");

    // Når animationen er færdig, kaldes ballInserted
    ballImage.addEventListener("animationend", doneMoving);

    function doneMoving() {
        ballImage.removeEventListener("animationend", doneMoving);
        ballImage.classList.remove("animate-fromcannon");
        ballImage.style.removeProperty("--delta-x");
        ballImage.style.removeProperty("--delta-y");

        // Vis kanonkuglen igen
        visualCannonball.classList.remove("hide");

        // Kalder controllerens ballInserted funktion med den nye boldnode
        controller.ballInserted(newBall);
    }
}

function animateRemoveBalls(model, balls) {
    // NOTE: Run the animation-implode animations BEFORE updating the view

    let first = true;
    const lastBall = balls[balls.length - 1];
    const nextBall = model.getNextBall(lastBall);
    for (const ball of balls) {
        const visualBall = view.getViewForModel(ball);
        visualBall.classList.add("implode");
        if (first) {
            first = false;
            visualBall.addEventListener("animationend", () => {
                view.updateDisplay(model);
                controller.matchesRemoved(nextBall);
            });
        }
    }
}
