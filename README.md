# 🗺️ Manhattan Building Class Map

An interactive web map that visualizes **building classifications in Manhattan**, grouped by their **first-letter building class codes** (e.g., "A" for One & Two Family Buildings, "O" for Office Buildings, etc.).

Users can:
- Click on buildings to see their **building class**, **description**, and **residential unit count**.
- View a **floating info panel** and **color-coded legend** for interpretation.

## 🚀 Features

- **Interactive Map** powered by Mapbox GL JS.
- **Building Layer** color-coded by top-level building class.
- **Popup Details** on building click: shows code, class group, and residential unit count.
- **Legend Panel** on the top-right.
- **Floating Info Panel** on the top-left with page title and guidance.

## 📦 Requirements

- A valid **Mapbox Access Token**
- A **GeoJSON** file with the following attributes per feature:
  - `BldgClass`: A string like `"O1"` or `"A9"`
  - `UnitsRes`: (optional) Residential units count