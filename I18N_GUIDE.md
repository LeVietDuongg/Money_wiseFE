# i18n Implementation Guide

## Overview
The website now supports full internationalization (i18n) using `react-i18next`. Users can switch between Vietnamese (vi) and English (en) languages, and the selection persists across page refreshes.

## Architecture

### 1. Core Files
- **`src/i18n/config.ts`** - i18next configuration
- **`src/contexts/LanguageContext.tsx`** - React context for language state management
- **`src/i18n/locales/en/translation.json`** - English translations
- **`src/i18n/locales/vi/translation.json`** - Vietnamese translations

### 2. Setup
The `LanguageProvider` wraps the entire app in `src/app/layout.tsx`, making translations available everywhere.

## How to Use Translations in Components

### Client Components (recommended)
```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t("header.home")}</h1>
      <p>{t("contact.address")}</p>
    </div>
  );
}
```

### Server Components (if needed)
For server components, you'll need to convert them to client components by adding `"use client"` at the top.

## Adding New Translations

### Step 1: Add to Translation Files
Add your new keys to both language files:

**`src/i18n/locales/en/translation.json`**
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**`src/i18n/locales/vi/translation.json`**
```json
{
  "mySection": {
    "title": "Tiêu đề của tôi",
    "description": "Mô tả của tôi"
  }
}
```

### Step 2: Use in Components
```tsx
const { t } = useLanguage();

<h1>{t("mySection.title")}</h1>
<p>{t("mySection.description")}</p>
```

## Current Translation Keys

### Header Navigation
- `header.home` - Home menu item
- `header.introduce` - Introduce menu item
- `header.topic` - Topic menu item
- `header.service` - Service menu item
- `header.community` - Community menu item
- `header.contact` - Contact menu item
- `header.company` - Company submenu
- `header.employee` - Employee submenu
- `header.whereMoney` - Where money submenu
- `header.retire55` - Retire 55 submenu
- `header.lifetimeMoney` - Lifetime money submenu
- `header.facebook` - Facebook link
- `header.youtube` - Youtube link
- `header.language.vietnamese` - Vietnamese language name
- `header.language.english` - English language name

### Contact Page
- `contact.contactInfo` - Contact Information
- `contact.address` - Address
- `contact.phone` - Phone number
- `contact.email` - Email
- `contact.sendMessage` - Send message title
- `contact.form.fullName` - Full name placeholder
- `contact.form.email` - Email placeholder
- `contact.form.phone` - Phone placeholder
- `contact.form.subject` - Subject placeholder
- `contact.form.message` - Message placeholder
- `contact.form.submit` - Submit button
- `contact.importantNote` - Important note label
- `contact.noteText` - Note text

## Features

### Language Persistence
- Language choice is saved to `localStorage`
- Automatically restored on page reload

### Language Switching
- Click the flag icon in the header
- Select desired language (Vietnamese or English)
- The entire website updates immediately

### Current Language Detection
- The flag icon shows the current language
- Vietnamese flag for Vietnamese
- English flag for English

## Next Steps for Full Implementation

To complete the i18n implementation across the entire website:

1. **Identify all static text** in your components
2. **Add translation keys** to both `en/translation.json` and `vi/translation.json`
3. **Convert components to client components** if they're server components
4. **Import and use `useLanguage` hook**
5. **Replace hardcoded text** with `t("key.path")`

## Example: Converting a Page

**Before:**
```tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a financial company</p>
    </div>
  );
}
```

**After:**
```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t("about.title")}</h1>
      <p>{t("about.description")}</p>
    </div>
  );
}
```

**Translation files:**
```json
// en/translation.json
{
  "about": {
    "title": "About Us",
    "description": "We are a financial company"
  }
}

// vi/translation.json
{
  "about": {
    "title": "Về Chúng Tôi",
    "description": "Chúng tôi là một công ty tài chính"
  }
}
```

## Tips

1. **Organize by section**: Group related translations together
2. **Use nested objects**: Makes it easier to manage large translation files
3. **Consistent naming**: Use camelCase for keys
4. **Keep it simple**: Use descriptive but concise key names
5. **Test both languages**: Always verify translations appear correctly in both languages

## Troubleshooting

### Translations not appearing?
- Check that the key exists in both translation files
- Verify the key path is correct (case-sensitive)
- Ensure the component is wrapped in LanguageProvider (already done in layout.tsx)

### Language not persisting?
- Check browser localStorage is enabled
- Clear localStorage and try again

### Component errors?
- Make sure you added `"use client"` for client components
- Import the hook: `import { useLanguage } from "@/contexts/LanguageContext";`
