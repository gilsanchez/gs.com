$(function() { 

    $('a[href="#contactForm"]').click( function(e) {
      e.preventDefault();

      var url = "/pages/email.html"; // $(this).attr('href');
      $('#email-wrapper').load(url);
   
      $('#content').fadeTo( 'slow', .2 );
      $('#contactForm').fadeIn( 'slow', function() {
        $('#senderName').focus();
      } )
 
    } );
    
       
    $('#email-wrapper').on('submit', '#contactForm', function(event) {
       //event.preventDefault();
       submitForm(event);
    });

    $('#email-wrapper').on('click', '#cancel', function(event) {
   // event.preventDefault();
      $('.email-form').fadeOut().remove();
      $('#content').fadeTo( 'slow', 1 );
    });

    $('#email-wrapper').on('keydown', '#contactForm', function(event) {
   // event.preventDefault();
      if ( event.which == 27 ) {
       $('.email-form').fadeOut().remove();
       $('#content').fadeTo( 'slow', 1 );
      }
    }); 

    var messageDelay = 2000;  // How long to display status messages (in milliseconds)

    // Submit the form via Ajax
    function submitForm(e) {
      var contactForm = $('#contactForm');

      // Are all the fields filled in?

      if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val() ) {

        // No; display a warning message and return to the form
        $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
        contactForm.fadeOut().delay(messageDelay).fadeIn();

      } else {

        // Yes; submit the form to the PHP script via Ajax

        $('#sendingMessage').fadeIn();
        contactForm.fadeOut();

        $.ajax( {
          url: contactForm.attr( 'action' ) + "?ajax=true",// /application/processForm.php
          type: contactForm.attr( 'method' ),
          data: contactForm.serialize(),
          success: submitFinished
        } );
      }
      // Prevent the default form submission occurring
      e.preventDefault();
    }


    // Handle the Ajax response
    function submitFinished( response ) {

      response = $.trim( response );
     
      $('#sendingMessage').fadeOut();

      if ( response == "success" ) {

        // Form submitted successfully:
        // 1. Display the success message
        // 2. Clear the form fields
        // 3. Fade the content back in

        $('#successMessage').fadeIn().delay(messageDelay).fadeOut();
        $('#senderName').val( "" );
        $('#senderEmail').val( "" );
        $('#message').val( "" ); 
        $('#content').delay(messageDelay + 500).fadeTo( 'slow', 1 );
        //$('.email-form').delay(messageDelay + 500).remove();

      } else {

        // Form submission failed: Display the failure message,
        // then redisplay the form
        $('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
        $('#contactForm').delay(messageDelay + 500).fadeIn();
      }
    }


});