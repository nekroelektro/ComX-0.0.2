using System;
using NUnit.Framework;

namespace ComX_0._0._2.Helpers.SmtpHelpers {
    [TestFixture]
    public class EmailTests {
        private readonly IEmailService _emailService;

        public EmailTests() {
            _emailService = new EmailService();
        }

        [Test]
        public void send_email_via_gmail() {
            var email = new EmailMessage {
                IsHtml = false,
                Subject = "Email unit test email",
                ToEmail = "cthulhupolska@gmail.com",
                Body = string.Format("Unit test body sent at {0:D}", DateTime.Now)
            };
            var success = _emailService.SendEmailMessage(email);
            Assert.IsTrue(success);
        }
    }
}