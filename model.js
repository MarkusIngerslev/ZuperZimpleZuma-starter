import SimpleLinkedList from "./simplelinkedlist.js";

export {
    init,
    red,
    blue,
    green,
    yellow,
    loadCannon,
    dump,
    addBall,
    checkMatches,
    removeMatches,
    numberOfBalls,
    getFirstBall,
    getNextBall,
    getCannonBall,
    insertBallAfter,
    addRandomBall,
};

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
    return list.add(randomBall());
}

function addBall(ball) {
    return list.add(ball);
}

function getFirstBall() {
    return list.head;
}

function getNextBall(ball) {
    return ball.next;
}

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
function checkMatches(node) {
    const matches = [node];
    console.log(`Starting check for node with data: ${node.data} and id: ${node.id}`);

    // find matches før node
    let lookat = node.prev;
    while (lookat && lookat.data == node.data) {
        console.log(`Found match before: ${lookat.data} (id: ${lookat.id})`);
        matches.push(lookat);
        lookat = lookat.prev;
    }

    // find matches efter node
    lookat = node.next;
    while (lookat && lookat.data == node.data) {
        console.log(`Found match after: ${lookat.data} (id: ${lookat.id})`);
        matches.push(lookat);
        lookat = lookat.next;
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
