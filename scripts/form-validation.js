// Form validation functionality

class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        
        // Required fieldvalidation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Это поле обязательно для заполнения');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Введите корректный email адрес');
                return false;
            }
        }

        // Phone validation (basic)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Введите корректный номер телефона');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('is-invalid');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid');
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.showSuccessMessage(form);
            // Here you would typically send the form data to a server
            console.log('Form submitted successfully:', new FormData(form));
        } else {
            this.showErrorMessage('Пожалуйста, исправьте ошибки в форме');
        }
    }

    showSuccessMessage(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="bi bi-check-circle me-2"></i>Отправлено!';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            form.reset();
            
            // Show toast notification
            this.showToast('Сообщение успешно отправлено!', 'success');
        }, 2000);
    }

    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-bg-${type === 'error' ? 'danger' : 'success'} border-0`;
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        // Add to container
        const container = document.getElementById('toastContainer') || this.createToastContainer();
        container.appendChild(toast);

        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        // Remove after hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
        return container;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});