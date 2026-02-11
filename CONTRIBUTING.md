# Contributing to Image Downloader Pro

First off, thank you for considering contributing to Image Downloader Pro! It's people like you that make this tool better for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**:
  - Chrome version
  - Extension version
  - Operating System
  - Website URL (if applicable)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use Case**: Why is this enhancement needed?
- **Proposed Solution**: How should it work?
- **Alternatives Considered**: What other solutions did you consider?
- **Additional Context**: Screenshots, mockups, or examples

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Test thoroughly** - make sure existing features still work
4. **Update documentation** if you changed functionality
5. **Write clear commit messages**
6. **Submit your pull request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/image-downloader-pro.git
cd image-downloader-pro

# Create a branch
git checkout -b feature/your-feature-name

# Make changes and test
# Load the extension in Chrome (chrome://extensions/)

# Commit your changes
git add .
git commit -m "Add: your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

## Code Style Guidelines

- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small
- Follow existing code formatting
- Test edge cases

## Testing Checklist

Before submitting a PR, test:
- [ ] Extension loads without errors
- [ ] Image scanning works on various websites
- [ ] Both download methods work
- [ ] Filter presets function correctly
- [ ] Progress bar updates properly
- [ ] No console errors
- [ ] Works on Chrome (latest version)

## Areas for Contribution

Looking for ideas? Here are some areas that need work:

### High Priority
- Firefox extension support
- Better error handling for CORS images
- Image deduplication algorithm
- Download queue management

### Medium Priority
- Image preview modal
- Custom filename templates
- Better UI/UX improvements
- Performance optimizations

### Nice to Have
- Dark mode
- Keyboard shortcuts
- Export/import settings
- Cloud storage integration

## Questions?

Feel free to open an issue with the "question" label, or reach out via:
- GitHub Discussions
- LinkedIn: [@amikrsin](https://www.linkedin.com/in/amikrsin/)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

Thank you for contributing! 🎉
