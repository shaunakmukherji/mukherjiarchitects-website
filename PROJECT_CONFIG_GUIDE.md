# Project Configuration Guide

## Overview

You can control which projects appear as **signature projects** on the homepage and the **order** of projects within each category by adding a `project.json` file to each project folder.

## How It Works

Create a `project.json` file in any project folder to control:

1. **Signature Projects** - Which projects appear on the homepage portfolio section
2. **Signature Order** - The order signature projects appear on the homepage
3. **Category Order** - The order projects appear in their category page (first one is the "cover" project)

## File Location

Place `project.json` in your project folder:

```
public/images/projects/
  └── [Category Name]/
      └── [Project Name]/
          ├── project.json  ← Create this file
          ├── description.md
          ├── render-01.jpeg
          └── render-02.jpeg
```

## Configuration Options

### `project.json` Structure

```json
{
  "isSignature": true,
  "signatureOrder": 1,
  "categoryOrder": 1
}
```

### Fields Explained

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `isSignature` | `boolean` | No | Set to `true` to show this project on the homepage portfolio section. Default: `false` |
| `signatureOrder` | `number` | No | Order for signature projects (1 = first, 2 = second, etc.). Lower numbers appear first. If not set, projects are sorted alphabetically. |
| `categoryOrder` | `number` | No | Order within the category page (1 = first/cover, 2 = second, etc.). Lower numbers appear first. If not set, projects are sorted alphabetically. |

## Examples

### Example 1: Signature Project (Homepage)

Make a project appear on the homepage as the first signature project:

```json
{
  "isSignature": true,
  "signatureOrder": 1,
  "categoryOrder": 1
}
```

### Example 2: Category Cover Project

Make a project appear first (as the cover) in its category page, but not on homepage:

```json
{
  "isSignature": false,
  "categoryOrder": 1
}
```

### Example 3: Second Signature Project

Make a project appear as the second signature project on homepage:

```json
{
  "isSignature": true,
  "signatureOrder": 2
}
```

### Example 4: No Configuration

If you don't create a `project.json` file, the project will:
- Not appear as a signature project
- Be sorted alphabetically within its category

## Best Practices

1. **Signature Projects**: Choose 3-5 of your best projects for the homepage
2. **Category Order**: Set `categoryOrder: 1` for the project you want as the "cover" image on category pages
3. **Numbering**: Use sequential numbers (1, 2, 3...) for clear ordering
4. **Consistency**: Keep ordering consistent - if you skip numbers, it still works but may be confusing

## How to Update

1. Create or edit `project.json` in your project folder
2. Run `npm run generate` to regenerate project data
3. Or run `npm run generate:watch` for automatic updates

## Real-Time Updates

If you're running `npm run generate:watch`, the system will automatically detect changes to `project.json` files and regenerate the project data.

## Troubleshooting

- **Project not showing on homepage?** Make sure `isSignature: true` is set
- **Wrong order?** Check that `signatureOrder` or `categoryOrder` numbers are correct
- **Changes not appearing?** Run `npm run generate` to regenerate the data



















