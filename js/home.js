const currentUser = (JSON.parse(localStorage.getItem("currentUser")));
const user=document.getElementById('user')
user.innerHTML=`hello ${currentUser.user}`

function moovGame(){
    window.location.href="game.html";
}
function moovpage(){
    window.location.href="badGame.html";
}




