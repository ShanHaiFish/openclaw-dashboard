# 📦 Publishing to npm

This document describes how to publish `@openclaw/dashboard` to npm.

## Prerequisites

1. **npm account** — Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **2FA enabled** (recommended) — Enable in npm account settings
3. **Logged in** — Run `npm login` in the project root

```bash
npm login
# Enter your username, password, and email
# If 2FA enabled, enter the one-time password
```

## Pre-publish Checklist

```bash
# 1. Ensure you're on the latest main branch
git checkout main && git pull

# 2. Install dependencies fresh
rm -rf node_modules && npm install

# 3. Run tests
npm test

# 4. Build the frontend
npm run build

# 5. Lint check
npm run lint

# 6. Verify what will be published (dry run)
npm pack --dry-run
```

## Version Bumping

Follow [Semantic Versioning](https://semver.org/):

| Change | Version Bump | Example |
|--------|-------------|---------|
| Bug fix | Patch | `2.0.0` → `2.0.1` |
| New feature | Minor | `2.0.0` → `2.1.0` |
| Breaking change | Major | `2.0.0` → `3.0.0` |

```bash
# Bump version (updates package.json + creates git tag)
npm version patch  # or minor, or major

# Or specify exact version
npm version 2.1.0
```

## Publish Steps

### 1. Dry Run (Verify)

```bash
npm pack --dry-run
```

This shows exactly which files will be included. Verify that:
- ✅ `server/` directory is included
- ✅ `dist/` directory is included
- ✅ `src/plugins/` is included (for plugin system)
- ✅ No `node_modules/` or test files

### 2. Publish

```bash
# For scoped packages, --access public is required for the first publish
npm publish --access public

# For subsequent publishes (access is already set)
npm publish
```

### 3. Verify

```bash
# Check on npm
npm info @openclaw/dashboard

# Test installation in a temp directory
mkdir /tmp/test-install && cd /tmp/test-install
npm init -y && npm install @openclaw/dashboard
```

### 4. Tag & Push

```bash
# Push version tag to GitHub
git push origin main --tags
```

## Using the Publish Script

A convenience script is provided:

```bash
# Full publish (test + build + version bump + publish)
npm run publish:npm

# Dry run only
npm run publish:dry
```

## Troubleshooting

### `403 Forbidden` — You are not a member of the org

```bash
# Ensure you're logged in as the correct user
npm whoami

# For scoped packages, make sure access is set to public
npm publish --access public
```

### `402 Payment Required` — Package name is reserved

- npm reserves package names matching popular terms
- Try a scoped name: `@openclaw/dashboard`

### `EPERM` or permission errors

```bash
# Check npm config
npm config get registry
# Should be: https://registry.npmjs.org/
```

### Unpublishing (within 72 hours)

```bash
npm unpublish @openclaw/dashboard@2.0.0
```

> ⚠️ npm discourages unpublishing. Use `npm deprecate` instead if possible.

## Dist Tags

By default, `npm publish` tags as `latest`. For pre-releases:

```bash
# Publish beta
npm publish --tag beta --access public

# Publish next (RC)
npm publish --tag next --access public
```

## Automation (CI/CD)

For automated publishing via GitHub Actions, add these secrets:

- `NPM_TOKEN` — Your npm access token (create at npmjs.com → Access Tokens)

```yaml
# .github/workflows/release.yml (excerpt)
- name: Publish to npm
  run: npm publish --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Checklist Summary

- [ ] Tests pass (`npm test`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Version bumped (`npm version patch/minor/major`)
- [ ] `npm pack --dry-run` looks correct
- [ ] Published and verified
- [ ] Git tag pushed
