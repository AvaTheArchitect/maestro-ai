"use client"

import React, { useState, useEffect } from "react"
import { 
  Guitar, 
  Mic, 
  Music, 
  Settings, 
  Headphones,
  Home,
  Users,
  User,
  GraduationCap,
  Wrench,
  Brain,
  Timer,
  Play,
  Printer,
  ChevronDown,
  X,
  Sun,
  Moon,
  Palette
} from "lucide-react"

export type TabId = "home" | "songs" | "setlist" | "tools" | "profile"
export type ModuleId = "practice" | "singers" | "jam" | "lessons" | "build" | "ai-tab"

export default function MaestroApp(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [currentModule, setCurrentModule] = useState<ModuleId | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [toolDrawerOpen, setToolDrawerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  // Theme and settings state
  const [theme, setTheme] = useState<string>('light')
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const [highContrast, setHighContrast] = useState<boolean>(false)
  const [handedness, setHandedness] = useState<string>('right')
  const [language, setLanguage] = useState<string>('en')
  const [buttonColorMode, setButtonColorMode] = useState<boolean>(true)

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('maestro-theme') || 'light'
    const savedMotion = localStorage.getItem('maestro-reduced-motion') === 'true'
    const savedContrast = localStorage.getItem('maestro-high-contrast') === 'true'
    const savedHand = localStorage.getItem('maestro-handedness') || 'right'
    const savedLang = localStorage.getItem('maestro-language') || 'en'
    const savedButtonMode = localStorage.getItem('maestro-button-color-mode') !== 'false'
    
    setTheme(savedTheme)
    setReducedMotion(savedMotion)
    setHighContrast(savedContrast)
    setHandedness(savedHand)
    setLanguage(savedLang)
    setButtonColorMode(savedButtonMode)
  }, [])

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

  // Language translations
  const translations = {
    en: {
      title: 'MAESTRO.AI',
      subtitle: 'Your Complete AI-Powered Music Practice Suite',
      modules: {
        practice: { title: 'Practice Generator', desc: 'AI-powered practice sessions' },
        singers: { title: "Singer's Corner", desc: 'Vocal training & exercises' },
        jam: { title: 'Jam Zone', desc: 'Interactive jam sessions' },
        lessons: { title: "Teachers' Lessons", desc: 'Connect with instructors' },
        build: { title: 'Build a Song', desc: 'Composition tools' },
        'ai-tab': { title: 'AI Stem & Tab', desc: 'AI-powered transcription' }
      },
      nav: {
        songs: 'Songs',
        setlist: 'Setlist', 
        home: 'Home',
        tools: 'Tools',
        profile: 'Profile'
      }
    },
    es: {
      title: 'MAESTRO.AI',
      subtitle: 'Tu Suite Completa de Práctica Musical con IA',
      modules: {
        practice: { title: 'Generador de Práctica', desc: 'Sesiones de práctica con IA' },
        singers: { title: 'Rincón del Cantante', desc: 'Entrenamiento vocal y ejercicios' },
        jam: { title: 'Zona de Jam', desc: 'Sesiones de jam interactivas' },
        lessons: { title: 'Lecciones de Maestros', desc: 'Conecta con instructores' },
        build: { title: 'Construir una Canción', desc: 'Herramientas de composición' },
        'ai-tab': { title: 'IA Stem y Tab', desc: 'Transcripción con IA' }
      },
      nav: {
        songs: 'Canciones',
        setlist: 'Lista',
        home: 'Inicio', 
        tools: 'Herramientas',
        profile: 'Perfil'
      }
    }
  }

  const t = (translations as Record<string, any>)[language] || translations.en

  // Theme functions
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('maestro-theme', newTheme)
  }

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion
    setReducedMotion(newValue)
    localStorage.setItem('maestro-reduced-motion', newValue.toString())
  }

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem('maestro-high-contrast', newValue.toString())
  }

  const toggleButtonColorMode = () => {
    const newValue = !buttonColorMode
    setButtonColorMode(newValue)
    localStorage.setItem('maestro-button-color-mode', newValue.toString())
  }

  // Get module colors based on theme and button color mode (Version 29 colors)
  const getModuleColor = (moduleId: string): string => {
    if (theme === 'crayon') {
      // Crayon theme always stays multi-color (no override)
      const colors: Record<string, string> = {
        practice: 'from-purple-500 to-purple-700 shadow-lg shadow-purple-500/25',
        singers: 'from-pink-500 to-rose-700 shadow-lg shadow-pink-500/25',
        jam: 'from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25',
        lessons: 'from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/25',
        build: 'from-orange-500 to-orange-700 shadow-lg shadow-orange-500/25',
        'ai-tab': 'from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/25'
      }
      return colors[moduleId] || colors.practice
    }
    
    if (buttonColorMode) {
      // Multi-Color Buttons ON - vibrant multicolor
      const colors: Record<string, string> = {
        practice: 'from-purple-500 to-purple-700 shadow-lg shadow-purple-500/25',
        singers: 'from-pink-500 to-rose-700 shadow-lg shadow-pink-500/25',
        jam: 'from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25',
        lessons: 'from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/25',
        build: 'from-orange-500 to-orange-700 shadow-lg shadow-orange-500/25',
        'ai-tab': 'from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/25'
      }
      return colors[moduleId] || colors.practice
    } else {
      // Multi-Color Buttons OFF - Version 29 exact theme colors
      switch(theme) {
        case 'dark':
          return 'from-gray-600 to-gray-700 shadow-lg shadow-gray-600/25 text-blue-100' // 4b5563
        case 'purple-orange':
          return 'from-violet-700 to-violet-800 shadow-lg shadow-violet-700/25 text-violet-100' // 6d28d9
        case 'guitar-center':
          return 'from-red-700 to-red-800 shadow-lg shadow-red-700/25 text-red-100' // b91c1c
        case 'pro-studio':
          return 'from-blue-800 to-blue-900 shadow-lg shadow-blue-800/25 text-blue-100' // 1e3a8a
        default: // Purple theme - Version 29 exact blue (4338ca equivalent)
          return 'from-indigo-700 to-indigo-800 shadow-lg shadow-indigo-700/25 text-blue-100 border-indigo-600/30'
      }
    }
  }

  // Get theme classes
  const getThemeClasses = (): string => {
    const base = 'min-h-screen transition-colors duration-300'
    const motion = reducedMotion ? '' : 'transition-all duration-300'
    const contrast = highContrast ? 'contrast-125 saturate-125' : ''
    
    switch(theme) {
      case 'dark':
        return `${base} ${motion} ${contrast} bg-gray-900 text-white`
      case 'crayon':
        return `${base} ${motion} ${contrast} bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-500 text-white`
      case 'purple-orange':
        return `${base} ${motion} ${contrast} bg-gradient-to-br from-purple-500 via-purple-600 to-orange-500 text-white`
      case 'guitar-center':
        return `${base} ${motion} ${contrast} bg-gradient-to-br from-red-600 via-red-700 to-black text-white`
      case 'pro-studio':
        return `${base} ${motion} ${contrast} bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white`
      default:
        return `${base} ${motion} ${contrast} bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white`
    }
  }

  const getTitleColor = (): string => {
    switch(theme) {
      case 'dark':
        return 'text-white'
      case 'crayon':
        return 'text-white'
      case 'purple-orange':
        return 'text-orange-500'
      case 'guitar-center':
        return 'text-red-400'
      case 'pro-studio':
        return 'text-blue-400'
      default: // Version 29 - Exact orange from screenshots
        return 'text-orange-500 font-bold tracking-wide'
    }
  }

  // Main modules configuration
  const modules = [
    { 
      id: 'practice' as ModuleId, 
      title: t.modules.practice.title, 
      icon: Guitar, 
      color: getModuleColor('practice'),
      description: t.modules.practice.desc
    },
    { 
      id: 'singers' as ModuleId, 
      title: t.modules.singers.title, 
      icon: Mic, 
      color: getModuleColor('singers'),
      description: t.modules.singers.desc
    },
    { 
      id: 'jam' as ModuleId, 
      title: t.modules.jam.title, 
      icon: Music, 
      color: getModuleColor('jam'),
      description: t.modules.jam.desc
    },
    { 
      id: 'lessons' as ModuleId, 
      title: t.modules.lessons.title, 
      icon: GraduationCap, 
      color: getModuleColor('lessons'),
      description: t.modules.lessons.desc
    },
    { 
      id: 'build' as ModuleId, 
      title: t.modules.build.title, 
      icon: Wrench, 
      color: getModuleColor('build'),
      description: t.modules.build.desc
    },
    { 
      id: 'ai-tab' as ModuleId, 
      title: t.modules['ai-tab'].title, 
      icon: Brain, 
      color: getModuleColor('ai-tab'),
      description: t.modules['ai-tab'].desc
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">🎸 Maestro.AI</h2>
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

  const ModuleTile = ({ module, onClick }: { module: Record<string, any>; onClick: () => void }) => {
    const animationClass = reducedMotion 
      ? 'transform transition-colors duration-200' 
      : 'transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95'
    
    return (
      <div 
        className={`
          relative overflow-hidden rounded-2xl cursor-pointer ${animationClass}
          focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-opacity-75
          bg-gradient-to-br ${module.color}
          p-6 sm:p-8 md:p-6 lg:p-8
          min-h-[120px] sm:min-h-[140px] md:min-h-[160px]
          flex flex-col justify-between
          border border-white/10
          ${!reducedMotion ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        `}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Open ${module.title} - ${module.description}`}
      >
        <div className="flex items-start justify-between mb-4">
          <module.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/90 drop-shadow-lg" aria-hidden="true" />
          <div className="w-2 h-2 bg-white/30 rounded-full shadow-inner" aria-hidden="true"></div>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 font-sans drop-shadow-md">
            {module.title}
          </h3>
          <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed drop-shadow-sm">
            {module.description}
          </p>
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" aria-hidden="true"></div>
      </div>
    )
  }

  const renderMainContent = (): React.JSX.Element => {
    if (currentModule) {
      const moduleData = modules.find(m => m.id === currentModule)
      if (!moduleData) {
        return (
          <div className="flex-1 p-6 pb-24">
            <div className="text-center text-white">Module not found</div>
          </div>
        )
      }

      return (
        <div className="flex-1 p-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setCurrentModule(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-4"
              >
                <Home className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {moduleData.title}
                </h1>
                <p className="text-white/70">{moduleData.description}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-center py-12">
                <moduleData.icon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {moduleData.title} Module
                </h3>
                <p className="text-white/70 mb-6">
                  This module is under development. Coming soon with full functionality!
                </p>

                {currentModule === 'lessons' && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mt-6">
                    <h4 className="text-green-300 font-bold mb-2">🎓 Teachers&apos; Connection Hub</h4>
                    <p className="text-green-200 text-sm">
                      Connect with local instructors, upload practice videos, get feedback,
                      and maintain your lesson schedule. Perfect companion for Guitar Center
                      lessons and independent teachers.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 p-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl ${getTitleColor()} mb-4`}>
              {t.title}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {modules.map((module) => (
              <ModuleTile
                key={module.id}
                module={module}
                onClick={() => setCurrentModule(module.id as ModuleId)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={getThemeClasses()}>
      {/* Corner fade shadows */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-tl from-black/30 via-transparent to-transparent pointer-events-none" />
      
      <div className="flex flex-col min-h-screen relative z-10">
        {renderMainContent()}
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
          <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
            {[
              { id: 'songs', icon: Music, label: t.nav.songs },
              { id: 'setlist', icon: Users, label: t.nav.setlist },
              { id: 'home', icon: Home, label: t.nav.home },
              { id: 'tools', icon: Settings, label: t.nav.tools },
              { id: 'profile', icon: User, label: t.nav.profile }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'tools') {
                    setToolDrawerOpen(!toolDrawerOpen)
                  } else if (item.id === 'home') {
                    setActiveTab('home')
                    setCurrentModule(null)
                  } else {
                    setActiveTab(item.id as TabId)
                  }
                }}
                className={`
                  flex flex-col items-center p-3 rounded-xl transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                  ${(activeTab === item.id) || (item.id === 'home' && !currentModule)
                    ? 'text-blue-400 bg-blue-400/20' 
                    : 'text-white hover:text-white/80'
                  }
                `}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium font-sans tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Drawer */}
        <div className={`
          fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300
          ${toolDrawerOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <div className="bg-white/10 backdrop-blur-lg rounded-t-3xl p-6 border-t border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Practice Tools</h3>
              <button 
                onClick={() => setToolDrawerOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { id: 'metronome', icon: Timer, label: 'Metronome' },
                { id: 'tuner', icon: Headphones, label: 'Tuner' },
                { id: 'print', icon: Printer, label: 'Print' },
                { id: 'settings', icon: Settings, label: 'Settings' }
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    if (tool.id === 'settings') {
                      setSettingsOpen(true)
                    }
                    setToolDrawerOpen(false)
                  }}
                  className="flex flex-col items-center p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <tool.icon className="w-8 h-8 text-white mb-2" />
                  <span className="text-white text-sm font-medium">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <div className={`
          fixed inset-0 z-50 flex items-center justify-center p-4
          ${settingsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          transition-opacity duration-300
        `}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setSettingsOpen(false)} />
          
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md border border-white/20 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Settings</h3>
              <button 
                onClick={() => setSettingsOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Theme Selection */}
              <div>
                <h4 className="text-white font-medium mb-3">Theme</h4>
                <div className="space-y-2">
                  {[
                    { id: 'light', label: 'Default Purple', icon: Sun },
                    { id: 'dark', label: 'Dark Mode', icon: Moon },
                    { id: 'purple-orange', label: 'Purple & Orange', icon: Palette },
                    { id: 'crayon', label: 'Crayon Colors', icon: Palette },
                    { id: 'guitar-center', label: 'Guitar Center Red', icon: Guitar },
                    { id: 'pro-studio', label: 'Pro Studio Blue', icon: Headphones }
                  ].map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => changeTheme(themeOption.id)}
                      className={`
                        w-full flex items-center p-3 rounded-xl transition-colors
                        ${theme === themeOption.id 
                          ? 'bg-blue-500/30 text-white ring-2 ring-blue-400' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }
                      `}
                    >
                      <themeOption.icon className="w-5 h-5 mr-3" />
                      {themeOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Color Mode */}
              <div>
                <h4 className="text-white font-medium mb-3">Multi-Color Buttons</h4>
                <button
                  onClick={toggleButtonColorMode}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-xl transition-colors
                    ${buttonColorMode 
                      ? 'bg-green-500/30 text-white' 
                      : 'bg-orange-500/30 text-white'
                    }
                  `}
                >
                  <span>{buttonColorMode ? 'Multi-Color: ON' : 'Multi-Color: OFF'}</span>
                  <div className={`w-12 h-6 rounded-full transition-colors ${buttonColorMode ? 'bg-green-500' : 'bg-orange-500'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform mt-0.5 ${buttonColorMode ? 'translate-x-6 ml-1' : 'ml-0.5'}`} />
                  </div>
                </button>
                <p className="text-white/60 text-xs px-3 mt-2">
                  {buttonColorMode 
                    ? 'All buttons use vibrant multicolor' 
                    : 'Buttons match the theme scheme color'
                  }
                </p>
              </div>

              {/* Accessibility */}
              <div>
                <h4 className="text-white font-medium mb-3">Accessibility</h4>
                <div className="space-y-2">
                  <button
                    onClick={toggleReducedMotion}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl transition-colors
                      ${reducedMotion 
                        ? 'bg-green-500/30 text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }
                    `}
                  >
                    <span>Reduce Motion</span>
                    <div className={`w-12 h-6 rounded-full transition-colors ${reducedMotion ? 'bg-green-500' : 'bg-gray-600'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform mt-0.5 ${reducedMotion ? 'translate-x-6 ml-1' : 'ml-0.5'}`} />
                    </div>
                  </button>
                  
                  <button
                    onClick={toggleHighContrast}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl transition-colors
                      ${highContrast 
                        ? 'bg-green-500/30 text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }
                    `}
                  >
                    <span>High Contrast</span>
                    <div className={`w-12 h-6 rounded-full transition-colors ${highContrast ? 'bg-green-500' : 'bg-gray-600'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform mt-0.5 ${highContrast ? 'translate-x-6 ml-1' : 'ml-0.5'}`} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Guitar Orientation */}
              <div>
                <h4 className="text-white font-medium mb-3">Guitar Orientation</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'right', label: 'Right-Handed' },
                    { id: 'left', label: 'Left-Handed' }
                  ].map((hand) => (
                    <button
                      key={hand.id}
                      onClick={() => {
                        setHandedness(hand.id)
                        localStorage.setItem('maestro-handedness', hand.id)
                      }}
                      className={`
                        p-3 rounded-xl transition-colors text-center
                        ${handedness === hand.id 
                          ? 'bg-blue-500/30 text-white ring-2 ring-blue-400' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }
                      `}
                    >
                      {hand.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <h4 className="text-white font-medium mb-3">Language</h4>
                <div className="space-y-2">
                  {[
                    { id: 'en', label: 'English', flag: '🇺🇸' },
                    { id: 'es', label: 'Español', flag: '🇪🇸' }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id)
                        localStorage.setItem('maestro-language', lang.id)
                      }}
                      className={`
                        w-full flex items-center p-3 rounded-xl transition-colors
                        ${language === lang.id 
                          ? 'bg-blue-500/30 text-white ring-2 ring-blue-400' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }
                      `}
                    >
                      <span className="mr-3 text-xl">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}