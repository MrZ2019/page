
var global = {};
$(function() {
	var FileExplorer = $("#FileExplorer");
	global.Explorer = FileExplorer;
	
	var DirectoryPath = $("#DirectoryPath").text || "E:\\Funcydesk\\site\\proto\\script\\";
	getDirectory(DirectoryPath);
	FileExplorer.currentDirectory = DirectoryPath;
	listenTable();
	nexusButton();
});

function createTable(DirectoryInformation) {
	var fileList = ObjectToArray(DirectoryInformation,false);
	var BooleanCorrespond = ObjectToArray(DirectoryInformation,true);
	var tableCols = 6;
	var listLength = fileList.length;
	var rowLength = Math.round((listLength-1) / 6+0.5);
	var tableElement = $("#FileExplorer");
	tableElement.html = "";
	for(var rowIndex = 0;rowIndex < rowLength;rowIndex++) {
		var rowElement = $.tr();
		tableElement.add(rowElement);
		if(rowIndex == (rowLength-1)) {
			colLength = listLength % 6;
			if( (listLength !==0) && (colLength==0) )
			colLength = 6;
		}
		else {
			colLength = 6;
		}
		for(var colIndex = 0;colIndex < colLength;colIndex++) {
			var listIndex = rowIndex * 6 + colIndex;
			
			if(listIndex == 0) {
				continue;
			}
			
			var currentFile = fileList[listIndex];
			var isDirectory = BooleanCorrespond[listIndex];

			var tdElement = $.td(currentFile);
			var ClassName;
			
			if(isDirectory) {
				ClassName = "Directory";
				tdElement._node.signForDirectory = "true";		
			}
			else {
				ClassName = "File";
			}		
			tdElement.Class = ClassName;	
			rowElement.add(tdElement);
		}
	}
}

function ObjectToArray(object,boolCarryValue) {
	
	var returnArray = new Array();
	
	for(var key in object) {
		
		var currentValue;
		if(boolCarryValue == true) {
			
			currentValue = object[key];
		}
		
		else {
			
			currentValue = key;
		}
		
		returnArray.push(currentValue);
	}
	
	return returnArray;
}

function getDirectory(DirectoryPath) {
	var requestURL = "http://localhost/proto/script/january/getDirectory.php";
	var requestData = {};
	requestData["directory"] = DirectoryPath;
	var result = request(requestURL,requestData);
	var text = result.responseText;
	var responseJSON = eval(text);
	global.Explorer.currentDirectory = DirectoryPath;
	$("#DirectoryPath").text = DirectoryPath;
	createTable(responseJSON);
}

function getFileData(filePath) {
	
	var serverURL = "http://localhost/proto/script/january.php";
	
	var sendData = {};
	sendData["filePath"] = filePath;
	sendData["action"] = "readfile";
	
	var httpRequest = request(serverURL, sendData);
	var fileData = httpRequest.responseText;
	
	openFileViewer(fileData);
}

function sendFileData(fileURL, fileData) {
	
	var destineURL = "http://localhost/proto/script/january.php";
	
	var dataToPost = new Object();
	dataToPost["action"] = "writefile";
	dataToPost["filePath"] = fileURL;
	dataToPost["fileData"] = escape(fileData);
	
	dl += "path=" + fileURL;
	dl += "data=" + fileData;
	var networkRequest = request(destineURL, dataToPost);
	
	var response = networkRequest.responseText;
	
	dl += "write response" + response;
}
function nexusButton() {
	
	function onSaveClick() {
		
		var viewer = $("#ContentViewer");
		var fileURL = viewer._node.currentFile;
		var fileData = viewer.text;
		
		sendFileData(fileURL, fileData);
	}
	
	var saveButton = $("#saveButton");
	var returnButton = $("#returnButton");
	
	saveButton.click(onSaveClick);
	returnButton.click(closeViewer);
}
function openFileViewer(dataString) {
	
	var viewer = $("#ContentViewer");
	
	$("#ContentContainer").style.visibility = "visible";
	viewer.text = dataString;
	
}

function closeViewer() {
	
	$("#ContentContainer").style.visibility = "hidden";
	$("#ContentViewer").html = "";
}

function onLeaveViewer() {
	
	closeViewer();
	
	untie(onLeaveViewer, "dblclick");
}

function listenTable() {
	function onTableClick() {
		var target;
		
		target = event.target;
		
		if(target.tagName == "TD") {
			var Explorer = global.Explorer;
			var fileName = target.innerText;
			var currentPath = Explorer.currentDirectory;			
			if(target.signForDirectory) {
				var Directory = target;
				var newDirectoryPath;

				if(fileName == "..") {
					newDirectoryPath = currentPath.replace(/\w+\\$/,"");
				}
				else {
					newDirectoryPath = currentPath + fileName + "\\";
				}
				
				dl += "directory=" + newDirectoryPath;
				getDirectory(newDirectoryPath);
			}
			else {
				var File = target;
				
				FullFilePath = currentPath + fileName;
				dl = "path=" + FullFilePath;
				
				getFileData(FullFilePath);
				$("#ContentViewer")._node.currentFile = FullFilePath;	
			}
		}
	}
	$("#FileExplorer").click(onTableClick);
	
}