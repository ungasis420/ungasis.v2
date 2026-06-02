# powerbi-genome.md — Power BI DNA

This is the extra blueprint information specifically for Power BI reporting and data visualization projects. Focuses on glass-inspired reports, clean DAX formatting, and efficient M Queries.

## TEMPLATE
- Report Canvas size: Standard (16:9) or custom 1280x720px.
- Use visual cards with consistent margins (12px or 16px padding).
- Report layouts must have a left navigation pane and a top-right KPI header banner.

## DAX PATTERNS
- **Prefix Measures:** Always name custom measures with a leading underscore (e.g., `_Total Revenue`).
- **Year-To-Date (YTD):**
  ```dax
  _YTD Sales = TOTALYTD([_Total Sales], 'Calendar'[Date])
  ```
- **Month-Over-Month (MoM):**
  ```dax
  _MoM Sales % = 
  VAR _PreviousMonth = CALCULATE([_Total Sales], PARALLELPERIOD('Calendar'[Date], -1, MONTH))
  RETURN DIVIDE([_Total Sales] - _PreviousMonth, _PreviousMonth, 0)
  ```
- **Running Total:**
  ```dax
  _Running Total Sales = 
  CALCULATE([_Total Sales], FILTER(ALLSELECTED('Calendar'), 'Calendar'[Date] <= MAX('Calendar'[Date])))
  ```

## M QUERY
- Use parameters for database connections and environment switches.
- Enable load only on final merged queries (uncheck "Enable load" on intermediate tables).
- Always include an error-handling column helper step: `try [Column] otherwise null`.

## DESIGN
- Use a custom theme JSON with glassmorphism-inspired dark themes.
- Accent colors: HSL/Hex `#00d4ff` (cyan) and `#a78bfa` (purple).
- Standard text size: KPI titles at >= 12px, values at 24px-36px.
- Use shadow effects on visual containers (e.g., Blur 10px, Transparency 90%, black shadow).

## CONVENTIONS
- Create a `_Measures` table (an empty table with only measures in it) to group all measure items in one place.
- Do not create calculated columns in the model if you can solve it in the Power Query (M) script.
- Folder structures: Group related tables into schema diagrams (e.g., DimCalendar, DimCustomer, FactSales).

---
Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
