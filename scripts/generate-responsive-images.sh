#!/bin/bash

# Script de génération d'images responsives
# Usage: ./generate-responsive-images.sh [dossier-source]

SOURCE_DIR="${1:-../src/assets/images}"
OUTPUT_DIR="../src/assets/images/responsive"

# Créer les dossiers nécessaires
mkdir -p "$OUTPUT_DIR"

echo "🖼️ Génération d'images responsives optimisées..."

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de conversion pour chaque image
process_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    
    echo -e "${BLUE}📸 Traitement: $filename${NC}"
    
    # Vérifier que le fichier existe
    if [ ! -f "$input_file" ]; then
        echo -e "${RED}❌ Fichier non trouvé: $input_file${NC}"
        return 1
    fi
    
    # Génerer les différentes tailles
    local sizes=(400 800 1200 1600)
    
    for size in "${sizes[@]}"; do
        # WebP optimisé
        magick "$input_file" \
            -resize "${size}x${size}>" \
            -quality 85 \
            -define webp:lossless=false \
            "$OUTPUT_DIR/${name_without_ext}-${size}w.webp"
            
        # AVIF pour navigateurs très modernes
        magick "$input_file" \
            -resize "${size}x${size}>" \
            -quality 80 \
            "$OUTPUT_DIR/${name_without_ext}-${size}w.avif"
    done
    
    # Version WebP originale
    magick "$input_file" \
        -quality 90 \
        -define webp:lossless=false \
        "$OUTPUT_DIR/${name_without_ext}.webp"
    
    # Version AVIF originale
    magick "$input_file" \
        -quality 85 \
        "$OUTPUT_DIR/${name_without_ext}.avif"
    
    echo -e "${GREEN}✅ Généré: ${name_without_ext} (${#sizes[@]} tailles)${NC}"
}

# Traitement des images lourdes identifiées
HEAVY_IMAGES=(
    "victorhugo.jpg"
    "ArcanaGame_Logo_detourer.png" 
    "grimoire.png"
    "kasa.png"
    "m.png"
)

echo "🎯 Images lourdes à optimiser:"
for img in "${HEAVY_IMAGES[@]}"; do
    if [ -f "$SOURCE_DIR/$img" ]; then
        echo "  • $img ($(du -h "$SOURCE_DIR/$img" | cut -f1))"
        process_image "$SOURCE_DIR/$img"
    else
        echo -e "${RED}  ❌ Non trouvé: $img${NC}"
    fi
done

# Statistiques de compression
echo ""
echo "📊 Statistiques de compression:"
echo "Original total: $(du -sh "$SOURCE_DIR" 2>/dev/null | cut -f1)"
echo "Responsive total: $(du -sh "$OUTPUT_DIR" 2>/dev/null | cut -f1)"

# Générer le manifest JSON des images
cat > "$OUTPUT_DIR/images-manifest.json" << EOF
{
  "generated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "images": [
EOF

first=true
for img in "${HEAVY_IMAGES[@]}"; do
    name_without_ext="${img%.*}"
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$OUTPUT_DIR/images-manifest.json"
    fi
    
    cat >> "$OUTPUT_DIR/images-manifest.json" << EOF
    {
      "name": "$name_without_ext",
      "sizes": [400, 800, 1200, 1600],
      "formats": ["webp", "avif"]
    }
EOF
done

cat >> "$OUTPUT_DIR/images-manifest.json" << EOF

  ]
}
EOF

echo ""
echo -e "${GREEN}🎉 Optimisation terminée!${NC}"
echo -e "${BLUE}📁 Images générées dans: $OUTPUT_DIR${NC}"
echo -e "${BLUE}📋 Manifest: $OUTPUT_DIR/images-manifest.json${NC}"