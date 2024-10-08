# TOM API Integration

This project is a Next.js application that integrates with the TOM API 
(https://docs.up2tom.com/#introduction). It allows users to perform various operations such as fetching model metadata, querying models, uploading batch files, retrieving processed batches, and managing batch files.

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 18.x, 20.x, or 22.x)
- npm (comes with Node.js)
- Git
- Docker

### Installation Steps


1. **Clone the repository:**

    ```bash
    git clone https://github.com/NeeleshRambally/merlynn-up-to-tom-api.git
    cd tom-api-integration
    ```

2. **Start up mongo db locally using docker :**

    ```bash
    docker run --name my-liqui-mongo -p 27017:27017 -d mongo
    ```
3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    If not cloned Create a `.env.local` file in the root of your project and add the following:

    ```bash
    NEXT_PUBLIC_API_KEY=your_api_key_here
    NEXT_PUBLIC_BASE_URL=https://api.up2tom.com/v3
    ```

    Replace `your_api_key_here` with your actual API key.

5. **Run the application:**

    ```bash
    npm run dev
    ```

    This will start the application in development mode. Open your browser and go to [http://localhost:3000](http://localhost:3000).

6. **Run tests:**

    ```bash
    npm test
    ```

    This will run the unit tests tests. Ensure `.env.test` is cloned if not create the file in the root of your project and add teh following 

     ```bash
    NEXT_PUBLIC_API_KEY=9307bfd5fa011428ff198bb37547f979
    NEXT_PUBLIC_BASE_URL=https://api.up2tom.com/v3
    ```

7. **Build the application for production:**

    ```bash
    npm run build
    ```

    This will create an optimized production build of your application.


## Viewing db data

install mongosh

1. **Show databases:**

    ```bash
    show dbs
    ```

2. **Select db to be used:**

    ```bash
    use tom_db
    ```

3. **Show all collections in db:**

    ```bash
    show collections
    ```
4. **Select all from the db:**

    ```bash
    db.requestResponses.find().pretty()
    ```

This application provides the following functions:

- **Fetch Model Metadata:** Retrieves metadata for a specific model using the TOM API.
- **Query Model:** Submits input variables to a model and retrieves the decision data.
- **Fetch All Models:** Retrieves a list of all available models.
- **Upload Batch File:** Uploads a CSV file for batch processing through the TOM API.
- **List Batch Files and Running Jobs:** Retrieves a list of batch files and currently running jobs for a specific model.
- **Retrieve Processed Batch File:** Downloads a processed batch file.
- **Delete Batch File:** Deletes a specific batch file.
- **Persistence:** Saves all requests and responese for models to a mongoDb collection.

# CI/CD pipeline 

Currently you app will run a ci/cd piplein using github actions ,this is currently a simply pipeline 
that only builds the application and ensures all tests are passing it can be 
extended to deploy and also set up env veraibles securly.

The workflow can be found in `/.guthub/node.js.yml`
The workflow does currently run and this can be found :
https://github.com/NeeleshRambally/merlynn-up-to-tom-api/actions

## Docker Image

I have created a docker file for the application and this can also be used to
run the application locally using - this can also be used in the CI/CD pipeline 
to deploy the image to any set up environment

1. **Build Docker Image:**

    ```bash
    docker build --build-arg ENV_FILE=.env.local -t tom-image .
    ```

    In this case you pass in the local env file for running locally but can be environment 
    file for dev or prod environemtns too

2. **Start the app:**

    ```bash
    docker run -p 3000:3000 tom-image
    ```

    

## Security Considerations

When deploying this application, it is essential to consider the following security practices to protect sensitive data and maintain the integrity of the application:

### Environment Variables Security
- **Keep environment files out of version control:** Ensure that files like `.env` or `.env.local` are not committed to your version control system. Use `.gitignore` to exclude them. (These have been added to the current repository for ease of testing)
- **Use environment-specific configurations:** Separate your development, testing, and production configurations to avoid exposing sensitive information in the wrong environment.
- **Encrypt sensitive environment variables:** For production, consider using a secrets management service like AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault to manage your API keys and database connection strings securely.

### Database Security
- **Restrict database access:** Ensure that only necessary services and users have access to the database. Use network-level security measures like firewalls and VPNs to restrict access.
- **Use strong authentication and encryption:** Enforce strong password policies for database users and use SSL/TLS encryption for connections to your database.
- **Regularly update and patch your database:** Keep your database software up to date with the latest security patches to protect against vulnerabilities.

### API Key Security
- **Limit the scope of API keys:** Generate API keys with the minimum necessary permissions and rotate them regularly.
- **Monitor API key usage:** Implement monitoring and alerting for unusual API key usage patterns, which could indicate a security breach.
- **Use rate limiting:** Protect your API from abuse by implementing rate limiting to control the number of requests that can be made within a specific timeframe.


## Improvements 
Given the timelimit, there could be a few more improvements on the code base: 

1. **Enhanced Security Practices:**

- Environment Variables Management: Implement a more robust method of managing environment variables, such as using a secrets manager (e.g., AWS Secrets Manager, Azure Key Vault) instead of storing sensitive information like API keys in .env files.
- Data Encryption: Ensure that all sensitive data, both at rest and in transit, is encrypted. This includes API keys, database credentials, and any personal user data.
- Access Control: Implement role-based access control (RBAC) within the application to ensure that only authorized users have access to sensitive endpoints and data.

2. **Automated Testing and Continuous Integration:**
- Test Coverage: Increase test coverage by writing more unit tests, integration tests, and end-to-end tests. This will help catch bugs earlier in the development process. 
- CI/CD Pipeline Enhancements: Improve the CI/CD pipeline by adding stages for running security tests (e.g., SAST tools), performance tests, and deploying to staging environments before production.

3. **Performance Optimization:**
- Caching: Implement caching mechanisms where appropriate, such as caching responses from the API or database queries that are expensive or frequently accessed.
- Lazy Loading: Implement lazy loading for non-essential resources to speed up initial load times, especially for large datasets or images.
- API Rate Limiting: Add rate limiting to the API to prevent abuse and ensure fair usage across users.

4. **User Experience Improvements:**
- Responsive Design: Ensure that the application is fully responsive and works well on all device sizes, from mobile phones to large desktop screens.
- User Onboarding: Implement a user-friendly onboarding process with helpful tooltips and guides for first-time users.
- Accessibility: Improve the app’s accessibility by following WCAG (Web Content Accessibility Guidelines), making it usable for people with disabilities.

5. **Logging and Monitoring:**
- Enhanced Logging: Implement a more detailed logging mechanism that captures all critical events, including errors, warnings, and user actions, which can help in debugging and auditing.
- Real-time Monitoring: Set up real-time monitoring and alerting for the application using tools like Prometheus, Grafana, or New Relic. This can help in identifying and addressing issues before they affect users.

