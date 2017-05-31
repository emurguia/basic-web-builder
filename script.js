/*
 * CREATING USER PAGE  
 */ 

//function to get user selected font 
function getFont(){ 
	var fontForm = document.getElementById("fonts");
	var fontSelection = fontForm.options[fontForm.selectedIndex].value;
	return fontSelection;
}

//function to get user selected color 
function getColor(index){ 
	var pickers = document.getElementsByClassName("colorPicker")
	var color = pickers[index].value; 
	return color; 
}

//function to get user selected border 
function getBorder(){
	//
}


//function to style text 
function styleText(text){ 
	text.style.fontFamily = getFont();
	text.style.color = getColor(0); 
	text.style.backgroundColor = getColor(1);
	text.style.border = getBorder();
}

//function to create text HTML element 
function createTextElement(tag, info){
	var newObj = document.createElement(tag);
	newObj.className = "user";
	var text = document.createTextNode(info);
	newObj.appendChild(text);
	page.appendChild(newObj);
	if (styling) {
		styleText(newObj);
	};
}

//function to create HTML image 
function createImage(content){
	var newImg = document.createElement("img");
	newImg.className = "user";
	newImg.src = content;
	page.appendChild(newImg);
}

/* 
 * WEB BUILDER INTERFACE 
 */ 

var content; 
var type; 
var page = document.getElementById("userPage");
var textBox = document.getElementById("textBox"); 

//function to retrive info user entered in form 
function getInfo(){
	var form = document.getElementById("elementOptions");
	type = form.options[form.selectedIndex].value;
	content = textBox.value;
}

//function to change display of styling options
function viewStyling(view){
	var styles = document.getElementsByClassName("style"); 
	for (var i = styles.length - 1; i >= 0; i--) {
		styles[i].style.display = view; 
	};
}

function showTextStyle(){
	viewStyling("none");
	var styleBlocks = document.getElementsByClassName("textStyle"); 
	for (var i = styleBlocks.length - 1; i >= 0; i--) {
		styleBlocks[i].style.display = "inline"; 
	};
}

function showImgStyle(){
	viewStyling("none");
	var styleBlocks = document.getElementsByClassName("imgStyle"); 
	for (var i = styleBlocks.length - 1; i >= 0; i--) {
		styleBlocks[i].style.display = "inline"; 
	};
}

//function to show/hide styling options 
var radio = document.getElementById("radio"); 
var styling = false; 
radio.addEventListener("click", checkStyle, false); 
function checkStyle(){
	getInfo();
	//console.log(type);
	if(document.getElementById("radio1").checked){
		viewStyling("none");
		styling = false; 
	}else if(document.getElementById("radio2").checked){
		if(type == "h1" || type == "p") {
			showTextStyle(); 
		}if(type == "img"){
			showImgStyle();
		}else{
			viewStyling("inline");
		}
		styling = true; 
	}
}

//function to change styling options based on element 
var elementSelect = document.getElementById("elementOptions"); 
elementSelect.addEventListener("change", checkStyle, false);

//function to add elements to user's page 
var goButton = document.getElementById("goButton");
goButton.addEventListener("click", addElement, false); 
function addElement(){
	getInfo();
	if(type == "h1" || type == "p") {
		createTextElement(type, content);
	}else if(type = "img"){
		createImage(content);
	}
	resetForm();
}

/*
* BUILDER SHOW/HIDE
*/

var hideButton = document.getElementById("hideButton");
var builder = document.getElementById("builder");

//function to hide builder  
function hideBuilder(){
	builder.style.display = "none";
	hideButton.innerHTML = "Show Builder";
}

//function to reveal builder
function showBuilder(){
	builder.style.display = "inline";
	hideButton.innerHTML = "Hide Builder";
}

hideButton.onclick = function(){
	if(hideButton.innerHTML == "Hide Builder"){
		hideBuilder(); 
	}else{
		showBuilder(); 
	}
}

/*
 * RESETS
 */

//function to reset form 
function resetForm(){
	document.getElementById("form1").reset();
	if(styling){
		viewStyling("inline");
		document.getElementById("radio2").checked = true;
	} else{
		viewStyling("none");
	}
}

//function to clear HTML added by user
function resetPage(){
	var list = document.getElementsByClassName("user"); 
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].parentNode.removeChild(list[i]);
	};
	resetForm();
	hideStyling();
	document.getElementById("radio1").checked = true;
}

var resetButton = document.getElementById("resetButton");
resetButton.onclick = function(){
	resetPage();
}

/*
* WELCOME POP UP 
*/

//function to get rid of background dimming 
function brighten(){
	var dimmed = document.getElementsByClassName("dimmer");
	/*var target = dimmed[0]*/
	dimmed[0].style.display = "none";
}

//function to hide Welcome box 
function hideWelcome(){
	var box = document.getElementById("welcomeRow"); 
	box.style.display = "none";
}

var welcomed = document.getElementById("welcomeButton");
welcomed.onclick = function(){
	brighten();
	hideWelcome();

}

window.onload = function(){ 
	resetForm();
	//viewStyling("none");
}