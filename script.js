

var form = document.getElementById("elementOptions");
var type; 
form.onchange = function(){
	type = form.options[form.selectedIndex].value;
	console.log(type);

}

var textBox = document.getElementById("textBox"); 
var button = document.getElementById("button1");
button.onclick = function(){
	var content = textBox.value;
	console.log(content);
	createObject(type, content);
	
}

function createObject(tag, info){
	var newObj = document.createElement(tag);
	var text = document.createTextNode(info);
	newObj.appendChild(text);
	document.body.appendChild(newObj);
}

//code from informIT.com 
/*function display() {
  DispWin = window.open('','NewWin', 'toolbar=no,status=no,width=300,height=200')
  message = "<ul><li><b>NAME: </b>" + document.form1.yourname.value;
  message += "<li><b>ADDRESS: </b>" + document.form1.address.value;
  message += "<li><b>PHONE: </b>" + document.form1.phone.value + "</ul>";
  DispWin.document.write(message);  
}*/
