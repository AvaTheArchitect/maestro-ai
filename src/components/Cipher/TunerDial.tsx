'use client';
import React from 'react';

export default function TunerDial({ freq, cents }) {
    const deviation = Math.abs(cents);
    const status = deviation < 5 ? 'perfect' : deviation < 15 ? 'close' : 'off';
    const color = status === 'perfect' ? 'bg-green-500' : status === 'close' ? 'bg-yellow-400' : 'bg-red-500';

    return (
        <div className="flex flex-col items-center p-4">
            <div className={`w-24 h-24 rounded-full ${color} flex items-center justify-center text-white text-2xl`}>
                {status === 'perfect' ? '😊' : status === 'close' ? '😐' : '😬'}
            </div>
            <div className="text-sm mt-2 text-gray-300">{freq.toFixed(2)} Hz / {cents.toFixed(1)}¢</div>
        </div>
    );
}
