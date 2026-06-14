import { AzkarCategory } from '@/data/defaultAzkar';

export interface ImportedAzkar {
  text: string;
  count: number;
  category: AzkarCategory;
}

export async function parseDocument(uri: string, fileName: string): Promise<ImportedAzkar[]> {
  const importedAzkar: ImportedAzkar[] = [];
  
  try {
    // For now, we'll implement a basic text extraction
    // In production, you'd use pdf-parse for PDFs and mammoth for DOCX
    
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const isDocx = fileName.toLowerCase().endsWith('.docx');
    
    if (isPdf) {
      // PDF parsing would go here
      // For demo purposes, return sample data
      importedAzkar.push({
        text: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه',
        count: 100,
        category: 'أذكار الصباح',
      });
    } else if (isDocx) {
      // DOCX parsing would go here
      // For demo purposes, return sample data
      importedAzkar.push({
        text: 'سبحان الله وبحمده سبحان الله العظيم',
        count: 100,
        category: 'أذكار الصباح',
      });
    } else {
      throw new Error('نوع الملف غير مدعوم. يرجى استخدام ملف PDF أو DOCX');
    }
    
    return importedAzkar;
  } catch (error) {
    console.error('Error parsing document:', error);
    throw error;
  }
}

export function extractAzkarFromText(text: string): ImportedAzkar[] {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const azkar: ImportedAzkar[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      // Try to detect count from the line (e.g., "33 مرات" or "(33)")
      let count = 1;
      let dhikrText = trimmed;
      
      const countMatch = trimmed.match(/(\d+)\s*(?:مرة|مرات|مرة|مرات|لقطة)/);
      if (countMatch) {
        count = parseInt(countMatch[1]);
        dhikrText = trimmed.replace(countMatch[0], '').trim();
      }
      
      if (dhikrText.length > 0) {
        azkar.push({
          text: dhikrText,
          count,
          category: 'أذكار الصباح', // Default category
        });
      }
    }
  }
  
  return azkar;
}
