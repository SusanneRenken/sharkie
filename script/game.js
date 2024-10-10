let canvas;
let ctx; 
let character = new Characters();
let enemies = new Enemies();

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    console.log('My character is', character);
    console.log('My character is', enemies);
    

}