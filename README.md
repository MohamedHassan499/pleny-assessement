# Overview
This task involves transforming a MongoDB collection of restaurant brands to adhere to a standardized schema using Mongoose. Additionally, it requires extending the dataset with new seed data.

# 1. Data Transformation
The objective was to correct inconsistencies and errors in the provided MongoDB collection according to a given Mongoose schema.

## 1.1. Approach: 
Write TypeScript code inside `scripts/import.ts` for this specific purpose, by adding a JSON file inside the `/data` folder with the name `brands.json` which fixes the schema inconsistency issues (If any arise), and import it to the MongoDB datastore

### 1.1.1. **Dependencies**:
The script uses `Mongoose` for MongoDB interactions and `dotenv` for loading environment variables from a .env file.

### 1.1.2. **Data Source**:
The script loads brand information from a JSON file located at `/data/brands.json`.

### 1.1.3. **Schema**:
The brand's schema is defined in `/db/brands-schema.ts`. It is imported as `Brand` and used for data validation before insertion into the database.

### 1.1.4. **Utility Functions**:
The script imports utility functions `validName`, `validNumberOfLocations`, and `validYearFounded` from `/utils`. These functions are used for validating brand attributes.

### 1.1.5. **Validation Constants**:
The script defines constants `MIN_YEAR` and `MIN_LOCATIONS` for the minimum year founded and minimum number of locations specified respectively in the database schema.

### 1.1.6. **Processing Brands**:
The script iterates over each brand object loaded from the JSON file. It performs the following actions:

1. Filters out non-numeric values and sorts them to be added for `numberOfLocations` & `yearFounded` attributes.
2. Validates and clean brand name and headquarters, but If they don't exist, the brand is not considered to be valid and gets removed.
3. Validate the year found and the number of locations. If invalid, it assigns default values or picks the first numeric value from the sorted list.
4. Insertion into Database: Valid brands are collected in an array of `validBrands[]` and inserted into the MongoDB database using `Brand.insertMany()`.

### 1.1.7. **Error Handling**:
Errors are caught and logged to the console. If an error occurs, the script exits with a non-zero status code.

## 1.2. Additional Notes
1. Ensure that MongoDB is running and accessible at the provided connection string.
2. Make sure that the JSON file containing brand data is correctly formatted and located at ../data/brands.json.
3. The script assumes TypeScript compilation and requires Node.js with support for ES6 modules.

# 2. Data Seeding
The objective was to seed the correct brands provided MongoDB collection according to a given Mongoose schema and extract them as an Excel sheet.

## 2.1. Approach: 
Write TypeScript code inside `scripts/seed.ts` for this specific purpose, by utilizing `faker.js` for the values seeding creating around 10 different brands, and then adding them to the database and extracting them as an excel sheet inside the `/output` folder.

### 2.1.1. **Dependencies**:
The script uses `Mongoose` for MongoDB interactions and `dotenv` for loading environment variables from a .env file, `faker-js/faker` for generating dummy data, and `ExcelJS` for exporting data to an Excel file.

### 2.1.2 **Data Generation**: 
The script generates dummy brand data by iterating 10 times, creating a brand object with random attributes such as brand name, year founded, headquarters, and number of locations. These attributes are generated using faker.js functions.

### 2.1.3 **Data Insertion**:
The generated brand objects are stored in an array and inserted into the MongoDB database using Brand.insertMany().

### 2.1.4 **Excel Export**:
The script creates an Excel workbook and adds a worksheet named 'Brands'. Column headers and corresponding data are added to the worksheet. The brand data is exported to the Excel file using workbook.xlsx.writeFile().

### 2.1.5 **Error Handling**:
The script checks if the DATABASE_URL environment variable is set. If not, it throws an error. Errors during database connection, data insertion, or file writing are caught and logged.

## 2.2. Additional Notes
1. Ensure that MongoDB is running and accessible at the provided connection string.
2. The script generates random data for brand attributes. Modify the generation logic in the loop to suit specific requirements.
3. The Excel file will be created in the output directory as brands.xlsx.
4. The script assumes TypeScript compilation and requires Node.js with support for ES6 modules.
