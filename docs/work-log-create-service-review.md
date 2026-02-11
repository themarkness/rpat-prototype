# Request vs Implementation Log

## User Request
1. Review project context in `ai-context.md`.
2. Add GOV.UK One Login technical documentation to project knowledge.
3. Review `create-service` pages against GOV.UK design best practices and the added technical documentation.

## Actions Taken

### 1. Project Context & Documentation
*   Read and confirmed understanding of `ai-context.md`.
*   Cloned `govuk-one-login/tech-docs` into `docs/govuk-one-login-tech-docs/`.
*   Updated `ai-context.md` to include a reference to the local technical documentation.

### 2. Page Reviews & Updates (`app/views/create-service/`)

#### `start-page.html`
*   **Update:** Aligned content with the specific task of registering a service with GOV.UK One Login.
*   **Detail:** Added specific prerequisites (government email, mobile phone) found in the tech docs.

#### `enter-client-name.html`
*   **Fix:** Removed invalid `<p>` tag nesting around `govukInput`.
*   **Update:** Changed label to a question ("What is the name of your service?") and added a hint about user visibility.

#### `select-key-type.html` ('Authentication method')
*   **Fix:** Removed invalid `<p>` tag nesting around `govukRadios`.
*   **Update:** Renamed options to match technical concepts:
    *   `JWKS URL` -> "Public key URL (JWKS)"
    *   `Static Key` -> "Fixed public key"
    *   `Client Secret` -> "Client secret"
*   **Detail:** Added hints explaining which Auth method (`private_key_jwt` vs `client_secret_post`) applies to each option. Updated option values to be human-readable for the check answers page.

#### `redirect-urls.html`
*   **Update:** Simplified label to "Redirect URLs".
*   **Detail:** Updated hint to request comma-separated URLs, complying with standard patterns.

#### `select-scopes.html`
*   **Fix:** Removed invalid `<p>` tag nesting around `govukCheckboxes`.
*   **Update:** Aligned scopes with OpenID Connect standards.
    *   `openid`: Now checked and disabled (mandatory).
    *   Removed `Wallet subject ID` (not a standard scope for this context).
    *   Kept `email` and `phone`.

#### `confirm.html` ('Check your answers')
*   **Refactor:** Replaced raw HTML `dl/div` structure with the `govukSummaryList` macro.
*   **Update:** Implemented dynamic Nunjucks logic to show only relevant rows (e.g., showing 'Client secret' row only if that method was chosen).
*   **UX:** Grouped buttons. Made "Create service" the primary action and moved configuration options to secondary buttons.
