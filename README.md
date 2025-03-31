# BigInt Visualizer

This project is a desktop application built with TypeScript and Electron that visualizes BigInt numbers. It allows users to input numbers in both hexadecimal and decimal formats, see their two's complement representation, and switch the sign of the numbers.

## Features

- Input BigInt numbers in hexadecimal or decimal format.
- Display the equivalent value in the alternate format (hex or decimal).
- View two's complement interpretation of hexadecimal values.
- Switch the sign of a BigInt number using two's complement.
- User-friendly interface with horizontal scrolling for large values.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dallonby/bigint-calculator.git
   ```

2. Navigate to the project directory:
   ```
   cd bigint-calculator
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application in development mode, run:
```
npm start
```

### Building the Application

To build the application for production, run:
```
npm run build
```

## Usage

1. Open the application.
2. Input a BigInt number in either hexadecimal or decimal format.
3. The result will be displayed in three formats:
   - Decimal value
   - Hexadecimal value
   - Two's complement interpretation
4. Use the sign switch button to change the sign of the current number.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.