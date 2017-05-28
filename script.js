
var content; 
var type; 

//function to retrive info user entered in form 
function getInfo(){
	var form = document.getElementById("elementOptions");
	type = form.options[form.selectedIndex].value;
	//console.log(type);
	content = textBox.value;
	//console.log(content);
}

//function to create text HTML element 
function createTextElement(tag, info){
	var newObj = document.createElement(tag);
	var text = document.createTextNode(info);
	newObj.appendChild(text);
	document.body.appendChild(newObj);
}

//function to create HTML image 
function createImage(content){
	var newImg = document.createElement("img");
	newImg.src = content;
	document.body.appendChild(newImg);
}

var textBox = document.getElementById("textBox"); 
var button = document.getElementById("button1");

button.onclick = function(){
	getInfo();
	if(type == "h1" || type == "p") {
		createTextElement(type, content);
	}else if(type = "img"){
		createImage(content);
	}
}