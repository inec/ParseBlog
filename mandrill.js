jQuery(function($)  
{
    console.log("7");
    $("#contact_form").submit(function()
    {
        var email = $("#email").val(); // get email field value
        var name = $("#fname").val()+' ' +$("#lname").val(); // get name field value
        var msg = $("#message").val(); // get message field value
console.log(email+name+msg);

        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': '2i1AwhFMxGk'+'aJ6O3Z3ousQ',
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
                        'email': 'luyege+pub'+'@gmail.com',
                        'name': 'Y Lu',
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
        
        return false; // prevent page refresh
    });
});