
//const url = 'data/countries.xml' // provide file location
function ReadXmlData(url, callback){
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            callback(xml);
        })
        .catch(console.error);
}
//---


function showTheList(xml) {

    var divBooks = document.getElementById('books');        // THE PARENT DIV.
    var Book_List = xml.getElementsByTagName('List');       // THE XML TAG NAME.

    for (var i = 0; i < Book_List.length; i++) {

        // CREATE CHILD DIVS INSIDE THE PARENT DIV.
        var divLeft = document.createElement('div');
        divLeft.className = 'col1';
        divLeft.innerHTML = Book_List[i].getElementsByTagName("BookName")[0].childNodes[0].nodeValue;

        var divRight = document.createElement('div');
        divRight.className = 'col2';
        divRight.innerHTML = Book_List[i].getElementsByTagName("Category")[0].childNodes[0].nodeValue;

        // ADD THE CHILD TO THE PARENT DIV.
        divBooks.appendChild(divLeft);
        divBooks.appendChild(divRight);
    }
};