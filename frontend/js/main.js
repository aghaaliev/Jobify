// Main JavaScript file for Jobify

// Sample data for the website
const data = {
    featuredJobs: [
        {
            id: 1,
            title: "Senior Software Engineer",
            company: { name: "Tech Solutions", id: 1, logo: "TS" },
            location: "Baku, Azerbaijan",
            type: "Full-time",
            experienceLevel: "Senior Level",
            skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "TypeScript"],
            salaryMin: 3500,
            salaryMax: 5000,
            currency: "AZN",
            postedDate: "2 days ago"
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: { name: "Tech Solutions", id: 1, logo: "TS" },
            location: "Baku, Azerbaijan",
            type: "Full-time",
            experienceLevel: "Mid Level",
            skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
            salaryMin: 2500,
            salaryMax: 3500,
            currency: "AZN",
            postedDate: "3 days ago"
        },
        {
            id: 3,
            title: "Accountant",
            company: { name: "Finance Plus", id: 2, logo: "FP" },
            location: "Baku, Azerbaijan",
            type: "Full-time",
            experienceLevel: "Mid Level",
            skills: ["Accounting", "Financial Reporting", "Excel", "QuickBooks"],
            salaryMin: 1800,
            salaryMax: 2500,
            currency: "AZN",
            postedDate: "1 week ago"
        },
        {
            id: 4,
            title: "Digital Marketing Specialist",
            company: { name: "Marketing Pro", id: 3, logo: "MP" },
            location: "Baku, Azerbaijan",
            type: "Full-time",
            experienceLevel: "Mid Level",
            skills: ["Social Media Marketing", "SEO", "Content Creation", "Google Analytics"],
            salaryMin: 1500,
            salaryMax: 2200,
            currency: "AZN",
            postedDate: "5 days ago"
        }
    ],
    categories: [
        {
            id: 1,
            name: "Information Technology",
            description: "Software development, IT support, network administration",
            jobCount: 120
        },
        {
            id: 2,
            name: "Finance",
            description: "Accounting, banking, financial analysis",
            jobCount: 85
        },
        {
            id: 3,
            name: "Marketing",
            description: "Digital marketing, brand management, market research",
            jobCount: 64
        },
        {
            id: 4,
            name: "Sales",
            description: "B2B sales, retail, account management",
            jobCount: 92
        }
    ],
    companies: [
        {
            id: 1,
            name: "Tech Solutions",
            industry: "Information Technology",
            location: "Baku, Azerbaijan",
            logo: "TS",
            jobCount: 5
        },
        {
            id: 2,
            name: "Finance Plus",
            industry: "Finance",
            location: "Baku, Azerbaijan",
            logo: "FP",
            jobCount: 3
        },
        {
            id: 3,
            name: "Marketing Pro",
            industry: "Marketing",
            location: "Baku, Azerbaijan",
            logo: "MP",
            jobCount: 2
        }
    ],
    jobSeekers: [
        {
            userId: 1,
            user: {
                firstName: "Ali",
                lastName: "Mammadov",
                location: "Baku, Azerbaijan"
            },
            title: "Senior Software Developer",
            skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "TypeScript"]
        },
        {
            userId: 2,
            user: {
                firstName: "Leyla",
                lastName: "Aliyeva",
                location: "Baku, Azerbaijan"
            },
            title: "Marketing Specialist",
            skills: ["Social Media Marketing", "Content Creation", "SEO", "Google Analytics", "Email Marketing"]
        },
        {
            userId: 3,
            user: {
                firstName: "Farid",
                lastName: "Huseynov",
                location: "Baku, Azerbaijan"
            },
            title: "Financial Analyst",
            skills: ["Financial Analysis", "Excel", "Financial Modeling", "Data Analysis", "Reporting"]
        }
    ]
};

// API configuration
const apiConfig = {
    baseUrl: "http://5000-irnn9aujbf05lux8s84wx-13f789e2.manus.computer/api",
    endpoints: {
        jobs: "/jobs",
        companies: "/companies",
        users: "/users",
        auth: "/auth",
        applications: "/applications"
    }
};

// Function to render job cards
function renderJobCards() {
    const jobsContainer = document.getElementById('featured-jobs');
    if (!jobsContainer) return;

    jobsContainer.innerHTML = '';
    
    data.featuredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow';
        jobCard.innerHTML = `
            <div class="flex items-start">
                <div class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4 text-gray-400 text-sm font-bold">
                    ${job.company.logo || job.company.name.substring(0, 2)}
                </div>
                <div class="flex-1">
                    <h3 class="font-semibold text-lg text-gray-800 mb-1">
                        <a href="jobs/${job.id}.html" class="hover:text-primary">
                            ${job.title}
                        </a>
                    </h3>
                    <p class="text-primary font-medium mb-2">
                        <a href="companies/${job.company.id}.html" class="hover:underline">
                            ${job.company.name}
                        </a>
                    </p>
                    <div class="flex flex-wrap text-sm text-gray-500 mb-3">
                        <span class="mr-3 flex items-center">
                            <i class="fas fa-map-marker-alt mr-1 text-gray-400"></i> ${job.location}
                        </span>
                        <span class="mr-3 flex items-center">
                            <i class="fas fa-briefcase mr-1 text-gray-400"></i> ${job.type}
                        </span>
                        <span class="flex items-center">
                            <i class="far fa-clock mr-1 text-gray-400"></i> ${job.experienceLevel}
                        </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${job.skills.slice(0, 3).map(skill => `
                            <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                ${skill}
                            </span>
                        `).join('')}
                        ${job.skills.length > 3 ? `
                            <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                +${job.skills.length - 3} more
                            </span>
                        ` : ''}
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700 font-medium">
                            ${job.salaryMin && job.salaryMax
                                ? `${job.salaryMin} - ${job.salaryMax} ${job.currency || 'AZN'}`
                                : 'Salary not specified'}
                        </span>
                        <span class="text-xs text-gray-500">
                            Posted ${job.postedDate || '2 days ago'}
                        </span>
                    </div>
                </div>
            </div>
        `;
        jobsContainer.appendChild(jobCard);
    });
}

