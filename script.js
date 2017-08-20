/*
 * CREATING USER PAGE  
 */ 

//function to get user selected font 
function getFont(){ 
	var fontForm = document.getElementById("fonts");
	if(fontForm.selectedIndex == 0){
		return "Ubuntu";
	}
	var fontSelection = fontForm.options[fontForm.selectedIndex].value;
	return fontSelection;
}

//function to get user selected color 
function getColor(index){ 
	var pickers = document.getElementsByClassName("colorPicker")
	var color = pickers[index].value; 
	//console.log(pickers[index].value);
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
	//console.log("style text called");
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

//function to style image 
function styleImg(image){
	console.log("style image called");
	if (border) {
		image.style.border = "solid "+ getBorder() + "px";
		//console.log("solid"+ getBorder() + "px");
		image.style.borderColor = getColor(2);
	};
	var size = getSize();
	size = size *10; 
	//console.log(size);
	image.style.maxHeight = size +"px";
}


//function to create text HTML element 
function createTextElement(info){
	var newObj = document.createElement("p");
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
	if(styling){
		styleImg(newImg);
	}
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
		if(type == "p") {
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
	if(type == "p") {
		textBox.placeholder = "Add your text here"; 
	}else if(type = "img"){
		textBox.placeholder = "Paste the URL of an image here";
	}
}
//function to add elements to user's page 
function addElement(){
	getInfo();
	if(type == "p") {
		createTextElement(content);
		resetForm();
	}else if(type == "img"){
		createImage(content);
		resetForm();
	}else{
		document.getElementById("errorMsg").style.display = "inline";
	}
}

var goButton = document.getElementById("goButton");
goButton.addEventListener("click", addElement, false); 


/*
 * EDITING USER PAGE
 */

var deleteButton = document.getElementById("deleteButton"); 
var editButton = document.getElementById("editButton"); 
var dimmer = document.getElementsByClassName("dimmer");

//function to show popups
function popUpView(event){ 
	dimmer[0].style.display = "inline";
	if(event.target == deleteButton){
		//console.log("delete clicked");
		document.getElementById("deleteRow").style.display = "inline";
	} else if(event.target == editButton){ 
		//console.log("edit clicked")
		document.getElementById("editRow").style.display = "inline";
	}
	event.target.removeEventListener(event.type, arguments.callee)
}

var deleteGotIt = document.getElementById("deleteGotIt"); 
var editGotIt = document.getElementById("editGotIt");

//function to hide popup
function popUpHide(event){
	dimmer[0].style.display = "none";
	if (event.target == deleteGotIt) {
		//console.log("delete got it");
		document.getElementById("deleteRow").style.display = "none";
	} else if(event.target == editGotIt){
		//console.log("edit got it");
		document.getElementById("editRow").style.display = "none";
	}
}
/* commeted out to streamline editing process */
deleteButton.addEventListener("click", popUpView, false); 
deleteGotIt.addEventListener("click", popUpHide, false); 
editButton.addEventListener("click", popUpView, false); 
editGotIt.addEventListener("click", popUpHide, false);

//function to turn delete mode on/off
var deleteMode = false; 
function deleteModeOn(event){ 
	if(deleteMode){
		deleteButton.classList.remove("deleteModeOn");
		deleteButton.innerHTML = "Delete";
		deleteMode = false;
	}else{
		deleteButton.classList.add("deleteModeOn");
		deleteButton.innerHTML = "Delete Mode On";
		//console.log("delete mode"); 
		deleteMode = true; 
	}
}
deleteButton.addEventListener("click", deleteModeOn, false);

//function to turn edit mode on/off
var editMode = false; 
function editModeOn(event){ 
	if(editMode){
		editButton.classList.remove("editModeOn");
		editButton.innerHTML = "Edit";
		editMode = false;
		//textBox.removeEventListener("input", editElement);
		console.log("edit mode off");
		resetForm();
	}else{
		editButton.classList.add("editModeOn");
		editButton.innerHTML = "Edit Mode On";
		//console.log("edit mode"); 
		editMode = true; 
	}
}
editButton.addEventListener("click", editModeOn, false); 
//editButton.addEventListener("click", )

//function to delete elements
function changeUserElement(event){ 
	if(event.target !== event.currentTarget){ 
		var clickedItem = event.target;
		var stylingOptions = document.getElementById("stylingOptions");
		if(deleteMode && editMode){
			alert("Oops, cannot edit and delete at same time!");
		}else if(deleteMode){ 
			clickedItem.parentNode.removeChild(clickedItem);
		}else if(editMode){
			/*if(clickedItem.tagName != "IMG"){*/
				textBox.value = clickedItem.innerHTML;
				//console.log(clickedItem.innerHTML);
				//update text as user types 
				function editElement(event){
					clickedItem.innerHTML = textBox.value;
				}
				textBox.addEventListener("input", editElement, false);

				//update styling as user makes changes
				function responsiveStyling(event){
					if(event.target !== event.currentTarget){
						if(event.target == document.getElementById("color1")){
							console.log("changing color");
							clickedItem.style.color = getColor(0);
						}else if(event.target == document.getElementById("color2")){
							clickedItem.style.backgroundColor = getColor(1);
						}else if(event.target == document.getElementById("fonts")){
							clickedItem.style.fontFamily = getFont();
						}else if(event.target == document.getElementById("borderSizer")){
							clickedItem.style.border = "solid "+ getBorder() + "px";
						}else if(event.target == document.getElementById("color3")){
							clickedItem.style.borderColor = getColor(2);
						}else if(event.target == document.getElementById("elementSizer")){
							if(clickedItem.tagName == "IMG"){
								var size = getSize(); 
								size = size * 10; 
								
								clickedItem.style.maxHeight = size  + "px";
							}else{
								clickedItem.style.fontSize = getSize() + "px";
							}			
						}
						//console.log("input on styling form event fired");
						/*
						if (border) {
							clickedItem.style.border = "solid "+ getBorder() + "px";
							//console.log("solid"+ getBorder() + "px");
							clickedItem.style.borderColor = getColor(2);
						};
						clickedItem.style.fontSize = getSize() + "px"; */
					}
					event.stopPropagation();		
				}
				stylingOptions.addEventListener("input", responsiveStyling, false);
			/*}*/
		}
		function stopEditing(event){
			textBox.removeEventListener("input", editElement);
			stylingOptions.removeEventListener("input", responsiveStyling);
		}
		editButton.addEventListener("click", stopEditing, false);
		userPage.addEventListener("click", stopEditing, false);
	}
	event.stopPropagation();
}


//event listener for all user elements 
var userPage = document.getElementById("userPage"); 
userPage.addEventListener("click", changeUserElement, false); 
//textBox.addEventListener("input", editUserText,false);


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
	document.getElementById("errorMsg").style.display = "none";
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