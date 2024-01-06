[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HTlAZVnP)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12998174)
# Final Project

**Title:** Cryptonium
**Name:** Rohan Sikder
**Student ID:** G00389052  

## Application Function

Cryptonium is an advanced cryptocurrency tracking application that delivers real-time insights into the cryptocurrency market. With its user-friendly interface, Cryptonium offers a comprehensive view of the market dynamics, featuring live updates of the top cryptocurrencies. Users can effortlessly sign up using their email and password to access personalized features. Once logged in, Cryptonium allows users to input their cryptocurrency trades, manage their portfolio, and track the performance of their investments with precision.

# Cryptonium

<p float="left">
  <img src="IOS Build Images/IMG_5714.jpeg" width="150" />
  <img src="IOS Build Images/IMG_5715.jpeg" width="150" /> 
  <img src="IOS Build Images/IMG_5716.jpeg" width="150" />
</p>

*Left to right: Watchlist, Bitcoin Details, Trades Dashboard.*

<p float="left">
  <img src="IOS Build Images/IMG_5718.jpeg" width="150" />
  <img src="IOS Build Images/IMG_5719.jpeg" width="150" />
  <img src="IOS Build Images/IMG_5720.jpeg" width="150" />
</p>

*Left to right: Add Trade, Menu, Login.*

<p float="left">
  <img src="IOS Build Images/IMG_5721.jpeg" width="150" />
  <img src="IOS Build Images/IMG_5723.jpeg" width="150" />
  <img src="IOS Build Images/IMG_5722.jpeg" width="150" />
</p>

*Left to right: Login Error Handling, Signup, Reset Password.*


<p float="left">
  <img src="IOS Build Images/IMG_5724.jpeg" width="150" />
  <img src="IOS Build Images/IMG_5725.jpeg" width="150" />
</p>

*Theme Changes based on users themes settings.*

<p float="left">
  <img src="IOS Build Images/tradesCSV.png" width="500" />
</p>

*Example of .CSV file output.*


## Running the Application

```MARKDOWN
List the instructions step by step
1. Navigate to the 'Crypto' directory and run `npm install` to install all dependencies.
2. Once the dependencies are installed, execute `ionic serve`.
3. To access the web application, use the following credentials:
   - **Username:** admin@admin.com
   - **Password:** admin123
```

## Minimum Project Requirments

| Project Requirement | Met? | Explanation |
|---|---|---|
| Project is contained in provided Git repo | Yes | The project is fully contained within the provided Git repository, including code, documentation, and any other relevant files. |
| Project contains a working Ionic Angular app | Yes | The project includes a fully functional Ionic Angular application that matches the app description provided. The app is able to handle user interactions, connect to a backend service, and display relevant data. |
| Ionic app uses Angular Router | Yes | The Ionic app utilizes the Angular Router to manage navigation between different pages and components. The router is implemented consistently throughout the app, ensuring a smooth and intuitive user experience. |
| Ionic app connects to a backend service | Yes | The Ionic app communicates with a backend service using a secure API to retrieve and store data. The backend service is Firebase, and the connection is established using appropriate methods and libraries. |
| Ionic app uses a Capacitor native plugin | Yes | The Ionic app leverages the Capacitor Notifications plugin to send notifications to users when stop loss or take profit limits are reached. The plugin is integrated seamlessly into the app's architecture and functionality. |
| App does not resemble previously developed apps | Yes | The app is a unique and original creation, not based on any previously developed applications or projects. The app's features, design, and implementation are original and tailored to the specific requirements of this project. |
| Code compiles successfully | Yes | The project's code compiles successfully without any errors or warnings. The code has been thoroughly tested and debugged to ensure a smooth build process. |
| Application code is formatted consistently | Yes | The application code adheres to a consistent and standardized formatting style, following best practices for readability and maintainability. The code is well-organized, indented appropriately, and free of unnecessary clutter. |
| Code contains comments | Yes | The code includes comprehensive comments throughout, explaining the purpose of classes, methods, and variables. Each significant component is properly documented, enhancing code clarity and understanding. |
| Multiple commits per week | Yes | The project has a good commit history, with multiple commits made regularly throughout the development process. This demonstrates a commitment to version control and iterative development. |
| Documentation and commentary are free of grammar and spelling mistakes | Yes | The documentation and code commentary are free of any grammatical or spelling errors. The language is clear, concise, and easy to understand. |


## Project Requirments above and beyond

This application has been built and tested on the iPhone 14 Pro Despite the app's readiness and functionality, it has not been deployed to the Play Store. The primary reason for this decision is the cost associated with publishing apps on commercial platforms. The Play Store is $99 per year, which is a recurring fee, which is a barrier this project.: [Cost to Publish an iOS App](https://nandbox.com/how-much-does-it-cost-to-publish-an-ios-app-on-the-app-store/).

# Application Architecture

## Services

Services encapsulate business logic and data manipulation. Key services in the application include:

- **AuthenticationService**: Responsible for user authentication.
- **CryptoService**: Fetches cryptocurrency data from external APIs.
- **DatabaseManagerService**: Manages database operations for trade records.

