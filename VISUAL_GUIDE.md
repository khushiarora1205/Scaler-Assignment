# 🎨 Visual Guide & UX Features

## UI Layout

```
┌─────────────────────────────────────────────────────────┐
│                    📋 Kanban Board                       │
│              (Purple Gradient Background)               │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  To Do      │  │ In Progress │  │    Done     │          │
│  │  [✕ delete] │  │ [✕ delete]  │  │[✕ delete]   │  ┌──────┤
│  ├─────────────┤  ├─────────────┤  ├─────────────┤  │ + Add │
│  │ [Draggable] │  │ [Draggable] │  │ [Draggable] │  │ new  │
│  │ Card 1      │  │ Card 4      │  │ Card 5      │  │ list │
│  │ [✕ delete]  │  │ [✕ delete]  │  │ [✕ delete]  │  │      │
│  │             │  │             │  │             │  │      │
│  │ [Draggable] │  │             │  │             │  │      │
│  │ Card 2      │  │             │  │             │  │      │
│  │ [✕ delete]  │  │             │  │             │  │      │
│  │             │  │             │  │             │  │      │
│  │ + Add Card  │  │ + Add Card  │  │ + Add Card  │  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────┘
└──────────────────────────────────────────────────────────────┘
```

## Color Scheme

```
Primary: #0079bf (Blue)
Primary Dark: #026aa7 (Darker Blue)
Text: #172b4d (Dark Blue-Gray)
Light Text: #626f86 (Medium Gray)
Background: #f8fafc (Very Light Blue)
Success: #216e4e (Green - for save)
Danger: #ae2a19 (Red - for delete)
```

## Component Hierarchy

```
<Board>
  ├── Header
  │   └── "📋 Kanban Board"
  │
  ├── DragDropContext
  │   ├── Lists Container
  │   │   ├── <List>
  │   │   │   ├── List Header
  │   │   │   │   ├── Title
  │   │   │   │   └── Delete Button [✕]
  │   │   │   ├── Droppable (Cards)
  │   │   │   │   ├── <Card>
  │   │   │   │   │   ├── Display Mode
  │   │   │   │   │   │   ├── Title (clickable)
  │   │   │   │   │   │   └── Delete Btn [✕]
  │   │   │   │   │   └── Edit Mode
  │   │   │   │   │       ├── Input Field
  │   │   │   │   │       ├── Save Btn [✓]
  │   │   │   │   │       └── Cancel Btn [✕]
  │   │   │   │   └── ...more cards
  │   │   │   └── Add Card Form/Button
  │   │   ├── <List>
  │   │   └── ...more lists
  │   │
  │   └── Add List Form
  │       ├── Input Field
  │       └── Add Button
```

## Interaction States

### Card States
```
NORMAL STATE:
┌─────────────────────┐
│ Task Name           │ [✕]  (hidden)
└─────────────────────┘

HOVER STATE:
┌─────────────────────┐
│ Task Name           │ [✕]  (visible)
└─────────────────────┘
(darker shadow, slightly elevated)

EDIT STATE:
┌─────────────────────┐
│ [Input field        │
│  with edit text...] │
│ [✓]  [✕]            │
└─────────────────────┘

DRAGGING STATE:
┌─────────────────────┐
│ Task Name      (50% opacity)
│ ✋ grabbing cursor
└─────────────────────┘
(follows mouse)
```

### List States
```
NORMAL:
┌─────────────────────┐
│ To Do         [✕]   │ (header)
├─────────────────────┤
│ [cards...]          │
│ + Add Card          │
└─────────────────────┘

DRAG-OVER (when dragging card over it):
┌─────────────────────┐
│ To Do         [✕]   │
├─────────────────────┤
│ (light gray bg)     │
│ [cards...]          │
│ + Add Card          │
└─────────────────────┘
```

## Animation Effects

### Transitions
```
Property          Duration   Easing
──────────────────────────────────
All (universal)   0.2s       ease
Box shadow        0.2s       ease
Background color  0.2s       ease
Opacity           0.2s       ease
Transform         0.2s       ease
```

### Hover Effects
- **Cards**: Box shadow increases, border darkens
- **Buttons**: Background color changes
- **Lists**: Box shadow increases
- **Delete buttons**: Background turns red

### Drag Effects
- **Dragging**: Opacity 0.5, cursor changes to "grabbing"
- **Drop zone**: Light gray background
- **Drop target**: Visual highlight

## Responsive Breakpoints

```
Desktop (1200px+)
- Full layout with scrollable lists container
- All cards visible with spacing

Tablet (768px - 1199px)
- Horizontal scroll for lists
- Touch-friendly buttons

Mobile (< 768px)
- Single column view (if implemented)
- Touch drag compatible
- Full-width elements
```

