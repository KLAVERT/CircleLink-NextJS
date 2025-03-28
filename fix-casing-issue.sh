#!/bin/bash

# Navigate to the project directory
cd /mnt/sda/website/circlelink

# Check if both files exist
if [ -f "src/app/[locale]/games/ark/_components/reviewSection.tsx" ] && [ -f "src/app/[locale]/games/ark/_components/ReviewSection.tsx" ]; then
  echo "Both files exist, removing the lowercase one..."
  
  # Remove the lowercase file
  rm "src/app/[locale]/games/ark/_components/reviewSection.tsx"
  
  echo "File removed successfully!"
else
  echo "Could not find both files. Please check the paths."
  
  # List the files to see what's there
  echo "Files in the directory:"
  ls -la "src/app/[locale]/games/ark/_components/"
fi

echo "Done!" 