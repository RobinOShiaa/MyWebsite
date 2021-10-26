lWidth = window.outerWidth
console.log(lWidth)
ctctBtn = document.querySelector('#contact')
ctctBtn.addEventListener('click',(e) => {
    e.preventDefault(e);
    contactForm = document.querySelector('#c-form');
    contactForm.style.display = 'block';
    contactForm.scrollIntoView({behaviour:"smooth",block:"center"});
    document.querySelector('.container').setAttribute('style','opacity:.4;');

});

document.querySelector(".close-icon").addEventListener('click', (e) => {
  contactForm = document.querySelector('#c-form');
  contactForm.style.display = 'none';

  document.querySelector('.container').setAttribute('style','opacity:1;');
});

var firebaseConfig = {
  apiKey: "AIzaSyDO5Yj90DJzc45Wesp7mxOGsocVNuFGOwU",
  authDomain: "my-website-658b3.firebaseapp.com",
  projectId: "my-website-658b3",
  storageBucket: "my-website-658b3.appspot.com",
  messagingSenderId: "640813622658",
  appId: "1:640813622658:web:0790efcbe5bbbb09b85b9b",
  measurementId: "G-9TPMEZS9KH"
};

firebase.initializeApp(firebaseConfig);

let contactInfo = firebase.database().ref("infos");
document.querySelector(".contact-form").addEventListener("submit",submitForm);

function submitForm(e) {
  e.preventDefault();

  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name,email,message);

  saveContactInfo(name,email,message);

  document.querySelector(".contact-form").reset();

  sendEmail(name,email,message);

  document.querySelector("c-form").remove;

}


function saveContactInfo(name,email,message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name:name,
    email:email,
    message:message,

  });
  retrieveInfos();
}


// Retrieve Infos 
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}


function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let name = info[i].name;
    let email = info[i].email;
    let message = info[i].message;
    console.log(name,email,message);

  }
}

// Send Email Info

function sendEmail(name, email, message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "robin.oshea23@mail.dcu.ie",
    Password: "ssnaucmevcsqrnuf",
    To: 'robin.oshea23@mail.dcu.ie',
    From: email,
    Subject: `${name} sent you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
  }).then((message) => alert("mail sent successfully"));
}