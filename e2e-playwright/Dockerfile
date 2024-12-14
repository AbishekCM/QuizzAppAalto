FROM mcr.microsoft.com/playwright:v1.47.1-focal

# Set the working directory
WORKDIR /e2e-playwright

# Copy package files first to leverage Docker caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

CMD [ "npx", "playwright", "test", "--reporter=list" ]