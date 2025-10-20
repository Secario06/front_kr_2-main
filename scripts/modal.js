// Modal management for projects

class ProjectModal {
    constructor() {
        this.modals = document.querySelectorAll('.project-modal');
        this.init();
    }

    init() {
        // Add click handlers for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a') && !e.target.closest('button')) {
                    const modalId = card.querySelector('button')?.dataset.bsTarget;
                    if (modalId) {
                        const modal = new bootstrap.Modal(document.querySelector(modalId));
                        modal.show();
                    }
                }
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    closeAllModals() {
        this.modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectModal();
});