function ajax_get( url, callback ) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {

      try {
        var data = JSON.parse( xmlhttp.responseText );
      } catch ( err ) {
        console.log( err.message + " in " + xmlhttp.responseText );
        return;
      }

      callback( data );
    }
  };

  xmlhttp.open( "GET", url, true );
  xmlhttp.send();
}

ajax_get( 'books.json', function ( data ) {

  let bookCovers = "";

  var bookArray = data.books;

  bookArray.forEach( function ( currentValue, index ) {
    // get height of image
    const url = currentValue.book.book_cover.src;
    // console.log( 'url', url );

    var imgSize;

    getMeta( url );

    let grid = document.querySelector( '#grid' );
    let item = document.createElement( 'div' );
    item.style.width = `320px`;
    item.style.marginBottom = `25px`;

    let img = document.createElement( 'img' );
    img.setAttribute( 'src', url );
    item.appendChild( img );


    salvattore.appendElements( grid, [ item ] );

    function getMeta( url ) {
      $( '<img/>' )
        .attr( 'src', url )
        .load( function () {
          imgSize = {
            w: this.width,
            h: this.height
          };
          setImageHeight(); // so, our image is loaded and now run something!
        } );
    }

    // The "run something" :D
    function setImageHeight() {
      item.style.height = `${imgSize.h}px`;
    }
  } );
} );