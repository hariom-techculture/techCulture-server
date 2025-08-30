import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cleanup utility for temporary uploaded files
export const cleanupTempFiles = (files) => {
  if (!files) return;

  try {
    const fileArray = Array.isArray(files) ? files : [files];
    
    fileArray.forEach(file => {
      if (file && file.path && fs.existsSync(file.path)) {
        try {
          fs.unlinkSync(file.path);
          console.log(`✅ Cleaned up temp file: ${file.path}`);
        } catch (error) {
          console.error(`❌ Failed to cleanup temp file ${file.path}:`, error.message);
        }
      }
    });
  } catch (error) {
    console.error('❌ Error in cleanupTempFiles:', error.message);
  }
};

// Cleanup old temporary files (older than 1 hour)
export const cleanupOldTempFiles = () => {
  try {
    const uploadDirs = [
      path.join(__dirname, '../uploads'),
      path.join(__dirname, '../upload')
    ];

    uploadDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        console.log(`📁 Upload directory does not exist: ${dir}`);
        return;
      }

      const files = fs.readdirSync(dir);
      const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hour ago

      let cleanedCount = 0;
      files.forEach(file => {
        const filePath = path.join(dir, file);
        try {
          const stats = fs.statSync(filePath);
          
          // If file is older than 1 hour, delete it
          if (stats.mtime.getTime() < oneHourAgo) {
            fs.unlinkSync(filePath);
            cleanedCount++;
            console.log(`🧹 Cleaned up old temp file: ${filePath}`);
          }
        } catch (error) {
          console.error(`❌ Error checking/deleting old file ${filePath}:`, error.message);
        }
      });

      if (cleanedCount > 0) {
        console.log(`✅ Cleaned up ${cleanedCount} old temp files from ${dir}`);
      } else {
        console.log(`📁 No old temp files found in ${dir}`);
      }
    });
  } catch (error) {
    console.error('❌ Error in cleanupOldTempFiles:', error.message);
  }
};

// Force cleanup all files from upload directories (use with caution)
export const forceCleanupAllTempFiles = () => {
  try {
    const uploadDirs = [
      path.join(__dirname, '../uploads'),
      path.join(__dirname, '../upload')
    ];

    uploadDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        console.log(`📁 Upload directory does not exist: ${dir}`);
        return;
      }

      const files = fs.readdirSync(dir);
      let cleanedCount = 0;

      files.forEach(file => {
        const filePath = path.join(dir, file);
        try {
          const stats = fs.statSync(filePath);
          if (stats.isFile()) {
            fs.unlinkSync(filePath);
            cleanedCount++;
            console.log(`🧹 Force cleaned temp file: ${filePath}`);
          }
        } catch (error) {
          console.error(`❌ Error force deleting file ${filePath}:`, error.message);
        }
      });

      if (cleanedCount > 0) {
        console.log(`✅ Force cleaned ${cleanedCount} temp files from ${dir}`);
      } else {
        console.log(`📁 No temp files found in ${dir}`);
      }
    });
  } catch (error) {
    console.error('❌ Error in forceCleanupAllTempFiles:', error.message);
  }
};

export default {
  cleanupTempFiles,
  cleanupOldTempFiles,
  forceCleanupAllTempFiles
};
