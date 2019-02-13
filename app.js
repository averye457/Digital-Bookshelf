function ajax_get(url, callback) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

               try {
                    var data = JSON.parse(xmlhttp.responseText);
               } catch (err) {
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

     bookArray.forEach(function(currentValue, index) {
          // get height of image
          const url = currentValue.book.book_cover.src;
          // console.log( 'url', url );

          var imgSize;

          getMeta(url);

          let grid = document.querySelector('#grid');
          let item = document.createElement('div');
          item.style.width = `320px`;
          item.style.marginBottom = `25px`;

          // CREATE BUTTON THAT OPENS MODAL
          let openModal = document.createElement('button');
          openModal.style.height = `110%`;
          openModal.style.width = `100%`;

          // // CREATE MODAL
          // let modal = document.createElement( 'div' );
          // modal.setAttribute( 'class', 'modal' );
          //
          // // CREATE MODAL CONTENT
          // let modalContent = document.createElement( 'div' );
          // modal.appendChild( modalContent );
          // modalContent.setAttribute( 'class', 'modalContent' );
          // let innerText = document.createElement( 'p' );
          // modalContent.appendChild( innerText );
          // innerText.innerHTML = "TEST";


          let img = document.createElement('img');
          img.setAttribute('src', url);
          item.appendChild(openModal).appendChild(img);


          salvattore.appendElements(grid, [item]);

          function getMeta(url) {
               $('<img/>')
                    .attr('src', url)
                    .load(function() {
                         imgSize = {
                              w: this.width,
                              h: this.height
                         };

                         setImageHeight(); // so, our image is loaded and now run something!
                    });



               $('button')
                    .attr('id', url);

               $()
                    .on('click', function() {
                         console.log('it worked!');
                    });

               //
               // let modal = document.createElement( 'div' );
               //      modal.setAttribute( 'id', url );
               //      modal.setAttribute( 'class', 'modal' );
               //
               // let buttonId = document.getElementById( url );
               // let modalId = document.getElementById( `modal${url}` );
               //
               // console.log(modalId);

          }

          // The "run something" :D
          function setImageHeight() {
               item.style.height = `${imgSize.h}px`;
          }
     });
});





//
//
//
// // OPEN BOOK INFO WINDOWS
//
//
//
// // Get the modal
// var modal = document.getElementById('myModal');
//
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
