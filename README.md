# Overview
This task involves transforming a MongoDB collection of restaurant brands to adhere to a standardized schema using Mongoose. Additionally, it requires extending the dataset with new seed data.

# 1. Data Transformation
The objective was to correct inconsistencies and errors in the provided MongoDB collection according to a given Mongoose schema.

## 1.1. Approach: 
Write TypeScript code inside `scripts/import.ts` for this specific purpose, by adding a JSON file inside the `/data` folder with the name `brands.json` which fixes the schema inconsistency issues (If any arise), and import it to the MongoDB datastore 
using Mongoose by transforming the data within the same documents and collection, ensuring validation against the schema during the transformation process.
Notes:
Extract data from fields with incorrect names or types.
Populate missing fields with default values specified in the schema.
2. Data Seeding
Objective: Extend the database by generating new brand documents with correct schema adherence.
Approach: Use a data library (e.g., Faker.js) to create test data for the new entries with different cases.
Documentation: Document the seed data cases in an Excel file to explain the differences between each case.
3. Export the Brands Collection
Objective: Export the transformed and extended Brands collection as a JSON file.
Technologies and Frameworks
Node.js with TypeScript
Mongoose library
Optionally, Nest.js
Evaluation Criteria
Accuracy of data transformation and adherence to the provided schema.
A logical and efficient approach to identifying and correcting data inconsistencies.
Quality and readability of the TypeScript code.
Completeness and clarity of the process documentation.
Code and Data Submission
Push the TypeScript code and support files to a public GitHub repository.
Include the modified brands.json file (exported from the MongoDB database) in the repository.
Attach the documentation Excel file to the repository.
Respond to the assessment task email with the GitHub repository link.
