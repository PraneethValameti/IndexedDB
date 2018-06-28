function getData(file) {
  return new Promise((resolve, reject) => {
    fetch(file).then(data => {
      if (data.ok) {
        resolve(data.json());
      } else {
        reject(new Error('error'));
      }
    })
  })

}

getData("main.json").then(data => {
  console.log(data);
})


var empid;
var fname;
var lname;
var request

var storeDB


function data() {
  empid = document.getElementById("empid").value;
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;

  // console.log(empidValue);
  // console.log(fnameValue);

  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
  }; // This line should only be needed if it is needed to support the object's constants for older browsers
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

  var db;
  request = window.indexedDB.open("MyTestDatabase", 3);

  request.onupgradeneeded = function(e) {
    var dbHandler = e.target.result;
    storeDB = dbHandler.createObjectStore('emp', {
      keyPath: "EmployeeId"
    });
    //   storeDB.add({
    //     EmployeeId:empid,
    //     FirstName:fname,
    //     LastName:lname
    //   });


    console.log("upgraded");


  }



  request.onerror = function(event) {
    // Do something with request.errorCode!
    console.log("error " + event);
    alert("Why didn't you allow my web app to use IndexedDB?!");
  };



  request.onsuccess = function(event) {
    var dbHandler = event.target.result;
    transaction = dbHandler.transaction(['emp'], 'readwrite'),
      storeDB = transaction.objectStore('emp');

    storeDB.get(4).onsuccess = function(e) {
      console.log(e.target.result);
    };

    storeDB.put({
      EmployeeId: empid,
      FirstName: fname,
      LastName: lname
    });
    // Do something with request.result!
    console.log("Success" + event);
  };

  var frm = document.getElementsByName('empForm')[0];
  console.log(frm);
  //    frm.submit(); // Submit the form
  frm.reset(); // Reset all form data
  return false;
}
