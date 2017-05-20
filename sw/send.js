var request = require('request');

var payload={ "data": {
    "title": "Save $50 on inspiron laptop",
    "body": "Inspiron laptop sale! Coupon code: 50OFF699. Sale ends May 22 at 8 a.m. ET.",
    "icon": "https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Dell_alt.png",
    "image": "https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/128/Dell_alt.png",
    "url": "http://www.dell.com/en-us/shop/productdetails/inspiron-15-3567-laptop/fncwc008sb"
  },
  "to" : "fBYVdOUSHpM:APA91bHb52PtQ_eLrLUkOprslUZYjbtLZ4_DOVW_hgapwPurHTh7nXMi4Oq46UiFM8R-rAC3oqQm9gpbuReCNlEwfo5l-nwTLWoXXnatwYZBxwv6TbZDXNukTsIkJUhNE8MJLj6YftGv"
};
var options = {
  method:"POST",
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'User-Agent': 'request',
    'Content-Type':'application/json',
    'Authorization':'key=AAAA-v4Lxrg:APA91bE7ghQTrXXcFx5cWPWVEhbOc_AQfTb25NmE_Vj6_pUDDsfGPuHPfKxVsPjJu2xXjiPtiBGBAMKI8IG3C3yL2mZQPZxutCNdntBlIZvGsRG7WqoRDgZ3BNPbtXDRYYXlMhbjZkz8'
  },
  json:true,
  body:payload
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
  	console.log(response.statusCode);

  }
  else
  {
  	console.log(response.statusCode);
  	console.log(response.error);
  }
}

request(options, callback);