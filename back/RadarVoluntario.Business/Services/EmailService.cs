namespace RadarVoluntario.API.Services;

using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using RadarVoluntario.Domain.Helpers;

public interface IEmailService
{
    void Send(string to, string subject, string html, string from = null);
}

public class EmailService : IEmailService
{
    private readonly AppSettings _appSettings;

    public EmailService(IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings.Value;
    }

    public void Send(string to, string subject, string html, string from = null)
    {
        // create message
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(from ?? AppSettings.Instance.EMAIL_FROM));
        email.To.Add(MailboxAddress.Parse(to));
        email.Subject = subject;
        email.Body = new TextPart(TextFormat.Html) { Text = html };

        // send email
        using var smtp = new SmtpClient();
        smtp.Connect(AppSettings.Instance.SMTP_OPTIONS.SMTP_HOST, AppSettings.Instance.SMTP_OPTIONS.SMTP_PORT, SecureSocketOptions.StartTls);
        smtp.Authenticate(AppSettings.Instance.SMTP_OPTIONS.SMTP_USER, AppSettings.Instance.SMTP_OPTIONS.SMTP_PASS);
        smtp.Send(email);
        smtp.Disconnect(true);
    }
}