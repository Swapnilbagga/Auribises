<?php

//SMTP needs accurate times, and the PHP time zone MUST be set
date_default_timezone_set('Etc/UTC');
//Use PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
//Get the files
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
//Sumbission data
$ipaddress = $_SERVER['REMOTE_ADDR'];
$date = date('d/m/Y');
$time = date('H:i:s');

//form data
$name = $_POST['name'];
$email = $_POST['email'];
$price = $_POST['price'];
$job = $_POST['job'];
$phone = $_POST['phone'];

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Character settting of mails
$mail->CharSet = 'UTF-8';
//Set the hostname of the mail server
$mail->Host = "smtp.example.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;
// Remove slashes if your hosting is "ssl" or "tls"
//$mail->SMTPSecure = 'tls';
// Disable auto tls
$mail->SMTPAutoTLS = false;
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "yourname@example.com";
//Password to use for SMTP authentication
$mail->Password = "yourpassword";
//Set who the message is to be sent from
$mail->setFrom('from@example.com', 'Quadra Planner Message');
//Set an alternative reply-to address
$mail->addReplyTo($email);
//Set who the message is to be sent to
$mail->addAddress('whoto@example.com', 'John Doe');
//CC - Will the email go to someone else?
$mail->addCC('whoto@example.com', 'Abigale Power');
//CC2 - And one more person
$mail->addBCC('whoto@example.com', 'Elyse Burch');
//Set the subject line
$mail->Subject = "New Planner Mail";
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML( "<p>You have recieved a new planner message from the enquiries form on your website.</p>
					  <p><strong>Name: </strong> {$name} </p>
					  <p><strong>Job: </strong> {$job} </p>
					  <p><strong>Price: </strong> {$price} </p>
					  <p><strong>Email Address: </strong> {$email} </p>
					  <p><strong>Phone: </strong> {$phone} </p>
					  <p>This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}</p>" );
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
