let requestedUrl = "https://gorest.co.in/public-api/users";

let addUserFormEl = document.getElementById("addUserForm");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

let nameEl = document.getElementById("name");
nameEl.addEventListener("change", function(event){
    formData.requestName = event.target.value;
});
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
emailEl.addEventListener("change", function(event){
    formData.requestEmail = event.target.value;
});
let emailErrMsgEl = document.getElementById("emailErrMsg");

let statusEl = document.getElementById("status");
statusEl.addEventListener("change", function(event){
    formData.requestStatus = event.target.value;
});

let genderMaleEl = document.getElementById("genderMale");
genderMaleEl.addEventListener("change", function(event){
    formData.requestGender = event.target.value;
});

let genderFeMaleEl = document.getElementById("genderFemale");
genderFeMaleEl.addEventListener("change", function(event){
    formData.gender = event.target.value;
});

function validateFormData(formData) {
    let {name, email} = formData;
    if(name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

function addUserToServer(formData){
    let {requestName, requestEmail, requestStatus, requestGender} = formData;
    
    let options = {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 785c41f5e1793fa127af128e561d8e24f62d18c66ee486599cf1c2c50b920534"
        },
        body: JSON.stringify(formData)
    };
    
    fetch(requestedUrl, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            if(jsonData.code  === 422) {
                if(jsonData.data[0].message === "has already been taken"){
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
            }
        })
}

addUserFormEl.addEventListener("susbmit", function(event){
    event.preventDefault();
    validateFormData(formData);
    addUserToServer(formData);
});
