document.addEventListener("DOMContentLoaded", () => {
    const handleFormSubmit = async (event, form) => {
        event.preventDefault();
        await new Promise(resolve => setTimeout(resolve, 150));

        const errorDiv = form.querySelector('.last-error');
        if (errorDiv && ['block', 'inline-block'].includes(window.getComputedStyle(errorDiv).display)) {
            return;
        } else {
            const submitButton = form.querySelector('input[type="submit"], .multi-step-submit');
            const originalText = submitButton.value || submitButton.innerText;
            if (submitButton.tagName === 'INPUT') {
                submitButton.value = "Bitte warten...";
            } else {
                submitButton.innerText = "Bitte warten...";
            }
            submitButton.disabled = true;

            const webhook = form.getAttribute('data-webhook');
            const formData = {};

            const radioButtons = form.querySelectorAll('input[type="radio"]');
            const groups = {};
            
            radioButtons.forEach((radio) => {
                const groupName = radio.getAttribute('name');
                if (groupName && !groups[groupName]) {
                    groups[groupName] = [];
                }
            });
            
            radioButtons.forEach((radio) => {
                const groupName = radio.getAttribute('name');
                const dataName = radio.getAttribute('value');
                const isChecked = radio.checked;
            
                if (groupName && isChecked) {
                    groups[groupName].push(dataName);
                }
            });
            
            Object.keys(groups).forEach((groupName) => {
                if (groups[groupName].length === 0) {
                    formData[groupName] = encodeURIComponent('/');
                } else {
                    formData[groupName] = groups[groupName][0];
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

            const container = form.parentElement;
            const doneBlock = container.querySelector('.w-form-done');
            const failBlock = container.querySelector('.w-form-fail');

            $.ajax({
                type: "POST",
                url: webhook,
                data: JSON.stringify(formData),
                contentType: "application/json; charset=utf-8",
                success: () => {
                    if (submitButton.tagName === 'INPUT') {
                        submitButton.value = originalText;
                    } else {
                        submitButton.innerText = originalText;
                    }
                    submitButton.disabled = false;
                    form.style.display = 'none';
                    doneBlock.style.display = 'block';
                    failBlock.style.display = 'none';
                },
                error: e => {
                    console.log('Error', e);
                    displayError();
                    form.style.display = 'block';
                    doneBlock.style.display = 'none';
                    failBlock.style.display = 'block';
                }
            });
        };
    };

    const forms = document.querySelectorAll('form[id^="wf-form-msf-"]');
    forms.forEach((form) => {
        form.addEventListener('submit', (event) => handleFormSubmit(event, form));

        const customSubmitDiv = form.querySelector('.multi-step-submit');
        if (customSubmitDiv) {
            customSubmitDiv.addEventListener('click', (event) => {
                handleFormSubmit(event, form);
            });
        }
    });

});
