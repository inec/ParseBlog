jQuery(function($)  
{
    console.log("2");
    $("#contact_form").submit(function()
    {
        var email = $("#email").val(); // get email field value
        var name = $("#fname").val(); // get name field value
        var msg = $("#msg").val(); // get message field value
console.log(email);
/*
        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': '2i1AwhFMxGkaJ6O3Z3ousQ',
                'message': {
                    'from_email': email,
                    'from_name': name,
                    'headers': {
                        'Reply-To': email
                    },
                    'subject': 'Website Contact Form Submission',
                    'text': msg,
                    'to': [
                    {
                        'email': 'luyege+mandrill@gmail.com',
                        'name': 'YChi Lu',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        */
        return false; // prevent page refresh
    });
});