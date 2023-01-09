const EMAIL_FROM_NEWSLETTER = { email: 'proyectofinalhenrygadget@gmail.com', name: 'HenryGadget' };

const SUBJECT_SUBSCRIBE = 'HenryGadget: Confirm your subscription to our newsletter';
const SUBJECT_CONFIRM = 'HenryGadget: Subscription succeed.';
const SUBJECT_UNSUBSCRIBE = 'HenryGadget: Unsubscribe succeed.';
const SUBJECT_SENDMAIL = 'HenryGadget: ';

function htmlSubscribe(confirmationURL) {
    return `Hello subscripter, Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}"> clicking here</a>.`
};
const HTML_CONFIRM = 'Thank you for subscribing to our newsletter.';
const HTML_UNSUBSCRIBE = 'I\'m sorry you have to go. Thanks for being with us. You can subscribe anytime you want.';
module.exports = {
    EMAIL_FROM_NEWSLETTER,
    SUBJECT_SUBSCRIBE,
    SUBJECT_CONFIRM,
    SUBJECT_UNSUBSCRIBE,
    SUBJECT_SENDMAIL,
    htmlSubscribe,
    HTML_CONFIRM,
    HTML_UNSUBSCRIBE
};