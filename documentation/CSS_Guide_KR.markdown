### 개요
이 프로젝트는 Ant Design의 `ConfigProvider`를 사용하여 Ant Design 컴포넌트의 테마를 관리하고, `data-theme` 속성을 활용한 커스텀 CSS로 비-Ant Design 요소를 스타일링합니다. 테마는 `src/components/ThemeContext.tsx`의 `ThemeProvider`를 통해 라이트 모드와 다크 모드 간 전환을 관리합니다. CSS는 `index.css`, `App.css` 등의 파일에서 CSS 변수와 속성 선택자를 사용하여 사이트 전체에 일관된 테마를 적용합니다.

### CSS 적용 모범 사례

1. **테마 일관성을 위한 CSS 변수 사용**
   - `src/index.css`에서 테마별 스타일을 CSS 변수로 정의합니다. 현재 설정은 `--background-color`와 `--text-color`를 사용하여 배경과 텍스트 색상을 관리합니다.
   - 예시:
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
   - 새로운 스타일을 추가할 때 배경, 텍스트, 테두리 등에 이 변수를 사용하여 테마를 준수하도록 합니다.
   - 필요 시 `index.css`에 새로운 변수(예: `--border-color`, `--accent-color`)를 추가합니다.

2. **`data-theme` 속성 활용**
   - `ThemeProvider`는 앱을 `data-theme` 속성(`light` 또는 `dark`)이 있는 `<div>`로 감쌉니다. CSS에서 이 속성을 사용하여 테마별 스타일을 적용합니다.
   - 예시:
     ```css
     .my-component {
       background-color: var(--background-color);
       color: var(--text-color);
     }

     [data-theme='dark'] .my-component {
       border-color: #555;
     }
     ```
   - 테마에 적응하지 않는 하드코딩된 색상이나 스타일을 피합니다.

3. **Ant Design 컴포넌트와 통합**
   - `Menu`, `Typography`, `Switch`와 같은 Ant Design 컴포넌트는 `ThemeContext.tsx`의 `ConfigProvider`를 통해 테마가 적용됩니다(`theme.darkAlgorithm` 또는 `theme.defaultAlgorithm`).
   - Ant Design 컴포넌트의 커스텀 스타일링은 CSS 클래스(예: `.ant-button`, `.ant-typography`)를 사용하거나 `ConfigProvider`에서 테마를 커스터마이징합니다.
   - 예시:
     ```css
     .ant-button {
       background-color: var(--background-color);
       color: var(--text-color);
     }
     ```
   - 고급 테마 설정은 Ant Design의 [커스터마이징 문서](https://ant.design/docs/react/customize-theme)를 참조하세요.

4. **CSS 파일 정리**
   - 글로벌 스타일은 `src/index.css`에 저장합니다(예: CSS 변수, body 스타일, 테마 기본값).
   - 컴포넌트별 또는 페이지별 CSS는 `src/styles/` 또는 컴포넌트 디렉토리(예: `src/components/MyComponent/MyComponent.css`)에 저장합니다.
   - 관련 컴포넌트 파일에서 CSS를 가져옵니다:
     ```tsx
     import './MyComponent.css';
     ```
   - `src/styles/App.css`는 앱 레이아웃 또는 공유 컴포넌트(예: `Navbar`, `Layout`) 관련 스타일에 사용합니다.

5. **인라인 스타일 지양**
   - 관심사 분리를 유지하고 테마 일관성을 보장하기 위해 CSS 파일을 인라인 스타일(예: `style={{ backgroundColor: '#fff' }}`)보다 선호합니다.
   - 인라인 스타일이 필요한 경우(예: 동적 값), CSS 변수를 사용합니다:
     ```tsx
     <div style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
     ```

6. **반응형 디자인 보장**
   - 반응형 레이아웃을 위해 상대 단위(예: `rem`, `vw`, `%`)를 사용합니다.
   - Ant Design의 그리드 시스템(`Row`, `Col`) 또는 CSS 미디어 쿼리를 활용하여 반응형 스타일을 적용합니다:
     ```css
     @media (max-width: 768px) {
       .my-component {
         font-size: 14px;
       }
     }
     ```

7. **테마 변경 테스트**
   - 새로운 스타일을 추가한 후, `Navbar`의 테마 스위치를 전환하여 라이트 모드와 다크 모드를 모두 테스트합니다.
   - 배경, 텍스트 색상 등 모든 컴포넌트(Ant Design 및 커스텀)가 테마를 준수하는지 확인합니다.
   - 스타일이 예상대로 적용되지 않을 경우, 테스트에서 `screen.debug()`를 사용하여 렌더링된 DOM을 검사합니다.

8. **접근성 유지**
   - 두 테마 모두에서 텍스트와 배경 색상의 대비가 충분해야 합니다([WebAIM 대비 검사기](https://webaim.org/resources/contrastchecker/) 사용).
   - 의미 있는 HTML과 접근성을 지원하는 Ant Design 컴포넌트(예: `role`, `aria-label`)를 사용합니다.
   - 예시:
     ```css
     .my-component {
       color: var(--text-color);
       background-color: var(--background-color);
       /* WCAG 2.1 대비 비율 준수 */
     }
     ```

### 예시: 테마 스타일을 적용한 새 컴포넌트 추가
새 컴포넌트 `MyComponent.tsx`를 만든다고 가정:
```tsx
// src/components/MyComponent.tsx
import React from 'react';
import './MyComponent.css';

const MyComponent: React.FC = () => {
  return (
    <div className="my-component">
      <h2>My Component</h2>
      <p>테마가 적용된 컴포넌트입니다.</p>
    </div>
  );
};

export default MyComponent;
```

`MyComponent.css` 생성:
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

필요한 경우 `index.css`에 새 변수를 추가:
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

### 문제 해결
- **스타일이 적용되지 않음**: 컴포넌트가 `ThemeProvider`와 `ConfigProvider` 계층 구조 안에 있는지 확인하고, CSS 변수 또는 `data-theme` 선택자를 올바르게 사용했는지 점검합니다.
- **Ant Design 컴포넌트에 테마 미적용**: `ConfigProvider`가 컴포넌트 트리를 감싸고 있으며, `ThemeContext.tsx`에서 `theme.algorithm`이 올바르게 설정되었는지 확인합니다.
- **테스트**: `App.test.tsx`를 업데이트하여 새 컴포넌트의 테마 준수 여부를 테스트합니다:
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
    const element = screen.getByText(/테마가 적용된 컴포넌트/i);
    expect(element).toHaveStyle({ backgroundColor: '#fff' });
    // 테마를 전환하고 다크 모드 스타일을 테스트
  });
  ```