## Accessibility Features

### Keyboard Navigation
- Tab: Navigate between elements
- Enter: Confirm actions
- Escape: Cancel operations
- Delete: Remove items (with confirmation)

### Visual Feedback
- Hover states show action available
- Focus states on interactive elements
- Color contrasts meet WCAG standards
- Icons have text labels

### Semantic HTML
- Proper heading hierarchy
- Button elements for actions
- Form elements for input
- ARIA labels for clarity

## User Flow Diagram

```
START
  ↓
[View Board] ← See initial data
  ├─→ [Add List] ← Click "+ Add new list"
  │     ├─→ Input title
  │     └─→ [Create] → List appears
  │
  ├─→ [Add Card] ← Click "+ Add Card"
  │     ├─→ Input title
  │     └─→ [Create] → Card appears
  │
  ├─→ [Edit Card] ← Click on card title
  │     ├─→ Modify title
  │     └─→ [Save] → Title updates
  │
  ├─→ [Drag Card] ← Within list
  │     └─→ Reorder happens
  │
  ├─→ [Drag Card] ← Between lists
  │     └─→ Move to new list
  │
  └─→ [Delete] ← Click [✕] button
        ├─→ Confirm action
        └─→ Remove item
```

## Default Data

When backend starts, you get:

```javascript
Board {
  lists: [
    {
      id: "list-1",
      title: "To Do",
      cards: [
        { id: "card-1", title: "Build Kanban board" },
        { id: "card-2", title: "Add drag and drop" }
      ]
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [
        { id: "card-3", title: "Design UI" }
      ]
    },
    {
      id: "list-3",
      title: "Done",
      cards: [
        { id: "card-4", title: "Setup project structure" }
      ]
    }
  ]
}
```

## UI Dimensions

```
List Width: 272px (fixed)
List Spacing: 1.5rem (24px)
Card Padding: 0.75rem (12px)
Card Margin: 0.5rem (8px)
Border Radius: 4-8px
Shadow: 0 2px 8px rgba(0,0,0,0.1)

Board Padding: 2rem (32px)
Header Padding: 1.5rem (24px)
Container Gap: 1.5rem (24px)
```

## Typography

```
Board Title: 2rem, font-weight: 600
List Title: 1rem, font-weight: 600
Card Text: 0.9rem
Button Text: 0.9-0.95rem
Input Text: 0.9rem

Font Family: System fonts
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
```

## Button Styles

```
PRIMARY (Add):
├─ Background: #0079bf
├─ Color: white
├─ Padding: 0.75rem 1rem
├─ Border: none
├─ Radius: 4px
└─ Hover: #026aa7

SUCCESS (Confirm):
├─ Background: #216e4e
├─ Color: white
├─ Padding: varies
└─ Hover: #145a32

DANGER (Delete):
├─ Background: #ae2a19
├─ Color: white
└─ Hover: #8b2415

DELETE ICON:
├─ Background: transparent
├─ Color: #626f86
├─ Opacity: 0 (hidden until hover)
└─ Hover: red bg
```

## Form States

```
INPUT NORMAL:
┌───────────────────┐
│ Type something... │ ← Placeholder
└───────────────────┘

INPUT FOCUSED:
┌───────────────────┐
│ Your text here│   │ ← Cursor blinking
└───────────────────┘
(2px blue outline)

INPUT ERROR:
┌───────────────────┐
│                   │ ← Empty
└───────────────────┘
Alert: "Please enter a card title"
```

## Loading & Error States

```
LOADING:
┌─────────────────────────────┐
│   Loading board...          │
│   (centered, large text)    │
└─────────────────────────────┘

ERROR:
┌─────────────────────────────┐
│   Error loading board       │ (red text)
│   (centered, large text)    │
└─────────────────────────────┘

SUCCESS TOAST (optional):
┌─────────────────────────────┐
│ ✓ Card added successfully   │
│   (bottom right, 3s timeout)│
└─────────────────────────────┘
```

## Drag Preview

```
While dragging:
┌─────────────────────┐
│ 🎨 [Card being      │  ← Dragged preview
│    dragged]         │     (follows cursor)
│ [ghost copy]        │  ← Faded original
└─────────────────────┘

Drop zone active:
┌─────────────────────┐
│ ░░░░░░░░░░░░░░░░░  │  ← Light gray area
│ [Drop here]         │
└─────────────────────┘

Valid drop:
✓ Green highlight

Invalid drop:
✗ Red highlight
```

---

This visual guide shows how the Kanban board looks and behaves!
