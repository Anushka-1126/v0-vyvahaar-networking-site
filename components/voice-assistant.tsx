"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [hasPermissions, setHasPermissions] = useState(false)
  const [user, setUser] = useState<any>(null)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()
  const { t, currentLanguage } = useTranslation()

  useEffect(() => {
    // Load user data
    const authStatus = localStorage.getItem("vyvahaar_auth")
    if (authStatus) {
      setUser(JSON.parse(authStatus))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        // Set language based on current language
        const langMap: { [key: string]: string } = {
          en: "en-US",
          hi: "hi-IN",
          pa: "pa-IN",
        }
        recognitionRef.current.lang = langMap[currentLanguage] || "en-US"

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript)
            handleVoiceCommand(finalTranscript)
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [currentLanguage])

  // Greet user on first load
  useEffect(() => {
    if (user && hasPermissions) {
      const hasGreeted = sessionStorage.getItem("vyvahaar_greeted")
      if (!hasGreeted) {
        setTimeout(() => {
          const greeting = getGreeting()
          speak(greeting)
          sessionStorage.setItem("vyvahaar_greeted", "true")
        }, 2000)
      }
    }
  }, [user, hasPermissions, currentLanguage])

  const getGreeting = () => {
    const greetings = {
      en: `Namaste ${user?.name || "User"}! Welcome to Vyvahaar. I'm your voice assistant. You can ask me to navigate, scroll, or type messages.`,
      hi: `नमस्ते ${user?.name || "उपयोगकर्ता"}! व्यवहार में आपका स्वागत है। मैं आपका आवाज सहायक हूं। आप मुझसे नेविगेट करने, स्क्रॉल करने या संदेश टाइप करने को कह सकते हैं।`,
      pa: `ਨਮਸਤੇ ${user?.name || "ਵਰਤੋਂਕਾਰ"}! ਵਿਵਹਾਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਮੈਂ ਤੁਹਾਡਾ ਆਵਾਜ਼ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਮੈਨੂੰ ਨੈਵੀਗੇਟ ਕਰਨ, ਸਕ੍ਰੋਲ ਕਰਨ ਜਾਂ ਸੁਨੇਹੇ ਟਾਈਪ ਕਰਨ ਲਈ ਕਹਿ ਸਕਦੇ ਹੋ।`,
    }
    return greetings[currentLanguage as keyof typeof greetings] || greetings.en
  }

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
      setHasPermissions(true)
      toast({
        title: t("permissionRequired"),
        description: "Camera and microphone access granted!",
      })

      // Stop the stream for now
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      toast({
        title: t("permissionRequired"),
        description: t("microphoneAccess"),
        variant: "destructive",
      })
    }
  }

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    let commandRecognized = false

    // Multi-language command mapping
    const commandMap: { [key: string]: { action: string; path?: string; text?: string } } = {
      // Navigation commands
      "go to home": { action: "navigate", path: "/" },
      "open home": { action: "navigate", path: "/" },
      "होम जाएं": { action: "navigate", path: "/" },
      "होम खोलें": { action: "navigate", path: "/" },
      "ਘਰ ਜਾਓ": { action: "navigate", path: "/" },
      "ਹੋਮ ਖੋਲ੍ਹੋ": { action: "navigate", path: "/" },

      "go to events": { action: "navigate", path: "/events" },
      "open events": { action: "navigate", path: "/events" },
      "इवेंट्स जाएं": { action: "navigate", path: "/events" },
      "इवेंट्स खोलें": { action: "navigate", path: "/events" },
      "ਇਵੈਂਟਸ ਜਾਓ": { action: "navigate", path: "/events" },
      "ਇਵੈਂਟਸ ਖੋਲ੍ਹੋ": { action: "navigate", path: "/events" },

      "go to connect": { action: "navigate", path: "/connect" },
      "open connect": { action: "navigate", path: "/connect" },
      "कनेक्ट जाएं": { action: "navigate", path: "/connect" },
      "कनेक्ट खोलें": { action: "navigate", path: "/connect" },
      "ਕਨੈਕਟ ਜਾਓ": { action: "navigate", path: "/connect" },
      "ਕਨੈਕਟ ਖੋਲ੍ਹੋ": { action: "navigate", path: "/connect" },

      "go to messages": { action: "navigate", path: "/messages" },
      "open messages": { action: "navigate", path: "/messages" },
      "संदेश जाएं": { action: "navigate", path: "/messages" },
      "संदेश खोलें": { action: "navigate", path: "/messages" },
      "ਸੁਨੇਹੇ ਜਾਓ": { action: "navigate", path: "/messages" },
      "ਸੁਨੇਹੇ ਖੋਲ੍ਹੋ": { action: "navigate", path: "/messages" },

      // Scroll commands
      "scroll up": { action: "scroll", path: "up" },
      "scroll down": { action: "scroll", path: "down" },
      "scroll to top": { action: "scroll", path: "top" },
      "ऊपर स्क्रॉल करें": { action: "scroll", path: "up" },
      "नीचे स्क्रॉल करें": { action: "scroll", path: "down" },
      "टॉप पर जाएं": { action: "scroll", path: "top" },
      "ਉੱਪਰ ਸਕ੍ਰੋਲ ਕਰੋ": { action: "scroll", path: "up" },
      "ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰੋ": { action: "scroll", path: "down" },
      "ਟਾਪ ਤੇ ਜਾਓ": { action: "scroll", path: "top" },

      // Click commands
      click: { action: "click" },
      "क्लिक करें": { action: "click" },
      "ਕਲਿੱਕ ਕਰੋ": { action: "click" },

      // Type message commands
      "type hello": { action: "type", text: "Hello" },
      "type namaste": { action: "type", text: "Namaste" },
      "हैलो टाइप करें": { action: "type", text: "नमस्ते" },
      "नमस्ते टाइप करें": { action: "type", text: "नमस्ते" },
      "ਹੈਲੋ ਟਾਈਪ ਕਰੋ": { action: "type", text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
      "ਨਮਸਤੇ ਟਾਈਪ ਕਰੋ": { action: "type", text: "ਨਮਸਤੇ" },
    }

    // Find matching command
    for (const [cmd, config] of Object.entries(commandMap)) {
      if (lowerCommand.includes(cmd.toLowerCase())) {
        commandRecognized = true

        switch (config.action) {
          case "scroll":
            if (config.path === "up") {
              window.scrollBy(0, -300)
              speak(getResponseMessage("scroll_up"))
            } else if (config.path === "down") {
              window.scrollBy(0, 300)
              speak(getResponseMessage("scroll_down"))
            } else if (config.path === "top") {
              window.scrollTo(0, 0)
              speak(getResponseMessage("scroll_top"))
            }
            break

          case "navigate":
            if (config.path) {
              window.location.href = config.path
              speak(getResponseMessage(config.path))
            }
            break

          case "click":
            const buttons = document.querySelectorAll('button, a, [role="button"]')
            const visibleButtons = Array.from(buttons).filter((btn) => {
              const rect = btn.getBoundingClientRect()
              return (
                rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth
              )
            })

            if (visibleButtons.length > 0) {
              ;(visibleButtons[0] as HTMLElement).click()
              speak(getResponseMessage("click"))
            }
            break

          case "type":
            if (config.text) {
              const messageInput = document.querySelector(
                'input[placeholder*="message"], textarea[placeholder*="message"]',
              ) as HTMLInputElement
              if (messageInput) {
                messageInput.value = config.text
                messageInput.dispatchEvent(new Event("input", { bubbles: true }))
                speak(getResponseMessage("type"))
              }
            }
            break
        }
        break
      }
    }

    if (!commandRecognized) {
      speak(getResponseMessage("not_understood"))
    }
  }

  const getResponseMessage = (action: string): string => {
    const responses: { [key: string]: { en: string; hi: string; pa: string } } = {
      "/": { en: "Going to home page", hi: "होम पेज पर जा रहे हैं", pa: "ਘਰ ਪੰਨੇ ਤੇ ਜਾ ਰਹੇ ਹਾਂ" },
      "/events": { en: "Opening events page", hi: "इवेंट्स पेज खोल रहे हैं", pa: "ਇਵੈਂਟਸ ਪੰਨਾ ਖੋਲ੍ਹ ਰਹੇ ਹਾਂ" },
      "/connect": { en: "Opening connect page", hi: "कनेक्ट पेज खोल रहे हैं", pa: "ਕਨੈਕਟ ਪੰਨਾ ਖੋਲ੍ਹ ਰਹੇ ਹਾਂ" },
      "/messages": { en: "Opening messages", hi: "मैसेज खोल रहे हैं", pa: "ਸੁਨੇਹੇ ਖੋਲ੍ਹ ਰਹੇ ਹਾਂ" },
      scroll_up: { en: "Scrolling up", hi: "ऊपर स्क्रॉल कर रहे हैं", pa: "ਉੱਪਰ ਸਕ੍ਰੋਲ ਕਰ ਰਹੇ ਹਾਂ" },
      scroll_down: { en: "Scrolling down", hi: "नीचे स्क्रॉल कर रहे हैं", pa: "ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰ ਰਹੇ ਹਾਂ" },
      scroll_top: { en: "Going to top", hi: "टॉप पर जा रहे हैं", pa: "ਟਾਪ ਤੇ ਜਾ ਰਹੇ ਹਾਂ" },
      click: { en: "Clicked", hi: "क्लिक किया गया", pa: "ਕਲਿੱਕ ਕੀਤਾ ਗਿਆ" },
      type: { en: "Message typed", hi: "संदेश टाइप किया गया", pa: "ਸੁਨੇਹਾ ਟਾਈਪ ਕੀਤਾ ਗਿਆ" },
      not_understood: { en: "Sorry, please repeat", hi: "माफ करें, कृपया दोहराएं", pa: "ਮਾਫ਼ ਕਰੋ, ਕਿਰਪਾ ਕਰਕੇ ਦੁਹਰਾਓ" },
    }

    return (
      responses[action]?.[currentLanguage as keyof (typeof responses)[string]] ||
      responses[action]?.en ||
      "Sorry, please repeat"
    )
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(text)

      const langMap: { [key: string]: string } = {
        en: "en-US",
        hi: "hi-IN",
        pa: "pa-IN",
      }
      utterance.lang = langMap[currentLanguage] || "en-US"
      utterance.rate = 0.8
      utterance.onend = () => setIsPlaying(false)
      speechSynthesis.speak(utterance)
    }
  }

  const toggleListening = async () => {
    if (!hasPermissions) {
      await requestPermissions()
      return
    }

    if (!isSupported) {
      toast({
        title: t("voiceAssistant"),
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      setTranscript("")
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => setShowAssistant(!showAssistant)}
        className="relative w-12 h-12 rounded-full"
      >
        <Mic className="w-6 h-6" />
        {isListening && <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-red-500 animate-pulse" />}
      </Button>

      {showAssistant && (
        <Card className="absolute right-0 top-14 w-80 z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t("voiceAssistant")}</h3>
              <div className="flex gap-2">
                {!hasPermissions ? (
                  <Button size="sm" onClick={requestPermissions} className="bg-orange-600 hover:bg-orange-700">
                    <Camera className="w-4 h-4 mr-1" />
                    {t("allowAccess")}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={isListening ? "destructive" : "default"}
                      size="sm"
                      onClick={toggleListening}
                      disabled={!isSupported}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isPlaying ? "destructive" : "ghost"}
                      size="sm"
                      onClick={stopSpeaking}
                      disabled={!isPlaying}
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                {isListening ? <span className="text-green-600">🎤 {t("listening")}</span> : t("clickMicrophone")}
              </div>

              {transcript && (
                <div className="p-2 bg-muted rounded text-sm">
                  <strong>You said:</strong> {transcript}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <p>
                  <strong>{t("voiceCommands")}:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>"Go to home" / "होम जाएं" / "ਘਰ ਜਾਓ"</li>
                  <li>"Open events" / "इवेंट्स खोलें" / "ਇਵੈਂਟਸ ਖੋਲ੍ਹੋ"</li>
                  <li>"Scroll up/down" / "स्क्रॉल करें" / "ਸਕ੍ਰੋਲ ਕਰੋ"</li>
                  <li>"Type hello" / "हैलो टाइप करें" / "ਹੈਲੋ ਟਾਈਪ ਕਰੋ"</li>
                  <li>"Click" / "क्लिक करें" / "ਕਲਿੱਕ ਕਰੋ"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
