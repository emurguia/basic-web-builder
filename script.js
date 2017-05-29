var content; 
var type; 
var page = document.getElementById("userPage");

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
	newObj.className = "user";
	var text = document.createTextNode(info);
	newObj.appendChild(text);
	page.appendChild(newObj);
}

//function to create HTML image 
function createImage(content){
	var newImg = document.createElement("img");
	newImg.className = "user";
	newImg.src = content;
	page.appendChild(newImg);
}

var textBox = document.getElementById("textBox"); 
var goButton = document.getElementById("goButton");

//function to reset Form 
function resetForm(){
	document.getElementById("form1").reset();
}

goButton.onclick = function(){
	getInfo();
	if(type == "h1" || type == "p") {
		createTextElement(type, content);
	}else if(type = "img"){
		createImage(content);
	}
	resetForm();
}

//function to clear HTML added by user
function resetPage(){
	var list = document.getElementsByClassName("user"); 
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].parentNode.removeChild(list[i]);
	};
	resetForm();
}

var resetButton = document.getElementById("resetButton");
resetButton.onclick = function(){
	resetPage();
}

var hideButton = document.getElementById("hideButton");
var builder = document.getElementById("builder");
//function to hide builder form 
function hideBuilder(){
	builder.style.display = "none";
	hideButton.innerHTML = "Show Builder";
}

//function to reveal Builder

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