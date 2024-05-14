/** 
 * sc - 03 Mar 2021 
 * link this file to content page to handle masterpages 
 * masterpage is called: master.html
 * master page should have content placeholder called: divcontent
 * https://javascript-minifier.com/  [use minifier]
 **/

 //get content page : AJAX
 function GetPageContent(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

//load master page
function LoadMasterPage(){
    try{
        //------ADD LOADING GIF------
        SetLoadingGIF();

        //get content page code from current page into variable
        var pageHTML = document.documentElement.innerHTML; //.outerHTML; //GetPageContent(location.href); //
        var body = document.body.innerHTML; //pageHTML.substring(pageHTML.indexOf("<body>")+6,pageHTML.indexOf("</body>"));
        var style = document.head.querySelector('style').innerHTML; //pageHTML.substring(pageHTML.indexOf("<style>")+7,pageHTML.indexOf("</style>"));

        //get masterpage html code into variable
        var masterHTML = GetPageContent("master.html");

        //load masterpage html code
        document.querySelector('html').innerHTML = masterHTML;

        //append the page's internal/embedded css to master
        //document.querySelector('style').append(style);
        document.querySelector('style').innerHTML += style;

        //add back page code into content placeholder in master
        document.querySelector("#divcontent").innerHTML = body; // pageHTML;
        
        //------REMOVE LOADING GIF------
        ClearLoadingGIF();
        //

    }catch(ex){
        alert(ex);
    }
}

//helps to wait until dom is fully loaded
window.addEventListener("DOMContentLoaded", function(event) {
    LoadMasterPage();

    //call other JS functions to be executed by Master Here 
    //they may fail to load if called from Master, so call them here
    GetCurrentDateTime();

    //initialise slideshow
    slideshow(); //initialise

    //add calendar, for current month and year skip year and month
    createCalendar(calendar); //(calendar, 2021, 5);

});

// end load master page


//--------Other functions-------
function GetCurrentDateTime(){
    var months = ('Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec').split(',');
    var today = new Date(); //get today's date
    var d = today.getDate();
    var m = today.getMonth()+1;
    var y = today.getFullYear();
    d = (d < 10)? '0'+d : d;  //add leading 0 place holder for less than 10 dates 1- 9 //to make 01, 02, 03 ... 09
    m = (m < 10)? '0'+m : m;  //add leading 0 place holder for less than 10 months 1- 9 //to make 01, 02, 03 ... 09
    dt = `${d}-${months[m-1]}-${y}`; //20-Apr-2021
    /***shorter***/
    var arrymd = new Date().toJSON().slice(0,10).split('-');
    var mon = new Date().toLocaleString('default', { month: 'short' });
    var cdt = `${arrymd[2]}-${mon}-${arrymd[0]}`;
    /***time***/
    //var ctime = new Date().toLocaleTimeString(); // 11:18:48 AM
    var ctime = new Date().toLocaleTimeString([], {hour12: true, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    var cdate = new Date().toLocaleDateString(); // 11/16/2015
    var cdtme = new Date().toLocaleString();     // 11/16/2015, 11:18:48 PM
    /*****/
    //document.querySelector('#footer').innerHTML += cdt;
    document.querySelector('#footer').innerHTML = document.querySelector('#footer').innerHTML.split(":")[0] + " : " + cdt + " " + ctime;
}

//----sliding banner images-----
    //load array from folders using AJAX - Asynchrous JavaScript and XML
    var arrgallery=new Array(); //image array
    LoadImages(GetImagesCallback);
    function GetImagesCallback(arrimgs){
        arrgallery = arrimgs;
    }

    //get images from ajax
    function LoadImages1(callback){
        //load array from folders using AJAX - Asynchrous JavaScript and XML
        var arrgallery=new Array(); //image array
        var k=0;
        var xhr = new XMLHttpRequest();
            xhr.open("GET", "images/slide/", true);
            xhr.responseType = "document"; //"arraybuffer"; //for videos
            xhr.onload = function(){
                if (xhr.status === 200) {
                    [...xhr.response.getElementsByTagName("a")].forEach((ele,i)=>{
                        ele.href=ele.href; //maps href to absolute path correctly
                    });
                    var reshtml = new XMLSerializer().serializeToString(xhr.response);
                    //document.write(reshtml);
                    //document.write(new XMLSerializer().serializeToString(xhr.response)); console.log(xhr.response); //document.write((xhr.response).documentElement.outerHTML);//write to pge or console
                    var elements = xhr.response.getElementsByTagName("a");
                    for (x of elements) {
                        if ( x.href.match(/\.(jpe?g|png|gif|bmp)$/) ) { 
                            let img = document.createElement("img");
                            img.src = x.href;
                            arrgallery[k]=x.href; k++;
                            console.log(arrgallery[k]);
                            //document.body.appendChild(img);
                        } 
                        callback(arrgallery);
                    }; 
                } else {
                    //alert('Request failed. Returned status of ' + xhr.status);
                    console.log('Request failed. Returned status of ' + xhr.status);
                }
            };
        xhr.send();
    } //end get images AJAX



    function LoadImages2(callback){
        var url='images/slide/';
        var arrgallery=new Array(); //image array
        var k=0;
        fetch(url)
            .then(response => response.text())
            .then(text => new DOMParser().parseFromString(text, 'text/html'))
            .then(doc => {
                [...doc.getElementsByTagName("a")].forEach((ele,i)=>{
                    ele.href=ele.href;
                    //var seppos = ele.href.lastIndexOf('/')+1;
                    //ele.href=ele.href.substring(0,seppos)+url+ele.href.substring(seppos); //maps href to absolute path correctly | fetch fails to auto pick
                });
                var reshtml = new XMLSerializer().serializeToString(doc);
                //document.write(reshtml);
                //---
                var elements = doc.getElementsByTagName("a");
                    for (x of elements) {
                        if ( x.href.match(/\.(jpe?g|png|gif|bmp)$/) ) { 
                            let img = document.createElement("img");
                            img.src = x.href;
                            arrgallery[k]=x.href; k++;
                            console.log(arrgallery[k]);
                            //document.body.appendChild(img);
                        } 
                        callback(arrgallery);
                    }; 
                //---
            })
            .catch(console.error);
    }

    //async await
    async function LoadImages(callback) {  
        var url= 'images/slide/';
        var arrgallery=new Array(); //image array
        var k=0;
        try {
            let response = await fetch(url); // Gets a promise
            //document.body.innerHTML = await response.text(); // Replaces body with response
            var doc = document.implementation.createHTMLDocument();
            doc=new DOMParser().parseFromString(await response.text(), 'text/html'); // Replaces body with response
            [...doc.getElementsByTagName("a")].forEach((ele,i)=>{
                var seppos = ele.href.lastIndexOf('/')+1;
                ele.href=ele.href.substring(0,seppos)+url+ele.href.substring(seppos); 
            });
            var reshtml = new XMLSerializer().serializeToString(doc);
            //document.write(reshtml);
            //---
            var elements = doc.getElementsByTagName("a");
            for (x of elements) {
                if ( x.href.match(/\.(jpe?g|png|gif|bmp)$/) ) { 
                    let img = document.createElement("img");
                    img.src = x.href;
                    arrgallery[k]=x.href; k++;
                    console.log(arrgallery[k]);
                    //document.body.appendChild(img);
                } 
                callback(arrgallery);
            }; 
        //---
        } catch (err) {
          console.log('Fetch error:' + err); // Error handling
        }
      }


    var imgIndex=0; //holds current index of loaded image

    function slideshow(){
        var currentImage = (arrgallery[imgIndex])? arrgallery[imgIndex] : "images/slide/default.jpg";
        document.getElementById("divbanner").style.backgroundImage = "url("+currentImage+")";
        imgIndex = (imgIndex < arrgallery.length-1)? imgIndex + 1 : 0;
    }

    //set timer
    window.onload=function(){
        setInterval(slideshow, 10000); //setTimeout("slideshow()", 5000) 
        setInterval(GetCurrentDateTime, 1000); //setInterval("GetCurrentDateTime()", 1000); //remove brackets and double quotes, to avoid function not found in this ajax js inclusion call approach
        document.body.classList.toggle('loading'); //set inital classlist
    } 

    //get project path name 
    function GetProjectURL(){
        return window.location.origin+'/'+window.location.pathname.split('/')[1];
    }

    //add loading gif -- for slow networks and delaying pages
    function SetLoadingGIF(){
         /* Start by setting display:none to make this hidden. 
            Then we position it in relation to the viewport window with position:fixed. Width, height, top and left are clear.
            Background we set to 80% white with our animation centered, and no-repeating */
            
            var style = `.modal {
                        display:    none;
                        position:   fixed;
                        z-index:    1000;
                        opacity:    1;
                        top:        0;
                        left:       0;
                        height:     100%;
                        width:      100%;
                        background: rgba( 255, 255, 255, .8 ) 
                                    url('images/loadSpinner.gif') 
                                    50% 50% 
                                    no-repeat; /*defines some opacity - overwritten below*/
                        background-color: #f1f2f3;
                    }

                    /* When the body has the loading class, we turn the scrollbar off with overflow:hidden */
                    body.loading .modal {
                        overflow: hidden;   
                    }

                    /* Anytime the body has the loading class, our modal element will be visible */
                    body.loading .modal {
                        display: block;
                    }`;

            document.querySelector('style').append(style);
            var divloading = document.createElement("div");
            divloading.setAttribute('class', 'modal');
            document.body.appendChild(divloading); //<div class="modal"><!-- Place at bottom of page --></div>
            //document.onload=(()=>{
                //document.body.classList.toggle('loading'); //set inital classlist
            //});
    }

    //remove loading GIF
    function ClearLoadingGIF(){
        document.body.classList.toggle('loading'); //set inital classlist
    }

    //********************** */
    function createCalendar(elem, year=0, month=0) {
        var today = new Date(); //get today's date
        var dt = today.getDate();
        month = (month==0)? today.getMonth()+1 : month;
        year  = (year ==0)? today.getFullYear(): year;
        var monthname = new Date().toLocaleString('default', { month: 'long' });
        var caption = monthname +" - "+ year;

        let mon = month - 1; // months in JS are 0..11, not 1..12
        let d = new Date(year, mon);

        let table = '<table id="cal"><caption>'+caption+'</caption><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

        // spaces for the first row
        // from Monday till the first day of the month
        // * * * 1  2  3  4
        for (let i = 0; i < getDay(d); i++) {
            table += '<td></td>';
        }

        // <td> with actual dates
        while (d.getMonth() == mon) {
            var cls = (d.getDate()==dt)? "class='today'" : "class=''";
            table += '<td '+cls+'>' + d.getDate() + '</td>';

            if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
            table += '</tr><tr>';
            }

            d.setDate(d.getDate() + 1);
        }

        // add spaces after last days of month for the last row
        // 29 30 31 * * * *
        if (getDay(d) != 0) {
            for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
            }
        }

        // close the table
        table += '</tr></table>';

        elem.innerHTML = table;
        }

        function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
        let day = date.getDay();
        if (day == 0) day = 7; // make Sunday (0) the last day
        return day - 1;
    }

    //********************** */

//---------------END------------
//The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
var sm = null ?? 'default string';

//spread notation / unpack syntax
function sum(a,b,c){
    return a+b+c;
}
var arr = [100,200,300];
var tot = sum(arr[0],arr[1],arr[2]); //long way
var tot = sum(...arr); //with spread/unpack notation
/*
//You can just check if the variable has a truthy value or not. That means
if( value ) {
}
will evaluate to true if value is not:

null
undefined
NaN
empty string ("")
0
false
*/


/* media queries great comment

I can tell you I am using just a single breakpoint at 768 - that is min-width: 768px to serve tablets and desktops, and max-width: 767px to serve phones.

I haven't looked back since. It makes the responsive development easy and not a chore, and provides a reasonable experience on all devices at minimal cost to development time without the need to fear a new Android device with a new resolution you haven't factored in.

*/