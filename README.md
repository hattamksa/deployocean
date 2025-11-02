# 🚀 Deploy to Server like DigitalOcean Droplet,contabo, ec2 aws, google compute etc (GitHub Actions + Docker)

This repository uses **GitHub Actions** to automatically build, push, and deploy the app to a **DigitalOcean Droplet** using Docker.

---

## ⚙️ Deployment Flow
1. **Push to `main` branch** → triggers workflow.  
2. **Build Docker image** and **push** to Docker Hub.  
3. **Retrieve environment file** (`.env.production`) from:
   - ✅ local repo  
   - ✅ separate private repo (via `git clone`)  
   - ✅ or **HashiCorp Vault** (using Vault CLI/API)  
4. **Copy `.env.production`** to the droplet.  
5. **SSH to server**, stop old container, and run the new one.  
6. **Verify container** and show logs.

---

## 🧩 Setup Requirements

### 1. DigitalOcean Droplet,contabo, ec2 aws, google compute etc 
- Docker installed.
- Deployment directory:
  ```bash
  sudo mkdir -p /var/www/digitalpathocean
  ```
- SSH access configured:  
  - The **private key** from GitHub Secrets (`DO_SSH_KEY`) must be paired with a **public key** on the server.  
  - Add your **public key** to:
    ```bash
    /home/<username>/.ssh/authorized_keys
    ```
  - Ensure correct permissions:
    ```bash
    chmod 700 /home/<username>/.ssh
    chmod 600 /home/<username>/.ssh/authorized_keys
    ```

### 2. GitHub Secrets
Add the following secrets under  
**Settings → Secrets and variables → Actions**:

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password or token |
| `DO_HOST` | Droplet IP |
| `DO_USERNAME` | SSH username (used for login) |
| `DO_SSH_KEY` | Private SSH key (paired with public key on the server) |
| *(optional)* `VAULT_ADDR` | HashiCorp Vault address |
| *(optional)* `VAULT_TOKEN` | Vault token with read access |

---

## 🔐 Environment File Options

You can manage `.env.production` in **three ways**:

### Option 1 — Local (default)
Keep `.env.production` in this repo (not recommended for public repos).

### Option 2 — Separate Private Repo
Add this step in your workflow before deployment:
```yaml
- name: Clone env repo
  run: |
    git clone https://github.com/your-org/env-files.git
    cp env-files/digitalpathocean/.env.production .env.production
```

### Option 3 — HashiCorp Vault
Use Vault CLI or API to fetch env vars dynamically.

---

## 🚀 Trigger Deployment

### Auto Deploy
Push to main branch:
```bash
git add .
git commit -m "update app"
git push origin main
```

### Manual Deploy
Go to **Actions → Deploy to Digital Ocean → Run workflow**.

---

## 🧾 Verify Deployment
SSH into your server:
```bash
ssh root@your_droplet_ip
docker ps
docker logs digitalpathocean --tail 20
```

---

## 🧠 Summary

| Step | Description |
|------|--------------|
| Build & Push | Docker image → Docker Hub |
| Fetch Env | from repo or Vault |
| Deploy | Pull new image & run container |
| Verify | Logs + HTTP health check |
| SSH Access | Uses `DO_SSH_KEY` private key + `DO_USERNAME` for authentication |