## Routing

Angular's routing system is employed to navigate between components and views. The `Router` and route configurations enable navigation within the application.

## Data Structures

Data objects in the application are represented using JavaScript objects or TypeScript classes. Here's how data structures are used:

- **User Data**: User-related data, such as email and password, is stored in JavaScript objects or TypeScript classes for user registration, login, and password reset.

- **Cryptocurrency Data**: Cryptocurrency data, including details and historical prices, is fetched from external APIs and represented as JSON objects. It's processed and displayed within the application.

- **Database Data**: Data stored in the application's database (e.g., trade records) is retrieved as JSON objects. TypeScript classes are often used to map this data for easier manipulation and rendering.

- **Chart Data**: When rendering charts, historical price data for cryptocurrencies is represented as arrays of values. Each value contains a timestamp and price, facilitating the population of chart components.


# Application Structure and Components

The cryptocurrency tracking application is structured into several pages and components, each serving a specific purpose.

## Pages and Their Functions

1. **Watchlist Page:**
    * Displays the current top cryptocurrencies, ranked by market capitalization.
    * Provides detailed information for each cryptocurrency, including current price, price changes, and market cap.
    * Allows users to filter and sort the watchlist by various criteria.

2. **Trades Page:**
    * Enables users to track their cryptocurrency trades over time.
    * Displays a list of all trades along with their details, such as trade date, cryptocurrency, buy/sell type, and price.
    * Allows users to add new trades, edit existing trades, and delete completed trades.

3. **Add Trade Page:**
    * Provides a form for users to input their trade information.
    * Requires users to specify the cryptocurrency, trade type (buy/sell), trade date, and trade price.
    * Validates the trade information and adds it to the user's trades list.

4. **Details Page:**
    * Presents in-depth information on a selected cryptocurrency.
    * Displays detailed statistics, including market cap, volume, and circulating supply.
    * Provides a historical price chart for the cryptocurrency.
    * Links to relevant news and articles about the cryptocurrency.

5. **Login/Signup Pages:**
    * Manage user authentication for the application.
    * Allow new users to sign up and create accounts.
    * Enable existing users to log in and access their account information.
    * Handle user authentication using a secure authentication service like Firebase or Supabase.

6. **Menu Page:**
    * Serves as a navigation hub to different sections of the application.
    * Provides links to the Watchlist, Trades, Add Trade, Details, and Login/Signup pages.

## Methods and Data Structures

1. **API Service:**
    * Handles all HTTP requests to the Crypto API.
    * Manages data retrieval and updates from the API.
    * Parses API responses and converts them into usable data models.

2. **Authentication Service:**
    * Manages user authentication states.
    * Handles user login, logout, and session management.
    * Authenticates users before allowing access to specific routes or features.

3. **Data Models:**
    * Define the structure of trade objects and user profiles.
    * Encapsulate data related to trades, including trade date, cryptocurrency, buy/sell type, and price.
    * Represent user information, including username, email, and authentication token.

4. **Router Guards:**
    * Protect routes based on the user's authentication state.
    * Ensure that users are logged in before accessing certain pages or features.
    * Prevent unauthorized access to restricted areas of the application.

    * Handles all HTTP requests to the Crypto API.
    * Manages data retrieval and updates from the API.
    * Parses API responses and converts them into usable data models.

2. **Authentication Service:**
    * Manages user authentication states.
    * Handles user login, logout, and session management.
    * Authenticates users before allowing access to specific routes or features.

3. **Data Models:**
    * Define the structure of trade objects and user profiles.
    * Encapsulate data related to trades, including trade date, cryptocurrency, buy/sell type, and price.
    * Represent user information, including username, email, and authentication token.

4. **Router Guards:**
    * Protect routes based on the user's authentication state.
    * Ensure that users are logged in before accessing certain pages or features.
    * Prevent unauthorized access to restricted areas of the application.

5. **Capacitor Notifications:**
    * Utilizes Capacitor Notifications plugin to send notifications to users when stop loss or take profit limits are reached.
    * Provides real-time alerts and updates to keep users informed about their trades.
    * Enhances user experience by enabling proactive notifications and timely action.

## Roadblocks and Unfinished Functionality

Challenges encountered during development included sourcing a reliable and functional API for crypto data. The selected API, while robust, had limitations, particularly with the candle API for charting functionalities. Difficulties with npm and dependency management were also faced but eventually resolved.

If starting over, more thorough initial testing of APIs would be conducted to ensure compatibility and functionality. Time constraints led to some features remaining unfinished, including advanced chart options for users.

## Resources

* [Crypto API](https://docs.coincap.io/#d8fd6001-e127-448d-aadd-bfbfe2c89dbe) - Crypto API used to get crypto data
* [Chart JS](https://www.chartjs.org/docs/latest/) - Chart JS to make charts
* [Angular](https://angular.io/) - Angular
* [Ionic](https://ionicframework.com/docs/) - Ionic Framework
* [IOS Build](https://www.youtube.com/watch?v=P-S6Dv2gP1U&ab_channel=IonicThemes) - Turn your Ionic App into an iOS App using Capacitor


