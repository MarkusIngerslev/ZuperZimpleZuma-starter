import SimpleLinkedList from "./simplelinkedlist.js";

export { init };

const list = new SimpleLinkedList();

function init() {
    console.log("Model init");
}

function dump() {
    let node = list.head;
    let output = "";
    while (node != null) {
        output += '"' + node.data + node.id + '"';
        output += " -> ";

        node = node.next;
    }
    output += "null";
    console.log(output);
}

// **** WRAPPERS ****
function addRandomBall() {
    list.add(randomBall());
}

function addBall(ball) {
    list.add(ball);
}

// TODO: Implement more functions
function insertBallAfter(node, ball) {
    return list.insertAfter(ball, node);
}

function numberOfBalls() {
    return list.size();
}

// **** CANNON ****
let cannonBall;

function loadCannon() {
    cannonBall = randomBall();
}

function getCannonBall() {
    return cannonBall;
}

// **** MATCHES ****
// TODO: Implement functions to find and remove matches
function checkMatches(node) {
    const matches = [node];
    // find matches før node

    let lookat = node.prev;
    while (lookat && lookat.data == node.data) {
        matches.push(lookat);
        lookat = lookat.prev;
    }

    // find matches efter node
    lookat = node.next;

    while (lookat && lookat.data == node.data) {
        matches.push(lookat);
        lookat = lookat.prev;
    }

    return matches;
}

function removeMatches(matches) {
    for (const node of matches) {
        list.remove(node);
    }
}

// **** BALLS ****

const balls = ["🔴", "🔵", "🟡", "🟢"];

function randomBall() {
    return balls[Math.floor(Math.random() * balls.length)];
}

function red() {
    return balls[0];
}

function blue() {
    return balls[1];
}

function yellow() {
    return balls[2];
}

function green() {
    return balls[3];
}

// Husk at fjern
//debugger;
