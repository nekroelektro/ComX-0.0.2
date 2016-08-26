using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;

namespace ComX_0._0._2.Helpers.SmtpHelpers {
    public class EmailService : IEmailService {
        private const string MailUserNameKey = "MailUserName";
        private const string MailPasswordKey = "MailPassword";
        private const string MailHostKey = "MailHost";
        private const string MailPortKey = "MailPort";
        private const string MailSslKey = "MailSsl";
        private readonly SmtpConfiguration _config;

        public EmailService() {
            _config = new SmtpConfiguration();
            var mailUserName = ConfigurationManager.AppSettings[MailUserNameKey];
            var mailPassword = ConfigurationManager.AppSettings[MailPasswordKey];
            var mailHost = ConfigurationManager.AppSettings[MailHostKey];
            var mailPort = int.Parse(ConfigurationManager.AppSettings[MailPortKey]);
            var mailSsl = bool.Parse(ConfigurationManager.AppSettings[MailSslKey]);
            _config.Username = mailUserName;
            _config.Password = mailPassword;
            _config.Host = mailHost;
            _config.Port = mailPort;
            _config.Ssl = mailSsl;
        }

        public bool SendEmailMessage(EmailMessage message) {
            var success = false;
            try {
                var smtp = new SmtpClient {
                    Host = _config.Host,
                    Port = _config.Port,
                    EnableSsl = _config.Ssl,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(_config.Username, _config.Password)
                };

                using (var smtpMessage = new MailMessage(_config.Username, message.ToEmail)) {
                    smtpMessage.Subject = message.Subject;
                    smtpMessage.Body = message.Body;
                    smtpMessage.IsBodyHtml = message.IsHtml;
                    smtp.Send(smtpMessage);
                }

                success = true;
            }
            catch (Exception ex) {
                //todo: add logging integration
                //throw;
            }

            return success;
        }
    }
}