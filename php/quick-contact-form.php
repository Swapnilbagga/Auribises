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
$name = $_POST['qname'];
$email = $_POST['qemail'];
$phone = $_POST['phone'];
$message = $_POST['qmessage'];

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;
//Set the hostname of the mail server
$mail->Host = "smtp.example.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;
//Character settting of mails
$mail->CharSet = 'UTF-8';
// Remove slashes if your hosting is "ssl" or "tls"
//$mail->SMTPSecure = 'tls';
// Disable auto tls
$mail->SMTPAutoTLS = false;
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "noreply@example.com";
//Password to use for SMTP authentication
$mail->Password = "noreplyPassword";
//Set who the message is to be sent from
$mail->setFrom('noreply@example.com', 'Quadra Premium Theme');
//Set an alternative reply-to address
$mail->addReplyTo($email);
//This is your e-mail address, add your e-mail address here. Your noreply address will send e-mail to this address.
$mail->addAddress("whoto@example.com', 'John Doe");
//CC - Will the email go to someone else?
$mail->addCC('whoto@example.com', 'John Doe');
//CC2 - And one more person
$mail->addBCC('whoto@example.com', 'John Doe');
//Set the subject line
$mail->Subject = "New Message From Quadra - Quick contact form";
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML( "<p>You have recieved a new message from the enquiries form on your website - Quick contact form.</p>
					  <p><strong>Name: </strong> {$name} </p>
					  <p><strong>Email Address: </strong> {$email} </p>
					  <p><strong>Message: </strong> {$message} </p>
					  <p>This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}</p>" );
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
