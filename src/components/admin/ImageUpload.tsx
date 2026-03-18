import React, { useRef } from 'react';
import { X, ImagePlus, GripVertical } from 'lucide-react';

interface ImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  max?: number;
}

export default function ImageUpload({ value, onChange, max = 4 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = max - value.length;
    const toProcess = Array.from(files).slice(0, remaining);

    toProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange([...value, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {value.map((img, i) => (
          <div key={i} className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border group bg-muted">
            <img src={img} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-2 right-2 bg-foreground/70 text-primary-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-noor"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="absolute top-2 left-2 text-primary-foreground/70">
              <GripVertical className="h-4 w-4" />
            </div>
          </div>
        ))}
        {value.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            className="aspect-[4/5] rounded-lg border-2 border-dashed border-border hover:border-accent flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent transition-noor cursor-pointer"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs">Ajouter</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <p className="text-xs text-muted-foreground">{value.length}/{max} images • Glissez-déposez ou cliquez pour ajouter</p>
    </div>
  );
}
