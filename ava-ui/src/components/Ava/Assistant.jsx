{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 AppleColorEmoji;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww37900\viewh19680\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import useVoiceCommand from "@/hooks/useVoiceCommand";\
\
export default function AvaAssistant(\{ onCommand \}) \{\
  useVoiceCommand((spoken) => \{\
    console.log("
\f1 \uc0\u55356 \u57255 
\f0  Ava heard:", spoken);\
    onCommand?.(spoken);\
  \});\
\
  return (\
    <div className="fixed bottom-4 right-4 p-4 bg-purple-800 text-white rounded-xl shadow-xl z-50">\
      <p className="text-sm font-bold">
\f1 \uc0\u55356 \u57252 
\f0  Ava Listening\'85</p>\
    </div>\
  );\
\}\
}