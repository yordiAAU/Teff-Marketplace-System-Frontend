import { useCallback, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({
  files,
  onChange,
  maxFiles = 10,
  accept = "image/*",
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
      const merged = [...files, ...list].slice(0, maxFiles);
      onChange(merged);
    },
    [files, maxFiles, onChange]
  );

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-slate-200 hover:border-primary hover:bg-primary/5"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple
          className="hidden"
          id="file-upload-input"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <label htmlFor="file-upload-input" className="cursor-pointer">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Upload size={32} />
          </div>
          <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-500">PNG, JPG or WEBP (max. 5MB each, up to {maxFiles})</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="group relative overflow-hidden rounded-xl border border-slate-200">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-24 w-full object-cover"
              />
              <button
               title="uplode"
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={12} />
              </button>
              <p className="truncate px-2 py-1 text-xs text-slate-500">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ImageIcon size={14} />
          No images selected
        </div>
      )}
    </div>
  );
}

export function ImagePreviewGrid({ urls }: { urls: string[] }) {
  if (!urls.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {urls.map((url) => (
        <img key={url} src={url} alt="" className="h-24 w-full rounded-xl border border-slate-200 object-cover" />
      ))}
    </div>
  );
}
