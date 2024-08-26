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


    ```bash
    show dbs
    ```

    ```bash
    use yourDatabaseName
    ```

    ```bash
    show collections
    ```

    ```bash
    db.requestResponses.find().pretty()
    ```



## CI/CD pipeline 
    
    Currently you app will run a ci/cd piplein using github actions ,this is currently a simply pipeline 
    that only builds the application and ensures all tests are passing it can be extended to deploy and also set up env veraibles securly.

    The workflow can be found in `/.guthub/node.js.yml`
    The workflow does currently run and this can be found :
    https://github.com/NeeleshRambally/merlynn-up-to-tom-api/actions
 

    

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
1. More unit tests to get better code coverage 
2. Set up deployment environment on aws , azure or other platform to deploy and test the application