const foundIDs = [];
const leaderInfo = [];
const API_KEY = "34374832f4d2a48753f354e125a4bf";
let zipInput;
let radInput;
let countInput;

let zip = 33556;
let radius = 5;
const params = {
  zipCode: zip,
  distRadius: radius,
  count: 3
};

const main = () => {
  zipInput = document.querySelector(".zipCode");
  radInput = document.querySelector(".radius");
  countInput = document.querySelector(".count");

  console.log(zipInput, radInput, countInput);

  // getGroups(params);
  console.log(leaderInfo);
}

const locationSearch = (event) => {
  console.log("button was clicked!");
  console.log(`zip: ${zipInput.value}, radius: ${radInput.value}, count: ${countInput.value}`);
  params.zipCode = zipInput.value;
  params.distRadius = radInput.value;
  params.count = countInput.value;
  getGroups(params);
}

const getGroups = (paramsObj) => {
  console.log(paramsObj);
  const searchUrl = `https://api.meetup.com/find/groups?key=${API_KEY}&sign=true&photo-host=public${paramsObj.zipCode ? `&zip=${paramsObj.zipCode}` : ""}${paramsObj.distRadius ? `&radius=${paramsObj.distRadius}` : ""}${ paramsObj.count ? `&page=${paramsObj.count}` : "&page=40"}`;
  console.log(searchUrl);
  $.ajax({ 
    type:"GET", // GET = requesting data
    url: searchUrl, 
    success: function(data) { 
      console.log(data);
      data.data.forEach((group) => {
        foundIDs.push(group.organizer.id);
      });
    },
    // error: function()
    dataType: 'jsonp',
  }).then((data2) => {
    console.log("We have more data!", data2);
    for(let i = 0; i < foundIDs.length; i++) {
      getUser(foundIDs[i]);
    }
  });
}

const getUser = (id) => {
  $.ajax({ 
    type:"GET", // GET = requesting data
    url:`https://api.meetup.com/2/member/${id}?key=${API_KEY}&sign=true&photo-host=public&fields=messaging_pref&page=20`, 
    success: function(data) {
      if(data.messagable === true) {
        leaderInfo.push(data);
      }
      $('.tag-2').text(JSON.stringify(data.messagable)); // Set data that comes back from the server to 'text'
    },
    // error: function()
    dataType: 'jsonp',
  });
}

document.addEventListener('DOMContentLoaded', main);
