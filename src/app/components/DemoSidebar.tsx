import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Home,
  Map,
  Compass,
  Shield,
  User,
  Settings,
  LogOut,
  Bell,
  Heart,
  Calendar,
  HelpCircle,
} from "lucide-react";

export function DemoSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 border-r border-slate-700/30">
        {/* Stormy Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-slate-600/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
        
        {/* Lightning-like Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse shadow-lg shadow-blue-400/20"></div>
          <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-slate-300/50 rounded-full animate-pulse shadow-lg shadow-slate-300/30" style={{animationDelay: '1s'}}></div>
        </div>

        <SidebarHeader className="relative z-10">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="text-lg text-white font-medium">TRINETRA</h2>
              <p className="text-xs text-slate-400">Northeast Tourism</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="relative z-10">
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Map className="w-4 h-4" />
                    <span>Maps</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Compass className="w-4 h-4" />
                    <span>Guide</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Shield className="w-4 h-4" />
                    <span>Emergency</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Heart className="w-4 h-4" />
                    <span>Favorites</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Calendar className="w-4 h-4" />
                    <span>My Trips</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400">Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white hover:bg-blue-600/20 hover:text-blue-300">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="relative z-10">
          <div className="p-2 border-t border-slate-700/30">
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/30">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm">
                  AN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">ANANT</p>
                <p className="text-slate-400 text-xs truncate">anant@gmail.com</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700/30 px-4 bg-slate-900/60 backdrop-blur-xl">
          <SidebarTrigger className="text-white hover:bg-blue-600/20" />
          <div className="ml-auto">
            <h1 className="text-lg text-white font-medium">TRINETRA Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 min-h-screen">
          {/* Main content would go here */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-xl p-4">
              <h3 className="text-white font-medium mb-2">Welcome to TRINETRA</h3>
              <p className="text-slate-400 text-sm">Your premium Northeast India tourism companion</p>
            </div>
            <div className="aspect-video rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-xl p-4">
              <h3 className="text-white font-medium mb-2">Recent Activity</h3>
              <p className="text-slate-400 text-sm">View your latest travel activities</p>
            </div>
            <div className="aspect-video rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-xl p-4">
              <h3 className="text-white font-medium mb-2">Quick Stats</h3>
              <p className="text-slate-400 text-sm">Track your travel progress</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}