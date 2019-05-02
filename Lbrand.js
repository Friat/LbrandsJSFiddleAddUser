/*
Assignement:

# HTML
Complete the HTML to have semantic and compliant markups.

# PURE JAVASCRIPT
Dynamically add a user to the users list.
1. Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
2. Use the addUser function to submit the user's data.
3. If the ajax request returns an error, display the error message in red.
4. Display the newly added user in the users list when the request was successful. 

# BONUS
- make WCAG compliant
- add some CSS3 properties

*/


// START YOUR CODE HERE
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById("submit").addEventListener("click", function(event){
event.preventDefault();
var form_userName = document.getElementById("userName").value;
var emailInput = document.getElementById("email")
var form_email = emailInput.value;
var emailIsValid = validateEmail(form_email);
if(!emailIsValid){
	document.getElementById("error").innerHTML = "please enter a valid email address";
emailInput.classList.add("invalid-email");
  return;
}
emailInput.classList.remove("invalid-email");
addUser(form_userName, form_email, function(response){
console.log(response);
if(response.success === true){
	var userList = document.getElementById("users");
	var currentUser = "<li>"+ response.user.username + " "+ 			response.user.email + "</li>";
	userList.innerHTML = userList.innerHTML + currentUser;
	document.getElementById("error").innerHTML = "";

}
if(response.success === false){
	document.getElementById("error").innerHTML = response.error;
}
})

});

// END YOUR CODE HERE




// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
    var xhr = new XMLHttpRequest();
    var response;
    var success = (!!Math.round(Math.random()));
    
    if (!success){
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!"
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });   
    }
    
    xhr.open("POST", "/echo/json/");
    xhr.onload = function () {
    		if (xhr.status === 200) {
        		callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.send("json=" + response);
};