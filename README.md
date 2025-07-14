# RISE Project Website

Static website for RISE (Recharge Infrastructure for Surface Exploration): autonomous charging infrastructure for Mars drone operations.

## Tech Stack

- HTML
- CSS
- Bootstrap
- JavaScript
- GitHub Pages deployment

## Local Development

Test locally using Python's built-in server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
Alternatively, use any local server setup like XAMPP, WAMP, or a live-server extension in VSCode or JetBrains IDEs.

## Key Features

- Earth/Mars dual theme toggle
- Team member management
- Contact form with FormSubmit integration
- Background animations

## Customization

### Team Data
Update team members in `assets/js/team.js`:
- Modify the `teamData` object with names, roles, and links in their specific team: Leadership, Avionics, Mechanical, Software
- Add photos (need to work on solution, possibly imgur)
- Team leads are automatically detected by "Team Lead" in the role field

### Navigation Links
Update navbar links in each HTML file when adding new pages:
- `index.html` - main page navbar
- `pages/team.html` - team page navbar  
- `pages/join.html` - join page navbar
- `pages/contact.html` - contact page navbar

### Contact Form
Update the email in `pages/contact.html`:
```html
<form action="https://formsubmit.co/your-email@domain.com" method="POST">
```

## Project Structure

```
├── index.html              # Main homepage
├── pages/
│   ├── team.html           # Team showcase
│   ├── join.html           # Join us page
│   ├── contact.html        # Contact form
│   └── thank-you.html      # Form success page
├── assets/
│   ├── css/style.css       # Main stylesheet
│   ├── js/
│   │   ├── team.js         # Team data and rendering
│   │   ├── theme-toggle.js # Earth/Mars theme system
│   │   └── space-tech.js   # Background animations
│   └── images/             # SVGs and assets
└── README.md
```

## Deployment

Deployed on GitHub Pages. The site automatically updates when changes are pushed to the `deploy` branch.