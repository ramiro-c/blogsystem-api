# Deploying to Render with Bun

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
   - Build Command: `curl -fsSL https://bun.sh/install | bash && export BUN_INSTALL="$HOME/.bun" && export PATH="$BUN_INSTALL/bin:$PATH" && cd api && bun install && bun run build`
   - Start Command: `cd api && ~/.bun/bin/bun run start`
   - Set environment variables:
     - NODE_ENV: production
     - PORT: 10000 (Render will expose this internally)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the build and deployment to complete

5. **Verify Deployment**
   - Once deployed, Render will provide a URL
   - Test your API using the provided URL

## Using render.yaml (Recommended)

If you've included the `render.yaml` file in your repository root:

1. Go to the Render dashboard
2. Click "New" and select "Blueprint"
3. Connect your repository
4. Render will automatically detect the configuration and deploy accordingly

## Environment Variables

Make sure to set any required environment variables for your application:
- Database connection strings
- API keys
- JWT secrets
- Etc.

These can be configured in the Render dashboard under your service's "Environment" tab.

## Important Notes About Using Bun on Render

- Render doesn't natively support Bun yet, which is why we install it in the build command
- The build process installs Bun in the environment before using it for building
- Make sure your codebase is compatible with Bun runtime
