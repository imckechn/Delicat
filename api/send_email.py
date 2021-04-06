#####
## Most of this code was taken from https://realpython.com/python-send-email/
## and modified to meet our needs.
####
import email, smtplib, ssl
import os
from pathlib import Path
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Send an email, possibly with a pdf attachment
def send_pdf_email(email_address, flyer_pdf = None, body = "", subject = "Your Shopping List"):
    receiver_email = email_address
    sender_email = "developurrs@gmail.com"
    password = "AUqK2%?$"

    # Create a multipart message and set headers
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message["Bcc"] = receiver_email  # Recommended for mass emails

    # Add body to email
    message.attach(MIMEText(body, "plain"))

    # Try to parse the PDF sent
    if(flyer_pdf):
        print("Processing flyer pdf")
        # The below code worked with actual files in the same directory
        #with open(filename, "rb") as attachment:
            # Add file as application/octet-stream
            # Email client can usually download this automatically as attachment
            #part = MIMEBase("application", "octet-stream")
            #part.set_payload(attachment.read())

        # Encode file in ASCII characters to send by email    
        encoders.encode_base64(part)

        # Keep this code until we can test sending pdfs
        # Add header as key/value pair to attachment part
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}",
        )

        # Add attachment to message and convert message to string
        message.attach(part)
    
    text = message.as_string()

    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, text)
        print("Email Sent! Success!")

if __name__ == '__main__':
    send_pdf_email()
# python -m smtpd -c DebuggingServer -n localhost:1025