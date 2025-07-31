// team data element, would update with actual info if we want to keep this page
const teamData = {
    leadership: [
        {
            name: "Anthony",
            role: "Mentor, Aerospace Engineer",
            photo: "",
            links: {
            }
        },
        {
            name: "Ricky Jones",
            role: "Project Lead, Mechanical/Nuclear/Aerospace Engineering BS, Maintenance Intern, Undergraduate Research Intern",
            photo: "../assets/images/team/Ricky.png",
            links: {
                github: "https://github.com/DucksIncoming/",
                linkedin: "https://www.linkedin.com/in/rickyljones/",
                portfolio: "https://ricky-jones.com/"
            }
        }
    ],
    software: [
        {
            name: "Jenny R.",
            role: "Team Lead, Computer Science BS",
            photo: "../assets/images/team/JennyR.jpg",
            links: {
                github: "https://github.com/JLR6",
                linkedin: "https://www.linkedin.com/in/j-reed-9a5a30229/"
            }
        },
        {
            name: "Abdullah Zubair",
            role: "Honours BSc in Computer Science",
            photo: "../assets/images/team/AbdullahZ.jpeg",
            links: {
                github: "https://github.com/zahinabrer5",
                linkedin: "https://linkedin.com/in/zahinabrer"
            }
        },
        {
            name: "Kat B.",
            role: "Software Engineer, Computer Science BS/MS",
            photo: "../assets/images/team/Kat.png",
            links: {
                linkedin: "https://www.linkedin.com/in/kateribb/",
                github: "https://github.com/katerib?tab=repositories"
            }
        },
        {
            name: "Michael K.",
            role: "Computer Science BS",
            photo: "",
            links: {
            }
        },
    ],
    mechanical: [
        {
            name: "Mechanical Team Lead",
            role: "Team Lead",
            photo: "",
            links: {
            }
        },
        {
            name: "Katelyn Wong",
            role: "Mechanical Engineering BS, Mechanical Engineering Intern",
            photo: "../assets/images/team/KatelynW.jpg",
            links: {
                linkedin: "https://www.linkedin.com/in/katelynkywong/"
            }
        },
        {
            name: "Abdullah Shariff",
            role: "",
            photo: "../assets/images/team/AbdullahS.jpeg",
            links: {
                linkedin: "http://linkedin.com/in/abdullah-shariff"
            }
        },
        {
            name: "Arujith", 
            role: "Aerospace Engineering BS",
            photo: "../assets/images/team/Arujith.jpg",
            links: {
                linkedin: "https://www.linkedin.com/in/arujith-shimhan-ramasubramanian-8b7031173/"
            }
        },
        {
            name: "Ezza S.A.",
            role: "Aerospace Engineering BS",
            photo: "",
            links: {
            }
        }
    ],
    avionics: [
        {
            name: "Avionics Team Lead",
            role: "Team Lead",
            photo: "",
            links: {
            }
        }
    ]
};

function createMemberCard(member, teamColor) {
    // single letter initial logic
    let initial;
    if (member.name.includes('.')) {
        initial = member.name.split('.')[0][0].toUpperCase();
    } else {
        initial = member.name.split(' ')[0][0].toUpperCase();
    }
    
    // photo support with fallback to single letter
    const avatarContent = member.photo ? 
        `<img src="${member.photo}" alt="${member.name}" class="team-photo">` :
        `<span class="text-white fw-bold fs-4">${initial}</span>`;
    
    // check for leadership roles
    const isTeamLead = member.role.toLowerCase().includes('team lead');
    const isProjectMentor = member.role.toLowerCase().includes('mentor');
    const isProjectLead = member.role.toLowerCase().includes('project lead');
    
    let cleanRole = member.role;
    if (isTeamLead) cleanRole = cleanRole.replace(/^Team Lead,?\s*/i, '').trim();
    if (isProjectMentor) cleanRole = cleanRole.replace(/^Mentor,?\s*/i, '').trim();
    if (isProjectLead) cleanRole = cleanRole.replace(/^Project Lead,?\s*/i, '').trim();
    
    // split multiple roles by comma ; display on separate lines
    const roles = cleanRole.split(',').map(role => role.trim()).filter(role => role.length > 0);
    const roleLines = roles.map(role => `<div class="role-line">${role}</div>`).join('');
    
    // add leadership badges
    let leadershipBadge = '';
    if (isTeamLead) {
        leadershipBadge = '<span class="badge team-lead-badge fw-bold mb-2">TEAM LEAD</span>';
    } else if (isProjectMentor) {
        leadershipBadge = '<span class="badge team-lead-badge fw-bold mb-2">MENTOR</span>';
    } else if (isProjectLead) {
        leadershipBadge = '<span class="badge team-lead-badge fw-bold mb-2">PROJECT LEAD</span>';
    }
    
    let linksHtml = '';
    if (member.links) {
        const linkButtons = [];
        if (member.links.github) {
            linkButtons.push(`<a href="${member.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary">GitHub</a>`);
        }
        if (member.links.linkedin) {
            linkButtons.push(`<a href="${member.links.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary">LinkedIn</a>`);
        }
        if (member.links.portfolio) {
            linkButtons.push(`<a href="${member.links.portfolio}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary">Portfolio</a>`);
        }
        linksHtml = `<div class="d-flex justify-content-center gap-1 flex-wrap mt-3">${linkButtons.join('')}</div>`;
    }
    
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 team-card">
                <div class="card-body text-center">
                    <div class="team-member-avatar bg-gradient-primary d-flex align-items-center justify-content-center">
                        ${avatarContent}
                    </div>
                    <h5 class="card-title">${member.name}</h5>
                    ${leadershipBadge}
                    <div class="card-subtitle mb-3">${roleLines}</div>
                    ${linksHtml}
                </div>
            </div>
        </div>
    `;
}

function renderTeam() {
    const teams = {
        leadership: { container: 'leadership-team', color: 'info' },
        software: { container: 'software-team', color: 'primary' },
        mechanical: { container: 'mechanical-team', color: 'success' },
        avionics: { container: 'avionics-team', color: 'warning' }
    };

    Object.keys(teams).forEach(teamKey => {
        const container = document.getElementById(teams[teamKey].container);
        const members = teamData[teamKey];
        
        container.innerHTML = '';
        members.forEach(member => {
            container.innerHTML += createMemberCard(member, teams[teamKey].color);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderTeam();
});