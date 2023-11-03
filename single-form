document.addEventListener('DOMContentLoaded', function () {
    const submitButtons = document.querySelectorAll('.single-submit');

    submitButtons.forEach(function (submitButton) {
        submitButton.addEventListener('click', async function (e) {
            const form = submitButton.closest('form');

            if (form) {
                e.preventDefault();
                if (form.id.startsWith('wf-form-sf-')) {
                    const webhook = form.getAttribute('data-webhook');
                    
                    if (form.checkValidity()) {
                        await new Promise(resolve => setTimeout(resolve, 150));
                        const originalText = submitButton.tagName === 'INPUT' ? submitButton.value : submitButton.innerText;
                        sendWebhook(webhook, form, submitButton, originalText);
                    } else {
                        form.reportValidity();
                    }
                } else {
                    console.log('Formular hat falsche ID:', form.id);
                }
            } else {
                console.log('Formular nicht gefunden');
            }
        });
    });

    function sendWebhook(webhook, form, submitButton, originalText) {
        const formData = {};

        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
            const groupName = radio.getAttribute('name');
            const dataName = radio.getAttribute('data-name');
            const isChecked = radio.checked;

            if (groupName && isChecked) {
                formData[groupName] = dataName;
            }
        });

        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            formData[checkbox.getAttribute('data-name')] = checkbox.checked ? 'Ja' : 'Nein';
        });

        const textInputs = form.querySelectorAll('input[type="text"]');
        textInputs.forEach((input) => {
            formData[input.getAttribute('data-name')] = input.value;
        });

        const textareas = form.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            formData[textarea.getAttribute('data-name')] = textarea.value;
        });

        const numberInputs = form.querySelectorAll('input[type="number"]');
        numberInputs.forEach((input) => {
            formData[input.getAttribute('data-name')] = input.value;
        });

        const PhoneInputs = form.querySelectorAll('input[type="tel"]');
        PhoneInputs.forEach((input) => {
            formData[input.getAttribute('data-name')] = input.value;
        });

        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach((input) => {
            formData[input.getAttribute('data-name')] = input.value;
        });



        formData.formularname = form.getAttribute('id');
        console.log('Formulardaten:', formData);

        const container = form.parentElement;
        const doneBlock = container.querySelector('.w-form-done');
        const failBlock = container.querySelector('.w-form-fail');

        fetch(webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    if (submitButton.tagName === 'INPUT') {
                        submitButton.value = originalText;
                    } else {
                        submitButton.innerText = originalText;
                    }
                    submitButton.disabled = false;
                    form.style.display = 'none';
                    doneBlock.style.display = 'block';
                    failBlock.style.display = 'none';
                    console.log('Erfolgreich abgesendet');
                } else {
                    console.log('Fehler beim Senden:', response);
                    form.style.display = 'block';
                    doneBlock.style.display = 'none';
                    failBlock.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Fehler:', error);
                form.style.display = 'block';
                doneBlock.style.display = 'none';
                failBlock.style.display = 'block';
            });
    }
});
