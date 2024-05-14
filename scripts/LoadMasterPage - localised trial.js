/** 
 * sc - 03 Mar 2021 
 * link this file to content page to handle masterpages 
 * masterpage is called: master.html
 * master page should have content placeholder called: divcontent
 * https://javascript-minifier.com/  [use minifier]
 **/


//load master page
function LoadMasterPage(){
    try{
        //------ADD LOADING GIF------
        //SetLoadingGIF();

        //get content page code from current page into variable
        var pageHTML = document.documentElement.innerHTML; //.outerHTML; //GetPageContent(location.href); //
        //var body = document.body.innerHTML; //pageHTML.substring(pageHTML.indexOf("<body>")+6,pageHTML.indexOf("</body>"));
        var style = document.head.querySelector('style').innerHTML; //pageHTML.substring(pageHTML.indexOf("<style>")+7,pageHTML.indexOf("</style>"));

        //get masterpage html code into variable
        //var masterHTML = `<object type="text/html" data="index2.html"></object>`; //read into variable
        var masterHTML = `<iframe id="ifrm" type="text/html" src="index2.html"></iframe>`; //read into variable
        
        //load masterpage html code
        document.querySelector('html').innerHTML = masterHTML;
        var ifrm = document.querySelector('#ifrm');
        ifrm.addEventListener("load", function() {
            masterHTML = ifrm.contentWindow.document.body.innerHTML; alert(masterHTML)
            document.querySelector('html').innerHTML = masterHTML;
        });
        

        //append the page's internal/embedded css to master
        //document.querySelector('style').append(style);
        document.querySelector('style').innerHTML += style;

        //add back page code into content placeholder in master
        document.getElementById('maincontent').innerHTML = pageHTML;
        
        //------REMOVE LOADING GIF------
        //ClearLoadingGIF();
        //

    }catch(ex){
        alert(ex);
    }
}

//helps to wait until dom is fully loaded
window.addEventListener("DOMContentLoaded", function(event) {
    LoadMasterPage();
});
