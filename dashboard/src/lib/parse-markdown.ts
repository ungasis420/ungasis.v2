import fs from "fs";
import path from "path";

export interface ParsedMarkdown {
  title: string;
  sections: { heading: string; content: string }[];
  tables: { headers: string[]; rows: string[][] }[];
  lists: string[];
  metadata: { lastReviewed?: string; owner?: string };
  rawContent: string;
  lineCount: number;
}

export function parseMarkdownFile(filePath: string): ParsedMarkdown {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);
  
  let title = "";
  const sections: { heading: string; content: string }[] = [];
  const tables: { headers: string[]; rows: string[][] }[] = [];
  const lists: string[] = [];
  const metadata: { lastReviewed?: string; owner?: string } = {};

  let currentHeading = "";
  let currentSectionLines: string[] = [];
  let currentTableRows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Title Extraction
    if (line.startsWith("# ") && !title) {
      title = line.replace("# ", "").trim();
      continue;
    }

    // 2. Sections Extraction
    if (line.startsWith("## ")) {
      if (currentHeading) {
        sections.push({ heading: currentHeading, content: currentSectionLines.join("\n").trim() });
      }
      currentHeading = line.replace("## ", "").trim();
      currentSectionLines = [];
      continue;
    }

    if (currentHeading && !line.startsWith("|")) {
      currentSectionLines.push(lines[i]);
    }

    // 3. Tables Extraction
    if (line.startsWith("|")) {
      const parts = line.split("|").map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Check if it's separator line (e.g. |---|)
      const isSeparator = parts.every(part => part.startsWith("-") || part === "");
      if (!isSeparator) {
        currentTableRows.push(parts);
      }
      
      // If next line is not a table or EOF, flush the table
      const nextLine = lines[i + 1]?.trim() || "";
      if (!nextLine.startsWith("|")) {
        if (currentTableRows.length > 0) {
          const headers = currentTableRows[0];
          const rows = currentTableRows.slice(1);
          tables.push({ headers, rows });
          currentTableRows = [];
        }
      }
    }

    // 4. Lists Extraction
    if (line.startsWith("- ")) {
      lists.push(line.replace("- ", "").trim());
    }

    // 5. Metadata/Footer Extraction
    if (line.includes("Last reviewed:") && line.includes("Owner:")) {
      const parts = line.split("|").map(p => p.trim());
      parts.forEach(part => {
        if (part.startsWith("Last reviewed:")) {
          metadata.lastReviewed = part.replace("Last reviewed:", "").trim();
        } else if (part.includes("Review by:")) {
          // ignore or parse
        } else if (part.startsWith("Owner:")) {
          metadata.owner = part.replace("Owner:", "").trim();
        }
      });
    }
  }

  // Flush remaining section
  if (currentHeading) {
    sections.push({ heading: currentHeading, content: currentSectionLines.join("\n").trim() });
  }

  return {
    title,
    sections,
    tables,
    lists,
    metadata,
    rawContent: content,
    lineCount: lines.length
  };
}
