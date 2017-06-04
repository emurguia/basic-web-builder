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
	if(border){ 
		var sizer = document.getElementById("borderSizer"); 
		var size = sizer.value; 
		console.log(size);
		return size;
	}
}

//function to get size
function getSize(){ 
	return document.getElementById("elementSizer").value; 
}

//function to style text 
function styleText(text){ 
	text.style.fontFamily = getFont();
	text.style.color = getColor(0); 
	text.style.backgroundColor = getColor(1);
	if (border) {
		text.style.border = "solid "+ getBorder() + "px";
		//console.log("solid"+ getBorder() + "px");
		text.style.borderColor = getColor(2);
	};
	text.style.fontSize = getSize() + "px"; 
	
}

//function to create text HTML element 
function createTextElement(tag, info){
	var newObj = document.createElement(tag);
	newObj.className = "user";
	//newObj.draggable = "true"; 
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
	viewBorderStyle();
}

//function to display only text styling options 
function showTextStyle(){
	viewStyling("none");
	var styleBlocks = document.getElementsByClassName("textStyle"); 
	for (var i = styleBlocks.length - 1; i >= 0; i--) {
		styleBlocks[i].style.display = "inline"; 
	};
}

//function to display only img styling options 
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

//function to show/hide border styling options 
var borderRadio = document.getElementById("borderRadio"); 
borderRadio.addEventListener("click", viewBorderStyle, false); 
var border = false; 
function viewBorderStyle(){ 
	var borderOptions = document.getElementById("borderOptions");
	//console.log(document.getElementById("noBorder").checked);
	if (document.getElementById("noBorder").checked) {
		borderOptions.style.display = "none"; 
		border = false;
	}else if (document.getElementById("yesBorder").checked) {
		borderOptions.style.display = "inline"; 
		border = true;
	};
}


//function to change styling options based on element 
var elementSelect = document.getElementById("elementOptions"); 
elementSelect.addEventListener("change", checkStyle, false);

//function to change placeholder based on element 
elementSelect.addEventListener("change", checkPlaceholder, false); 
function checkPlaceholder(){ 
	if(type == "h1" || type == "p") {
		textBox.placeholder = "Add your text here"; 
	}else if(type = "img"){
		textBox.placeholder = "Paste the URL of an image here";
	}
}
//var userElements = document.getElementsByClassName("user"); 
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
	//function to enable elements on user elements 
	//userElements = document.getElementsByClassName("user"); 
	
}

/*
 * EDITING USER PAGE
 */
 var deleteMode = false; 
//function to turn delete mode on
function deleteModeOn(event){ 
	//pop up message telling user to click element to delete it 
	//pop up message that says deleting mode on 
	//pop up message that says click delete button again to exit delete mode 
	if(deleteMode){
		deleteButton.classList.remove("deleteModeOn");
		deleteButton.innerHTML = "Delete";
		deleteMode = false;
	}else{
		deleteButton.classList.add("deleteModeOn");
		deleteButton.innerHTML = "Delete Mode On";
		console.log("delete mode"); 
		deleteMode = true; 
	}
}

 //turning delete mode on/off
var deleteButton = document.getElementById("deleteButton"); 
deleteButton.addEventListener("click", deleteModeOn, false);



/*
var editButton = document.getElementById("editButton"); 
editButton.addEventListener("click", editModeOn, false); 
function editModeOn(event){ 
	console.log("edit mode on");
}
*/

//event listener for all user elements 
var userPage = document.getElementById("userPage"); 
userPage.addEventListener("click", deleteElement, false); 

function deleteElement(event){ 
	if(event.target !== event.currentTarget){ 
		console.log(deleteMode);
		if(deleteMode){ 
			console.log("delete mode on, deleteElement called")
			var clickedItem = event.target;
			clickedItem.parentNode.removeChild(clickedItem);
			console.log(clickedItem); 
		}
	}
	event.stopPropagation();
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
	viewStyling("none");
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