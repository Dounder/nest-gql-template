# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version 1.0.0 [2025-09-16]

> **Included Commits**: `git log --oneline 46e5640..HEAD`
> **Tag**: `v1.0.0`
> **Branch**: `main`
> **Commit**: `25463aa`

### Added

- GraphQL integration with Apollo Server and health check functionality (Commit: `4855d41`):
  - Apollo Server setup with GraphQL module
  - Health check resolver and service
  - Test error mutation for error handling
- Prisma integration with PostgreSQL (Commit: `4855d41`):
  - Prisma client and service setup
  - User model with id, email, name fields
  - Database migration for initial schema
- Custom exception handling for GraphQL (Commit: `25463aa`):
  - CustomException class extending GraphQLError
  - Global exception filter for HTTP and GraphQL errors
  - Enhanced error response structure with status, timestamp, and errors
- Environment configuration with validation (Commit: `4855d41`):
  - Joi schema validation for environment variables
  - Support for PostgreSQL and application settings
- Object manipulator helper utility (Commit: `4855d41`):
  - safeDelete method for type-safe property deletion
  - exclude method for creating clean objects without sensitive data
- Development tooling and configuration (Commit: `4855d41`):
  - Biome for linting and formatting
  - Jest for testing with e2e support
  - Commitlint for conventional commit messages
  - Lefthook for git hooks
  - Docker setup with compose files for development and production
  - TypeScript configuration with build and path mapping

### Changed

- None

### Removed

- None

### Fixed

- Enhanced error handling in GraphQL exceptions and improved response structure (Commit: `25463aa`)
