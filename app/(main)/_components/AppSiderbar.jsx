"use client"
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SiderBarOptions } from "@/services/Constants";
import Link from "next/link"; 
import { usePathname } from "next/navigation";

export function AppSidebar() {

  const path=usePathname();
  console.log(path);

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-col items-center mt-5'>
        <img src='/logo.png' alt='logo' width={150} height={50} className='mb-4' />
        
        <Button className='w-[90%] mt-2 hover:cursor-pointer' onClick={()=>window.location.href='/dashboard/create-interview'}>
          + Create New Interview
        </Button>
        
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {SiderBarOptions.map((option, index) => (
            <SidebarMenuItem key={index} className='p-1'>
              <SidebarMenuButton asChild className={`p-5 ${path==option.path&&'bg-blue-50 rounded-md'}`}>
                <Link href={option.path}>
                  <div className="flex items-center gap-2">
                    <option.icon className={`${path==option.path&&'text-primary'}`}/>
                    <span className={`text-[16px] font-medium ${path==option.path&&'text-primary'}`}>{option.name}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarGroup>{/* You can add grouped items here */}</SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
