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

// https://www.as.uky.edu/faculty-book-json


ajax_get('books.json', function( data ) {

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

               $('#grid'>'div'>'button')
                    .attr('id', url);

          }

          // The "run something" :D
          function setImageHeight() {
               item.style.height = `${( (imgSize.h*4.2)/4 )}px`;
               item.style.width = `${( (imgSize.w*4.2)/4 )}px`;
               img.style.height = `${( (imgSize.h*4.2)/4 )}px`;
               img.style.width = `${( (imgSize.w *4.2)/4 )}px`;
          }

          let searchWord = currentValue.book.affiliations

          if ( searchWord.length > 0 ) {
               searchWord.forEach( function goThroughAffiliations( currentValue, index ){
                    // console.log(currentValue, index);
                    // console.log(item);

                    if ( index === 0 ) {
                         item.setAttribute( 'data-zero', currentValue.substring(0, 5) );
                    } else if ( index === 1 ) {
                         item.setAttribute( 'data-one', currentValue.substring(0, 5) );
                    } else if ( index === 2 ) {
                         item.setAttribute( 'data-two', currentValue.substring(0, 5) );
                    } else if ( index === 3 ) {
                         item.setAttribute( 'data-three', currentValue.substring(0, 5) );
                    } else if ( index === 4 ) {
                         item.setAttribute( 'data-four', currentValue.substring(0, 5) );
                    } else if ( index === 5 ) {
                         item.setAttribute( 'data-five', currentValue.substring(0, 5) );
                    } else if ( index === 6 ) {
                         item.setAttribute( 'data-six', currentValue.substring(0, 5) );
                    } else if ( index === 7 ) {
                         item.setAttribute( 'data-seven', currentValue.substring(0, 5) );
                    } else if ( index === 8 ) {
                         item.setAttribute( 'data-eight', currentValue.substring(0, 5) );
                    } else if ( index === 9 ) {
                         item.setAttribute( 'data-nine', currentValue.substring(0, 5) );
                    } else {}

               } )
          }

     });
});






 //           FILTER BUTTON FUNCTION


function filterSelection(filterWord) {


     const divs = document.querySelectorAll( 'div#grid > div > div' );

     divs.forEach( function lookThroughBooks( currentBook ) {

          if (
               // CHECKS TO SEE IF ANY OF THE DATA ATTRIBUTES HAVE THE FIRST 5 LETTERS OF THE FILTER WORD
          currentBook.dataset.zero === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.one === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.two === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.three === filterWord.substring( 0, 5 )||
          currentBook.dataset.four === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.five === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.six === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.seven === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.eight === filterWord.substring( 0, 5 ) ||
          currentBook.dataset.nine === filterWord.substring( 0, 5 )) {

               // DOES NOTHING

          } else {
               // HIDES THE ONES THAT DON'T MATCH
               currentBook.setAttribute( 'class', 'hide' );
          }

     } )

     const clearButton = document.querySelector('#clear-button');

     clearButton.style.display = 'inline-block'

}




//  CLEARS SELECTIONS WHEN CLEAR FILTERS BUTTON IS CLICKED

function clearSelections() {

     const divs = document.querySelectorAll( '#grid > div > div' );

     divs.forEach( function lookThroughBooks( currentBook ) {

          currentBook.removeAttribute("class");

     } )

     const clearButton = document.querySelector('#clear-button');

     clearButton.style.display= 'none';

     var button = document.querySelectorAll('.filter-buttons > button');

     button.forEach( function undoGreenBackCol(thisButton) {

          if ( thisButton.id === 'clear-button' ) {
               return;
          } else {
          thisButton.style.backgroundColor = "rgb( 24, 151, 212)";
          }
     } );

}




//  CHANGES BACKGROUND OF CLICKED FILTER

var button = document.querySelector(".filter-buttons");

button.addEventListener('click', event => {

     if ( event.target.id=== 'clear-button' || event.target.id === 'clear-p' ) {
          return;
     } else if ( event.target.tagName === 'BUTTON' ) {
          event.target.style.backgroundColor = 'green';
     } else if ( event.target.tagName === 'P' ) {
          event.target.parentNode.style.backgroundColor = 'green';
     } else {
          return;
     }

})
