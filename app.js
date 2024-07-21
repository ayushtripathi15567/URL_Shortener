function shortenUrl() {
    var url = document.getElementById("originalUrl").value;
    var suffix = document.getElementById("suffix").value;

    // Check if URL is blank
    if (url.trim() === '') {
        document.getElementById("result").innerHTML = "Please enter a URL.";
        return;
    }

    // Display processing message with an icon
    document.getElementById("result").innerHTML = "<i class='fa fa-spinner fa-spin'></i> Processing...";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultObject = JSON.parse(xhr.responseText);
            var myUrl = "https://" + resultObject.shortened_url;

            document.getElementById("result").innerHTML = "Your Shortened URL: <a href='" + myUrl + "' target='_blank'>" + resultObject.shortened_url + "</a>";
            document.getElementById("generatedUrl").value = resultObject.shortened_url;
        } else if (xhr.readyState == 4) {
            document.getElementById("result").innerHTML = "An error occurred. Please try again.";
        }
    };

    xhr.open("GET", "https://s.squizee.in/short/formResponse?url=" + encodeURIComponent(url) + "&email=&format=json&suffix=" + encodeURIComponent(suffix), true);
    xhr.send();
}