// Function to render category cards
function renderCategoryCards() {
    const categoriesContainer = document.getElementById('job-categories');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = '';
    
    data.categories.forEach(category => {
        const categoryCard = document.createElement('a');
        categoryCard.href = `jobs.html?category=${category.name}`;
        categoryCard.className = 'block';
        categoryCard.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div class="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <i class="fas fa-briefcase text-2xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">${category.name}</h3>
                <p class="text-sm text-gray-500 mb-3">${category.description}</p>
                <span class="text-primary text-sm font-medium">
                    ${category.jobCount || 0} jobs available
                </span>
            </div>
        `;
        categoriesContainer.appendChild(categoryCard);
    });
}

// Function to render company cards
function renderCompanyCards() {
    const companiesContainer = document.getElementById('featured-companies');
    if (!companiesContainer) return;

    companiesContainer.innerHTML = '';
    
    data.companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.className = 'bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow';
        companyCard.innerHTML = `
            <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4 text-gray-400 text-sm font-bold">
                    ${company.logo || company.name.substring(0, 2)}
                </div>
                <div>
                    <h3 class="font-semibold text-lg text-gray-800">
                        <a href="companies/${company.id}.html" class="hover:text-primary">
                            ${company.name}
                        </a>
                    </h3>
                    <p class="text-gray-500 text-sm">${company.industry}</p>
                </div>
            </div>
            <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="fas fa-map-marker-alt mr-1 text-gray-400"></i>
                <span>${company.location}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="bg-[#E8F5E9] text-primary px-2 py-1 rounded-full text-xs">
                    ${company.jobCount || 0} open jobs
                </span>
                <a href="companies/${company.id}.html" class="text-primary text-sm font-medium hover:underline">
                    View Company
                </a>
            </div>
        `;
        companiesContainer.appendChild(companyCard);
    });
}

// Function to render job seeker cards
function renderJobSeekerCards() {
    const jobSeekersContainer = document.getElementById('featured-job-seekers');
    if (!jobSeekersContainer) return;

    jobSeekersContainer.innerHTML = '';
    
    data.jobSeekers.forEach(profile => {
        const jobSeekerCard = document.createElement('div');
        jobSeekerCard.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow';
        jobSeekerCard.innerHTML = `
            <div class="flex items-center">
                <div class="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center mr-3 text-primary">
                    <i class="fas fa-user"></i>
                </div>
                <div>
                    <h3 class="font-medium text-gray-800">
                        ${profile.user.firstName} ${profile.user.lastName}
                    </h3>
                    <p class="text-primary text-sm">${profile.title}</p>
                </div>
            </div>
            <div class="mt-3">
                <p class="text-sm text-gray-500 mb-2">
                    <i class="fas fa-map-marker-alt inline mr-1 text-gray-400"></i> ${profile.user.location}
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${profile.skills.slice(0, 3).map(skill => `
                        <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            ${skill}
                        </span>
                    `).join('')}
                    ${profile.skills.length > 3 ? `
                        <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +${profile.skills.length - 3} more
                        </span>
                    ` : ''}
                </div>
            </div>
        `;
        jobSeekersContainer.appendChild(jobSeekerCard);
    });
}

// Function to handle search form submission
function setupSearchForm() {
    const searchForm = document.getElementById('search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const keyword = this.elements.keyword.value;
        const location = this.elements.location.value;
        
        // In a real application, this would redirect to search results
        // For now, just log the search parameters
        console.log('Search:', { keyword, location });
        alert(`Searching for "${keyword}" in "${location || 'all locations'}"`);
        
        // Redirect to jobs page with search parameters
        window.location.href = `jobs.html?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render all dynamic content
    renderJobCards();
    renderCategoryCards();
    renderCompanyCards();
    renderJobSeekerCards();
    
    // Setup event handlers
    setupSearchForm();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// API functions for connecting to the backend
const api = {
    // Get all jobs
    getJobs: async function() {
        try {
            const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.jobs}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return [];
        }
    },
    
    // Get job by ID
    getJobById: async function(id) {
        try {
            const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.jobs}/${id}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching job ${id}:`, error);
            return null;
        }
    },
    
    // Get all companies
    getCompanies: async function() {
        try {
            const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.companies}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching companies:', error);
            return [];
        }
    },
    
    // User authentication
    login: async function(email, password) {
        try {
            const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.auth}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    },
    
    // Register new user
    register: async function(userData) {
        try {
            const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.auth}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
            return { success: false, message: 'Registration failed. Please try again.' };
        }
    }
};
