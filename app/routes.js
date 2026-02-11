//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Middleware to check if user is logged in
router.use((req, res, next) => {
    const publicPaths = ['/sign-in', '/', '/index.html', '/style-guide'];
    if (!req.session.data['userEmail'] && !publicPaths.includes(req.path) && !req.path.startsWith('/public')) {
        // For now, let's just allow access to everything to make testing easier, 
        // but in a real scenario we'd redirect.
        res.redirect('/sign-in');
        // next();
    } else {
        next();
    }
});

router.post('/sign-in', (req, res) => {
    const email = req.body.email;
    if (!email || !email.includes('gov.uk')) {
        res.render('sign-in', {
            errors: {
                email: {
                    text: "Enter a government email address"
                }
            },
            data: req.body
        });
    } else {
        req.session.data['userEmail'] = email;
        req.session.data['serviceName'] = req.session.data['serviceName'] || 'Department for Example Service';
        res.redirect('/dashboard');
    }
});

// Helper to add audit log
function addAuditLog(req, action) {
    if (!req.session.data['auditLog']) {
        req.session.data['auditLog'] = [];
    }
    const date = new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    req.session.data['auditLog'].push({
        action: action,
        actor: req.session.data['userEmail'],
        date: date
    });
}

// Team Management Logic

router.get('/team/index', (req, res) => {
    // Seed team members if empty
    if (!req.session.data['teamMembers']) {
        req.session.data['teamMembers'] = [
            { email: req.session.data['userEmail'], role: 'Administrator', you: true }
        ];
    }
    res.render('team/index');
});

router.post('/team/invite', (req, res) => {
    const email = req.body.email;
    const role = req.body.role;
    // Simple validation
    if (email && role) {
        if (!req.session.data['teamMembers']) {
            req.session.data['teamMembers'] = [];
        }
        req.session.data['teamMembers'].push({ email, role, you: false });
        addAuditLog(req, `Invited team member ${email} as ${role}`);
    }
    res.redirect('/team/index');
});

router.get('/team/remove/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (req.session.data['teamMembers'] && req.session.data['teamMembers'][index] && !req.session.data['teamMembers'][index].you) {
        const removedEmail = req.session.data['teamMembers'][index].email;
        req.session.data['teamMembers'].splice(index, 1);
        addAuditLog(req, `Removed team member ${removedEmail}`);
    }
    res.redirect('/team/index');
});

// Intercept config updates to log them
router.post('/service-setup/task-list', (req, res) => {
    if (req.body.clientName) {
        addAuditLog(req, "Updated service name");
    } else if (req.body.publicKeyType) {
        addAuditLog(req, "Updated authentication settings");
    } else if (req.body.redirectUrls) {
        addAuditLog(req, "Updated redirect URLs");
    } else if (req.body.selectedScopes) {
        addAuditLog(req, "Updated scopes");
    }
    res.render('service-setup/task-list');
});

router.get('/dashboard', (req, res) => {
    if (!req.session.data['userEmail']) {
        res.redirect('/sign-in');
    } else {
        res.render('dashboard');
    }
});
