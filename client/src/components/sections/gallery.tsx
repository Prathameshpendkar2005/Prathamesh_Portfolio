import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Camera, Filter, X } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

// Import the images with proper paths
import projectsImage from "@assets/image_1756967533758.png";
import teamImage from "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg";
import araplImage from "@assets/ARAPL_1756967719523.jpg";
import techblueImage from "@assets/image_1756967840745.png";
import digitalForensicsImage from "@assets/Digital_forensics_essentials_1756967862712.png";
import bloggersconImage from "@assets/Prathamesh_Pendkar_1756967941797.png";

// Map the image paths to imported modules
const imageMap = {
  "@assets/image_1756967533758.png": projectsImage,
  "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg": teamImage,
  "@assets/ARAPL_1756967719523.jpg": araplImage,
  "@assets/image_1756967840745.png": techblueImage,
  "@assets/Digital_forensics_essentials_1756967862712.png": digitalForensicsImage,
  "@assets/Prathamesh_Pendkar_1756967941797.png": bloggersconImage,
};

const categoryLabels = {
  project: "Projects",
  certificate: "Certificates", 
  team: "Team",
  achievement: "Achievements"
};

const categoryColors = {
  project: "text-neon",
  certificate: "text-accent",
  team: "text-blue-400",
  achievement: "text-purple-400"
};

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  if (isLoading) {
    return (
      <section id="gallery" className="min-h-screen py-20 px-4" data-testid="gallery-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-neon font-mono">Loading gallery...</div>
        </div>
      </section>
    );
  }

  const filteredItems = selectedCategory 
    ? galleryItems?.filter(item => item.category === selectedCategory)
    : galleryItems;

  const categories = Array.from(new Set(galleryItems?.map(item => item.category) || []));

  return (
    <section id="gallery" className="min-h-screen py-20 px-4" data-testid="gallery-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Camera size={36} />
            Achievements Gallery
          </h2>
          <p className="text-muted">Professional milestones and certifications</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <TerminalWindow title="filter.sh">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
                  !selectedCategory 
                    ? 'bg-neon text-background' 
                    : 'bg-terminal text-muted hover:text-neon'
                }`}
                data-testid="filter-all"
              >
                <Filter size={16} className="inline mr-2" />
                All ({galleryItems?.length || 0})
              </button>
              {categories.map(category => {
                const count = galleryItems?.filter(item => item.category === category).length || 0;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent text-background'
                        : 'bg-terminal text-muted hover:text-accent'
                    }`}
                    data-testid={`filter-${category}`}
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]} ({count})
                  </button>
                );
              })}
            </div>
          </TerminalWindow>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems?.map((item) => {
            const imageSrc = imageMap[item.imagePath as keyof typeof imageMap];
            return (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
                data-testid={`gallery-item-${item.id}`}
              >
                <TerminalWindow 
                  title={`${item.category}.${item.id}`}
                  hover
                  className="h-full"
                >
                  <div>
                    <div className="aspect-video mb-4 rounded overflow-hidden bg-terminal">
                      <img 
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono px-2 py-1 rounded bg-terminal ${categoryColors[item.category as keyof typeof categoryColors]}`}>
                          {categoryLabels[item.category as keyof typeof categoryLabels]}
                        </span>
                        {item.date && (
                          <span className="text-xs text-muted font-mono">{item.date}</span>
                        )}
                      </div>
                      
                      <h3 className="font-mono font-bold text-foreground group-hover:text-neon transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted font-mono line-clamp-2 group-hover:text-accent transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            );
          })}
        </div>

        {(!filteredItems || filteredItems.length === 0) && (
          <div className="text-center py-12">
            <TerminalWindow title="empty.log">
              <p className="text-muted font-mono">No items found for the selected category.</p>
            </TerminalWindow>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          data-testid="image-modal"
        >
          <div
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <TerminalWindow title={`${selectedImage.category}.${selectedImage.id} - Full View`}>
              <div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-neon text-background p-2 rounded hover:bg-accent transition-colors"
                  data-testid="close-modal"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-4">
                  <img 
                    src={imageMap[selectedImage.imagePath as keyof typeof imageMap]}
                    alt={selectedImage.title}
                    className="w-full h-auto rounded"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-mono px-3 py-1 rounded bg-terminal ${categoryColors[selectedImage.category as keyof typeof categoryColors]}`}>
                      {categoryLabels[selectedImage.category as keyof typeof categoryLabels]}
                    </span>
                    {selectedImage.date && (
                      <span className="text-sm text-muted font-mono">{selectedImage.date}</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-mono font-bold text-neon">
                    {selectedImage.title}
                  </h3>
                  
                  <p className="text-muted font-mono">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      )}
    </section>
  );
}