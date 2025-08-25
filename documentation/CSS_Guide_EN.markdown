# CSS Guidelines

### Overview
This project uses a combination of Ant Design’s `ConfigProvider` for theming Ant Design components and custom CSS with a `data-theme` attribute for non-Ant Design elements. The theme is controlled via the `ThemeProvider` in `src/components/ThemeContext.tsx`, which toggles between light and dark modes. CSS is applied using CSS files (`index.css`, `App.css`, etc.) with CSS variables and attribute selectors to ensure consistent theming across the entire site.

### Best Practices for Applying CSS

1. **Use CSS Variables for Theme Consistency**
   - Define theme-specific styles using CSS variables in `src/index.css`. The current setup uses `--background-color` and `--text-color` to manage background and text colors.
   - Example:
     ```css
     :root {
       --background-color: #fff;
       --text-color: #000;
     }

     [data-theme='dark'] {
       --background-color: #1f1f1f;
       --text-color: #fff;
     }
     ```
   - When adding new styles, use these variables for backgrounds, text, borders, etc., to ensure they respect the current theme.
   - Add new variables in `index.css` for additional theme properties (e.g., `--border-color`, `--accent-color`) as needed.

2. **Leverage the `data-theme` Attribute**
   - The `ThemeProvider` wraps the app in a `<div>` with a `data-theme` attribute (`light` or `dark`). Use this attribute in your CSS to apply theme-specific styles.
   - Example:
     ```css
     .my-component {
       background-color: var(--background-color);
       color: var(--text-color);
     }

     [data-theme='dark'] .my-component {
       border-color: #555;
     }
     ```
   - Avoid hardcoding colors or styles that don’t adapt to the theme.

3. **Integrate with Ant Design Components**
   - Ant Design components (e.g., `Menu`, `Typography`, `Switch`) are themed via the `ConfigProvider` in `ThemeContext.tsx`, which applies `theme.darkAlgorithm` or `theme.defaultAlgorithm`.
   - For custom styling of Ant Design components, use their CSS class names (e.g., `.ant-button`, `.ant-typography`) or customize the theme in `ConfigProvider`.
   - Example of customizing Ant Design button styles:
     ```css
     .ant-button {
       background-color: var(--background-color);
       color: var(--text-color);
     }
     ```
   - Refer to Ant Design’s [customization documentation](https://ant.design/docs/react/customize-theme) for advanced theming.

4. **Organize CSS Files**
   - Store global styles in `src/index.css` (e.g., CSS variables, body styles, theme defaults).
   - Use component-specific or page-specific CSS in `src/styles/` or within component directories (e.g., `src/components/MyComponent/MyComponent.css`).
   - Import component-specific CSS in the relevant component file:
     ```tsx
     import './MyComponent.css';
     ```
   - Keep `src/styles/App.css` for styles related to the app’s layout or shared components (e.g., `Navbar`, `Layout`).

5. **Avoid Inline Styles Unless Necessary**
   - Prefer CSS files over inline styles (e.g., `style={{ backgroundColor: '#fff' }}`) to maintain separation of concerns and ensure theme consistency.
   - If inline styles are needed (e.g., dynamic values), use CSS variables:
     ```tsx
     <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
     ```

6. **Ensure Responsive Design**
   - Use relative units (e.g., `rem`, `vw`, `%`) for responsive layouts.
   - Leverage Ant Design’s grid system (`Row`, `Col`) or CSS media queries for responsiveness:
     ```css
     @media (max-width: 768px) {
       .my-component {
         font-size: 14px;
       }
     }
     ```

7. **Test Theme Changes**
   - After adding new styles, test both light and dark modes by toggling the theme switch in the `Navbar`.
   - Verify that all components (Ant Design and custom) respect the theme by checking backgrounds, text colors, and other styled properties.
   - Use the `screen.debug()` method in tests (e.g., `App.test.tsx`) to inspect the rendered DOM if styles don’t apply as expected.

8. **Maintain Accessibility**
   - Ensure sufficient contrast between text and background colors in both themes (use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).
   - Use semantic HTML and Ant Design components that support accessibility (e.g., `role`, `aria-label`).
   - Example:
     ```css
     .my-component {
       color: var(--text-color);
       background-color: var(--background-color);
       /* Ensure contrast ratio meets WCAG 2.1 guidelines */
     }
     ```

### Example: Adding a New Component with Themed Styles
Suppose you create a new component `MyComponent.tsx`:
```tsx
// src/components/MyComponent.tsx
import React from 'react';
import './MyComponent.css';

const MyComponent: React.FC = () => {
  return (
    <div className="my-component">
      <h2>My Component</h2>
      <p>This is a themed component.</p>
    </div>
  );
};

export default MyComponent;
```

Create `MyComponent.css`:
```css
/* src/components/MyComponent.css */
.my-component {
  padding: 16px;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color, #ddd);
}

[data-theme='dark'] .my-component {
  border-color: #555;
}
```

Add the new variable in `index.css` if needed:
```css
/* src/index.css */
:root {
  --background-color: #fff;
  --text-color: #000;
  --border-color: #ddd;
}

[data-theme='dark'] {
  --background-color: #1f1f1f;
  --text-color: #fff;
  --border-color: #555;
}
```

### Troubleshooting
- **Styles Not Applying**: Check if the component is within the `ThemeProvider` and `ConfigProvider` hierarchy. Verify that CSS variables or `data-theme` selectors are correctly used.
- **Ant Design Components Not Themed**: Ensure `ConfigProvider` is wrapping the component tree and that `theme.algorithm` is set correctly in `ThemeContext.tsx`.
- **Testing**: Update `App.test.tsx` to test new components for theme compliance:
  ```tsx
  test('renders MyComponent with correct theme', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <ConfigProvider>
            <MyComponent />
          </ConfigProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
    const element = screen.getByText(/This is a themed component/i);
    expect(element).toHaveStyle({ backgroundColor: '#fff' });
    // Toggle theme and test dark mode styles
  });
  ```
