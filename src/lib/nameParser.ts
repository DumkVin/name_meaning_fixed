export interface CultureMeaning {
  region: string;
  meaning: string;
}

export interface ParsedNameData {
  name: string;
  uniquenessScore: number;
  meanings: CultureMeaning[];
  notes: string[];
}

/**
 * Parses the webhook response containing name meaning data
 * @param response - The response object from the webhook
 * @returns Structured name data
 */
export function parseNameMeaningResponse(response: any): ParsedNameData | null {
  try {
    // Handle if response has Name_Meaning property
    const rawText = response?.Name_Meaning || response;
    
    if (typeof rawText !== 'string') {
      console.error('Invalid response format');
      return null;
    }

    // Extract name
    const nameMatch = rawText.match(/Name:\s*(\w+)/i);
    const name = nameMatch ? nameMatch[1] : '';

    // Extract uniqueness score
    const scoreMatch = rawText.match(/Uniqueness Score:\s*(\d+)\/100/i);
    const uniquenessScore = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    // Extract meanings by region/culture
    const meanings: CultureMeaning[] = [];
    const meaningsSection = rawText.match(/Meanings by Region\/Culture:([\s\S]*?)(?=Uniqueness Score:|$)/i);
    
    if (meaningsSection) {
      const meaningLines = meaningsSection[1].split('\n');
      meaningLines.forEach(line => {
        // Match lines like: • Sanskrit / Indian: "Raj" commonly means...
        const meaningMatch = line.match(/[•\-]\s*([^:]+):\s*(.+)/);
        if (meaningMatch) {
          const region = meaningMatch[1].trim();
          const meaning = meaningMatch[2].trim().replace(/^[""]|[""]$/g, '');
          meanings.push({ region, meaning });
        }
      });
    }

    // Extract notes
    const notes: string[] = [];
    const notesSection = rawText.match(/Notes:([\s\S]*?)(?=If you want|$)/i);
    
    if (notesSection) {
      const noteLines = notesSection[1].split('\n');
      noteLines.forEach(line => {
        const trimmedLine = line.trim();
        // Match lines starting with - or •
        if (trimmedLine.match(/^[-•]/)) {
          const note = trimmedLine.replace(/^[-•]\s*/, '').trim();
          if (note) {
            notes.push(note);
          }
        }
      });
    }

    return {
      name,
      uniquenessScore,
      meanings,
      notes,
    };
  } catch (error) {
    console.error('Error parsing name meaning response:', error);
    return null;
  }
}
