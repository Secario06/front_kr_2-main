// Project filtering functionality

class ProjectFilter {
    constructor() {
        this.filters = document.querySelectorAll('.project-filter');
        this.projects = document.querySelectorAll('[data-categories]');
        this.init();
    }

    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    handleFilter(event) {
        const selectedFilter = event.currentTarget;
        const filterValue = selectedFilter.dataset.filter;

        // Update active filter
        this.filters.forEach(filter => {
            filter.classList.remove('active', 'btn-primary');
            filter.classList.add('btn-outline-primary');
        });

        selectedFilter.classList.add('active', 'btn-primary');
        selectedFilter.classList.remove('btn-outline-primary');

        // Filter projects
        this.projects.forEach(project => {
            const categories = project.dataset.categories.split(' ');

            if (filterValue === 'all' || categories.includes(filterValue)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 50);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectFilter();
});