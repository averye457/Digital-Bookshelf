

function ajax_get(url, callback) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

              try {
                  var data = JSON.parse(xmlhttp.responseText);
             } catch(err) {
                  console.log(err.message + " in " + xmlhttp.responseText);
                  return;
            }

            callback(data);
          }
     };

     xmlhttp.open("GET", url, true);
     xmlhttp.send();
}

ajax_get('books.json', function(data) {

     let bookCovers = "";

     var bookArray = data.books;

     bookArray.forEach( function (currentValue, index) {

          function getImageHeight (url) {

          }

          if ( currentValue.book.book_cover.src === undefined) {
               return;
          } else {
               var imageHeight = getImageHeight(currentValue.book.book_cover.src);
          }

          // var imgHeight;
          //
          //
          // function getMeta(url, callback) {
          //     var img = new Image();
          //     img.src = url;
          //     img.onload = function() { callback(this.width, this.height); }
          // }
          // getMeta(
          //   currentValue.book.book_cover.src,
          //   function(width, height) {  }
          // );

          // console.log(imgHeight);

          bookCovers += `<div class="grid-item"><img class="book-covers"  src="${currentValue.book.book_cover.src}" /></div>`;

     });

     document.querySelector(".grid").innerHTML = bookCovers;

});

var elem = document.querySelector('.grid');
var iso = new Isotope( elem, {
     // options
     itemSelector: '.grid-item',
     layoutMode: 'fitColumns'
});
