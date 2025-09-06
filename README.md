# Prathamesh_Portfolio
bcf2a-e6ebf
This document provides a detailed, step-by-step guide on how to deploy a full-stack web application (React frontend, Express.js backend) on an AWS EC2 instance. This guide covers the entire process, from project preparation and server setup to process management, automation, and secure hosting with Nginx and SSL.

-----

## 1\. Project Preparation and Backend Refactoring

The first phase involved preparing the application for a production environment. This included ensuring a clean project structure and refactoring the Express.js backend to serve the compiled frontend assets.

### Project Structure

We started by confirming the project had a clear separation of concerns, with distinct directories for the client, server, and a combined build output.

```
Prathamesh_Portfolio/
├── client/          # React frontend source
├── server/          # Express backend source (TypeScript)
├── dist/            # Compiled backend + built frontend
│   ├── index.js     # Compiled Express server
│   └── public/      # Vite build output (index.html, assets)
└── package.json     # Project dependencies
```

### Server Refactoring (`server/index.ts`)

The Express server was refactored to be production-ready. The key changes were:

  - **Serving Static Files:** The server was configured to serve the static frontend files from the `dist/public` directory.
  - **SPA Fallback:** A catch-all route `app.get('*', ...)` was added to serve `index.html` for any route not found, which is crucial for handling React Router's client-side routing.
  - **Robust Logging:** Structured logging was implemented to track API requests, response status codes, and latency.
  - **Error Handling:** A robust error-handling middleware was added to prevent crashes and provide a consistent error response format.

**Code Snippet:**

```tsx
import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const distPath = path.resolve(__dirname, 'public');

// Serve static frontend files
if (!fs.existsSync(distPath)) {
  throw new Error(`❌ Build directory not found: ${distPath}`);
}

app.use(express.static(distPath));

// SPA fallback for React Router
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

const PORT = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
```

-----

## 2\. Building and Compiling the Application

Before deployment, the application's source code needed to be converted into production-ready files.

### Frontend Build

Using Vite, the React frontend was built into a static bundle.

1.  Navigate to the project root:
    ```bash
    cd Prathamesh_Portfolio
    ```
2.  Run the build command defined in `package.json`:
    ```bash
    npm run build
    ```

This command generated the `dist/public` directory, containing `index.html`, JavaScript, and CSS assets.

### Backend Compilation

The TypeScript backend was compiled into plain JavaScript.

1.  Install TypeScript globally on your machine:
    ```bash
    npm install -g typescript
    ```
2.  Compile the backend:
    ```bash
    tsc server/index.ts --outDir dist
    ```

This created the `dist/index.js` file, which is the executable Express server.

-----

## 3\. Deployment on EC2 with PM2

To ensure the backend server runs continuously and automatically, we used **PM2**, a process manager for Node.js.

### PM2 Setup

1.  Install PM2 globally on the EC2 instance:
    ```bash
    sudo npm install -g pm2
    ```
2.  Start the backend with PM2. Using a process name (`--name`) and setting the environment (`--env`) is a best practice.
    ```bash
    pm2 start dist/index.js --name portfolio-backend --env NODE_ENV=production
    ```
3.  Save the current process list to ensure it's reloaded on system reboot:
    ```bash
    pm2 save
    ```

### Auto-start on System Reboot

PM2 can be configured to automatically restart all managed applications after a server reboot.

1.  Generate the startup script:
    ```bash
    pm2 startup systemd
    ```
2.  The command above will output a specific `sudo` command (e.g., `sudo systemctl enable pm2-ubuntu`). Copy and run this command to enable the PM2 service.

-----

## 4\. Setting up Nginx for Secure Hosting

While PM2 runs the backend, Nginx was used as a **reverse proxy** and static file server for enhanced security and performance. It handles incoming web traffic and directs it to the appropriate service.

### Creating a Self-Signed SSL Certificate

For secure HTTPS traffic, a self-signed SSL certificate was generated.

1.  Run the `openssl` command.
    ```bash
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt
    ```
2.  When prompted, enter your server's public IP address or DNS name for the **Common Name (CN)** field.

### Nginx Configuration (`/etc/nginx/sites-available/portfolio`)

A new Nginx configuration file was created to serve the React application and act as a reverse proxy.

```nginx
# HTTP Block: Redirects all traffic to HTTPS
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;
    return 301 https://$host$request_uri;
}

# HTTPS Block: Serves files and handles API routing
server {
    listen 443 ssl;
    server_name YOUR_DOMAIN_OR_IP;

    ssl_certificate /etc/ssl/certs/selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/selfsigned.key;

    root /var/www/vhosts/frontend;
    index index.html;

    # Serve static files and handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy: Reverse proxy to the backend running on port 5000
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Final Nginx Steps

1.  Create a symlink to enable the configuration:
    ```bash
    sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
    ```
2.  Test the configuration for syntax errors:
    ```bash
    sudo nginx -t
    ```
3.  If the test is successful, reload Nginx to apply the changes:
    ```bash
    sudo systemctl reload nginx
    ```

-----

## 5\. Troubleshooting and Issue Resolution

During the deployment, a **500 Internal Server Error** was encountered. This was primarily due to incorrect Nginx configuration and file permissions.

### Error Analysis

  - **Symptom:** The user's browser showed a `500 Internal Server Error` when trying to access the site. The Nginx error log confirmed a file permission issue.
  - **Cause:** Nginx, running as the `www-data` user, did not have the necessary permissions to read the static files in the `/var/www/vhosts/frontend` directory.

### Solution

To resolve this, we granted the Nginx user (`www-data`) ownership of the static file directory.

1.  Change file ownership to the `www-data` user and group:
    ```bash
    sudo chown -R www-data:www-data /var/www/vhosts/frontend
    ```
2.  Set appropriate read, write, and execute permissions:
    ```bash
    sudo chmod -R 755 /var/www/vhosts/frontend
    ```

After applying these permissions and reloading Nginx, the website loaded successfully, confirming the issue was resolved.
