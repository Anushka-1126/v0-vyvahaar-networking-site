"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip, Check, CheckCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { t } = useTranslation()

  const [conversations, setConversations] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Thank you for the book recommendation! I'll definitely read it.",
      timestamp: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      phone: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Sunita Sharma",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "The yoga session was wonderful today. See you tomorrow!",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      phone: "+91 87654 32109",
    },
    {
      id: "3",
      name: "Mohan Patel",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Great chess game! Let's play again soon.",
      timestamp: "3 hours ago",
      unreadCount: 1,
      isOnline: true,
      phone: "+91 76543 21098",
    },
  ])

  const [messages, setMessages] = useState({
    "1": [
      {
        id: "1",
        sender: "Rajesh Kumar",
        content: "Hello! How are you doing today?",
        timestamp: "10:30 AM",
        isOwn: false,
        status: "seen",
      },
      {
        id: "2",
        sender: "You",
        content: "I'm doing well, thank you! How about you?",
        timestamp: "10:32 AM",
        isOwn: true,
        status: "seen",
      },
      {
        id: "3",
        sender: "Rajesh Kumar",
        content: "I'm great! I just finished reading the book you recommended.",
        timestamp: "10:35 AM",
        isOwn: false,
        status: "seen",
      },
      {
        id: "4",
        sender: "You",
        content: "That's wonderful! Did you enjoy it?",
        timestamp: "10:36 AM",
        isOwn: true,
        status: "seen",
      },
      {
        id: "5",
        sender: "Rajesh Kumar",
        content: "Thank you for the book recommendation! I'll definitely read it.",
        timestamp: "10:38 AM",
        isOwn: false,
        status: "delivered",
      },
    ],
    "2": [
      {
        id: "1",
        sender: "Sunita Sharma",
        content: "Good morning! Are you joining the yoga session today?",
        timestamp: "7:00 AM",
        isOwn: false,
        status: "seen",
      },
      {
        id: "2",
        sender: "You",
        content: "Yes, I'll be there. What time does it start?",
        timestamp: "7:05 AM",
        isOwn: true,
        status: "seen",
      },
      {
        id: "3",
        sender: "Sunita Sharma",
        content: "It starts at 8 AM in the park. See you there!",
        timestamp: "7:10 AM",
        isOwn: false,
        status: "seen",
      },
      {
        id: "4",
        sender: "Sunita Sharma",
        content: "The yoga session was wonderful today. See you tomorrow!",
        timestamp: "9:30 AM",
        isOwn: false,
        status: "delivered",
      },
    ],
    "3": [
      {
        id: "1",
        sender: "Mohan Patel",
        content: "Would you like to play chess this evening?",
        timestamp: "2:00 PM",
        isOwn: false,
        status: "seen",
      },
      {
        id: "2",
        sender: "You",
        content: "What time works for you?",
        timestamp: "2:15 PM",
        isOwn: true,
        status: "seen",
      },
      {
        id: "3",
        sender: "Mohan Patel",
        content: "How about 6 PM at the community center?",
        timestamp: "2:20 PM",
        isOwn: false,
        status: "seen",
      },
      {
        id: "4",
        sender: "You",
        content: "Perfect! See you then.",
        timestamp: "2:25 PM",
        isOwn: true,
        status: "seen",
      },
      {
        id: "5",
        sender: "Mohan Patel",
        content: "Great chess game! Let's play again soon.",
        timestamp: "8:30 PM",
        isOwn: false,
        status: "delivered",
      },
    ],
  })

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const userId = searchParams.get("user")
    if (userId) {
      setSelectedChat(userId)
    }
  }, [searchParams])

  useEffect(() => {
    const savedMessages = localStorage.getItem("vyavahaar_messages")
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages)
      if (parsedMessages.event_notifications) {
        const eventConversation = {
          id: "event_notifications",
          name: "Vyvahaar Events",
          avatar: "/logo.png",
          lastMessage:
            parsedMessages.event_notifications[parsedMessages.event_notifications.length - 1]?.content.substring(
              0,
              50,
            ) + "..." || "No messages",
          timestamp: "now",
          unreadCount: parsedMessages.event_notifications.length,
          isOnline: true,
          phone: "Support",
        }

        setConversations((prevConversations) => [eventConversation, ...prevConversations])
        setMessages((prevMessages) => ({ ...prevMessages, event_notifications: parsedMessages.event_notifications }))
      }
    }
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const newMsg = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    }

    // Add message to chat
    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat as keyof typeof prev] || []), newMsg],
    }))

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedChat ? { ...conv, lastMessage: newMessage.trim(), timestamp: "now" } : conv,
      ),
    )

    // Simulate delivery status update
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedChat]:
          prev[selectedChat as keyof typeof prev]?.map((msg) =>
            msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg,
          ) || [],
      }))
    }, 1000)

    // Simulate seen status update
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedChat]:
          prev[selectedChat as keyof typeof prev]?.map((msg) =>
            msg.id === newMsg.id ? { ...msg, status: "seen" } : msg,
          ) || [],
      }))
    }, 3000)

    toast({
      title: "Message Sent",
      description: "Your message has been delivered",
    })
    setNewMessage("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "seen":
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  const handleCall = (name: string, phone: string) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${name} at ${phone}...`,
    })
  }

  const handleVideoCall = (name: string) => {
    toast({
      title: "Starting Video Call",
      description: `Video calling ${name}...`,
    })
  }

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)
  const chatMessages = selectedChat ? messages[selectedChat as keyof typeof messages] || [] : []

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">{t("messages")}</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`${t("search")} conversations...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedChat === conversation.id
                    ? "bg-orange-50 dark:bg-orange-950/20 border-l-4 border-l-orange-500"
                    : ""
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-200 text-orange-700">
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">{conversation.lastMessage}</p>
                  </div>

                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-orange-500 text-white text-xs">{conversation.unreadCount}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-orange-200 text-orange-700">
                          {selectedConversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.isOnline ? "Active now" : "Last seen recently"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCall(selectedConversation.name, selectedConversation.phone)}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleVideoCall(selectedConversation.name)}>
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? "bg-orange-500 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`flex items-center justify-between mt-1 ${message.isOwn ? "text-orange-100" : "text-gray-500"}`}
                      >
                        <p className="text-xs">{message.timestamp}</p>
                        {message.isOwn && <div className="ml-2">{getStatusIcon(message.status)}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a conversation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
