// Industry-standard text formatter for AI responses
export function formatText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  // Split into lines and clean them
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const formatted: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines
    if (!line) continue;
    
    // Process headers (ending with colon, optionally bold)
    if (isHeader(line)) {
      const cleanHeader = cleanHeaderText(line);
      formatted.push(`<div class="section-header">${cleanHeader}</div>`);
      continue;
    }
    
    // Process bullet points
    if (isBulletPoint(line)) {
      const bulletContent = cleanBulletText(line);
      const formattedContent = formatInlineText(bulletContent);
      formatted.push(`<div class="bullet-item">• ${formattedContent}</div>`);
      continue;
    }
    
    // Process numbered lists
    if (isNumberedItem(line)) {
      const formattedLine = formatInlineText(line);
      formatted.push(`<div class="bullet-item">${formattedLine}</div>`);
      continue;
    }
    
    // Regular paragraph
    formatted.push(`<div class="paragraph">${formatInlineText(line)}</div>`);
  }
  
  return formatted.join('');
}

// Helper functions
function isHeader(line: string): boolean {
  // Matches: "Header:", "**Header:**", etc.
  return /^(\*\*)?[A-Z][^:]*:(\*\*)?$/.test(line);
}

function cleanHeaderText(line: string): string {
  // Remove ** markers and return clean header
  return line.replace(/^\*\*/, '').replace(/\*\*$/, '');
}

function isBulletPoint(line: string): boolean {
  // Matches: "* item", "- item", "• item"
  return /^[*\-•]\s+/.test(line);
}

function cleanBulletText(line: string): string {
  // Remove bullet marker and return content
  return line.replace(/^[*\-•]\s+/, '');
}

function isNumberedItem(line: string): boolean {
  // Matches: "1. item", "2. item", etc.
  return /^\d+\.\s+/.test(line);
}

function formatInlineText(text: string): string {
  if (!text) return '';
  
  // Handle bold text **text** - be more aggressive with matching
  let formatted = text.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
  
  // Handle italic text *text* (single asterisks, but not touching bold)
  formatted = formatted.replace(/(?<!\*)\*([^*<>\s][^*<>]*?)\*(?!\*)/g, '<em>$1</em>');
  
  // Clean up any remaining double asterisks that might be malformed
  formatted = formatted.replace(/\*\*/g, '');
  
  return formatted;
}

// Function to create a typing effect (keeping existing functionality)
export function createTypingEffect(
  text: string,
  onUpdate: (text: string) => void,
  speed: number = 30
): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        onUpdate(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}
