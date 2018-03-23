const foundIDs = [];
const leaderInfo = [];
const API_KEY = "34374832f4d2a48753f354e125a4bf";

const zip = 33556;
const radius = 5;

const main = () => {
  // document.querySelector('h1').textContent += '?'
//   fetch('https://api.meetup.com/find/groups?key=34374832f4d2a48753f354e125a4bf&sign=true&photo-host=public&page=20',
// {
//   mode: 'no-cors',
// })
//   .then((response) => {
//     console.log(response);
//     if(response.status === 200) {
//       console.log(response);
//       return response.json();
//     } else {
//       console.log(response); 
//     }
//   },
// )
//   .then((data) => {
//     console.log(data);
//   });
  getGroups(zip, radius, 5);

}

const getGroups = (zipCode, distRadius, count) => {
  $.ajax({ 
    type:"GET", // GET = requesting data
    url:`https://api.meetup.com/find/groups?key=${API_KEY}&sign=true&photo-host=public${zipCode ? `&zip=${zipCode}` : ""}${distRadius ? `&radius=${distRadius}` : ""}${ count ? `&page=${count}` : "&page=40"}`, 
    success: function(data) { 
      console.log(data);
      data.data.forEach((group) => {
        foundIDs.push(group.organizer.id);
      });
      // $('.tag-1').text(JSON.stringify(data.data[0].organizer.id, undefined, 2)); // Set data that comes back from the server to 'text'
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
