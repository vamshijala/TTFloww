
import React, { useState } from 'react';
import { 
  PenTool, Eraser, Square, Circle, Minus, Undo, Redo, 
  Download, Trash2, Users, Lock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

type Tool = 'pen' | 'eraser' | 'line' | 'square' | 'circle';

const WhiteboardCanvas = () => {
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [penColor, setPenColor] = useState('#0066FF');
  const [allowAllUsers, setAllowAllUsers] = useState(false);
  const [canDraw, setCanDraw] = useState(true);

  const colors = ['#0066FF', '#000000', '#FF0000', '#00AA00', '#FFA500', '#800080'];

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool);
    toast({
      description: `${tool.charAt(0).toUpperCase() + tool.slice(1)} tool selected`,
    });
  };

  const handleUndo = () => {
    toast({
      description: "Undid last action",
    });
  };

  const handleRedo = () => {
    toast({
      description: "Redid last action",
    });
  };

  const handleExport = () => {
    toast({
      title: "Whiteboard exported",
      description: "Canvas saved as whiteboard.png",
    });
  };

  const handleClearBoard = () => {
    toast({
      title: "Board cleared",
      description: "All drawings have been removed",
    });
  };

  const togglePermissions = () => {
    setAllowAllUsers(!allowAllUsers);
    toast({
      description: allowAllUsers 
        ? "Drawing restricted to host only" 
        : "All users can now draw",
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Whiteboard</h2>
            <p className="text-sm text-gray-500">Sketch ideas. Collaborate visually.</p>
          </div>
          <Button
            onClick={togglePermissions}
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            {allowAllUsers ? <Users className="w-4 h-4 mr-1" /> : <Lock className="w-4 h-4 mr-1" />}
            {allowAllUsers ? 'All can draw' : 'Host only'}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          {/* Drawing Tools */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-2xl p-2">
            <Button
              onClick={() => handleToolChange('pen')}
              variant={activeTool === 'pen' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-xl"
            >
              <PenTool className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleToolChange('eraser')}
              variant={activeTool === 'eraser' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-xl"
            >
              <Eraser className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleToolChange('line')}
              variant={activeTool === 'line' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-xl"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleToolChange('square')}
              variant={activeTool === 'square' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-xl"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleToolChange('circle')}
              variant={activeTool === 'circle' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-xl"
            >
              <Circle className="w-4 h-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleUndo}
              variant="ghost"
              size="sm"
              className="rounded-xl"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleRedo}
              variant="ghost"
              size="sm"
              className="rounded-xl"
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleExport}
              variant="ghost"
              size="sm"
              className="rounded-xl"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleClearBoard}
              variant="ghost"
              size="sm"
              className="rounded-xl text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 mr-2">Color:</span>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setPenColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                penColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-4 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          {/* Canvas would be implemented here with actual drawing functionality */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <PenTool className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium">Start Drawing</p>
              <p className="text-sm">Select a tool and click to start</p>
              {!canDraw && (
                <p className="text-sm text-red-500 mt-2">
                  Drawing restricted to host.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Tool: {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}</span>
          <span>Color: {penColor}</span>
          <span>{allowAllUsers ? 'Collaborative mode' : 'Host only mode'}</span>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardCanvas;
