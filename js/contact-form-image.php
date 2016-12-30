<?php 
$errors = '';
$myemail = 'alex@elwebman.nl';//<-----Put Your email address here.
if(empty($_POST['message']))
{
	$errors .= "\n Error: all fields are required. If you are stuck, please click on - Reset Canvas - ";
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message'];
$message1 = $_POST['message1'];
$message2 = $_POST['message2'];
$message3 = $_POST['message3'];


if( empty($errors))
{
	$to = $email_address;
	$to1 = $myemail;
	$email_subject = "Thank you : $name for contacting draw-like-masters by elwebman.nl";
	$email_body = "A few words on how we operate. ".	// this is the content of the email
	" <html>
	<head>
	<title>draw-like-masters by elwebman.nl</title>
	<style>
	p{
		font-size=20px;
		font-weight: 700;
	}

	h6
	{
		font-size=26px;
		font-weight: 900;

	}
	</style>
	</head>
	<body>
	<br>
	<br>
	<p>Hello \n $name, </p>
	<p>Thank you for contacting Draw-like-masters.</p>
	<br>
	<p>We hope you had a great time playing with the APP.</p>
	<br>
	<p>You hve selected this work of art(see link below).</p>
	<p>This information is what you need to access the image directly on the <a href=\"https://www.rijksmuseum.nl/en/rijksstudio/\">Rijksmuseum Online Collection</a> site.</p>
	<h1>URL to Rijksstudio: <br>\n $message</h1>
	<p>Object number: \n $message1<p>
	<p>Title: \n $message2</p>
	<p>Artist: \n $message3</p>
	<p>Note that all the images are coming from the <a href=\"https://www.rijksmuseum.nl/en/rijksstudio/\">Rijksmuseum Online Collection</a>.</p>
	<br>
	<p>Please note that the draw-like-masters APP was not developed by, for, through the intercession of, or with the support of the Rijksmuseum.</p>
	<br>
	<br>
	<p> <a href=\"http://www.draw-like-masters.elwebman.nl\">draw-like-masters APP </a> is available 24 hours a day.</p>
	<p>We hope to see you again.</p>
	<p>If your email address is not \n $email_address, then please delete this email.</p>
	<p>Thank you for contacting draw-like-masters by elwebman.nl</p>
	<p>Check us on <a href=\"https://github.com/alexolivet/\">Github</a>.</p>   
	</body>
	</html>
	"; 
	// To send HTML mail, the Content-type header must be set
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// reply address
	$headers .= "Reply-To: $email_address";
	$headers.= "cc: " . $myemail. " <" . $myemail . ">" . "\r\n" ;


	//first mail instance for visitor
	mail($to,$email_subject,$email_body,$headers);
	//second mail instance for webmaster
	//this means 2 emails are sent
	mail($to1,$email_subject,$email_body,$headers);
	//redirect to the 'thank you' page
	header('Location: http://draw-like-masters.elwebman.nl/contact-form-thank-you.html');
} 
?>
<!-- This page is displayed only if there is some error -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Contact form handler</title>
	<!-- main css style sheet-->
	<link rel="stylesheet" href="http://draw-like-masters.elwebman.nl/css/main_style.css">
	 <!-- font awesome declaration-->
  <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'>
</head>
<body>
	<div class="wrapper">
		<div class="container part3">

			<div id="error">
				<?php
				echo nl2br($errors);
				?>
				<p>Oops!..something went wrong.</p>
				<p>Please fill in all fields and then click send.</p>
				<p> Go back to  <a href="http://draw-like-masters.elwebman.nl/">Draw-like-masters by elwebman.nl</a>.</p>
				<div class="footer-icons">
					<a href="https://www.facebook.com/elwebmanamsterdam/"><i class="fa fa-facebook"></i></a>
					<a href="https://www.linkedin.com/in/alexolivet"><i class="fa fa-linkedin"></i></a>
					<a href="https://github.com/alexolivet/final_project"><i class="fa fa-github"></i></a>
				</div>
				<p class="footer-company-name">elwebman.nl &copy; 2017</p>
			</div>
			<div class="cover-holder">
				<img src="http://positivegenerator.elwebman.nl/images/sun.png" alt="positive word generator">
			</div>
		</div>
	</div>
</body>
</html>