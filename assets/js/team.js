// team data element, would update with actual info if we want to keep this page
const teamData = {
    software: [
        {
            name: "user.name",
            role: "Team Lead, Software Engineering M.S.",
            links: {
                github: "https://github.com/",
                portfolio: "https://website.dev"
            }
        },
        {
            name: "Jane D.",
            role: "Computer Science B.S.",
            links: {
                github: "https://github.com/janedoe",
                linkedin: "https://linkedin.com/in/janedoe"
            }
        },
        {
            name: "John Doe",
            role: "Software Developer, Computer Science M.S.",
            links: {
                github: "https://github.com/jondoe",
                linkedin: "https://linkedin.com/in/jondoe"
            }
        },
        {
            name: "user1459",
            role: "Computer Vision Engineer",
            links: {
                github: "https://github.com/anonuser",
            }
        },
        {
            name: "github.username",
            role: "Computer Science B.S., Systems Engineering M.S.",
            links: {
            }
        }
    ],
    mechanical: [
        {
            name: "John Doe",
            role: "Team Lead, Mechanical Engineering B.S.",
            links: {
                linkedin: "https://linkedin.com/in/john.doe"
            }
        },
        {
            name: "Jane",
            role: "Thermal Systems Engineer", 
            links: {
            }
        },
        {
            name: "another.user",
            role: "Aerospace Engineering M.S.",
            links: {
                linkedin: "https://linkedin.com/in/user.name"
            }
        },
        {
            name: "Jane Doe", 
            role: "Materials Science B.S.",
            links: {
                linkedin: "https://linkedin.com/in/jane.doe"
            }
        },
        {
            name: "John D.",
            role: "Structural Engineer",
            links: {
                linkedin: "https://linkedin.com/in/john-doe"
            }
        },
        {
            name: "john.doe",
            role: "Manufacturing Engineering Student",
            links: {
                linkedin: "https://linkedin.com/in/john.doe"
            }
        }
    ],
    avionics: [
        {
            name: "John Doe",
            role: "Team Lead, Electrical Engineering B.S., Avionics M.S.",
            links: {
                linkedin: "https://linkedin.com/in/johndoe",
            }
        },
        {
            name: "discord.username",
            role: "Avionics Student",
            links: {
            }
        }
    ]
};

function createMemberCard(member, teamColor) {
    // for pfp, take initials from name or first letters from username 
    let initials;
    if (member.name.includes('.')) {
        initials = member.name.split('.').map(n => n[0]).join('').toUpperCase();
    } else {
        initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    
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
                        <span class="text-white fw-bold fs-4">${initials}</span>
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