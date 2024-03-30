import React, { useRef } from 'react';
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const form = useRef<HTMLFormElement>(null);
    const confirmation = useRef<HTMLDivElement>(null);

    const sendEmail = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        emailjs
            .sendForm('service_kcq9eve', 'template_a79ze1b', form.current, {
                publicKey: '4C9NhAMkXGZnLE75c',
            })
            .then(
                () => {
                    if (form.current) form.current.style.display = "none";
                    if (confirmation.current) confirmation.current.style.display = "flex";
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="section-content">
            <h2 className="header">{t("contact.header")}</h2>
            <div className="confirmation-container" style={{ display: "none" }} ref={confirmation}>
                <div className="confirmation-text">
                    <h3>Thank you for your message!</h3>
                    <p>I'll get back to you soon</p>
                </div>
            </div>
            <form className="contact-form" id="contact" ref={form} onSubmit={sendEmail}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="from_name" required minLength={2} maxLength={50}
                       pattern="[A-Za-z\s]+" title="Please enter a valid name (only letters and spaces)"/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="from_email" required
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address"/>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows={15} required minLength={10} maxLength={500}
                          title="Please enter a message between 10 and 500 characters"></textarea>
                <button type="submit" value="Send">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;