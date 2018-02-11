$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '203163550264882',
            cookie: true,
            version: 'v2.12' // or v2.1, v2.2, v2.3, ...
        });
        var accessString = "access_token=EAACEdEose0cBAEWnpzz1nBjESao2eD2vWzsoXlw2yVCGvaf73ZAyo8XGJASZCTiAAVGSbclnzZBdGjfZAvBLjMg3dWZCe7UyaI0vUcVRPcg4U6THD5bqFQS4N2c6rZCMk8PMZBkUtfCK00pNVw6SYxUzdDgcUsZCoCocmMWHhKsa4nZCUhKApohbCuqCbyW7sJ2EZD";

        FB.api(
            '/Schenectady/events?' + accessString,
            'GET',
            {"limit":"5"},
            function(response) {
                var text;
                for(i = 0; i < response.data.length; i++){
                    text += response.data[i].name + "<br>";
                }
                document.getElementById("test").innerHTML = text;
            }
        );

    });
});
