# Use a base image for the development container
FROM mcr.microsoft.com/vscode/devcontainers/base:debian-12

# Install necessary dependencies for the development container
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev \
    pkg-config \
    libgtk-3-dev \
    libwebkit2gtk-4.0-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

# Add pnpm global bin directory to PATH
ENV PATH="/home/vscode/.local/share/pnpm:${PATH}"

# Install storybook globally
RUN pnpm add @storybook/cli

# Install Rust as root (into /root/.cargo)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Copy the Cargo installation to the vscode user's home directory
RUN mkdir -p /home/vscode && \
    cp -r /root/.cargo /home/vscode/ && \
    chown -R vscode:vscode /home/vscode/.cargo

# Update PATH so that cargo binaries are available for the vscode user
ENV PATH="/home/vscode/.cargo/bin:${PATH}"

# Switch to vscode user to set the default rust toolchain
USER vscode
RUN rustup default stable

# Switch back to root if needed for subsequent commands
USER root


