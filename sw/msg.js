$(document).ready(function () {
    window.IsHavingNotification = "subscribe";
    initialiseUI();
});
function initialiseUI() {
    $(document).on("click", "#" + window.IsHavingNotification,
        function requestPushNotification() {
            var $ctrl = $(this);
            window.registration.pushManager.getSubscription().then(function(subscription) {
                if (subscription===null) {
                    console.log("new subscription");
                    subscribeUser();
                    //unsubscribeUser();


                } else {
                    window.subscription = subscription;
                    console.log("alread subscribed");
                    
                }

            });
        });
    registerSW();
}

function registerSW() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./Scripts/sw.js', {})
            .then(function(registration) {
                console.log(registration);
                window.registration = registration;
            }).catch(function (e) {
                console.error(e);
        })
    }
}

function subscribeUser() {
    var isSubscribed = false;
    var config = {
        apiKey: "AIzaSyCVbD5P1buLc48WDIZwVOjW7JTMqScjrqU",
        authDomain: "localhost:2440",
        messagingSenderId: "1078004008632"
    };
    if (firebase.apps.length === 0)
        firebase.initializeApp(config);
    if (window.registration!=null) {
                var messaging = firebase.messaging();
                messaging.useServiceWorker(window.registration);

                messaging.requestPermission()
                  .then(function () {
                      messaging.getToken()
                      .then(function (currentToken) {
                          console.log(currentToken);
                          if (currentToken) {
                              updateSubscriptionOnServer(currentToken);
                              isSubscribed = true;
                          } else {
                              updateSubscriptionOnServer(null);
                          }
                          $("#" + window.Application.Variables.IsHavingNotificationt).prop('checked', isSubscribed);
                      })
                      .catch(function (err) {
                          isSubscribed = false;
                          updateSubscriptionOnServer(null);
                      });
                  })
                  .catch(function (err) {
                      console.log('Unable to get permission to notify.', err);
                  });
            
    } else {
        console.log('Service Worker is not supported in this browser.');
    }
    //var messaging = firebase.messaging();

}

function subscribeUser1() {
    var isSubscribed = false;
    var config = {
        apiKey: "AIzaSyCVbD5P1buLc48WDIZwVOjW7JTMqScjrqU",
        authDomain: "localhost:2440",
        messagingSenderId: "1078004008632"
    };
    if(firebase.apps.length===0)
        firebase.initializeApp(config);
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./Scripts/sw.js', {})
            .then(function (registration) {
                console.log(registration);
                window.registration = registration;
                var messaging= firebase.messaging();
                messaging.useServiceWorker(registration);

                messaging.requestPermission()
                  .then(function () {
                      messaging.getToken()
                      .then(function (currentToken) {
                          console.log(currentToken);
                          if (currentToken) {
                              updateSubscriptionOnServer(currentToken);
                              isSubscribed = true;
                          } else {
                              updateSubscriptionOnServer(null);
                          }
                          $("#" + window.Application.Variables.IsHavingNotificationt).prop('checked', isSubscribed);
                      })
                      .catch(function (err) {
                          isSubscribed = false;
                          updateSubscriptionOnServer(null);
                      });
                  })
                  .catch(function (err) {
                      console.log('Unable to get permission to notify.', err);
                  });
            })
            .catch(function (e) {
                console.error(e);
            })
    } else {
        console.log('Service Worker is not supported in this browser.');
    }
    //var messaging = firebase.messaging();
    
}

function unsubscribeUser() {
    var messaging = firebase.messaging();
    messaging.getToken()
    .then(function (currentToken) {
        messaging.deleteToken(currentToken)
        .then(function () {
            updateSubscriptionOnServer(null);
        })
        .catch(function (err) {
            console.log('Unable to delete token. ', err);
        });
    })
    .catch(function (err) {
        console.log('Error retrieving Instance ID token. ', err);
    });
}

function updateSubscriptionOnServer(subscription) {
    var subscriptionDetail = { key: "" };
    if (subscription) {
        subscriptionDetail = { key: subscription };
    } else {
        console.log("delete on the server the token");
    }

    var apiUrl = "";
    var dateToSent = subscriptionDetail;
    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: dateToSent,
        cache: true,
        dataType: 'json',
        success: function (json) {
            if (json.IsValid) {
            } else {
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log('some error occured', textStatus, errorThrown);
        },
        always: function () {
        }
    });

}