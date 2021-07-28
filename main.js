function preload() {

}

leftAnkleX = "";
rightAnkleX = "";
leftAnkleY = "";
rightAnkleY = "";
text_wrote = "";
varRight= "";
varLeft = "";
total_left = "";
total_right = "";
noseX = "";
noseY = "";

function setup() {
    canvas = createCanvas(600, 300);
    video = createCapture(VIDEO);
    video.size(400, 410);
    canvas.center();

    posenet = ml5.poseNet(video, modelloaded)
    posenet.on("pose", getpose)
}

function modelloaded() {
    console.log(ml5.version, "ml5 is loaded");
}

function getpose(results) {
    console.log(results);

    leftAnkleX = results[0].pose.leftAnkle.x;
    leftAnkleY = results[0].pose.leftAnkle.y;

    rightAnkleX = results[0].pose.rightAnkle.x;
    rightAnkleY = results[0].pose.rightAnkle.y;

    varRight = rightAnkleX + rightAnkleY;
    varLeft = leftAnkleY + leftAnkleX;

    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;

    total_right = Math.floor((varRight - varLeft) / 3);
    total_left = Math.floor((varLeft - varRight) / 3);

}
function fix()
{
    text_wrote = document.getElementById("text1").value;
}
function draw() {
    if(varRight > varLeft) 
    {
        fill("yellow");
        textSize(total_right)
        text(text_wrote, noseX, noseY);
        setTimeout(function()
        {
            fill("white")
            rect(0, 0, 600, 300);
            document.getElementById("height").innerHTML = total_right
        }, "700")
    }
    else if(varLeft > varRight)
    {
        fill("yellow");
        textSize(total_left);
        text(text_wrote, noseX, noseY);
        setTimeout(function()
        {
            fill("white")
            rect(0, 0, 600, 300)
            document.getElementById("height").innerHTML = total_left
        }, "700")
    }
}