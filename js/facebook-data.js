$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '203163550264882',
            cookie: true,
            version: 'v2.12' // or v2.1, v2.2, v2.3, ...
        });
        var accessString = "access_token=EAACEdEose0cBALqBmiLs6o2bTfSsbMJmxbNKWVZBNjcZC9iAwMHaCM0Hdnla9HHrlgKwZB8JXIkj5ZA91R1TJVtp5DP1qH2el0E7zzA3jeVvEzNZA3ZBbLtaZBsrqcxVjxb7XbtfXIbZANPi95LxG1pChzq8L8TXlwkq8aNykvSxLQXYQpzrYx9QaMSQXaqdlRAninVguMLyigZDZD";

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