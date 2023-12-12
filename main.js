song = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
scorerw = 0;
scorelw = 0;

function setup(){
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelloaded)
    posenet.on("pose", gotPoses)
}

function draw(){
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")
   // if(scorelw>0.2){
    circle(lwx, lwy, 20)
    innumber = Number(lwy)
    removedecimals = floor(innumber)
    volume1 = removedecimals/1000
    volume = volume1*2
    document.getElementById("volume").innerHTML = "volume = "+ volume;
   // }
    if(scorerw>0.2){
    if(rwy >0 && rwy <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";		
        song.rate(0.5);
    }
    else if(rwy >100 && rwy <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";		
        song.rate(1.0);
    }
    else if(rwy >200 && rwy <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";		
        song.rate(1.5);
    }
    else if(rwy >300 && rwy <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";		
        song.rate(2.0);
    }
    else if (rwy >400 && rwy <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";		
        song.rate(2.5);
    }
}
}

function preload(){
    song = loadSound("music.mp3")
}

function play(){
    song.play()
}

function modelloaded(){
    console.log("posenet is initialized")
}

function gotPoses(results){
    len = results.length
    if(len>0){
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        rwx = results[0].pose.rightWrist.x;
        lwy = results[0].pose.leftWrist.y;
        rwy = results[0].pose.rightWrist.y;
        scorerw = results[0].pose.keypoints[10].score
        scorelw = results[0].pose.keypoints[9].score
    }
}