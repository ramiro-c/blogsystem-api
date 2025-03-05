# Deploying to Render with Node

## Steps:

1. **Sign up for Render**
   - Create an account at [render.com](https://render.com/)
   - Verify your email address

2. **Connect Your Repository**
   - Go to the Render dashboard
   - Click "New" and select "Web Service"
   - Connect your GitHub/GitLab repository

3. **Configure Your Service**
   - Name: blog-api (or your preferred name)
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `node dist/index`
   - Set environment variables:
     - NODE_ENV: production
     - PORT: 10000 (Render will expose this internally)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the build and deployment to complete

5. **Verify Deployment**
   - Once deployed, Render will provide a URL
   - Test your API using the provided URL

## Procfile-Based Deployment

This project uses a Procfile (`api/Procfile`) to tell Render how to run your application:

```
web: node ./dist/index
```

The Procfile ensures that your application starts properly on Render's infrastructure.

### How Render Uses Your Procfile

1. After the build step completes successfully, Render looks for a Procfile
2. The command specified for the "web" process is used to start your application
3. Render automatically sets environment variables like PORT for your application

## Environment Variables

Make sure to set any required environment variables for your application:
- Database connection strings
- API keys
- JWT secrets
- Etc.

These can be configured in the Render dashboard under your service's "Environment" tab.

## Node vs. Bun

We're using Node instead of Bun for deployment because:
- Node is natively supported on Render
- It provides a more stable deployment environment
- No additional installation steps are required
- It's compatible with the Hono framework and other dependencies
