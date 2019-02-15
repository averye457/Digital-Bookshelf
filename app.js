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


function createModal ( event ) {

     ajax_get( 'books.json', function( data ) {

          let modal = document.createElement( 'div' );
          modal.setAttribute( 'class', 'modal' );
          modal.setAttribute( 'id', event.clientX );
          document.body.appendChild( modal );
          let modalContent = document.createElement( 'div' );
          modalContent.setAttribute( 'class', 'modal-content' );
          let infoContainer = document.createElement( 'div' );
          infoContainer.setAttribute( 'class', 'info-container' );
          let span = document.createElement( 'span' );
          span.setAttribute( 'class', 'close' );
          span.innerHTML = "&times;";
          let paragraph = document.createElement( 'p' );
          paragraph.setAttribute( 'class', 'info-paragraph' );
          let infoBookCover = document.createElement( 'img' );
          infoBookCover.setAttribute( 'class', 'info-book-cover' );
          let infoTitle = document.createElement( 'h2' );
          infoTitle.setAttribute( 'class', 'info-title' );
          let infoAuthor = document.createElement( 'h3' );
          infoAuthor.setAttribute( 'class', 'info-author' );

          modal.appendChild( modalContent );
          modalContent.appendChild( infoBookCover );
          modalContent.appendChild( infoContainer );
          infoContainer.appendChild( span );
          infoContainer.appendChild( infoTitle );
          infoContainer.appendChild( infoAuthor );
          infoContainer.appendChild( paragraph );


          modal.style.display = "block";

          span.addEventListener( 'click',  function ( ) {
               modal.style.display = "none";
          });

          window.addEventListener( 'click', function () {
               modal.style.display = "none";
          } );



           data.books.forEach( function(index){
               var clickedImgSrc = event.srcElement.src;
               if ( index.book.book_cover.src === clickedImgSrc ) {
                    var bookCoverSrc = index.book.book_cover.src;
                    var summary = index.book.summary;
                    var authorHeading = index.book.authors;
                    var titleHeading = index.book.title
                    infoBookCover.setAttribute( 'src', bookCoverSrc );
                    paragraph.innerHTML = summary;
                    infoAuthor.innerHTML = "By: " + authorHeading;
                    infoTitle.innerHTML = titleHeading;
               } else {
                    return;
               }
          } );

     } );


}


ajax_get('books.json', function(data) {

     let bookCovers = "";

     var bookArray = data.books;

     bookArray.forEach(function(currentValue, index) {
          // get height of image
          let url = currentValue.book.book_cover.src;
          // console.log( 'url', url );

          var imgSize;

          getMeta(url);

          let grid = document.querySelector('#grid');
          let item = document.createElement('div');
          item.style.width = `320px`;
          item.style.marginBottom = `25px`;

          // CREATE BUTTON THAT OPENS MODAL
          let openModal = document.createElement('button');
          openModal.style.height = `100%`;
          openModal.style.width = `100%`;
          openModal.addEventListener( 'click', function ( event ) {
               createModal( event );
          });


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
