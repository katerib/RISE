// team data element, would update with actual info if we want to keep this page
const teamData = {
    leadership: [
        {
            name: "Project Mentor",
            role: "Project Mentor",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/"
            }
        },
        {
            name: "Project Lead",
            role: "Project Lead",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/"
            }
        }
    ],
    software: [
        {
            name: "Jameny_",
            role: "Team Lead, Placeholder Role",
            photo: "",
            links: {
                github: "https://github.com/",
                portfolio: "https://website.dev"
            }
        },
        {
            name: "loaf",
            role: "Placeholder Role",
            photo: "",
            links: {
                github: "https://github.com/",
                linkedin: "https://linkedin.com/in/"
            }
        },
        {
            name: "Kat",
            role: "Placeholder Role",
            photo: "",
            links: {
                github: "https://github.com/katerib?tab=repositories",
            }
        },
        {
            name: "user1459",
            role: "Computer Vision Engineer",
            photo: "",
            links: {
                github: "https://github.com/anonuser",
            }
        },
        {
            name: "github.username",
            role: "Computer Science B.S., Systems Engineering M.S.",
            photo: "",
            links: {
            }
        }
    ],
    mechanical: [
        {
            name: "John Doe",
            role: "Team Lead, Mechanical Engineering B.S.",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/john.doe"
            }
        },
        {
            name: "Jane",
            role: "Thermal Systems Engineer",
            photo: "",
            links: {
            }
        },
        {
            name: "another.user",
            role: "Aerospace Engineering M.S.",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/user.name"
            }
        },
        {
            name: "Jane Doe", 
            role: "Materials Science B.S.",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/jane.doe"
            }
        },
        {
            name: "John D.",
            role: "Structural Engineer",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/john-doe"
            }
        },
        {
            name: "john.doe",
            role: "Manufacturing Engineering Student",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/john.doe"
            }
        }
    ],
    avionics: [
        {
            name: "John Doe",
            role: "Team Lead, Electrical Engineering B.S., Avionics M.S.",
            photo: "",
            links: {
                linkedin: "https://linkedin.com/in/johndoe",
            }
        },
        {
            name: "discord.username",
            role: "Avionics Student",
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
    
    // check if team lead
    const isTeamLead = member.role.toLowerCase().includes('team lead');
    const cleanRole = member.role.replace(/^Team Lead,?\s*/i, '').trim();
    
    // split multiple roles by comma ; display on separate lines
    const roles = cleanRole.split(',').map(role => role.trim()).filter(role => role.length > 0);
    const roleLines = roles.map(role => `<div class="role-line">${role}</div>`).join('');
    
    // if team lead, add badge
    const teamLeadBadge = isTeamLead ? 
        '<span class="badge team-lead-badge fw-bold mb-2">TEAM LEAD</span>' : '';
    
    let linksHtml = '';
    if (member.links) {
        const linkButtons = [];
        if (member.links.github) {
            linkButtons.push(`<a href="${member.links.github}" target="_blank" class="btn btn-sm btn-outline-secondary">GitHub</a>`);
        }
        if (member.links.linkedin) {
            linkButtons.push(`<a href="${member.links.linkedin}" target="_blank" class="btn btn-sm btn-outline-secondary">LinkedIn</a>`);
        }
        if (member.links.portfolio) {
            linkButtons.push(`<a href="${member.links.portfolio}" target="_blank" class="btn btn-sm btn-outline-secondary">Portfolio</a>`);
        }
        linksHtml = `<div class="d-flex justify-content-center gap-1 flex-wrap mt-3">${linkButtons.join('')}</div>`;
    }
    
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 team-card">
                <div class="card-body text-center">
                    <div class="team-member-avatar bg-gradient-${teamColor} d-flex align-items-center justify-content-center">
                        ${avatarContent}
                    </div>
                    <h5 class="card-title">${member.name}</h5>
                    ${teamLeadBadge}
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