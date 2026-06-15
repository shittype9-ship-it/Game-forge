import React from 'react';

const AssetLibrary = () => {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-sm mb-4">Assets</h3>
      <div className="space-y-2">
        <div className="bg-slate-700 rounded p-3 cursor-pointer hover:bg-slate-600 transition-colors">
          <p className="text-sm font-medium">Sprites</p>
        </div>
        <div className="bg-slate-700 rounded p-3 cursor-pointer hover:bg-slate-600 transition-colors">
          <p className="text-sm font-medium">Models</p>
        </div>
        <div className="bg-slate-700 rounded p-3 cursor-pointer hover:bg-slate-600 transition-colors">
          <p className="text-sm font-medium">Audio</p>
        </div>
        <div className="bg-slate-700 rounded p-3 cursor-pointer hover:bg-slate-600 transition-colors">
          <p className="text-sm font-medium">Fonts</p>
        </div>
      </div>
    </div>
  );
};

export default AssetLibrary;
