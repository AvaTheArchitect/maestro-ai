"use client"

import React, { useState, useEffect } from "react"
import { Guitar, Mic, Music, Settings, Headphones } from "lucide-react"

export type TabId = "practice" | "singers" | "build" | "stem" | "tuner"

export default function MaestroApp() {
  const [activeTab, setActiveTab] = useState<TabId>("practice")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const checkPassword = () => {
    if (password === "guitar2025") {
      setIsAuthenticated(true)
      sessionStorage.setItem("maestro-authenticated", "true")
    } else {
      alert("Incorrect password")
      setPassword("")
    }
  }

  useEffect(() => {
    const authenticated = sessionStorage.getItem("maestro-authenticated")
    if (authenticated === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎸 Maestro.AI</h2>
          <p className="text-gray-600 text-lg mb-2">Guitar Practice Suite</p>
          <p className="text-gray-500 text-sm mb-6">Enter password to access beta</p>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkPassword()}
            placeholder="Enter password"
            className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg mb-4 focus:border-purple-500 focus:outline-none"
            autoFocus
          />
          
          <button
            onClick={checkPassword}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
          >
            Access App
          </button>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case "practice":
        return (
          <div className="p-6 space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent text-center mb-6">
              🎸 Practice Generator
            </h1>
            
            <div className="grid grid-cols-2 gap-4">
              {["Guitar", "Shred", "Country", "Worship", "Acoustic", "Modern Rock"].map((path) => (
                <button 
                  key={path}
                  className="p-4 bg-blue-500/10 backdrop-blur-lg rounded-xl border border-blue-300/30 hover:border-blue-400/50 transition-all duration-300"
                >
                  <span className="font-medium text-blue-300">{path}</span>
                </button>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="font-semibold mb-4 text-orange-400">📊 Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Practice Time Today</span>
                    <span>42 min / 60 min</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full" style={{width: "68%"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "singers":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">🎤 Singer&apos;s Corner</h2>
            <p className="text-purple-200 text-center">Ken Tamplin Vocal Academy Training System</p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "💋", name: "Lip Trills", desc: "Relaxation and breath support" },
                { icon: "🌊", name: "Vocal Sirens", desc: "Smooth register transitions" },
                { icon: "🎵", name: "Humming Scales", desc: "Resonance development" },
                { icon: "🗣️", name: "MAH Exercise", desc: "Open throat training" }
              ].map((exercise) => (
                <div
                  key={exercise.name}
                  className="bg-purple-500/10 backdrop-blur-lg rounded-xl p-4 border border-purple-300/30 text-center"
                >
                  <div className="text-2xl mb-2">{exercise.icon}</div>
                  <div className="font-semibold text-purple-300">{exercise.name}</div>
                  <div className="text-xs text-purple-200">{exercise.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case "build":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-green-400 text-center mb-6">🎼 Song Builder AI</h2>
            
            <div className="bg-green-500/10 backdrop-blur-lg rounded-xl p-6 border border-green-300/30">
              <h3 className="font-semibold text-green-400 mb-4">🎸 Chord Progression Builder</h3>
              <div className="flex space-x-2 mb-4">
                {["C", "Am", "F", "G"].map((chord) => (
                  <button key={chord} className="px-4 py-2 bg-green-400/20 rounded-lg hover:bg-green-400/30 transition-colors">
                    {chord}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-green-500/10 backdrop-blur-lg rounded-xl p-6 border border-green-300/30">
              <h3 className="font-semibold text-green-400 mb-4">✍️ Lyrics</h3>
              <textarea 
                className="w-full h-32 p-4 bg-green-400/10 border border-green-300/30 rounded-lg text-white placeholder-green-200/50 resize-none" 
                placeholder="Write your lyrics here..."
              ></textarea>
            </div>
          </div>
        )

      case "stem":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-orange-400 text-center mb-6">🎧 AI Stem & Tab Studio</h2>
            
            <div className="bg-orange-500/10 backdrop-blur-lg rounded-xl p-6 border-2 border-dashed border-orange-300/50 text-center">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="font-semibold text-orange-400 mb-2">Upload Your Track</h3>
              <p className="text-orange-200 mb-4">Drop your audio file here or click to browse</p>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        )

      case "tuner":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-red-400 text-center mb-6">🔥 Flame Tuner Pro</h2>
            
            <div className="bg-red-500/10 backdrop-blur-lg rounded-xl p-6 border border-red-300/30 text-center">
              <div className="w-64 h-64 mx-auto mb-6 border-4 border-red-400/60 rounded-full bg-gradient-to-br from-red-900/50 to-gray-900/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">Play a note</div>
                  <div className="text-sm text-red-300">0 Hz</div>
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold">
                Start Enhanced Tuning
              </button>
            </div>
          </div>
        )

      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen text-white">
      <div className="pb-20 min-h-screen">
        {renderTabContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-black/80 backdrop-blur-lg border-t border-gray-700">
        <div className="flex justify-around py-2">
          {[
            { id: "practice", icon: Guitar, label: "Practice", color: "text-blue-500" },
            { id: "singers", icon: Mic, label: "Singers Corner", color: "text-purple-500" },
            { id: "build", icon: Music, label: "Build a Song", color: "text-green-500" },
            { id: "stem", icon: Headphones, label: "AI Stem & Tab", color: "text-orange-500" },
            { id: "tuner", icon: Settings, label: "Tuner", color: "text-red-500" }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex flex-col items-center p-3 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? `${tab.color} transform scale-110` 
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}