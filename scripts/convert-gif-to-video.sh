#!/bin/bash

# Script de conversion GIF vers WebM/MP4 optimisé
# Usage: ./convert-gif-to-video.sh input.gif

INPUT_GIF="$1"
OUTPUT_DIR="../src/assets/videos"
FILENAME=$(basename "$INPUT_GIF" .gif)

# Créer le dossier videos si nécessaire
mkdir -p "$OUTPUT_DIR"

echo "🎬 Conversion de $INPUT_GIF en vidéo optimisée..."

# Conversion WebM (VP8) - Très efficace pour animations
ffmpeg -i "$INPUT_GIF" \
  -c:v libvpx \
  -crf 20 \
  -b:v 0 \
  -an \
  -loop 0 \
  -auto-alt-ref 0 \
  "$OUTPUT_DIR/${FILENAME}.webm" \
  -y

# Conversion MP4 (H.264) - Compatibilité maximale  
ffmpeg -i "$INPUT_GIF" \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -crf 25 \
  -an \
  -movflags +faststart \
  "$OUTPUT_DIR/${FILENAME}.mp4" \
  -y

# Extraire une frame statique en WebP pour fallback
ffmpeg -i "$INPUT_GIF" \
  -vframes 1 \
  -q:v 80 \
  "../src/assets/images/${FILENAME}-static.webp" \
  -y

# Statistiques de compression
echo "📊 Comparaison des tailles:"
echo "Original GIF: $(du -h "$INPUT_GIF" | cut -f1)"
echo "WebM: $(du -h "$OUTPUT_DIR/${FILENAME}.webm" | cut -f1)"
echo "MP4: $(du -h "$OUTPUT_DIR/${FILENAME}.mp4" | cut -f1)"
echo "WebP static: $(du -h "../src/assets/images/${FILENAME}-static.webp" | cut -f1)"

echo "✅ Conversion terminée!"
echo "📁 Fichiers générés dans: $OUTPUT_DIR/"