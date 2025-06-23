'use client';
import React from 'react';

export default function VisualFeedHUD({ bounds, label }) {
    if (!bounds) return null;

    const { top, left, width, height } = bounds;
    return (
        <div
            className="fixed border-2 border-red-500 z-50 pointer-events-none text-xs text-white bg-black/50 px-2"
            style={{ top, left, width, height }}
        >
            {label || 'Element'}
        </div>
    );
}
