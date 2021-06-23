function logResult(json) {
  console.log(json);
  if(json.result === "success"){
    formSuccess();
  } else if(json.result === "error") {
    formError();
  }
};

makeWebflowFormAjax = function(forms, successCallback, errorCallback) {
  forms.each(function() {
    var form = $(this);
    form.on("submit", function() {
      var container =   form.parent();
      var doneBlock =  $(".w-form-done", container);
      var failBlock =  $(".w-form-fail", container);

      var action  = form.attr("action");
      var method  = form.attr("method");
      var data    = form.serialize();
      var dataURI = {};


      form.find("input, textarea, select").each(function() {
        var inputType = this.tagName.toUpperCase() === "INPUT" && this.type.toUpperCase();
        if (inputType !== "BUTTON" && inputType !== "SUBMIT") {
          dataURI[this.name] = $(this).val();
        }
      });

      dataURI = $.param(dataURI);

      formSuccess = function() {
        form.hide();
        doneBlock.fadeIn();
        failBlock.hide();
      }
      formError = function() {
        form.show();
        doneBlock.hide();
        failBlock.fadeIn();
      }

      $.ajax({
        type: method,
        url: action + '?' + dataURI,
        dataType: "jsonp",
        jsonpCallback: 'logResult'
        // success: function (resultData) {
        //   if (typeof successCallback === 'function') {
        //     // call custom callback
        //     result = successCallback(resultData);
        //     if ( !result ) {
        //       formError();
        //       return;
        //     }
        //     formSuccess();
        //   }
        // },
        // error: function (e, type, exception) {
        //   // call custom callback
        //   if (typeof errorCallback === 'function') {
        //     errorCallback(e)
        //   }
        //   formError();
        // }
      });

      // Prevent default webflow action.
      return false;
    });
  });
}

// makeWebflowFormAjax($('form'));
