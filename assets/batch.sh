#!/usr/bin/env bash
# Generates the full Memory Atlas asset set via gpt-5.4-image-2.
cd "$(dirname "$0")"
S="minimalist 3D app icon, isolated single object centered on a deep near-black background (#06070d), glowing teal (#5eead4) and cyan accents, frosted glass and brushed aluminium materials, premium dark-tech aesthetic, soft studio rim light, subtle depth of field, crisp and readable at small sizes. No text, no words, no letters, no logos, no brand names."

run(){ python gen.py "$2" "$1" --aspect "${3:-1:1}" 2>&1 | tail -1; }

run asml.png "A single extreme-ultraviolet lithography light engine: one intense focused beam of white-blue light refracting through a stack of precision optical mirrors and a lens, sharp photon ray, optics. $S"
run ajinomoto.png "A stack of a few ultra-thin translucent insulating film sheets (build-up substrate layers) floating and slightly separated, faint iridescent sheen, layered material. $S"
run skhynix.png "A high-bandwidth memory stack: several square silicon memory chips stacked vertically into a cube, connected by tiny glowing copper pillars between the layers, 3D stacked. $S"
run astera.png "An interconnect fabric symbol: one central glowing hub node with many fine luminous data-link trails routing outward to several smaller nodes, network mesh, signal routing. $S"
run hbm.png "A glowing high-bandwidth-memory cube of stacked silicon dies sitting on a processor, fast data streaming, on-package memory. $S"
run cxl.png "A coherent memory-pool symbol: several small memory blocks linked to a central switch by glowing coherent links, shared pooled memory. $S"
# cinematic concept art (16:9) for 3D inspiration / backdrops
run concept_photonics.png "Cinematic concept art, ultra-detailed: silicon photonics. A microscopic silicon waveguide on a chip carrying a single beam of light that splits into a rainbow of separate parallel colored light streams (wavelength-division multiplexing), co-packaged optics glowing beside a processor die, fibre-optic light trails, dark futuristic laboratory, teal and full-spectrum colors, shallow depth of field, no text." 16:9
run concept_wall.png "Cinematic concept art, ultra-detailed: 'the memory wall'. A colossal glowing translucent barrier holding back a vast surging luminous ocean of data; on the near side a small intensely glowing processor straining, dwarfed by an enormous reservoir of memory behind the wall; dramatic scale, dark, teal and warm amber light, conceptual metaphor, no text." 16:9
echo "BATCH DONE"; ls -la *.png
