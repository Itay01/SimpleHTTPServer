

//$("#reset").hide();
//Submit

$("#CalculateNextSubmit").click(function() {
  funcURL = "calculate-next" ;
  number = $("#CalculateNext").val();
  if (number.length === 0) {
    number = 0;
  }
  
  $("#CalculateNextSubmit").addClass("pro").html("");

  //Replace with your server function
  var request = $.ajax({
    url: funcURL,
    method: "GET",
    data: { num : number },
    dataType : "text"
  });

  request.done(function( msg ) {
    setTimeout(function() { 
    $('#CalculateNextSubmit').addClass("finish");
    $('#CalculateNextResult').html("You Sent " + number + " Result Should Be " + (parseInt(number)+1) + "<br/>Result Is " + msg);
    setTimeout(function() { 
      $("#CalculateNextSubmit").removeClass("pro").removeClass("finish").html("Submit");
      //$('#CalculateNextResult').html("Click Submit To See Result:");
    }, 500);
    }, 1000);
  });

  request.fail(function( jqXHR, textStatus, errorThrown ) {
    $('#CalculateNextSubmit').addClass("finish");
    $('#CalculateNextResult').html("Request failed: " + textStatus + " Error -  " + errorThrown + "</br> " + jqXHR.responseText);
    $("#CalculateNextSubmit").removeClass("pro").removeClass("finish").html("Submit");
  });

});

$("#CalculateAreaSubmit").click(function() {
  funcURL = "calculate-area" ;
  height = $("#CalculateAreaHeight").val();
  width = $("#CalculateAreaWidth").val();
  if (height.length === 0) {
    height = 0;
  }
  if (width.length === 0) {
    width = 0;
  }
  
  $("#CalculateAreaSubmit").addClass("pro").html("");

  //Replace with your server function
  var request = $.ajax({
    url: funcURL,
    method: "GET",
    data: { height : height, width : width },
    dataType : "text"
  });

  request.done(function( msg ) {
    setTimeout(function() { 
    $('#CalculateAreaSubmit').addClass("finish");
    $('#CalculateAreaResult').html("You Sent Height " + height + " Width " + width + " Result Should Be " + (0.5 * parseInt(height) * parseInt(width)) + "<br/>Result Is " + msg);
    setTimeout(function() { 
      $("#CalculateAreaSubmit").removeClass("pro").removeClass("finish").html("Submit");
      //$('#CalculateAreaResult').html("Click Submit To See Result:");
    }, 500);
    }, 1000);
  });

  request.fail(function( jqXHR, textStatus, errorThrown ) {
    $('#CalculateAreaSubmit').addClass("finish");
    $('#CalculateAreaResult').html("Request failed: " + textStatus + " Error -  " + errorThrown + "</br> " + jqXHR.responseText);
    $("#CalculateAreaSubmit").removeClass("pro").removeClass("finish").html("Submit");
  });

});
/*
$("#PostImageSubmit").click(function() {
  funcURL = "upload" ;
  
  file = $("#PostImage").get(0).files[0];
  filename = $("#PostImage").val();
  console.log(file);
 
  if (file.length === 0) {
    file = "";
  } else {
    if (file.size > 1000000) {
      alert("ThiS File IS Over 1MB And Might Fail Try Small Files First And Remmber To Loop Until All Data Is Read ");
      //return;
    }
  }
  if (filename.length === 0) {
    filename = "";
  } else {
    filename = filename.substr(filename.lastIndexOf("\\") + 1);
  }
  
  funcURL += "?file-name=" + filename
  $("#PostImageSubmit").addClass("pro").html("");

  //Replace with your server function
  var request = $.ajax({
    url: funcURL,
    method: "POST",
    //data: { file : file, filename : filename },
    data: file,
    processData: false,
    async: true,
    contentType: 'text/plain',
    timeout : 20000
  });

  request.done(function( msg ) {
    console.log(msg);
    setTimeout(function() { 
    $('#PostImageSubmit').addClass("finish");
    $('#PostImageResult').html("You Sent File " + filename + " of size " + file.size + "<br/>Result Is " + msg);
    setTimeout(function() { 
      $("#PostImageSubmit").removeClass("pro").removeClass("finish").html("Submit");
      //$('#PostImageResult').html("Click Submit To See Result:");
    }, 500);
    }, 1000);
  });

  request.fail(function( jqXHR, textStatus, errorThrown ) {
    console.log(jqXHR);
    $('#PostImageSubmit').addClass("finish");
    $('#PostImageResult').html("Request failed: " + textStatus + " Error -  " + errorThrown + "</br> " + jqXHR.responseText);
    $("#PostImageSubmit").removeClass("pro").removeClass("finish").html("Submit");
  });

});*/
$("#PostImageSubmit").click(function() {
  funcURL = "upload";

  // Get the selected file
  var file = $("#PostImage").get(0).files[0];
  var filename = $("#PostImage").val();

  // Basic file size validation (optional)
  if (file && file.size > 1000000) {
    alert("This file is over 1MB and might fail. Try smaller files first.");
    return;
  }

  if (filename.length === 0) {
    filename = "";
  } else {
    // Extract filename without path (optional)
    filename = filename.substr(filename.lastIndexOf("\\") + 1);
  }

  // Use FormData for image uploads
  var formData = new FormData();
  formData.append("file", file);
  alert(formData)
  $("#PostImageSubmit").addClass("pro").html("");

  var request = $.ajax({
    url: funcURL,
    method: "POST",
    data: formData,
    processData: false, // Don't pre-process FormData
    contentType: false, // Set content type automatically
    timeout: 200000
  });

  request.done(function(msg) {
    console.log(msg);
    setTimeout(function() {
      $('#PostImageSubmit').addClass("finish");
      $('#PostImageResult').html("You Sent File " + filename + " of size " + file.size + "<br/>Result Is " + msg);
      setTimeout(function() {
        $("#PostImageSubmit").removeClass("pro").removeClass("finish").html("Submit");
      }, 500);
    }, 1000);
  });

  request.fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    $('#PostImageSubmit').addClass("finish");
    $('#PostImageResult').html("Request failed: " + textStatus + " Error - " + errorThrown + "<br> " + jqXHR.responseText);
    $("#PostImageSubmit").removeClass("pro").removeClass("finish").html("Submit");
  });
});

