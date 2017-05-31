/*
 *creating user page 
 */ 

var content; 
var type; 
var page = document.getElementById("userPage");
var textBox = document.getElementById("textBox"); 

//function to retrive info user entered in form 
function getInfo(){
	var form = document.getElementById("elementOptions");
	type = form.options[form.selectedIndex].value;
	//console.log(type);
	content = textBox.value;
	//console.log(content);
}

//function to get user selected font 
function getFont(){ 
	var fontForm = document.getElementById("fonts");
	var fontSelection = fontForm.options[fontForm.selectedIndex].value;
	return fontSelection;
}

//function to style text 
function styleText(text){ 
	text.style.fontFamily = getFont();
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
	//return newObj; 
}

//function to create HTML image 
function createImage(content){
	var newImg = document.createElement("img");
	newImg.className = "user";
	newImg.src = content;
	page.appendChild(newImg);
	//return newImg; 
}

/* 
 * interface 
 */ 

//function to hide styling options
function hideStyling(){
	document.getElementById("stylingOptions").style.display = "none";
}

//styling form onclick 
var radio = document.getElementById("radio"); 
var styling = false; 
radio.onclick = function(){
	if(document.getElementById("radio1").checked){
		hideStyling();
		styling = false; 
	}else if(document.getElementById("radio2").checked){
		document.getElementById("stylingOptions").style.display = "inline";
		styling = true; 
	}
}


//function to reset form 
function resetForm(){
	document.getElementById("form1").reset();
	if(styling){
		document.getElementById("radio2").checked = true;
	}
}


var colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("change", watchColorPicker(), false);
function watchColorPicker(event){
		//element.style.color = event.target.value;
	
	}


var goButton = document.getElementById("goButton");
goButton.addEventListener("click", addElement, false); 
//function to add elements to user's page 
function addElement(){
	getInfo();
	//var newElement; 
	if(type == "h1" || type == "p") {
		//newElement = 
		createTextElement(type, content);
		//console.log(newText);
	}else if(type = "img"){
		//newElement = 
		createImage(content);
		//console.log(newImage);
	}
	resetForm();
}
//figure out how to add styling when adding element 


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
}