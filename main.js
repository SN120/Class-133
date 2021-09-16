// model name : CocoSsd (Coco Single Shot MultiBox Detection);

img = "";
status = "";
objects = [];
percent = "";
red = "";
blue = "";
green = "";


function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function preload() {
    img = loadImage('dog_cat.jpg');
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {

        for (i = 0; i < objects.length; i++) {

            red = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);

            document.getElementById("status").innerHTML = "Status : Detected Objects";

            fill(red, blue, green);

            percent = objects[i].confidence.toFixed(2) * 100;
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(red, blue, green);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        noLoop();

    }

}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        objects = result;
    }
}