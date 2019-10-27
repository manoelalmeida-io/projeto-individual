function animation() {

    if (anim.checked == true) {
        
        logo.style.animationName = 'roll';
    }
    else {

        logo.style.animationName = 'roll2';
    }
}

function showProfile() {
    
    popup.style.display = 'flex';
    popup.focus();
}

document.onclick = function(e) {
    if(!profile.contains(e.target)){
        popup.style.display = 'none';
     }
};