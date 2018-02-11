$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '203163550264882',
            cookie: true,
            version: 'v2.12' // or v2.1, v2.2, v2.3, ...
        });
        var accessString = "access_token=359070987892421|-5Lw9ZwOH9haWyVk_ODGl8k3b9o";

        FB.api(
            '/SchenectadyCounty/events?' + accessString,
            'GET',
            {"limit":"500"},
            function(response) {

                //Storing data:
                events = JSON.stringify(response.data);
                localStorage.setItem("statham", events);

            }
        );

    });
});