$("#GetImageSubmit").click(function() {
  funcURL = "image" ;
  filename = $("#GetImage").val();
  ext = ""
  
  if (filename.length === 0) {
    filename = "";
  } else {
    filename = filename.substr(filename.lastIndexOf("\\") + 1);
    ext = filename.split('.').pop();
  }

  if (ext == "") {
    alert("Please State The Full Name With Extension");
    return;
  };


  
  $("#GetImageSubmit").addClass("pro").html("");

  //Replace with your server function
  var request = $.ajax({
    url: funcURL,
    method: "GET",
    data: { "image-name" : filename },
    timeout: 20000
  });

  request.done(function( msg ) {
    setTimeout(function() { 
    $('#GetImageSubmit').addClass("finish");
    $('#GetImageResult').html('<a href="/image?image-name=' + filename + '"><img style="width:100%; height:100%;" src="/image?image-name=' + filename + '" /></a>');
    setTimeout(function() { 
      $("#GetImageSubmit").removeClass("pro").removeClass("finish").html("Submit");
      //$('#CalculateAreaResult').html("Click Submit To See Result:");
    }, 500);
    }, 1000);
  });

  request.fail(function( jqXHR, textStatus, errorThrown ) {
    $('#GetImageSubmit').addClass("finish");
    $('#GetImageResult').html("Request failed: " + textStatus + " Error -  " + errorThrown + "</br> " + jqXHR.responseText);
    $("#GetImageSubmit").removeClass("pro").removeClass("finish").html("Submit");
  });

});