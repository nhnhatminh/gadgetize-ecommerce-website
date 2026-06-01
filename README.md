# Gadgetize Store

Gadgetize Store is a full-stack web application designed as an e-commerce platform connecting customers with high-quality electronic devices and technology components. The project utilizes a monorepo architecture containing a decoupled frontend framework and an independent server-side system to guarantee scalability and a clean separation of operational concerns.

## Architecture Overview

The system repository is organized into two primary technical directories:

- frontend: Developed using React and Vite, utilizing modern CSS configurations and vanilla semantic structures to deliver a responsive client interface.
- backend: Constructed with Node.js and Express, integrated with a PostgreSQL relational database management system to ensure robust data persistency.

## Core Systems and Features

### Frontend Specifications

- Configured a dynamic product catalog featuring an optimized 6-column grid structure tailored for ultra-wide desktop monitors.
- Integrated an advanced filtering sidebar enabling real-time client-side array sorting based on specific price boundaries, technical categories, and brand naming.
- Structured an interactive live search dropdown within the main navigation header equipped with absolute layering positions and event listeners to automatically close upon detecting actions outside the container boundary.

### Backend Specifications

- Maintained a high-performance database connection pool management module using the pg native driver wrapper.
- Established user authorization and secure login protocols through password hashing operations and secure JSON Web Tokens.
- Formulated an extensive relational database schema mapping categories, customizable product configurations, and standalone variation imagery assets.
- Implemented transactional order handling routines executing multi-table modifications to preserve atomic integrity across data changes.

## Repository Organization

The structure of the root directory is arranged as follows:

- backend/
- frontend/
- .gitignore

## Installation and Environment Setup

### Client Framework Configuration

Navigate into the dedicated client workspace and trigger the setup package installation:

cd frontend
npm install

Project Ownership
NGUYEN HUYNH NHAT MINH (nhnhatminh)
