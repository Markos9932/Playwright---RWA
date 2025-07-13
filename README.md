# PW Real-World App

Automated end-to-end tests for a real-world web application using [Playwright](https://playwright.dev/) and TypeScript.

---

## 📦 Project Structure
 ├── .gitignore ├── package.json ├── playwright.config.ts ├── tsconfig.json ├── pages/ # Page Object Model classes ├── setup/ # Playwright test extension (BaseTest) ├── test-data/ # Test data (users, home, bank-account, ...) ├── tests/ │ └── sequence/ # Test suites organized by execution order ├── utils/ │ └── helpers/ # Helper classes and functions └── playwright-report/ # Automatically generated test reports

---

## 🚀 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Markos9932/https://github.com/Markos9932/Playwright---RWA.git
   cd <your-repo>
   npm install
   npx playwright install
   npx playwright test

   🧩 Key Features
Page Object Model: Each page has its own class in pages/.
Test Data Separation: All test data is stored in test-data/.
Sequential Test Suites: Tests are organized in tests/sequence/ with numeric prefixes for execution order.
Reusable Helpers: Common actions and assertions are centralized in utils/helpers/Commands.ts.
Playwright Extension: setup/BaseTest.ts provides dependency injection for all page objects in tests.

⚙️ Configuration
Playwright config: See playwright.config.ts for base URL, browser settings, and reporters.
TypeScript config: See tsconfig.json for TypeScript options.
📝 How to Add a New Test
Create a new file in tests/sequence/ (e.g. sequence-008_newfeature.spec.ts).
Import required page objects and test data.
Write your test using Playwright syntax and helper methods.

💡 Recommendations
Use numeric prefixes for test files to control execution order.
Run tests in a clean environment (headless mode recommended).
Integrate Playwright HTML reporter for CI/CD pipelines.

👤 Author
Marko Vojinovic


