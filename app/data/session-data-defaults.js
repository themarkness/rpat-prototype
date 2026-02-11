module.exports = {

  // Default values
  'serviceName': 'Department for Example Service (Integration)',
  'clientName': 'Department for Example Service (Integration)',
  'clientId': 'INTEG-883920',
  'publicKeyType': 'Public key URL (JWKS)',
  'redirectUrls': 'http://localhost:3000/auth/callback',
  'scopes': ['openid', 'email'],

  // Production values (mocked)
  'prod_serviceName': 'Department for Example Service',
  'prod_clientId': 'PROD-112233',
  'prod_publicKeyType': 'Public key URL (JWKS)',
  'prod_redirectUrls': 'https://service.gov.uk/auth/callback',
  'prod_scopes': ['openid', 'email', 'phone'],

  // Audit Log
  'auditLog': [
    { action: "Service created", actor: "admin@gov.uk", date: "10 Feb 2026, 10:00am" },
    { action: "Production access requested", actor: "admin@gov.uk", date: "10 Feb 2026, 11:30am" }
  ]

}
