
function include(href) {
    // var head = document.getElementsByTagName('head')[0];

    // var script = document.createElement('script');
    // script.src = filename;
    // script.type = 'text/javascript';

    // head.appendChild(script);

    //get content page : AJAX
    var content = GetPageContent(href);  
    eval(content);    

}

//get content page : AJAX
function GetPageContent(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

//call include function
document.onload=include('scripts/LoadMasterPage.js');


function includeJS(href) {
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';

    head.appendChild(script);
}