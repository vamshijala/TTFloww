
import React, { useState } from 'react';
import { Upload, Download, File, Image, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface SharedFile {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  timestamp: string;
}

const FileSharePanel = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<SharedFile[]>([
    {
      id: 1,
      name: 'Product Mockups.figma',
      type: 'design',
      size: '2.4 MB',
      uploadedBy: 'Sarah Wilson',
      timestamp: '2:05 PM'
    },
    {
      id: 2,
      name: 'Meeting Notes.pdf',
      type: 'pdf',
      size: '156 KB',
      uploadedBy: 'You',
      timestamp: '2:03 PM'
    },
    {
      id: 3,
      name: 'Architecture Diagram.png',
      type: 'image',
      size: '890 KB',
      uploadedBy: 'Mike Chen',
      timestamp: '2:01 PM'
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const file = fileList[0];
    
    // Validate file size (20MB limit)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 20MB",
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Supported formats: PDF, PNG, JPEG, DOCX",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add file to list
          const newFile: SharedFile = {
            id: files.length + 1,
            name: file.name,
            type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document',
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadedBy: 'You',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          
          setFiles(prev => [newFile, ...prev]);
          
          toast({
            title: "File uploaded",
            description: `${file.name} has been shared with the team`,
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5 text-green-600" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      default: return <File className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleDownload = (file: SharedFile) => {
    toast({
      title: "Download started",
      description: `Downloading ${file.name}`,
    });
  };

  const handleRemoveFile = (fileId: number) => {
    setFiles(files.filter(f => f.id !== fileId));
    toast({
      description: "File removed from shared files",
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">File Sharing</h2>
        <p className="text-sm text-gray-500">Supported: PDF, PNG, JPEG, DOCX — up to 20MB</p>
      </div>

      {/* Upload Area */}
      <div className="p-4 border-b border-gray-100">
        <div
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-[#0066FF] bg-[#0066FF]/5' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
            accept=".pdf,.png,.jpg,.jpeg,.docx"
          />
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-[#0066FF]" />
            </div>
            <p className="text-gray-700 font-medium mb-1">
              Drop files or click to upload
            </p>
            <p className="text-sm text-gray-500">
              PDF, PNG, JPEG, DOCX up to 20MB
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Uploading...</span>
              <span className="text-sm text-gray-600">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {files.map((file) => (
            <Card key={file.id} className="border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.uploadedBy}</span>
                        <span>•</span>
                        <span>{file.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleDownload(file)}
                      variant="ghost"
                      size="sm"
                      className="text-[#0066FF] hover:text-[#0066FF]/80"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    {file.uploadedBy === 'You' && (
                      <Button
                        onClick={() => handleRemoveFile(file.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          {files.length} files shared in this room
        </p>
      </div>
    </div>
  );
};

export default FileSharePanel;
