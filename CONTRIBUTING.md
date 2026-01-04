# Contributing to Axenora AI

We're excited that you're interested in contributing to Axenora AI! Here are the guidelines we'd like you to follow:

## 📋 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🎯 How Can I Contribute?

### Reporting Bugs

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/axenora/axenora-ai/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/axenora/axenora-ai/issues/new). Be sure to include:
  - A clear, descriptive title
  - A description of the issue
  - Steps to reproduce the issue
  - Expected vs. actual behavior
  - Screenshots if applicable
  - Your environment (browser, OS, etc.)

### Suggesting Enhancements

- Use GitHub Issues to submit enhancement suggestions.
- Clearly describe the enhancement and why you believe it would be beneficial.
- Include any relevant screenshots or mockups.

### Your First Code Contribution

1. **Fork** the repository on GitHub.
2. **Clone** the project to your own machine.
3. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b bugfix/annoying-bug
   ```
4. **Commit** your changes with a clear commit message.
5. **Push** your work to your fork.
6. **Open a Pull Request** to the main repository.

## 🛠 Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example` and update the environment variables.

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

Before submitting a pull request, please ensure:

1. All tests pass:
   ```bash
   npm test
   ```
2. The code is properly formatted:
   ```bash
   npm run format
   ```
3. There are no TypeScript errors:
   ```bash
   npm run type-check
   ```
4. There are no linting errors:
   ```bash
   npm run lint
   ```

## 📝 Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any example files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## 📜 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
