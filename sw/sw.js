importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCVbD5P1buLc48WDIZwVOjW7JTMqScjrqU",
    authDomain: "localhost:2440",
    messagingSenderId: "1078004008632"
};
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    var dataFromServer = JSON.parse(payload.data.notification);
    var notificationTitle = dataFromServer.title;
    var notificationOptions = {
        body: dataFromServer.body,
        icon: dataFromServer.icon,
        data: {
            url: dataFromServer.url
        }
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

function showNotification(dataFromServer) {
    var notificationTitle = dataFromServer.title;
    var notificationOptions = {
        body: dataFromServer.body,
        icon: dataFromServer.icon,
        data: {
            url: dataFromServer.url
        }
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);

}

self.addEventListener("notificationclick", function (event) {
    var urlToRedirect = event.notification.data.url;
    event.notification.close();
    event.waitUntil(self.clients.openWindow(urlToRedirect));
});

self.addEventListener('install', function (event) {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', function (event) {
    console.log('Service Worker activating.');

});

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    var dataFromServer = event.data.json().data;
    showNotification(dataFromServer);
});