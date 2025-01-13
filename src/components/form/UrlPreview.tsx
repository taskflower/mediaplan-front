// src/components/form/UrlPreview.tsx
interface UrlPreviewProps {
    url: string;
    label?: string;
  }
  
  export const UrlPreview: React.FC<UrlPreviewProps> = ({
    url,
    label = 'Analizowany URL'
  }) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium ">
          {label}
        </label>
        <div className=" p-4 rounded-lg border border-gray-700">
          <p className="font-mono break-all">{url}</p>
        </div>
      </div>
    );
  };