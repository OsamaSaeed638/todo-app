const firebaseConfig = {
    apiKey: "AIzaSyC5aVCRpdjmHPElSxI82n-_WM1kMUh4rH8",
    authDomain: "todoapp-8cff8.firebaseapp.com",
    databaseURL: "https://todoapp-8cff8-default-rtdb.firebaseio.com",
    projectId: "todoapp-8cff8",
    storageBucket: "todoapp-8cff8.firebasestorage.app",
    messagingSenderId: "5253831983",
    appId: "1:5253831983:web:38d13417c0290646b115da"
  };


const frb = firebase.initializeApp(firebaseConfig);

console.log(frb.database);

firebase
    .database()
        .ref("todos")
        .on("child_added",(data)=>{
           
    var liElement = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
  
    
    liElement.appendChild(liText);

    console.log(liElement);

    
        //  Delete Button
    
        var delBtn = document.createElement("button");
        var delBtnText = document.createTextNode("Delete");
    
        delBtn.appendChild(delBtnText)

            delBtn.setAttribute("id",data.val().key)

        delBtn.setAttribute("onclick", "deleteItem(this)");
    
    var list = document.getElementById("list");

    list.appendChild(liElement);

    liElement.appendChild(delBtn); 

    // Edit Button

    var editBtn = document.createElement("button");
    var editBtnText = document.createTextNode("Edit");

    editBtn.appendChild(editBtnText)

    editBtn.setAttribute("onclick", "editItem(this)");
    
    editBtn.setAttribute("id",data.val().key)

    liElement.appendChild(editBtn); 

            
        })
     

function addtodo(){
    var input = document.getElementById("inputField");
    
    // console.log(input.value);
    
    var key = firebase.database().ref("todos").push().key;

let obj = {
         value: input.value,
         key:key,
};

firebase.database().ref("todos").child(key).set(obj);

    input.value = "";

 }


function deleteAll(){
    var list = document.getElementById("list");

    firebase.database().ref("todos").remove();

    list.innerHTML = ""
}

function deleteItem(a){
    console.log((a.id));
    firebase.database().ref("todos").child(a.id).remove()
    a.parentNode.remove();
    
}

function editItem(e){
    // var val = e.parentNode.firstChild.nodeValue;

    var userInput = prompt("Enter updated value");
 
    var editTodo={
        value : userInput,
        key:e.id
    }

    firebase.database().ref("todos").child(e.id).set(editTodo)

    e.parentNode.firstChild.nodeValue = userInput
};