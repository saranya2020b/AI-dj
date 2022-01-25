song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song=loadSound("music.mp3");

}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);

}
function draw(){
    image(video,0,0,600,500);
    fill("yellow");
    stroke("red");
    if(scoreLeftWrist>0.02){
        circle(leftWristX,leftWristY,20);
        number_leftY=Number(leftWristY);
        remove_decimals=floor(number_leftY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("poseNet is intialized");
}
function gotPoses(results){
  if(results.length>0) {
console.log(results);
leftWristX=results[0].pose.leftWrist.x;
console.log(leftWristX);
leftWristY=results[0].pose.leftWrist.y;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
}    


}
